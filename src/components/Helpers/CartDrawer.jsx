import React, { useState, useEffect } from "react";
import {
  Drawer,
  Button,
  Typography,
  IconButton,
} from "@material-tailwind/react";
import { useCartDrawer } from "../../context/CartDrawerContext";
import { useTranslation } from "react-i18next";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import ProductsTable from "../CartPage/ProductsTable";
import { changeAvailablity, changeQuantity, removeItem } from "../../redux/cartSlice";
import axios from "axios";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Box,
} from "@material-ui/core";

export function CartDrawer() {
  const { isCartOpen, openCartDrawer, closeCartDrawer } = useCartDrawer();
  const { t, i18n } = useTranslation();
  const currentLanguage = i18n.language;
  const carts = useSelector((state) => state.cart.value);
  const dispatch = useDispatch();
  const navigate = useNavigate(); 
  const [width, setWidth] = useState();
  const [languageChanged, setLanguageChanged] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [isCheckingAvailability, setIsCheckingAvailability] = useState(false);
  const [unavailableItems, setUnavailableItems] = useState([]); 

  const checkAvailable = async () => {
    const cartItems = carts.map((item) => ({
      product_id: item.id,
      qty: item.quantity,
      product_size_id: item.product_sizes?.find(
        (size) => size?.size === item?.selectedSize
      )?.id,
      product_color_id: item.selectedColor,
    }));
    try {
      const response = await axios.post(
        `https://pharmaglows.com/admin/api/cart/check-stock`,
        { items: cartItems }
      );

      if (response.status === 200) {
        const hasUnavailable = response?.data?.items?.some(
          (product) => product.in_stock === false || product.is_active === false
        );

        response?.data?.items?.forEach((product, index) => {
          if (product.in_stock === false || product.is_active === false) {
            if (product.available_qty < product.qty_requested && product.available_qty > 0) {
              console.log("change quantity");
              changeQty(index, product.available_qty);
            } else {
              changeAvailable(index);
            }
          }
        });
      }
    } catch (error) {
      console.error("Error checking availability:", error);
    }
  };

  const checkAvailabilityBeforeCheckout = async () => {
    setIsCheckingAvailability(true);
    
    const cartItems = carts.map((item) => ({
      product_id: item.id,
      qty: item.quantity,
      product_size_id: item.product_sizes?.find(
        (size) => size?.size === item?.selectedSize
      )?.id,
      product_color_id: item.selectedColor,
    }));
    
    try {
      const response = await axios.post(
        `https://pharmaglows.com/admin/api/cart/check-stock`,
        { items: cartItems }
      );

      if (response.status === 200) {
        const unavailableItemsIndexes = [];
        
        // Check for unavailable items
        response?.data?.items?.forEach((product, index) => {
          if (product.in_stock === false || product.is_active === false) {
            unavailableItemsIndexes.push({
              index,
              productName: carts[index].name_en || carts[index].name_ar || carts[index].name_he,
              reason: product.available_qty === 0 ? "out_of_stock" : "low_stock"
            });
          }
        });

        if (unavailableItemsIndexes.length > 0) {
          // Remove unavailable items immediately
          const indexesToRemove = unavailableItemsIndexes
            .map(item => item.index)
            .sort((a, b) => b - a); // Sort in descending order to avoid index issues

          // Remove items from cart
          indexesToRemove.forEach((index) => {
            dispatch(removeItem(index));
          });

          // Store the removed items info for feedback
          setUnavailableItems(unavailableItemsIndexes.map(item => ({
            name: item.productName,
            reason: item.reason
          })));

          // Show feedback message
          setShowMessage(true);
          setIsCheckingAvailability(false);
          return false; // Indicates some items were removed
        }
        
        setIsCheckingAvailability(false);
        return true; // All items are available
      }
    } catch (error) {
      console.error("Error checking availability before checkout:", error);
      setIsCheckingAvailability(false);
      return false; // Assume not available on error
    }
  };

  const changeAvailable = (index) => {
    dispatch(changeAvailablity(index));
  };
  
  const changeQty = (index, newQuantity) => {
    dispatch(
      changeQuantity({
        item: {
          index: index,
          quantity: newQuantity,
        },
      })
    );
  };

  const handleRemoveCart = (index) => {
    dispatch(removeItem(index));
  };

  const deleteUnavailable = async () => {
    const unavailableIndexes = [];

    carts.forEach((item, index) => {
      if (item.available === "false") {
        unavailableIndexes.push(index);
      }
    });

    unavailableIndexes.sort((a, b) => b - a);

    unavailableIndexes.forEach((index) => {
      handleRemoveCart(index);
    });
    setShowMessage(false);
  };

  const handleCheckout = async () => {
    // const allAvailable = await checkAvailabilityBeforeCheckout();
    
    // if (allAvailable) {
      closeCartDrawer();
      navigate("/checkout");
    // }
  };

  useEffect(() => {
    const handleLanguageChanged = () => {
      setLanguageChanged(true);
      closeCartDrawer();
      setTimeout(() => setLanguageChanged(false), 100);
    };

    i18n.on("languageChanged", handleLanguageChanged);
    return () => {
      i18n.off("languageChanged", handleLanguageChanged);
    };
  }, [i18n, closeCartDrawer]);

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (isCartOpen) {
      document.body.style.overflow = "hidden";
      // checkAvailable();
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isCartOpen]);

  const isRTL = currentLanguage === "ar" || currentLanguage === "he";
  const placement = isRTL ? "left" : "right";

  if (languageChanged) {
    return null;
  }

  return (
    <>
      {isCartOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300"
          onClick={closeCartDrawer}
          style={{
            backdropFilter: "blur(2px)",
            WebkitBackdropFilter: "blur(2px)",
          }}
        />
      )}

      <Dialog
        open={showMessage}
        onClose={() => setShowMessage(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogContent>
          <Box className="p-4">
            <p className="text-center mb-4 font-bold">
              {t("Some items were removed from your cart because they are no longer available.")}
            </p>
            <div className="flex items-center justify-center mb-4">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                <svg 
                  className="w-6 h-6 text-red-500" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth="2" 
                    d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" 
                  />
                </svg>
              </div>
            </div>
            
            {unavailableItems.length > 0 && (
              <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                <p className="font-medium mb-2">{t("Removed items:")}</p>
                <ul className="space-y-2 max-h-40 overflow-y-auto">
                  {unavailableItems.map((item, index) => (
                    <li key={index} className="flex justify-between items-center text-sm">
                      <span className="truncate max-w-[70%]">{item.name}</span>
                      <span className="text-red-500 text-xs font-medium">
                        {item.reason === "out_of_stock" ? t("Out of stock") : t("Low stock")}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            
            <p className="text-center mt-4 text-sm text-gray-600">
              {t("You can proceed to checkout with the remaining items.")}
            </p>
          </Box>
        </DialogContent>
        <DialogActions className="justify-center pb-4 gap-1">
          <Button
            onClick={() => setShowMessage(false)}
            className="bg-primarygray hover:bg-main-color/30 text-main-color px-6 py-2 rounded-md border border-main-color "
          >
            {t("Continue Shopping")}
          </Button>
          {carts.length > 0 && (
            <Button
              onClick={() => {
                setShowMessage(false);
                closeCartDrawer();
                navigate("/checkout");
              }}
              className="bg-main-color hover:bg-main-color/90 text-white px-6 py-2 rounded-md ml-2 border border-main-color"
            >
              {t("Proceed to Checkout")}
            </Button>
          )}
        </DialogActions>
      </Dialog>

      <Drawer
        open={isCartOpen}
        onClose={closeCartDrawer}
        className="py-4 z-[1037] flex flex-col h-full shadow-2xl"
        size={450}
        placement={placement}
        transition={{ type: "tween", duration: 0.3 }}
        overlay={false}
      >
        <div className="px-4 mt-4 flex items-center justify-between h-[10vh]">
          <Typography variant="h3" color="blue-gray">
            {t("Cart")}
          </Typography>
          <IconButton
            variant="text"
            color="blue-gray"
            onClick={closeCartDrawer}
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="h-5 w-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </IconButton>
        </div>

        <hr className="mt-3 h-px border-t-0 bg-transparent bg-gradient-to-r from-transparent via-neutral-500 to-transparent opacity-25 dark:opacity-100" />
        <div className="flex-grow overflow-y-auto w-full">
          <ProductsTable />
        </div>

        <hr className="mb-3 h-px border-t-0 bg-transparent bg-gradient-to-r from-transparent via-neutral-500 to-transparent opacity-25 dark:opacity-100" />

        <div className="w-full p-4 flex-shrink-0">
          {carts.length > 0 && (
            <div className="w-full flex sm:justify-end">
              <div className="w-full border-[#EDEDED] px-3 py-3 rounded-lg">
                <div className="sub-total mb-6">
                  <div className="flex justify-between mb-6">
                    <p className="text-[20px] font-bold text-qblack">
                      {t("Total")}
                    </p>
                    <p className="text-[20px] font-bold text-qred">
                      ₪
                      {carts?.reduce(
                        (acc, item) =>
                          acc +
                          Number(item.price_nis_retail) * Number(item.quantity),
                        0
                      )}
                    </p>
                  </div>
                  <div className="w-full h-[1px] bg-[#EDEDED]"></div>
                </div>
                
                <button
                  onClick={handleCheckout}
                  disabled={isCheckingAvailability}
                  className={`w-full h-[50px] black-btn flex justify-center items-center rounded-lg ${
                    isCheckingAvailability ? 'opacity-70 cursor-not-allowed' : 'cursor-pointer'
                  }`}
                >
                  {isCheckingAvailability ? (
                    <div className="flex items-center">
                      <svg className="animate-spin h-5 w-5 mr-2 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      <span className="text-md font-semibold">
                        {t("Checking availability...")}
                      </span>
                    </div>
                  ) : (
                    <span className="text-md font-semibold">
                      {t("Click here to confirm the order")}
                    </span>
                  )}
                </button>
              </div>
            </div>
          )}
        </div>
      </Drawer>
    </>
  );
}