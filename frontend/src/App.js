import { Test } from "./Pages/Test";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

export const App = () => {
  return (
    <div className="App">
      <ToastContainer />
      <Test />
    </div>
  );
};
