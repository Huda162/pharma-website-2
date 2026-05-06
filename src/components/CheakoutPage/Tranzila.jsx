import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import bit from "../../../public/assets/images/bit.png";
import InputCom from "../Helpers/InputCom";
import LayoutHomeTwo from "../Partials/LayoutHomeTwo";

const Tranzila = () => {
  const [cardNumber, setCardNumber] = useState("");
  const [expMonth, setExpMonth] = useState("");
  const [expYear, setExpYear] = useState("");
  const [securityCode, setSecurityCode] = useState("");
  const [id, setId] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentError, setPaymentError] = useState("");
  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("authToken");
  const { t } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Get cart from Redux
  const cart = useSelector((state) => state.cart.value);

  // State for order data received from checkout
  const [orderData, setOrderData] = useState(null);
  const [orderTotal, setOrderTotal] = useState(0);
  const [orderId, setOrderId] = useState(null);

  useEffect(() => {
    // Method 1: Get data from navigation state (passed via navigate)
    if (location.state) {
      const { result: passedOrderData, total } = location.state;
      if (passedOrderData) {
        setOrderData(passedOrderData.order);
        setOrderTotal(total || passedOrderData.order.total);
        setOrderId(passedOrderData.order.order_id);
      }
    }

    // Method 2: Get data from sessionStorage (alternative approach)
    const pendingOrderStr = sessionStorage.getItem("pendingOrder");
    if (pendingOrderStr && !location.state) {
      try {
        const pendingOrder = JSON.parse(pendingOrderStr);
        setOrderData(pendingOrder.orderData);
        setOrderTotal(pendingOrder.total);
        setOrderId(pendingOrder.orderId);
        console.log("Received order data from sessionStorage:", pendingOrder);
      } catch (error) {
        console.error("Error parsing pending order:", error);
      }
    }
  }, [location, navigate]);

  // Payment with Bit
  const handleBitPayment = async () => {
    // Validate required fields for Bit
    if (!id) {
      setPaymentError(t("please_enter_id_number"));
      return;
    }

    setIsProcessing(true);
    setPaymentError("");

    try {
      const bitPaymentData = {
        terminal_name: "fekrakids",
        txn_currency_code: "ILS",
        txn_type: "debit",
        success_url: "https://fekrakids.com/payment-success",
        failure_url: "https://fekrakids.com/payment-fail",
        notify_url: "https://a.vucra.com/notify.php",
        client: {
          company: orderData.customer_name,
          name: orderData.customer_name,
          id: id,
          email: user.email,
          address_line_1: orderData.area ? orderData.area : "Yad Harutsim 19",
          address_line_2: orderData.near ? orderData.near : "pob 1234",
          city: orderData.city,
          zip: "1234567",
        },
        items: orderData.order_details.map((item) => ({
          code: String(item.product_id),
          name: item.product?.name_en || item.product?.name_ar || "Product",
          type: "I",
          units_number: item.qty,
          unit_type: 1,
          unit_price: item.price,
          price_type: "G",
          currency_code: "ILS",
          to_txn_currency_exchange_rate: 1,
          discount_type: "none",
          discount: 0,
          vat_percent: 17,
          attributes: [
            ...(item.selected_color && item.selected_color !== "undefined"
              ? [
                  {
                    language: "hebrew",
                    name: "color",
                    value: item.selected_color,
                  },
                ]
              : []),
            ...(item.selected_size && item.selected_size !== "undefined"
              ? [
                  {
                    language: "hebrew",
                    name: "size",
                    value: item.selected_size,
                  },
                ]
              : []),
          ],
        })),
        response_language: "english",
        created_by_user: orderData.customer_name,
        items_summary_mode: "separate",
        items_sum: orderTotal,
        user_defined_fields: [
          {
            name: "order_id",
            value: orderData.id,
          },
          {
            name: "email",
            value: user.email,
          },
          {
            name: "contact",
            value: "Liron",
          },
        ],
      };

      console.log("Processing Bit payment with data:", bitPaymentData);

      const response = await fetch(
        "https://api.tranzila.com/v1/transaction/bit/init",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(bitPaymentData),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Bit payment processing failed");
      }

      const result = await response.json();

      if (result.success || result.status === "success") {
        // Payment successful
        console.log("Bit payment successful:", result);

        // Clear sessionStorage
        sessionStorage.removeItem("pendingOrder");

        // Navigate to success page with order details
        navigate("/order-success", {
          state: {
            orderId: result.order_id || orderId,
            total: orderTotal,
            paymentMethod: "bit",
            transactionId: result.transaction_id,
          },
        });
      } else {
        // Payment failed
        setPaymentError(result.message || t("bit_payment_failed"));
      }
    } catch (error) {
      console.error("Bit payment error:", error);
      setPaymentError(error.message || t("bit_payment_error_occurred"));
    } finally {
      setIsProcessing(false);
    }
  };

  // Payment with Credit Card (Tranzila) - Updated with correct API format
  const handleCreditCardPayment = async () => {
    // Validate credit card fields
    if (!cardNumber) {
      setPaymentError(t("please_enter_card_number"));
      return;
    }
    if (!expMonth) {
      setPaymentError(t("please_enter_expiry_month"));
      return;
    }
    if (!expYear) {
      setPaymentError(t("please_enter_expiry_year"));
      return;
    }
    if (!securityCode) {
      setPaymentError(t("please_enter_security_code"));
      return;
    }
    if (!id) {
      setPaymentError(t("please_enter_id_number"));
      return;
    }

    // Remove spaces from card number
    const cleanCardNumber = cardNumber.replace(/\s/g, "");

    const cardNumberRegex = /^\d{16}$/;
    if (!cardNumberRegex.test(cleanCardNumber)) {
      setPaymentError(t("invalid_card_number"));
      return;
    }

    // Validate expiry month (01-12)
    const month = parseInt(expMonth);
    if (isNaN(month) || month < 1 || month > 12) {
      setPaymentError(t("invalid_expiry_month"));
      return;
    }

    // Validate expiry year (current year or future)
    const currentYear = new Date().getFullYear();
    const year = parseInt(expYear);
    if (isNaN(year) || year < currentYear || year > currentYear + 10) {
      setPaymentError(t("invalid_expiry_year"));
      return;
    }

    // Validate CVV (3-4 digits)
    const cvvRegex = /^\d{3,4}$/;
    if (!cvvRegex.test(securityCode)) {
      setPaymentError(t("invalid_security_code"));
      return;
    }

    // Validate ID (should be 5-9 digits for Israeli ID)
    const idRegex = /^\d{5,9}$/;
    if (!idRegex.test(id)) {
      setPaymentError(t("invalid_id_number"));
      return;
    }

    setIsProcessing(true);
    setPaymentError("");

    try {
      // Prepare the request body in the correct format
      const paymentData = {
        card_number: cleanCardNumber,
        expire_month: parseInt(expMonth),
        expire_year: parseInt(expYear),
        cvv: securityCode,
        card_holder_id: id,
      };

      console.log("Processing credit card payment with data:", paymentData);
      console.log("Order total:", orderTotal);
      console.log("Order ID:", orderId);

      // Send credit card payment request to your backend API
      const response = await fetch(
        `https://pharmaglows.com/adminv2/api/orders/${orderId}/direct-pay`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(paymentData),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.message || "Credit card payment processing failed"
        );
      }

      const result = await response.json();
      console.log("Full API response:", result);

      // Check if payment was successful based on the actual response structure
      // The response has { status: true, message: "Payment processed", order_id: 16, tranzila_response: {...} }
      if (result.status === true || result.status === "true") {
        console.log("Credit card payment successful:", result);

        // Extract transaction details from the response
        const transactionData = result.tranzila_response?.transaction_result;

        // Clear sessionStorage
        sessionStorage.removeItem("pendingOrder");

        // Navigate to success page with order details
        navigate("/order-success", {
          state: {
            orderId: result.order_id || orderId,
            total: orderTotal,
            paymentMethod: "credit_card",
            transactionId:
              transactionData?.transaction_id || result.transaction_id,
            authCode:
              transactionData?.auth_number || transactionData?.ConfirmationCode,
            cardType: transactionData?.card_type_name,
            last4: transactionData?.last_4,
            message: result.message,
          },
        });
      } else {
        // Payment failed - show error message
        const errorMessage =
          result.message ||
          result.tranzila_response?.message ||
          t("credit_card_payment_failed");
        setPaymentError(errorMessage);
      }
    } catch (error) {
      console.error("Credit card payment error:", error);
      setPaymentError(error.message || t("credit_card_payment_error_occurred"));
    } finally {
      setIsProcessing(false);
    }
  };

  // Format card number with spaces
  const formatCardNumber = (value) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || "";
    const parts = [];

    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }

    if (parts.length) {
      return parts.join(" ");
    } else {
      return value;
    }
  };

  const handleCardNumberChange = (e) => {
    const formatted = formatCardNumber(e.target.value);
    setCardNumber(formatted);
  };

  // Format ID number (allow only numbers)
  const handleIdChange = (e) => {
    const value = e.target.value.replace(/[^0-9]/g, "");
    setId(value);
  };

  // Format CVV (allow only numbers)
  const handleCvvChange = (e) => {
    const value = e.target.value.replace(/[^0-9]/g, "");
    setSecurityCode(value);
  };

  // Calculate total from cart if no order data is available
  const calculateCartTotal = () => {
    const subtotal = cart.reduce(
      (sum, item) =>
        sum +
        (Number(item.price_nis_retail) -
          (Number(item.discount_percentage) / 100) *
            Number(item.price_nis_retail)) *
          Number(item.quantity),
      0
    );
    const shippingCost = orderData?.deliveryInfo?.area
      ? getShippingCostByArea(orderData.deliveryInfo.area)
      : 0;
    return subtotal + shippingCost;
  };

  // Helper function to get shipping cost
  const getShippingCostByArea = (area) => {
    switch (area) {
      case "center":
        return 40;
      case "jerusalem":
        return 30;
      case "west_bank":
        return 20;
      default:
        return 0;
    }
  };

  // Use order total if available, otherwise calculate from cart
  const displayTotal = orderTotal > 0 ? orderTotal : calculateCartTotal();

  return (
    <LayoutHomeTwo>
      <div className="payment-page">
        <div className="payment-container">
          <div className="payment-header">
            <h1 className="payment-title">{t("payment card")}</h1>
          </div>

          {/* Display order summary */}
          {orderData && (
            <div className="order-summary-card">
              <h2 className="summary-title">{t("order_summary")}</h2>
              <div className="summary-grid">
                <div className="summary-item">
                  <span className="summary-label">{t("name")}:</span>
                  <span className="summary-value">
                    {orderData.customer_name}
                  </span>
                </div>
                <div className="summary-item">
                  <span className="summary-label">{t("email")}:</span>
                  <span className="summary-value">{user?.email}</span>
                </div>
                <div className="summary-item">
                  <span className="summary-label">{t("phone")}:</span>
                  <span className="summary-value">{user?.phone}</span>
                </div>
                <div className="summary-item">
                  <span className="summary-label">{t("address")}:</span>
                  <span className="summary-value">
                    {orderData?.city} - {orderData?.area} - {orderData?.near}
                  </span>
                </div>
                <div className="summary-item">
                  <span className="summary-label">{t("delivery_method")}:</span>
                  <span className="summary-value">
                    {orderData?.delivary_method}
                  </span>
                </div>
                {orderId && (
                  <div className="summary-item">
                    <span className="summary-label">{t("order_id")}:</span>
                    <span className="summary-value">#{orderId}</span>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Payment Form Card */}
          <div className="payment-card">
            <div className="card-header">
              <h2 className="card-title">{t("payment_details")}</h2>
            </div>

            <div className="card-content">
              <div className="form-group">
                <InputCom
                  label={t("card number")}
                  placeholder={t("card number")}
                  value={cardNumber}
                  inputHandler={handleCardNumberChange}
                  type="text"
                  maxLength={19}
                  direction="ltr"
                  name="cardNumber"
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">{t("exp month")}</label>
                  <select
                    onChange={(e) => setExpMonth(e.target.value)}
                    value={expMonth}
                    className="form-select"
                  >
                    <option value="">{t("select_month")}</option>
                    {Array.from({ length: 12 }, (_, i) => {
                      const month = i + 1;
                      const monthStr = month.toString().padStart(2, "0");
                      return (
                        <option key={month} value={monthStr}>
                          {monthStr}
                        </option>
                      );
                    })}
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">{t("exp year")}</label>
                  <select
                    onChange={(e) => setExpYear(e.target.value)}
                    value={expYear}
                    className="form-select"
                  >
                    <option value="">{t("select_year")}</option>
                    {Array.from({ length: 10 }, (_, i) => {
                      const year = new Date().getFullYear() + i;
                      return (
                        <option key={year} value={year}>
                          {year}
                        </option>
                      );
                    })}
                  </select>
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <InputCom
                    inputHandler={handleCvvChange}
                    placeholder={t("security code")}
                    value={securityCode}
                    label={t("security code")}
                    type="password"
                    maxLength={4}
                  />
                </div>
                <div className="form-group">
                  <InputCom
                    inputHandler={handleIdChange}
                    placeholder={t("id")}
                    value={id}
                    label={t("id")}
                    type="text"
                    maxLength={9}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Total Amount */}
          <div className="total-card">
            <div className="total-label">{t("total")}</div>
            <div className="total-amount">₪{displayTotal.toFixed(2)}</div>
          </div>

          {/* Error Message */}
          {paymentError && (
            <div className="error-alert">
              <svg
                className="error-icon"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                  clipRule="evenodd"
                />
              </svg>
              <span>{paymentError}</span>
            </div>
          )}

          {/* Payment Buttons */}
          <div className="payment-actions">
            <button
              className="payment-btn payment-btn-primary"
              onClick={handleCreditCardPayment}
              disabled={isProcessing}
            >
              {isProcessing ? (
                <>
                  <svg className="spinner" viewBox="0 0 24 24">
                    <circle className="spinner-circle" cx="12" cy="12" r="10" />
                    <path
                      className="spinner-path"
                      fill="none"
                      d="M12 2a10 10 0 0 1 10 10"
                    />
                  </svg>
                  {t("processing")}...
                </>
              ) : (
                t("pay with credit card")
              )}
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
        .payment-page {
          min-height: 100vh;
          padding: 40px 20px;
        }

        .payment-container {
          max-width: 600px;
          margin: 0 auto;
        }

        .payment-header {
          text-align: center;
          margin-bottom: 30px;
        }

        .payment-title {
          font-size: 2rem;
          font-weight: 700;
          margin: 0;
          text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
        }

        /* Order Summary Card */
        .order-summary-card {
          background: white;
          border-radius: 16px;
          padding: 24px;
          margin-bottom: 24px;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .order-summary-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
        }

        .summary-title {
          font-size: 1.25rem;
          font-weight: 600;
          color: #333;
          margin: 0 0 20px 0;
          padding-bottom: 12px;
          border-bottom: 2px solid #6d6d6d;
          display: inline-block;
        }

        .summary-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 12px;
        }

        .summary-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 8px 0;
          border-bottom: 1px solid #f0f0f0;
        }

        .summary-label {
          font-weight: 600;
          color: #666;
          font-size: 0.875rem;
        }

        .summary-value {
          color: #333;
          font-size: 0.875rem;
          text-align: right;
        }

        /* Payment Card */
        .payment-card {
          background: white;
          border-radius: 16px;
          overflow: hidden;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          margin-bottom: 24px;
        }

        .card-header {
          background: linear-gradient(135deg, #6d6d6d 0%, #e8e8e8 100%);
          padding: 20px 24px;
        }

        .card-title {
          font-size: 1.25rem;
          font-weight: 600;
          margin: 0;
        }

        .card-content {
          padding: 24px;
        }

        .form-group {
          margin-bottom: 20px;
        }

        .form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
          margin-bottom: 20px;
        }

        .form-label {
          display: block;
          font-size: 0.875rem;
          font-weight: 600;
          color: #555;
          margin-bottom: 8px;
        }

        .form-select {
          width: 100%;
          padding: 10px 12px;
          border: 2px solid #e0e0e0;
          border-radius: 8px;
          font-size: 0.875rem;
          transition: all 0.3s ease;
          background: white;
          cursor: pointer;
        }

        .form-select:hover {
          border-color: #6d6d6d;
        }

        .form-select:focus {
          outline: none;
          border-color: #6d6d6d;
          box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
        }

        /* Total Card */
        .total-card {
          background: white;
          border-radius: 16px;
          padding: 20px 24px;
          margin-bottom: 24px;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .total-label {
          font-size: 1.125rem;
          font-weight: 600;
          color: #666;
        }

        .total-amount {
          font-size: 1.75rem;
          font-weight: 700;
          color: #6d6d6d;
        }

        /* Error Alert */
        .error-alert {
          background: #fee;
          border-left: 4px solid #f44336;
          padding: 12px 16px;
          border-radius: 8px;
          margin-bottom: 24px;
          display: flex;
          align-items: center;
          gap: 12px;
          animation: slideIn 0.3s ease;
        }

        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .error-icon {
          width: 20px;
          height: 20px;
          color: #f44336;
          flex-shrink: 0;
        }

        .error-alert span {
          color: #d32f2f;
          font-size: 0.875rem;
          flex: 1;
        }

        /* Payment Buttons */
        .payment-actions {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .payment-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
          padding: 14px 24px;
          border: none;
          border-radius: 12px;
          font-size: 1rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
        }

        .payment-btn::before {
          content: "";
          position: absolute;
          top: 50%;
          left: 50%;
          width: 0;
          height: 0;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.3);
          transform: translate(-50%, -50%);
          transition: width 0.6s, height 0.6s;
        }

        .payment-btn:active::before {
          width: 300px;
          height: 300px;
        }

        .payment-btn-primary {
          background: linear-gradient(135deg, #6d6d6d 0%, #e8e8e8 100%);
          box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
        }

        .payment-btn-primary:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(102, 126, 234, 0.6);
        }

        .payment-btn-bit {
          background: #00353b;
          color: white;
          box-shadow: 0 4px 15px rgba(0, 53, 59, 0.3);
        }

        .payment-btn-bit:hover:not(:disabled) {
          background: #6d6d6d;
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(0, 0, 0, 0.4);
        }

        .payment-btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .bit-icon {
          width: 28px;
          height: 28px;
          object-fit: contain;
        }

        /* Spinner */
        .spinner {
          width: 20px;
          height: 20px;
          animation: spin 1s linear infinite;
        }

        .spinner-circle {
          stroke: currentColor;
          stroke-width: 2;
          fill: none;
        }

        .spinner-path {
          stroke: currentColor;
          stroke-width: 2;
          fill: none;
          stroke-linecap: round;
        }

        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        /* Responsive Design */
        @media (max-width: 640px) {
          .payment-page {
            padding: 20px 16px;
          }

          .payment-title {
            font-size: 1.5rem;
          }

          .form-row {
            grid-template-columns: 1fr;
            gap: 0;
          }

          .summary-grid {
            grid-template-columns: 1fr;
          }

          .summary-item {
            flex-direction: column;
            align-items: flex-start;
            gap: 4px;
          }

          .summary-value {
            text-align: left;
          }

          .total-amount {
            font-size: 1.5rem;
          }

          .payment-btn {
            padding: 12px 20px;
            font-size: 0.875rem;
          }
        }

        /* Loading animation for buttons */
        @keyframes pulse {
          0%,
          100% {
            opacity: 1;
          }
          50% {
            opacity: 0.7;
          }
        }

        .payment-btn:disabled {
          animation: pulse 1.5s ease-in-out infinite;
        }
      `}</style>
    </LayoutHomeTwo>
  );
};

export default Tranzila;
