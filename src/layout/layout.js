import Headerpage from "./Header";
import Footerpage from "./Footer";

const Layout = ({ children }) => {
  return (
    <>
      <Headerpage />
      {children}
      <Footerpage />
    </>
  );
};

export default Layout;
