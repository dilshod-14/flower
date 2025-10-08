import React from "react";
import { Box, Container, Stack } from "@mui/material";
import { CssVarsProvider } from "@mui/joy/styles";
import Card from "@mui/joy/Card";
import CardCover from "@mui/joy/CardCover";
import CardContent from "@mui/joy/CardContent";
import CardOverflow from "@mui/joy/CardOverflow";
import Typography from "@mui/joy/Typography";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import { useSelector } from "react-redux";
import { createSelector } from "reselect";
import { Link } from "react-router-dom";

import { retrievePopularDishes } from "./selector";
import { Product } from "../../../lib/types/product";
import { serverApi } from "../../../lib/config";

const popularDishesRetriever = createSelector(
  retrievePopularDishes,
  (popularDishes) => ({ popularDishes })
);

export default function PopularDishes() {
  const { popularDishes } = useSelector(popularDishesRetriever);

  return (
    <div className="popular-dishes-frame">
      <Container>
        <Stack className="popular-section">
          <Box className="category-title">Popular Flowers</Box>

          <Stack className="cards-frame">
            {popularDishes.length ? (
              popularDishes.map((product: Product) => {
                const imagePath = `${serverApi}/${product.productImages[0]}`;

                return (
                  <CssVarsProvider key={product._id}>
                    <Card
                      className="card"
                      component={Link}
                      to={`/products/${product._id}`}
                      sx={{
                        cursor: "pointer",
                        width: 360,
                        height: 420,
                        overflow: "hidden",
                        position: "relative",
                        borderRadius: "lg",
                        boxShadow: "md",
                        transition: "transform .25s ease, box-shadow .25s ease",

                        // rasm va overlay uchun smooth animatsiya
                        "& img": {
                          transition: "transform .35s ease",
                          willChange: "transform"
                        },
                        "& .card-cover": {
                          // boshlang’ich holatda yengil qorayish
                          backgroundColor: "rgba(0,0,0,.25)",
                          opacity: 0,
                          transition: "opacity .25s ease"
                        },

                        // hover effekti
                        "&:hover": {
                          transform: "translateY(-6px)",
                          boxShadow: "lg",
                          "& img": { transform: "scale(1.06)" },
                          "& .card-cover": { opacity: 0.35 }
                        },

                        // optional: bosilganda yengil “press”
                        "&:active": {
                          transform: "translateY(-2px)"
                        },

                        // klaviatura bilan fokus bo‘lsa ham yaltirash
                        "&:focus-visible": {
                          outline: "2px solid",
                          outlineColor: "primary.500",
                          outlineOffset: "2px"
                        }
                      }}
                    >
                      <CardCover>
                        <img
                          src={imagePath}
                          alt={product.productName || "popular flower"}
                          loading="lazy"
                          style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover"
                          }}
                        />
                      </CardCover>

                      {/* overlay - className muhim! */}
                      <CardCover className="card-cover" />

                      <CardContent sx={{ justifyContent: "flex-end" }}>
                        <Stack direction="row" justifyContent="space-between">
                          <Typography
                            level="h2"
                            fontSize="lg"
                            textColor="#fff"
                            mb={1}
                          >
                            {product.productName}
                          </Typography>
                          <Typography
                            sx={{
                              fontWeight: "md",
                              color: "neutral.300",
                              alignItems: "center",
                              display: "flex"
                            }}
                          >
                            {product.productViews}
                            <VisibilityIcon sx={{ fontSize: 25, ml: "5px" }} />
                          </Typography>
                        </Stack>
                      </CardContent>

                      <CardOverflow
                        sx={{
                          display: "flex",
                          gap: 1.5,
                          py: 1.5,
                          px: "var(--Card-padding)",
                          borderTop: "1px solid",
                          height: "60px"
                        }}
                      >
                        <Typography
                          startDecorator={<DescriptionOutlinedIcon />}
                          textColor="neutral.300"
                        >
                          {product.productDesc}
                        </Typography>
                      </CardOverflow>
                    </Card>
                  </CssVarsProvider>
                );
              })
            ) : (
              <Box className="no-data">Popular products are not available!</Box>
            )}
          </Stack>
        </Stack>
      </Container>
    </div>
  );
}
