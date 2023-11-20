import { FaGithub } from "react-icons/fa";

const Footer = () => {
  const currentYear = () => new Date().getFullYear();
  return (
    <div className="absolute bottom-0 inset-x-0 mt-4 p-4 text-lg text-neutral-700 dark:text-blue-100">
      <p className="flex justify-center items-center gap-2">
        Copyright &copy; {currentYear()}
        <a
          href="https://github.com/aerahrah"
          target="_blank"
          className="flex items-center gap-2"
        >
          aerahrah
          <FaGithub
            size="1.5rem"
            className="transition transform duration-100 hover:scale-[1.1] hover:cursor-pointer hover:rotate-[360deg]"
          />
        </a>
      </p>
    </div>
  );
};
export default Footer;
