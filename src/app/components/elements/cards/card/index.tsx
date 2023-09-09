import Image from "next/image";

const Card = ({ title, image, author, subtitle }: TCard) => {
  return (
    <div className="max-w-[420px]">
      <div className="rounded-2xl h-60">
        <Image
          className="rounded-2xl h-full"
          src="https://via.placeholder.com/350x150"
          alt={title}
          width={450}
          height={400}
        />

        <div>TAG: Tech with colors</div>
      </div>

      <div className="my-6">
        <div className="flex justify-between">
          <h3>UX review presentations</h3>

          <p> ARROW LINK HERE</p>
        </div>
        <p>
          {" "}
          How do you create compelling presentations that wow your colleagues
          and impress your managers?
        </p>
        Avatar Component Here
      </div>
    </div>
  );
};

export default Card;
