import Image from "next/image";
import Link from "next/link";
import { ReactNode } from "react";

const Header = ({ children, logo }: { children: ReactNode; logo: any }) => {
  console.log("Logo", logo);
  return (
    <header className="p-4 dark:bg-black bg-white shadow-lg shadow-black border dark:border-none flex justify-between items-center dark:shadow-white">
      <div>
        <Link href={logo?.link.url}>
          <Image
            src={logo?.image.url}
            alt={logo?.image.description}
            width={90}
            height={20}
          />
        </Link>
        <p className="mt-2">{logo?.link.title}</p>
      </div>
      <div>{children}</div>
    </header>
  );
};

export default Header;
