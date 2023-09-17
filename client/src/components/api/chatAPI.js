const BASE_URL = "http://localhost:3500/chat";

const getToken = () => {
  return localStorage.getItem("token");
};

export const getAllChat = async () => {
  try {
    const response = await fetch(`${BASE_URL}/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getToken()}`,
      },
    });
    return response.json();
  } catch (error) {
    console.log(error);
    throw error;
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
        Authorization: `Bearer ${getToken()}`,
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
        Authorization: `Bearer ${getToken()}`,
      },
      body: JSON.stringify({ userNameId }),
    });

    return response.json();
  } catch (error) {
    throw new Error(error);
  }
};
