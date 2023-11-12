import useThemeStore from "../state/useThemeStore";

const BtnPanelComponent = ({ closeModal, handleOnClick, label }) => {
  const theme = useThemeStore((state) => state.theme);
  return (
    <div className="flex justify-between font-semibold gap-3 mt-6">
      <button
        className={`${
          theme === "light"
            ? "bg-neutral-200/70 text-neutral-700 hover:bg-neutral-200"
            : "bg-neutral-600/50 hover:bg-neutral-600/80 "
        }  w-full rounded-md  p-1.5 capitalize`}
        onClick={closeModal}
      >
        Cancel
      </button>
      <button
        className="w-full bg-blue-500 text-blue-50 rounded-md p-1.5 hover:bg-blue-500/80 capitalize"
        onClick={handleOnClick}
      >
        {label}
      </button>
    </div>
  );
};

export default BtnPanelComponent;
