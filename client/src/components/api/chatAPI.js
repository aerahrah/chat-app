const BASE_URL = "http://localhost:3500/chat";

const getToken = () => {
  return localStorage.getItem("token");
};

export const getAllChat = async (searchTermChat) => {
  try {
    console.log(searchTermChat);
    const response = await fetch(`${BASE_URL}/?chatName=${searchTermChat}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getToken()}`,
      },
    });

    return response.json();
  } catch (error) {
    throw error;
  }
};

export const getChatConversation = async (chatId) => {
  try {
    console.log(chatId);
    const response = await fetch(`${BASE_URL}/${chatId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getToken()}`,
      },
    });

    return response.json();
  } catch (error) {
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
    console.log(error);
    throw new Error(error);
  }
};

export const sendMessage = async ({ chatId, content }) => {
  try {
    console.log(chatId);
    console.log(content);
    const response = await fetch(`${BASE_URL}/${chatId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getToken()}`,
      },
      body: JSON.stringify({ content }),
    });
    console.log(response);
    return response.json();
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const editChatMemberNickname = async ({
  chatId,
  memberId,
  nickname,
}) => {
  try {
    console.log(chatId);
    console.log(nickname);
    const response = await fetch(`${BASE_URL}/${chatId}/edit-member-nickname`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getToken()}`,
      },
      body: JSON.stringify({ memberId, nickname }),
    });

    return response.json();
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const editChatName = async ({ chatId, chatName }) => {
  try {
    console.log(chatId);
    console.log(chatName);
    const response = await fetch(`${BASE_URL}/${chatId}/edit-chat-name`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getToken()}`,
      },
      body: JSON.stringify({ chatName }),
    });

    return response.json();
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const editChatImage = async ({ chatId, stateChatData }) => {
  try {
    const { chatImg, chatImgType } = stateChatData;
    console.log(stateChatData);
    console.log(chatImg, chatImgType);
    const response = await fetch(`${BASE_URL}/${chatId}/edit-chat-image`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getToken()}`,
      },
      body: JSON.stringify({ chatImg, chatImgType }),
    });

    return response.json();
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const addChatMember = async ({ chatId, userNameId }) => {
  try {
    console.log(userNameId);

    const response = await fetch(`${BASE_URL}/${chatId}/add-member`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getToken()}`,
      },
      body: JSON.stringify({ userNameId }),
    });

    return response.json();
  } catch (error) {
    console.log(error);
    throw error;
  }
};
