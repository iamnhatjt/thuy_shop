import React, { useState } from "react";
import { Box, IconButton } from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { useGetListBannersQuery } from "store/banner/bannerApiSlice";
import Loading from "../../../../layouts/sharedComponents/Loading";
import { IResponsePagination } from "../../../../constant/type";

const Banner: React.FC = () => {
  const { data, isFetching } = useGetListBannersQuery(undefined);
  const listSlides = data;
  const [activeIndex, setActiveIndex] = useState(0);

  const handleNext = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % listSlides.data.length);
  };

  const handlePrev = () => {
    setActiveIndex((prevIndex) =>
      prevIndex === 0 ? listSlides.data.length - 1 : prevIndex - 1,
    );
  };

  if (isFetching) {
    return <Loading />;
  }
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
        {listSlides.data?.map((slide: any, index: number) => (
          <Box
            key={index}
            sx={{
              minWidth: "100%",
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backgroundPosition: "center",
            }}
          >
            <img
              src={slide.url}
              alt={slide.fileName}
              loading="lazy"
              style={{ minWidth: "100%", height: "30vh", objectFit: "cover" }}
            />
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
