import {  ToastContainer } from "react-toastify";
import { Mainroute } from "./Components/Mainroute";
import { Navbar } from "./Components/Navbar";

function App() {
  return (
    <>
      <Navbar />
      <Mainroute />
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      {/* Same as */}
      <ToastContainer />
    </>
  );
}

export default App;
