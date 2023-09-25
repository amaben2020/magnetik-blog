import Link from "next/link";
import { ThemeSwitcher } from "../../theme/button/toggle-button";
const NavigationLinks = ({ links }: any) => {
  return (
    <nav className="flex  gap-10 items-center">
      {links.map((link: any) => (
        <ul key={link.__typename}>
          <Link href={link?.url === null ? "/" : link.url}> {link.title} </Link>
        </ul>
      ))}

      <ThemeSwitcher />
    </nav>
  );
};

export default NavigationLinks;
