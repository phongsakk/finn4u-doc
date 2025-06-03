import Image from "next/image";

export const IconCusttom = ({
  src,
  width = 25,
  height = 25,
}: {
  src: string;
  width?: number;
  height?: number;
}) => {
  return (
    <div className="pe-1">
      <Image
        src={src}
        width={width}
        height={height}
        sizes="100vm"
        alt=""
        style={{ aspectRatio: 1 }}
        priority
      />
    </div>
  );
};
