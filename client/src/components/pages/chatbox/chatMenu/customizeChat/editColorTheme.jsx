import useThemeStore from "../../../../state/useThemeStore";
import { useState } from "react";
import { useQueryClient, useMutation } from "react-query";
import { getBgColorTheme } from "../../../../utils/getColorTheme";
import { editColorTheme } from "../../../../api/chatAPI";
import useChatCreationStore from "../../../../state/chat/useChatCreationStore";
import DialogComponent from "../../../../utils/dialogComponent";
import BtnPanelComponent from "../../../../utils/btnPanelComponent";

const EditColorTheme = ({
  chatData,
  colorThemeSelector,
  toggleColorThemeSelector,
  setColorThemeSelector,
}) => {
  const { colorTheme, setColorTheme } = useChatCreationStore();
  const editColorThemeMutation = useMutation(editColorTheme);
  const queryClient = useQueryClient();
  const theme = useThemeStore((state) => state.theme);

  const colorThemeList = [
    "black",
    "gray",
    "red",
    "orange",
    "amber",
    "yellow",
    "lime",
    "green",
    "emerald",
    "teal",
    "cyan",
    "sky",
    "blue",
    "indigo",
    "violet",
    "purple",
    "fuchsia",
    "rose",
  ];
  const handleChangeColorTheme = async () => {
    try {
      await editColorThemeMutation.mutateAsync({
        chatId: chatData.chat._id,
        colorTheme,
      });
      queryClient.invalidateQueries("getConversation");
      setColorThemeSelector(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <DialogComponent
      openModal={colorThemeSelector}
      closeModal={toggleColorThemeSelector}
      title="Change color theme"
    >
      <div className="flex flex-col gap-8 items-center ">
        <header className="flex items-center gap-2">
          <p className="capitalize font-semibold"> selected theme:</p>
          <i
            className={`p-2 rounded-full transition duration-[300ms] ${
              theme === "light" ? "bg-neutral-200/80" : "bg-neutral-800/30"
            }`}
          >
            <p
              style={{ backgroundColor: getBgColorTheme(colorTheme) }}
              className="h-11 w-11 rounded-full"
            ></p>
          </i>
        </header>
        <ul className="flex flex-wrap items-center justify-center gap-4">
          {colorThemeList.map((color, idx) => {
            return (
              <li className="flex " key={idx}>
                <button
                  className={`p-2 rounded-full transition duration-[300ms] ${
                    theme === "light"
                      ? "bg-neutral-200/80 hover:bg-neutral-300"
                      : "bg-neutral-800/30 hover:bg-neutral-800/50"
                  }`}
                  onClick={() => setColorTheme(color)}
                >
                  <p
                    style={{ backgroundColor: getBgColorTheme(color) }}
                    className="h-11 w-11 rounded-full"
                  ></p>
                </button>
              </li>
            );
          })}
        </ul>
      </div>
      <BtnPanelComponent
        closeModal={toggleColorThemeSelector}
        handleOnClick={handleChangeColorTheme}
        label="save"
      />
    </DialogComponent>
  );
};
export default EditColorTheme;
