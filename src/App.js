import "./App.css";
import Layout from "./layout/layout";
import { Routes, Route } from "react-router-dom";
import Homepage from "./Pages/Homepage";
import Cartpage from "./Pages/Cartpage";
import ProviderContext from "./Context/ProviderContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Checkout from "./Pages/Checkout";
import Siguppage from "./Pages/Signuppage";
import Loginpage from "./Pages/Loginpage";
import Authprovider from "./Context/AuthProvider";
import Profile from "./Pages/Profile";

function App() {
  return (
    <Authprovider>
      <ProviderContext>
        <Layout>
          <ToastContainer />
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/cartpage" element={<Cartpage />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/login" element={<Loginpage />} />
            <Route path="/signup" element={<Siguppage />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </Layout>
      </ProviderContext>
    </Authprovider>
  );
}

export default App;
