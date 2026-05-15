import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import EnquiryFloating from "../components/EnquiryFloating";

const MainLayout = ({ children }) => {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
      <EnquiryFloating />
    </>
  );
};

export default MainLayout;