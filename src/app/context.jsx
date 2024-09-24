
import React from 'react';
import { getNavCollection } from "@/lib/api"
import { draftMode } from "next/headers";
import NavigationBar from './navigationBar';
import Footer from './footer';

// const AppContext = createContext();

export const Layout = async ({ children, sharedData }) => {
  const { isEnabled } = draftMode();
  const navData = await getNavCollection(isEnabled);
    return (
      // <AppContext.Provider value={sharedData}>
        <NavigationBar navData={navData[0]}>
        {children}
        <Footer />
        </NavigationBar>
        
      // </AppContext.Provider>
    );
  };
  

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};

