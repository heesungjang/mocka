import Image from "next/image";

export default function Avatar(props: {
  width: number;
  height: number;
  src: string;
}) {
  const { width, height, src } = props;

  return (
    <Image
      alt="avatar_image"
      width={width}
      height={height}
      quality={100}
      src={src}
      className="rounded-full"
    />
  );
}
