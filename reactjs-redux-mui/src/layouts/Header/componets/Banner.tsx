import React, { useState } from "react";
import { Box, Typography, Button, IconButton } from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

interface Slide {
  image: string;
  title: string;
  points: string[];
  cta: string;
}

const slides: Slide[] = [
  {
    image:
      "https://270349907.e.cdneverest.net/fast/filters:format(webp)/admin-api.vuanem.com/api/file/download/18f798a4-7e2c-4622-a720-89b7868d471f", // Replace with your image URLs
    title: "Nệm Bông Chuẩn Giấc Ngủ Chuẩn",
    points: [
      "Sợi bông nhập khẩu Hàn Quốc",
      "Hỗ trợ nâng đỡ, bảo vệ cột sống",
      "An toàn, kháng khuẩn tối ưu",
    ],
    cta: "Trải Nghiệm Ngay!",
  },
  {
    image: "https://via.placeholder.com/1920x500", // Replace with your image URLs
    title: "Giấc ngủ hoàn hảo với công nghệ tiên tiến",
    points: ["Thoải mái tối ưu", "Kháng khuẩn an toàn", "Bảo vệ sức khỏe"],
    cta: "Khám Phá Ngay!",
  },
];

const Banner: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleNext = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % slides.length);
  };

  const handlePrev = () => {
    setActiveIndex((prevIndex) =>
      prevIndex === 0 ? slides.length - 1 : prevIndex - 1,
    );
  };

  return (
    <Box
      sx={{
        position: "relative",
        width: "100%",
        height: "100%",
        overflow: "hidden",
      }}
    >
      {/* Slides */}
      <Box
        sx={{
          display: "flex",
          transition: "transform 0.5s ease",
          transform: `translateX(-${activeIndex * 100}%)`,
        }}
      >
        {slides.map((slide, index) => (
          <Box
            key={index}
            sx={{
              minWidth: "100%",
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backgroundImage: `url(${slide.image})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <Box
              sx={{
                backgroundColor: "rgba(255, 255, 255, 0.8)",
                padding: "20px",
                borderRadius: "8px",
                textAlign: "center",
                maxWidth: "400px",
              }}
            >
              <Typography
                variant="h4"
                component="h1"
                sx={{ fontWeight: "bold", marginBottom: "16px" }}
              >
                {slide.title}
              </Typography>
              <ul style={{ padding: 0, listStyle: "none" }}>
                {slide.points.map((point, i) => (
                  <li key={i} style={{ marginBottom: "8px", fontSize: "16px" }}>
                    {point}
                  </li>
                ))}
              </ul>
              <Button
                variant="contained"
                color="primary"
                sx={{ textTransform: "none", marginTop: "16px" }}
              >
                {slide.cta}
              </Button>
            </Box>
          </Box>
        ))}
      </Box>

      {/* Navigation Arrows */}
      <IconButton
        onClick={handlePrev}
        sx={{
          position: "absolute",
          top: "50%",
          left: "16px",
          transform: "translateY(-50%)",
          zIndex: 10,
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          color: "white",
          "&:hover": { backgroundColor: "rgba(0, 0, 0, 0.8)" },
        }}
      >
        <ArrowBackIosNewIcon />
      </IconButton>
      <IconButton
        onClick={handleNext}
        sx={{
          position: "absolute",
          top: "50%",
          right: "16px",
          transform: "translateY(-50%)",
          zIndex: 10,
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          color: "white",
          "&:hover": { backgroundColor: "rgba(0, 0, 0, 0.8)" },
        }}
      >
        <ArrowForwardIosIcon />
      </IconButton>
    </Box>
  );
};

export default Banner;
