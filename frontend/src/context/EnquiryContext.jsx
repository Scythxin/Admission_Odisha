import { createContext, useContext, useState } from 'react';

const EnquiryContext = createContext();

export const EnquiryProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const openEnquiry = () => setIsOpen(true);
  const closeEnquiry = () => setIsOpen(false);

  return (
    <EnquiryContext.Provider value={{ isOpen, openEnquiry, closeEnquiry }}>
      {children}
    </EnquiryContext.Provider>
  );
};

export const useEnquiry = () => {
  const context = useContext(EnquiryContext);
  if (!context) {
    // Return a safe fallback to prevent crashes if used outside provider
    return { 
      isOpen: false, 
      openEnquiry: () => console.warn('EnquiryProvider missing'), 
      closeEnquiry: () => {} 
    };
  }
  return context;
};
