import React, { Component } from "react";
import "./loginStyles.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "react-simple-keyboard/build/css/index.css";

export default function Login() {
   const [mobileNumber, setMobileNumber] = useState("");
   const [isInvalid, setIsInvalid] = useState(false);
   const navigate = useNavigate();

   function handleKeyPress(key) {
      const currentMobileNumber = mobileNumber.replace(/-/g, "");

      if (currentMobileNumber.length < 10) {
         const newMobileNumber = currentMobileNumber + key.target.innerText;
         let formattedMobileNumber = "";

         if (newMobileNumber.length <= 3) {
            formattedMobileNumber = newMobileNumber;
         } else if (newMobileNumber.length <= 6) {
            formattedMobileNumber = `${newMobileNumber.slice(
               0,
               3
            )}-${newMobileNumber.slice(3)}`;
         } else {
            formattedMobileNumber = `${newMobileNumber.slice(
               0,
               3
            )}-${newMobileNumber.slice(3, 6)}-${newMobileNumber.slice(6, 10)}`;
         }

         setMobileNumber(formattedMobileNumber);
      }
   }

   function handleClear() {
      setMobileNumber("");
   }

   function handleContinue() {
      if (mobileNumber.length === 12) navigate("/cart");
      else {
         setTimeout(() => {
            setIsInvalid(false);
         }, 2500);
         setIsInvalid(true);
      }
   }

   function handleKeyboardChange(input) {
      setMobileNumber(input);
   }

   return (
      <>
         <div className="top-div">
            <span className="heading">
               Please enter your{" "}
               <span style={{ fontWeight: "500" }}>Mobile Number</span>
            </span>
         </div>
         <div className="bottom-div">
            <div className="login-left-div">
               <div className="input-fields-div">
                  {/* Select */}
                  <CountrySelect />
                  {/* Input */}
                  <div
                     style={{
                        position: "relative",
                     }}
                  >
                     <input
                        type="text"
                        className="login-input"
                        placeholder="123-456-7890"
                        value={mobileNumber}
                        maxLength={10}
                        readOnly
                     />
                     <small className={`caution ${isInvalid ? "" : "hide"}`}>
                        Please enter a 10-digit mobile number
                     </small>
                  </div>
               </div>
               {/* Button */}
               <button className="button-28" onClick={handleContinue}>
                  Continue to Cart
               </button>
            </div>
            <div className="login-right-div">
               <Keypad
                  handleKeyPress={handleKeyPress}
                  handleClear={handleClear}
               />
            </div>
         </div>
      </>
   );
}

function CountrySelect() {
   // mock data: {flag: "", value: "", label: ""}
   const options = [
      { flag: "", value: "+91", label: "IND" },
      { flag: "", value: "+1", label: "USA" },
      { flag: "", value: "+44", label: "UK" },
      { flag: "", value: "+971", label: "UAE" },
      { flag: "", value: "+65", label: "SNG" },
      { flag: "", value: "+60", label: "MAL" },
      { flag: "", value: "+61", label: "AUS" },
   ];
   const [country, setCountry] = useState("+91");
   function handleChange(e) {
      setCountry(e.target.value);
   }

   return (
      <div className="select-div">
         <select>
            {options.map((option) => (
               <option key={option.value} value={option.value}>
                  {option.label}
               </option>
            ))}
         </select>
      </div>
   );
}

function Keypad({ handleKeyPress, handleClear }) {
   return (
      <div className="login-keypad">
         <div className="login-keypad-row">
            <button className="login-keypad-button" onClick={handleKeyPress}>
               1
            </button>
            <button className="login-keypad-button" onClick={handleKeyPress}>
               2
            </button>
            <button className="login-keypad-button" onClick={handleKeyPress}>
               3
            </button>
         </div>
         <div className="login-keypad-row">
            <button className="login-keypad-button" onClick={handleKeyPress}>
               4
            </button>
            <button className="login-keypad-button" onClick={handleKeyPress}>
               5
            </button>
            <button className="login-keypad-button" onClick={handleKeyPress}>
               6
            </button>
         </div>
         <div className="login-keypad-row">
            <button className="login-keypad-button" onClick={handleKeyPress}>
               7
            </button>
            <button className="login-keypad-button" onClick={handleKeyPress}>
               8
            </button>
            <button className="login-keypad-button" onClick={handleKeyPress}>
               9
            </button>
         </div>
         <div className="login-keypad-row-0">
            <button className="login-keypad-button" onClick={handleKeyPress}>
               0
            </button>
            <button className="login-keypad-button long" onClick={handleClear}>
               Clear
            </button>
         </div>
      </div>
   );
}
