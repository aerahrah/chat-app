const BASE_URL = "http://localhost:3500/auth";

export const signUp = async (userInfo) => {
  console.log(userInfo.username, userInfo.password);
  const { username, password } = userInfo;
  const response = await fetch(`${BASE_URL}/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });
  if (!response.ok) {
    throw new Error("Sign-up failed");
  }
  return response.json();
};

export const signIn = async (userInfo) => {
  const { username, password } = userInfo;
  const response = await fetch(`${BASE_URL}/signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password }),
  });
  if (!response.ok) {
    throw new Error("Sign-in failed");
  }
  return response.json();
};

export const getAllUsers = async (userName) => {
  console.log(userName);
  try {
    if (!userName) {
      return [];
    }

    const url = `${BASE_URL}?name=${encodeURIComponent(userName)}`;

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
