import { ThemeSwitcher } from "../../theme/button/toggle-button";
const NavigationBar = () => {
  return (
    <nav className="p-6 dark:bg-black bg-white shadow-lg shadow-black border dark:border-none">
      NavigationBar
      <ThemeSwitcher />
    </nav>
  );
};

export default NavigationBar;
