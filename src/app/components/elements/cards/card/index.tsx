import Image from "next/image";

const Card = ({ title, image, author, subtitle }: TCard) => {
  return (
    <div className="max-w-[420px]">
      <div className="rounded-2xl h-60">
        <Image
          className="rounded-2xl h-full"
          src={image}
          alt={title}
          width={450}
          height={400}
        />

        <div>TAG: Tech with colors</div>
      </div>

      <div className="my-6">
        <div className="flex justify-between">
          <h3>{title}</h3>

          <p className="text-red-500"> ARROW LINK HERE</p>
        </div>
        <p> {subtitle}</p>
        Avatar Component Here
      </div>
    </div>
  );
};

export default Card;
