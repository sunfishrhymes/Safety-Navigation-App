import React, { createContext, useContext, useState } from 'react';

const NavigationContext = createContext();

export function NavigationProvider({ children }) {
  const [selectedMode, setSelectedMode] = useState(null);
  const [startAddress, setStartAddress] = useState('');
  const [destinationAddress, setDestinationAddress] = useState('');

  return (
    <NavigationContext.Provider
      value={{
        selectedMode, setSelectedMode,
        startAddress, setStartAddress,
        destinationAddress, setDestinationAddress,
      }}
    >
      {children}
    </NavigationContext.Provider>
  );
}

export function useNavigation() {
  return useContext(NavigationContext);
}
