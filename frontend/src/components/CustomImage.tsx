import Image from "next/image";
type CustomImageProps = {
  src: string;
  alt?: string;
  width?: number;
  height?: number;
  className?: string;
  id?: string;
  style?:
    | {
        width?: string;
        height?: string;
      }
    | {};
  unoptimized?: boolean;
};

function CustomImage({
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
  unoptimized = false,
}: CustomImageProps) {
  return (
    <Image
      src={src}
      alt={alt}
      className={className}
      width={width}
      height={height}
      id={id}
      sizes="100vm"
      style={style}
      priority
      unoptimized={unoptimized}
    />
  );
}
export default CustomImage;
