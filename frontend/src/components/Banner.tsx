"use client";
import React from "react";
import CustomImage from "./CustomImage";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import banner from "@public/banner-home-emp.png";
import Image from "next/image";

function Banner() {
  return (
    <Splide
      options={{
        type: "loop",
        perPage: 1,
        autoplay: true,
        interval: 3000,
        arrows: false,
        pagination: true,
      }}
      aria-label="banner"
    >
      {[...Array(3)].map((_, i) => (
        <SplideSlide key={i}>
          <CustomImage
            src="/banner-home-emp.png"
            alt="banner-home-emp"
            key={i}
          />
        </SplideSlide>
      ))}{" "}
    </Splide>
  );
}
export default Banner;
