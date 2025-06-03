"use client";
import { api } from "@utils/api/index";
import Image from "next/image";
import bgInterest from "@public/bg-interest.png";
import { useState } from "react";
import { IoBanOutline } from "react-icons/io5";
type ImageApiProps = {
    src: string;
    alt?: string;
    width?: number;
    height?: number;
    className?: string;
    id?: string;
    style?: {
        width?: string;
        height?: string;
        aspectRatio?: number;
    } | {};
};

function ImageApi({
    src,
    alt = "",
    className = "",
    width = 100,
    height = 100,
    id = "",
    style = {
        width: "100%",
        height: "auto",
        aspectRatio: 1
    },
}: ImageApiProps) {
    const [onError, setOnError] = useState(false);
    return (
        <>
            {onError == true ?
                <div className="bg-light d-flex justify-content-center align-items-center w-100 h-100" style={style} >
                    <IoBanOutline className="text-white w-50 h-50" />
                </div> : <Image
                    src={api.internal(`api/uploads/${src}`)}
                    alt={alt}
                    className={className}
                    width={width}
                    height={height}
                    id={id}
                    sizes="100vm"
                    style={style}
                    onError={() => setOnError(true)}
                    priority
                />
            }
        </>
    );
}
export default ImageApi;
