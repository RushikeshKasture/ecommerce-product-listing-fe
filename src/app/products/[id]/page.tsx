"use client";
import { gql, useQuery } from "@apollo/client";
import Image from "next/image";
import {
  Box,
  Typography,
  Rating,
  Avatar,
  CircularProgress,
} from "@mui/material";
import { formatDate, formatRating } from "@/app/utils";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import { Key, useState } from "react";

const GET_PRODUCT = gql`
  query GetProduct($id: ID!) {
    product(id: $id) {
      title
      description
      price
      rating
      images
      category
      stock
      returnPolicy
      dimensions {
        depth
        height
        width
      }
      reviews {
        comment
        date
        rating
        reviewerEmail
        reviewerName
      }
      discountPercentage
      brand
      warrantyInformation
      shippingInformation
      availabilityStatus
      minimumOrderQuantity
      tags
    }
  }
`;

export type ReviewDataType = {
  comment: string;
  date: string;
  rating: string;
  reviewerEmail: string;
  reviewerName: string;
};
export default function ProductDetail({ params }: { params: { id: string } }) {
  const { loading, error, data } = useQuery(GET_PRODUCT, {
    variables: { id: params.id },
  });

  const [imageLoaded, setImageLoaded] = useState<boolean>(false);

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

  const product = data.product;

  return (
    <Box className="container mx-auto p-8">
      <Typography
        variant="h2"
        sx={{
          fontWeight: 500,
          marginBottom: 4,
          letterSpacing: 2,
          textTransform: "uppercase",
        }}
      >
        {product.title}
      </Typography>
      <Box
        className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch"
        position="relative"
        width="100%"
        height="400px"
      >
        {!imageLoaded && (
          <Box className="flex items-center justify-center gap-2 absolute top-0 left-0 w-full h-full">
            <CircularProgress size={35} /> Loading..
          </Box>
        )}
        <Image
          src={product.images[0]}
          alt={product.title}
          width={500}
          height={500}
          className="object-contain w-full h-auto max-h-[400px]"
          onLoad={() => setImageLoaded(true)}
        />
        {imageLoaded && (
          <Box>
            <Box>
              <Stack direction="row" spacing={1}>
                {product.tags.map((tag: string) => (
                  <Chip
                    label={tag}
                    key={tag}
                    className="text-sm text-gray-500 capitalize"
                    sx={{ borderRadius: 1, paddingY: 1 }}
                  />
                ))}
              </Stack>
            </Box>
            <Typography className="text-lg text-gray-600 ">
              {product.description}
            </Typography>
            <Rating
              name="simple-controlled"
              value={formatRating(product.rating)}
              readOnly
              size="small"
            />
            <Typography className="text-sm text-gray-500 capitalize">
              Brand: {product?.brand || "NA"}
            </Typography>
            <Typography className="text-sm text-gray-500 capitalize">
              Category: {product.category}
            </Typography>
            <Typography className="text-sm text-gray-500 capitalize">
              <span className="text-yellow-500">
                Price: INR{" "}
                <span className="text-lg font-bold">{product.price}</span>{" "}
              </span>
              |{" "}
              <span className="text-green-500">
                {" "}
                Discount : {product.discountPercentage}%
              </span>
            </Typography>
            <Typography className="text-sm text-gray-500 capitalize">
              {product.returnPolicy}
            </Typography>
            <Typography className="text-sm text-gray-500 capitalize">
              Warranty: {product.warrantyInformation}
            </Typography>
            <Typography className="text-sm text-gray-500 capitalize">
              Shipping: {product.shippingInformation}
            </Typography>
            <Typography className="text-sm text-gray-500 capitalize">
              Availability: {product.availabilityStatus} ({product.stock} units
              available)
            </Typography>{" "}
            <Typography className="text-sm text-gray-500 capitalize">
              Minimum Order: {product.minimumOrderQuantity}
            </Typography>
            <Typography className="text-sm text-gray-500">
              Product Dimensions(L,W,H): {product.dimensions.depth} x{" "}
              {product.dimensions.width} x {product.dimensions.height}
            </Typography>
          </Box>
        )}
      </Box>

      <Box className="min-w-screen flex items-center justify-center py-1">
        <Box className="w-full bg-white border-t border-b border-gray-200 px-5 py-8 md:py-16 text-gray-800">
          <Box className="w-full max-w-6xl mx-auto">
            <Box className="text-center max-w-xl mx-auto">
              <h1 className="text-6xl md:text-7xl font-bold mb-5 text-gray-600">
                What people <br />
                are saying.
              </h1>
            </Box>
            <Box className="flex gap-2 flex-nowrap justify-center py-4">
              {product.reviews.map(
                (review: ReviewDataType, index: Key | null | undefined) => (
                  <Box
                    key={index}
                    className="w-full sm:w-[400px] mx-auto rounded-lg bg-gray-50 border border-gray-200 p-5 text-gray-800 font-light mb-6"
                  >
                    <Box className="w-full flex mb-4 items-center">
                      <Box className="overflow-hidden rounded-full w-10 h-10 bg-gray-50 border border-gray-200">
                        <Avatar sx={{ bgcolor: "primary" }} aria-label="avatar">
                          {review.reviewerName[0]}
                        </Avatar>
                      </Box>
                      <Box className="flex-grow pl-3">
                        <Box className="flex items-center justify-between">
                          <Typography
                            variant="body1"
                            className="font-bold uppercase text-gray-500"
                          >
                            {review.reviewerName}.
                          </Typography>
                          <Typography
                            variant="body1"
                            className="text-sm text-gray-500"
                          >
                            {formatDate(review.date)}
                          </Typography>
                        </Box>

                        <Rating
                          name="simple-controlled"
                          value={formatRating(product.rating)}
                          readOnly
                          size="small"
                        />
                      </Box>
                    </Box>
                    <Box className="w-full">
                      <p className="text-sm text-gray-500 leading-tight">
                        <span className="text-lg leading-none italic font-bold text-gray-400 mr-1">
                          &quot;
                        </span>
                        {review.comment}
                        <span className="text-lg leading-none italic font-bold text-gray-400 ml-1">
                          &quot;
                        </span>
                      </p>
                    </Box>
                  </Box>
                )
              )}
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
