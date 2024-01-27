const BASE_URL = import.meta.env.VITE_API_URL;

const getToken = () => {
  return localStorage.getItem("token");
};

export const getAllChat = async () => {
  try {
    const response = await fetch(`${BASE_URL}chat`, {
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
    const response = await fetch(`${BASE_URL}chat/${chatId}`, {
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
      return null;
    }
    const response = await fetch(`${BASE_URL}chat/group`, {
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
    const response = await fetch(`${BASE_URL}chat/private`, {
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
    const response = await fetch(`${BASE_URL}chat/${chatId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getToken()}`,
      },
      body: JSON.stringify({ content }),
    });

    return response.json();
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const createPinMessage = async ({ chatId, pinMessageId }) => {
  try {
    console.log(pinMessageId);
    const response = await fetch(`${BASE_URL}chat/${chatId}/add-pin-message`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getToken()}`,
      },
      body: JSON.stringify({ pinMessageId }),
    });

    return response.json();
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const removePinMessage = async ({ chatId, pinMessageId }) => {
  try {
    const response = await fetch(
      `${BASE_URL}chat/${chatId}/remove-pin-message`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getToken()}`,
        },
        body: JSON.stringify({ pinMessageId }),
      }
    );

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
    const response = await fetch(
      `${BASE_URL}chat/${chatId}/edit-member-nickname`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getToken()}`,
        },
        body: JSON.stringify({ memberId, nickname }),
      }
    );

    return response.json();
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const editChatName = async ({ chatId, chatName }) => {
  try {
    const response = await fetch(`${BASE_URL}chat/${chatId}/edit-chat-name`, {
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
    const response = await fetch(`${BASE_URL}chat/${chatId}/edit-chat-image`, {
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
    const response = await fetch(`${BASE_URL}chat/${chatId}/add-member`, {
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

export const removeChatMember = async ({ chatId, memberId }) => {
  try {
    const response = await fetch(`${BASE_URL}chat/${chatId}/remove-member`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getToken()}`,
      },
      body: JSON.stringify({ memberId }),
    });

    return response.json();
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const leaveGroupChat = async ({ chatId }) => {
  try {
    const response = await fetch(`${BASE_URL}chat/${chatId}/leave-group`, {
      method: "POST",
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

export const editColorTheme = async ({ chatId, colorTheme }) => {
  try {
    const response = await fetch(
      `${BASE_URL}chat/${chatId}/edit-chat-colortheme`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getToken()}`,
        },
        body: JSON.stringify({ colorTheme }),
      }
    );

    return response.json();
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const editChatEmoji = async ({ chatId, newEmoji }) => {
  try {
    const response = await fetch(`${BASE_URL}chat/${chatId}/edit-chat-emoji`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getToken()}`,
      },
      body: JSON.stringify({ newEmoji }),
    });

    return response.json();
  } catch (error) {
    console.log(error);
    throw error;
  }
};
