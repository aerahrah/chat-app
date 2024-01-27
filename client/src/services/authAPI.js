const BASE_URL = import.meta.env.VITE_API_URL;

const getToken = () => {
  return localStorage.getItem("token");
};

export const signUp = async (userInfo) => {
  try {
    const { email, username, password, firstName, lastName } = userInfo;

    const response = await fetch(`${BASE_URL}auth/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, username, password, firstName, lastName }),
    });

    if (!response.ok) {
      const errorResponse = await response.json();
      throw `${errorResponse.message}`;
    }

    return response.json();
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const signIn = async (userInfo) => {
  try {
    const { identifier, password } = userInfo;
    const response = await fetch(`${BASE_URL}auth/signin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ identifier, password }),
    });

    if (!response.ok) {
      const errorResponse = await response.json();
      throw `${errorResponse.message}`;
    }
    return response.json();
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getAllUsers = async (userName) => {
  try {
    if (!userName) {
      return [];
    }

    const url = `${BASE_URL}auth?name=${encodeURIComponent(userName)}`;

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.json();
  } catch (error) {
    console.log(error);
  }
};

export const getUserProfile = async () => {
  try {
    const url = `${BASE_URL}auth/user`;

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getToken()}`,
      },
    });

    return response.json();
  } catch (error) {
    console.log(error);
  }
};

export const updateUserInfo = async (userInfo) => {
  try {
    const { username, email, firstName, lastName } = userInfo;
    const url = `${BASE_URL}auth/user/update-info`;

    const response = await fetch(url, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getToken()}`,
      },
      body: JSON.stringify({
        username,
        email,
        firstName,
        lastName,
      }),
    });

    if (!response.ok) {
      const errorResponse = await response.json();
      throw `${errorResponse.message}`;
    }

    return response.json();
  } catch (error) {
    throw error;
  }
};

export const updateUserImage = async (userInfo) => {
  try {
    const { userImg, userImgType } = userInfo;
    const url = `${BASE_URL}auth/user/update-userimg`;

    const response = await fetch(url, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getToken()}`,
      },
      body: JSON.stringify({
        userImg,
        userImgType,
      }),
    });

    if (!response.ok) {
      const errorResponse = await response.json();
      throw `${errorResponse.message}`;
    }

    return response.json();
  } catch (error) {
    throw error;
  }
};

export const updateUserPassword = async (userInfo) => {
  try {
    const { currentPassword, newPassword, confirmPassword } = userInfo;
    const url = `${BASE_URL}auth/user/update-password`;

    const response = await fetch(url, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getToken()}`,
      },
      body: JSON.stringify({
        currentPassword,
        newPassword,
        confirmPassword,
      }),
    });

    if (!response.ok) {
      const errorResponse = await response.json();
      throw `${errorResponse.message}`;
    }

    return response.json();
  } catch (error) {
    throw error;
  }
};
