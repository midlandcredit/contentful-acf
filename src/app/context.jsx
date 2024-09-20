'use client';
import React, { createContext, useContext } from 'react';

const AppContext = createContext();

export const AppProvider = ({ children, sharedData }) => {
    return (
      <AppContext.Provider value={sharedData}>
        {children}
      </AppContext.Provider>
    );
  };
  

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};

