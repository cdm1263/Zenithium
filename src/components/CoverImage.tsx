import NextImage from "next/image";

type Props = {
  imageSrc?: string;
  slug?: string;
};

const CoverImage = ({ imageSrc, slug }: Props) => {
  return (
    <div className="absolute inset-x-0 top-0 h-80 ">
      <NextImage
        src={imageSrc || `/postAssets/${slug}/cover.jpg`}
        alt="cover"
        fill
        className="object-cover"
      />
      <div className="absolute inset-0 bg-black opacity-40"></div>
    </div>
  );
};

export default CoverImage;
