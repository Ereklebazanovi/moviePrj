// src/OutletLayout.tsx
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

const OutletLayout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
};

export default OutletLayout;
