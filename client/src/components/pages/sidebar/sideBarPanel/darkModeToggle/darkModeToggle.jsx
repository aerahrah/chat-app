import { FaSun, FaMoon } from "react-icons/fa";
import useThemeStore from "../../../../state/useThemeStore";
const DarkModeToggle = () => {
  const { theme, toggleTheme } = useThemeStore();
  return (
    <div>
      <button
        className="bg-neutral-200/40 hover:bg-neutral-200 rounded-full dark:bg-neutral-700/10 dark:hover:bg-neutral-700/40 p-2 transition duration-[300ms] h-10 w-10"
        onClick={toggleTheme}
      >
        {theme === "light" ? (
          <FaMoon className="h-6 w-6" />
        ) : (
          <FaSun className="h-6 w-6" />
        )}
      </button>
    </div>
  );
};
export default DarkModeToggle;
