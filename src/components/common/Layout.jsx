import { useEffect, useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import FooterMobile from "./FooterMobile";
import TopBarMobile from "./TopBarMobile";

const Layout = ({ children }) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 769);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 769);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      {isMobile ? <TopBarMobile /> : <Header />}
      <main>{children}</main>
      {isMobile ? <FooterMobile /> : <Footer />}
    </>
  );
};

export default Layout;
