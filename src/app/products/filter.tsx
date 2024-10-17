import {
  Badge,
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  FormGroup,
  IconButton,
  Modal,
  Typography,
} from "@mui/material";
import React, { Key, useState } from "react";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import CloseIcon from "@mui/icons-material/Close";
import { ProductPropsType } from "../type";

const FilterModal = ({
  categories,
  onApplyFilter,
}: {
  categories: ProductPropsType[];
  onApplyFilter: (categories: string[]) => void;
}) => {
  const uniqueCategories: string[] = Array.isArray(categories)
    ? Array.from(new Set(categories.map((item) => item.category)))
    : [];

  const [openFilterModal, setOpenFilterModal] = useState<boolean>(false);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const handleOpen = () => {
    setOpenFilterModal(true);
  };

  const handleClose = () => {
    setOpenFilterModal(false);
  };

  const handleSelectFilter = (category: string) => {
    setSelectedCategories((prevSelected: string[]) => {
      if (prevSelected.includes(category)) {
        return prevSelected.filter((item: string) => item !== category);
      }
      return [...prevSelected, category];
    });
  };

  const handleApply = () => {
    onApplyFilter(selectedCategories);
    handleClose();
  };

  return (
    <>
      <Badge
        color="success"
        variant="dot"
        invisible={selectedCategories.length <= 0}
      >
        <FilterAltIcon onClick={handleOpen} color="primary" />
      </Badge>
      <Modal open={openFilterModal} onClose={handleClose}>
        <Box>
          <div className="flex items-center justify-between">
            <Typography id="" variant="h6" className="text-gray-500">
              Filters
            </Typography>
            <IconButton aria-label="go-to-product">
              <CloseIcon onClick={handleClose} />
            </IconButton>
          </div>
          <FormGroup>
            {uniqueCategories.map((category: string, index: Key) => (
              <FormControlLabel
                key={index}
                control={
                  <Checkbox
                    checked={selectedCategories.includes(category)}
                    onChange={() => handleSelectFilter(category)}
                  />
                }
                label={
                  <span className="text-sm text-gray-500 capitalize">
                    {category}
                  </span>
                }
              />
            ))}
          </FormGroup>
          <Button
            className="pb-2 flex justify-end"
            variant="contained"
            onClick={handleApply}
          >
            Apply
          </Button>
        </Box>
      </Modal>
    </>
  );
};

export default FilterModal;
