import Image from "next/image";
import Button from "../elements/button";

const Hero = ({
  title,
  description,
  image,
}: {
  title: string;
  description: string;
  image: any;
}) => {
  const normalizeCFImage = (image: any) => {
    if (image) {
      return {
        src: image?.fields.file.url,
        alt: image?.fields.description,
        width: image?.fields.file.details.image?.width,
        height: image?.fields.file.details.image.height,
      };
    }
  };
  const IMAGE =
    normalizeCFImage(image)?.src && `https:${normalizeCFImage(image)?.src}`;

  const PLACEHOLDER = normalizeCFImage(image)?.alt;
  const HEIGHT = normalizeCFImage(image)?.height - 5900;
  const WIDTH = normalizeCFImage(image)?.width - 5000;
  console.log(WIDTH);

  return (
    <section className="flex justify-between flex-col md:flex-row">
      <div className=" w-full md:w-1/2 flex flex-col gap-10 justify-center">
        <h1 className="text-5xl">{title}</h1>

        <h3 className="text-2xl">{description}</h3>

        <Button className="border w-1/5">CTA</Button>
      </div>
      <div className="  w-full md:w-1/2">
        <Image src={IMAGE} width={650} height={400} alt={PLACEHOLDER} />
      </div>
    </section>
  );
};

export default Hero;
