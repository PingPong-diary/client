import { useEffect, useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import FooterMobile from "./FooterMobile";

const Layout = ({ children }) => {
  const [isMobile, setIsMobile] = useState(null);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 769);

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      <Header />
      <main>{children}</main>
      {isMobile ? <FooterMobile /> : <Footer />}
    </>
  );
};
export default Layout;
