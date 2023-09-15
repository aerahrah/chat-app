const BASE_URL = "http://localhost:3500/chat";
const TOKEN = localStorage.getItem("token");
export const getAllChat = async () => {
  try {
    const response = await fetch(`${BASE_URL}/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${TOKEN}`,
      },
    });
    return response.json();
  } catch (error) {
    console.log(error);
  }
};
export const createMessage = async (chatName) => {
  try {
    if (chatName === "") {
      console.log("No chat name");
      return null;
    }
    const response = await fetch(`${BASE_URL}/group`, {
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
