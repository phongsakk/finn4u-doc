import Image from "next/image";
type CustomImageProps = {
  src: string;
  alt?: string;
  width?: number;
  height?: number;
  className?: string;
  style?: {
    width?: string;
    height?: string;
  };
};

function CustomImage({
  src,
  alt = "",
  className = "",
  width = 100,
  height = 100,
  style = {
    width: "100%",
    height: "auto",
  },
}: CustomImageProps) {
  return (
    <Image
      src={src}
      alt={alt}
      className={className}
      width={width}
      height={height}
      sizes="100vm"
      style={style}
      priority
    />
  );
}
export default CustomImage;
