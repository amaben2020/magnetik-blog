import Image from "next/image";

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
  console.log(IMAGE);
  return (
    <section>
      <div>
        <h1>{title}</h1>

        <h3>{description}</h3>
        <button>CTA</button>
      </div>
      <div>
        <Image src={IMAGE} width={600} height={600} alt="ok" />
      </div>
    </section>
  );
};

export default Hero;
