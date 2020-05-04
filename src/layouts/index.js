import DesktopLayout from "./DesktopLayout";
import MobileLayout from "./MobileLayout";

export { DesktopLayout, MobileLayout };

// import React from "react";

// import { useMediaQuery } from "@material-ui/core";
// import { useTheme } from "@material-ui/core/styles";

// import Sidebar from "../components/Sidebar";
// import CustomAppBar from "../components/CustomAppBar";
// import SectionDropdown from "../components/SectionDropdown";

// const MainLayout = ({ children }) => {
//   const theme = useTheme();
//   const mobile = useMediaQuery(theme.breakpoints.down("sm"));

//   return (
//     <React.Fragment>
//       {/* <SectionDropdown /> */}
//       {mobile ? <CustomAppBar /> : <Sidebar />}
//       {/* {children} */}
//     </React.Fragment>
//   );
// };

// export default MainLayout;
