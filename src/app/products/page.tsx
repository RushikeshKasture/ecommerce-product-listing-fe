"use client";
import { gql, useQuery } from "@apollo/client";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  CircularProgress,
  Rating,
  Typography,
  Skeleton,
} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import { useRouter } from "next/navigation";
import Navbar from "./navbar";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { formatRating } from "../utils";
import React, { useState } from "react";
import { ProductDataPropsType } from "../type";
import FilterModal from "./filter";
const GET_PRODUCTS = gql`
  query GetProducts {
    products {
      id
      title
      price
      rating
      thumbnail
      category
    }
  }
`;

export default function ProductsPage() {
  const router = useRouter();
  const [imageLoaded, setImageLoaded] = useState<boolean>(false);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const { loading, error, data } = useQuery(GET_PRODUCTS);

  const handleButtonClick = (id: number) => {
    router.push(`/products/${id}`);
  };

  const handleFilterApply = (categories: string[]) => {
    setSelectedCategories(categories);
  };

  const filteredProducts =
    data?.products?.filter((product: { category: string }) =>
      selectedCategories.length > 0
        ? selectedCategories.includes(product.category)
        : true
    ) || [];

  if (loading)
    return (
      <Box
        className="flex gap-2 items-center justify-center"
        sx={{ display: "flex", width: "100vw", height: "100vh" }}
      >
        <CircularProgress size={35} /> Loading..
      </Box>
    );
  if (error)
    return (
      <Box
        className="flex gap-2 items-center justify-center"
        sx={{ display: "flex", width: "100vw", height: "100vh" }}
      >
        Error: {error.message}
      </Box>
    );

  return (
    <>
      <Navbar />
      <Box className="mx-auto px-8 pt-4 flex justify-end">
        <FilterModal
          categories={data.products}
          onApplyFilter={handleFilterApply}
        />
      </Box>
      <Box className="mx-auto px-8 pt-4">
        <Box className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {filteredProducts.map((product: ProductDataPropsType) => (
            <Card sx={{ maxWidth: 345 }} key={product.id}>
              {!imageLoaded && (
                <Skeleton
                  variant="rectangular"
                  width={350}
                  height={350}
                  animation="wave"
                />
              )}
              <CardMedia
                component="img"
                height="150"
                image={`${product.thumbnail}`}
                alt={`${product.title}`}
                style={{ display: imageLoaded ? "block" : "none" }}
                onLoad={() => setImageLoaded(true)}
              />
              <CardContent>
                <Box className="flex items-end justify-between">
                  <Typography variant="body1" className="py-2">
                    {product.title}
                  </Typography>
                  <IconButton aria-label="go-to-product">
                    <OpenInNewIcon
                      onClick={() => handleButtonClick(product.id)}
                    />
                  </IconButton>
                </Box>
                <Typography variant="body2" className="text-yellow-500">
                  INR <span className="text-lg font-bold">{product.price}</span>
                </Typography>
                <Typography variant="body2">
                  Category: {product.category}
                </Typography>
                <Rating
                  name="simple-controlled"
                  value={formatRating(product.rating)}
                  readOnly
                  size="small"
                />
              </CardContent>
              <CardActions className="flex items-center justify-between">
                <Button
                  className="pb-2"
                  variant="outlined"
                  startIcon={true ? <FavoriteBorderIcon /> : <FavoriteIcon />}
                  disabled
                >
                  Wish List
                </Button>
                <Button
                  className="pb-2"
                  variant="contained"
                  endIcon={<ShoppingCartIcon />}
                  disabled
                >
                  Add to Cart
                </Button>
              </CardActions>
            </Card>
          ))}
        </Box>
      </Box>
    </>
  );
}
