import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { clearCart } from "../../redux/cartSlice";
import LayoutHomeTwo from "../Partials/LayoutHomeTwo";
import successAnimation from "../../../public/assets/images/success.json";
import Lottie from "lottie-react";

const OrderSuccess = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const dispatch = useDispatch();
  
  const { orderId, total, paymentMethod, transactionId, authCode } = location.state || {};
  
  useEffect(() => {
    // Clear cart on successful payment
    dispatch(clearCart());
    
    // Clear session storage
    sessionStorage.removeItem("pendingOrder");
    
    // Optional: Send analytics event
    console.log("Payment successful:", { orderId, total, paymentMethod, transactionId });
  }, [dispatch, orderId, total, paymentMethod, transactionId]);
  
  const getPaymentMethodText = () => {
    switch(paymentMethod) {
      case "credit_card":
        return t("Credit Card");
      case "bit":
        return "Bit";
      case "cash":
        return t("Cash on Delivery");
      default:
        return t("Payment");
    }
  };
  
  const formatDate = () => {
    const now = new Date();
    return now.toLocaleDateString() + " " + now.toLocaleTimeString();
  };
  
  return (
    <LayoutHomeTwo>
      <div className="success-page">
        <div className="success-container">
          {/* Success Animation */}
          <div className="success-animation">
            <Lottie 
              animationData={successAnimation} 
              loop={false}
              style={{ width: 200, height: 200 }}
            />
          </div>
          
          {/* Success Message */}
          <div className="success-content">
            <h1 className="success-title">{t("payment_successful")}</h1>
            <p className="success-message">{t("payment_success_description")}</p>
          </div>
          
          {/* Order Details Card */}
          <div className="order-details-card">
            <h2 className="details-title">{t("order_details")}</h2>
            
            <div className="details-grid">
              <div className="detail-item">
                <span className="detail-label">{t("order_id")}:</span>
                <span className="detail-value">#{orderId || "N/A"}</span>
              </div>
              
              <div className="detail-item">
                <span className="detail-label">{t("payment_method")}:</span>
                <span className="detail-value">{getPaymentMethodText()}</span>
              </div>
              
              <div className="detail-item">
                <span className="detail-label">{t("total_amount")}:</span>
                <span className="detail-value highlight">₪{total?.toFixed(2) || "0.00"}</span>
              </div>
              
              <div className="detail-item">
                <span className="detail-label">{t("transaction_id")}:</span>
                <span className="detail-value">{transactionId || "N/A"}</span>
              </div>
              
              {authCode && (
                <div className="detail-item">
                  <span className="detail-label">{t("authorization_code")}:</span>
                  <span className="detail-value">{authCode}</span>
                </div>
              )}
              
              <div className="detail-item">
                <span className="detail-label">{t("date")}:</span>
                <span className="detail-value">{formatDate()}</span>
              </div>
            </div>
          </div>
          
          {/* Action Buttons */}
          <div className="action-buttons">
            <button 
              className="btn btn-primary"
              onClick={() => navigate("/")}
            >
              <svg className="btn-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              {t("back_to_home")}
            </button>
          </div>
        </div>
      </div>
      
      <style jsx>{`
        .success-page {
          min-height: 100vh;
          padding: 60px 20px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        
        .success-container {
          max-width: 600px;
          width: 100%;
          margin: 0 auto;
          animation: slideUp 0.5s ease;
        }
        
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .success-animation {
          display: flex;
          justify-content: center;
          margin-bottom: 20px;
        }
        
        .success-content {
          text-align: center;
          margin-bottom: 30px;
        }
        
        .success-title {
          font-size: 2rem;
          font-weight: 700;
          margin-bottom: 10px;
          text-shadow: 2px 2px 4px rgba(0,0,0,0.1);
        }
        
        .success-message {
          font-size: 1rem;
          color: rgba(255,255,255,0.9);
          margin: 0;
        }
        
        .order-details-card {
          border-radius: 16px;
          padding: 24px;
          margin-bottom: 24px;
          box-shadow: 0 10px 25px rgba(0,0,0,0.1);
        }
        
        .details-title {
          font-size: 1.25rem;
          font-weight: 600;
          color: #333;
          margin: 0 0 20px 0;
          padding-bottom: 12px;
          border-bottom: 2px solid #6d6d6d;
          display: inline-block;
        }
        
        .details-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 16px;
        }
        
        .detail-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 8px 0;
          border-bottom: 1px solid #f0f0f0;
        }
        
        .detail-label {
          font-weight: 600;
          color: #666;
          font-size: 0.875rem;
        }
        
        .detail-value {
          color: #333;
          font-size: 0.875rem;
          font-weight: 500;
        }
        
        .detail-value.highlight {
          color: #6d6d6d;
          font-size: 1.125rem;
          font-weight: 700;
        }
        
        .action-buttons {
          display: flex;
          gap: 12px;
          margin-bottom: 24px;
          flex-wrap: wrap;
        }
        
        .btn {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          padding: 12px 20px;
          border: none;
          border-radius: 12px;
          font-size: 0.875rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          text-decoration: none;
        }
        
        .btn-primary {
          background: white;
          color: #6d6d6d;
          box-shadow: 0 4px 10px rgba(0,0,0,0.1);
        }
        
        .btn-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 15px rgba(0,0,0,0.15);
        }
        
        .btn-secondary {
          background: #48bb78;
        }
        
        .btn-secondary:hover {
          background: #38a169;
          transform: translateY(-2px);
        }
        
        .btn-outline {
          background: transparent;
          border: 2px solid white;
        }
        
        .btn-outline:hover {
          background: white;
          color: #6d6d6d;
          transform: translateY(-2px);
        }
        
        .btn-icon {
          width: 18px;
          height: 18px;
        }
        
        .confirmation-message {
          text-align: center;
          padding: 20px;
          background: rgba(255,255,255,0.1);
          border-radius: 12px;
          backdrop-filter: blur(10px);
        }
        
        .confirmation-message p {
          margin: 5px 0;
          font-size: 0.875rem;
        }
        
        .help-text {
          font-size: 0.75rem;
          opacity: 0.8;
        }
        
        @media (max-width: 640px) {
          .success-page {
            padding: 40px 16px;
          }
          
          .success-title {
            font-size: 1.5rem;
          }
          
          .details-grid {
            grid-template-columns: 1fr;
          }
          
          .action-buttons {
            flex-direction: column;
          }
          
          .btn {
            width: 100%;
          }
        }
        
        /* Print styles */
        @media print {
          .success-page {
            background: white;
            padding: 20px;
          }
          
          .action-buttons,
          .confirmation-message {
            display: none;
          }
          
          .order-details-card {
            box-shadow: none;
            border: 1px solid #ddd;
          }
        }
      `}</style>
    </LayoutHomeTwo>
  );
};

export default OrderSuccess;