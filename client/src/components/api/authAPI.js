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
