import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import EnquiryFloating from "../components/EnquiryFloating";

const MainLayout = ({ children }) => {
  return (
    <>
      <Navbar />
      <div className="pb-[72px] md:pb-0">
        {children}
        <Footer />
      </div>
      <EnquiryFloating />
    </>
  );
};

export default MainLayout;