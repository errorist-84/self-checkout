import styles from "./Header.module.css";
import kpmgLogo from "../../assets/KPMG_logo.svg";
import ProgressBar from "../ProgressBar/ProgressBar";
import DateTime from "../DateTime";
import { useStepContext } from "../../contexts/StepContext";

export default function Header() {
   const { step, handleExit } = useStepContext();
   return (
      <div className={styles.header}>
         <img src={kpmgLogo} alt="logo" style={{ width: "150px" }} />
         <ProgressBar />
         <DateTime />
         {step !== 0 && step !== 5 && (
            <button
               style={{
                  backgroundColor: "black",
                  fontWeight: "bold",
                  border: "1px solid black",
               }}
               onClick={handleExit}
            >
               EXIT
            </button>
         )}
      </div>
   );
}
