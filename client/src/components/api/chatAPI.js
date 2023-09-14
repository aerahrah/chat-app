const BASE_URL = "http://localhost:3500/chat";
const TOKEN = localStorage.getItem("token");
export const createMessage = async ({ chatType, chatName }) => {
  try {
    console.log(TOKEN);
    const response = await fetch(`${BASE_URL}/${chatType}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${TOKEN}`,
      },
      body: JSON.stringify({ chatName }),
    });
    return response;
  } catch (error) {
    throw new Error(error);
  }
};
