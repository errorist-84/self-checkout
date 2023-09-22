import { createContext, useState } from "react";
// import { useCartContext } from "./CartContext";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { useLocation } from "react-router-dom";

const StepContext = createContext();

export function useStepContext() {
   return useContext(StepContext);
}

export default function StepProvider({ children }) {
   const pagesURL = ["/", "/login", "/cart", "/payment", "/feedback"];
   const navigate = useNavigate();
   const location = useLocation();
   // const { setEmptyCart } = useCartContext();

   const currentStep = pagesURL.indexOf(location.pathname);

   function handlePrev() {
      const newStep = currentStep - 1;
      if (newStep >= 0) {
         navigate(pagesURL[newStep]);
      }
   }

   function handleNext() {
      const newStep = currentStep + 1;
      if (newStep < pagesURL.length) {
         navigate(pagesURL[newStep]);
      }
   }

   function handleExit() {
      navigate(pagesURL[0]);
      // setEmptyCart(true);
   }

   const contextValue = {
      step: currentStep,
      pages: pagesURL,
      handlePrev,
      handleNext,
      handleExit,
   };

   return (
      <StepContext.Provider value={contextValue}>
         {children}
      </StepContext.Provider>
   );
}
