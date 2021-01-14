import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Bitcoin from "./Bitcoin";
function App() {
  return (
    <div className="container">
      <ToastContainer autoClose={4000} hideProgressBar></ToastContainer>
      <Bitcoin></Bitcoin>
    </div>
  );
}

export default App;
