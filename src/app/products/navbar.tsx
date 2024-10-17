import { Box, Typography } from "@mui/material";
import React from "react";
const Navbar = () => {
  return (
    <nav className="bg-gray-700 p-4">
      <Box className="container mx-auto flex justify-between items-center">
        <Typography className="text-white font-extrabold tracking-wide">
          PRODUCTS
        </Typography>
        <Box className="space-x-4 flex justify-between items-center">
          <Typography className="relative text-white hover:pointer">
            <span className="hover:underline hover:underline-offset-4 hover:border-b hover:border-white transition duration-200">
              Home
            </span>
          </Typography>
        </Box>
      </Box>
    </nav>
  );
};

export default Navbar;
