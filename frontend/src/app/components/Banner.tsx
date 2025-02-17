"use client";
import React from 'react';
import Image from 'next/image';
import {Splide, SplideSlide} from "@splidejs/react-splide";
import '@splidejs/react-splide/css';

function Banner() {
	return (
		<Splide options={
				{
					type: "loop",
                    perPage : 1,
                    autoplay : true,
                    interval: 3000,
                    arrows: false,
                    pagination: true
				}
			}
			aria-label="banner">
			{
			[...Array(3)].map((_, i) => (
				<SplideSlide key={i}>
					<Image src="/banner-home-emp.png"
						alt={
							`Image ${i}`
						}
						width={100}
						height={100}
						sizes="100vw"
						style={
							{
								width: "100%",
								height: "auto"
							}
						}
						priority/>
				</SplideSlide>
			))
		} </Splide>
	)
}
export default Banner
