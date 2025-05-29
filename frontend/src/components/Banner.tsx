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
      {[...Array(5)].map((_, i) => (
        <SplideSlide key={i}>
          <CustomImage
            src={`/banner${i + 1}.png`}
            alt="banner-home-emp"
            key={i}
            style={{aspectRatio:1.99,height:"auto"}}
          />
        </SplideSlide>
      ))}
    </Splide>
  );
}
export default Banner;
