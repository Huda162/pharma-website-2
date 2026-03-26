import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const notifyRemove = () =>
  toast("تم حذف المنتج من السلة بنجاح", {
    position: "bottom-right",
    autoClose: 3000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    className: "custom-toast",
    style: {
      backgroundColor: "rgb(45 111 109)",
      color: "white",
      textAlign: "center",
    },
  });
const notifyMissingOptions = () =>
  toast("الرجاء اختيار اللون أو الحجم", {
    position: "bottom-right",
    autoClose: 3000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    className: "custom-toast",
    style: {
      backgroundColor: "rgb(45 111 109)",
      color: "white",
      textAlign: "center",
    },
  });
export const addCartSlice = createSlice({
  name: "cart",
  initialState: { value: [] },
  reducers: {


    addItem: (state, action) => {
      const newItem = action.payload.newItem;

      const existItemIndex = state.value.findIndex(
        (item) =>
          item.id === newItem.id &&
          item.selectedColor === newItem.selectedColor &&
          item.selectedSize === newItem.selectedSize
      );

      if (existItemIndex !== -1) {
        state.value[existItemIndex].quantity += 1;
      } else {
        state.value.push({ ...newItem });
      }
    },

    removeItem: (state, action) => {
      return {
        ...state,
        value: state.value.filter((_, index) => index !== action.payload),
      };
    },
    changeAvailablity: (state, action) => {
      state.value[action.payload].available = 'false';
    },
    decrementItem: (state, action) => {
      if (state.value[action.payload].quantity > 1) {
        state.value[action.payload].quantity -= 1;
      }
    },
    changeQuantity: (state, action) => {
      state.value[index].quantity = action.payload.quantity;
    },
    clearCart: () => {
      return { value: [] };
    },
  },
});

export const { addItem, removeItem, decrementItem, changeQuantity,changeAvailablity, clearCart } =
  addCartSlice.actions;
export default addCartSlice.reducer;

