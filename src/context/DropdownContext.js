import React, { useState } from "react";

import SectionDropdown from "../components/SectionDropdown";

const DropdownContext = React.createContext();

const DropdownContextProvider = ({ children }) => {
  const [regionToShow, setRegionToShow] = useState({
    stringToSearch: null,
    isOpen: false,
  });

  return (
    <DropdownContext.Provider value={{ regionToShow, setRegionToShow }}>
      {regionToShow.stringToSearch ? (
        <SectionDropdown
          stringToSearch={regionToShow.stringToSearch}
          defaultOpen={regionToShow.isOpen}
        />
      ) : null}
      {children}
    </DropdownContext.Provider>
  );
};

export { DropdownContextProvider };

export const DropdownContextConsumer = DropdownContext.Consumer;

export default DropdownContext;
