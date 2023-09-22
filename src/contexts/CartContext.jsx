import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const CartContext = createContext();

export function useCartContext() {
   return useContext(CartContext);
}

export default function CartProvider({ children }) {
   const [cartItems, setCartItems] = useState([]);
   const [showPaymentOpts, setShowPaymentOpts] = useState(false);
   const [printInvoice, setPrintInvoice] = useState(false);
   const [recieveInvoiceOpts, setRecieveInvoiceOpts] = useState([]);
   const [paymentMethod, setPaymentMethod] = useState(null);
   const [emptyCart, setEmptyCart] = useState(true); // Default to true

   function fetchCartItems() {
      // Fetch the data from the API
      axios
         .get("http://localhost:8080/product/productList")
         .then((response) => {
            const data = response.data;
            setCartItems(data);
            setEmptyCart(data.length === 0);
         })
         .catch((error) => {
            console.log("Error fetching data: ", error.message);
         });
   }

   // Handle Item Deletion
   const handleDeleteItem = (itemId) => {
      const updatedCart = cartItems.filter((item) => item.id !== itemId);
      setCartItems(updatedCart);
      if (updatedCart.length === 0) {
         setEmptyCart(true);
      }
   };

   // Handle the "Recieve Invoice" options
   const handleButtonClick = (option) => {
      if (recieveInvoiceOpts.includes(option)) {
         setRecieveInvoiceOpts(
            recieveInvoiceOpts.filter((item) => item !== option)
         );
      } else {
         setRecieveInvoiceOpts([...recieveInvoiceOpts, option]);
      }
   };

   // Order Summary
   const itemCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
   const discount = cartItems.reduce(
      (acc, item) => acc + (item.mrp - item.price) * item.quantity,
      0
   );
   const total = cartItems.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
   );
   const tax = ((total - discount) * 18) / 100;
   const grandTotal = total - discount + tax;
   const roundedDiscount = Number(discount.toFixed(2));
   const roundedTotal = Number(total.toFixed(2));
   const roundedTax = Number(tax.toFixed(2));
   const roundedGrandTotal = Number(grandTotal.toFixed(2)).toLocaleString();

   const orderSummaryVals = {
      itemCount,
      roundedDiscount,
      roundedTotal,
      roundedTax,
      roundedGrandTotal,
   };

   const contextValue = {
      // Cart Items
      emptyCart,
      setEmptyCart,
      cartItems,

      // Cart Item Deletion
      handleDeleteItem,
      handleButtonClick,
      fetchCartItems,

      // Cart Details
      orderSummaryVals,

      // Payment Options & Details
      showPaymentOpts,
      setShowPaymentOpts,
      paymentMethod,
      setPaymentMethod,
      printInvoice,
      setPrintInvoice,
      recieveInvoiceOpts,
      setRecieveInvoiceOpts,
   };

   return (
      <CartContext.Provider value={contextValue}>
         {children}
      </CartContext.Provider>
   );
}
