import { api } from "@utils/api/index";
import Image from "next/image";
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
    },
}: ImageApiProps) {
    return (
        <Image
            src={api.internal(`api/uploads/${src}`)}
            alt={alt}
            className={className}
            width={width}
            height={height}
            id={id}
            sizes="100vm"
            style={style}
            priority
        />
    );
}
export default ImageApi;
