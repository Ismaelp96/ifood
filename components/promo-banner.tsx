/* eslint-disable jsx-a11y/alt-text */
import Image, { ImageProps } from "next/image";

export default function PromoBanner(props: ImageProps) {
  return (
    <div className="pt-6">
      <Image
        width={0}
        height={0}
        sizes="100vw"
        quality={100}
        className="h-auto w-full object-contain"
        {...props}
      />
    </div>
  );
}
