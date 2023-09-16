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
export const createGroupChat = async (chatName) => {
  try {
    if (!chatName) {
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
    return response.json();
  } catch (error) {
    throw new Error(error);
  }
};

export const createPrivateChat = async (userNameId) => {
  try {
    console.log(userNameId);
    const response = await fetch(`${BASE_URL}/private`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${TOKEN}`,
      },
      body: JSON.stringify({ userNameId }),
    });

    return response.json();
  } catch (error) {
    throw new Error(error);
  }
};
