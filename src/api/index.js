export const url = "http://localhost:5000";

export const ping = async () => {
  try {
    const response = await fetch(`${url}`);
    return await response.json();
  } catch (error) {
    console.error(error);
  }
};

export const signup = async (user) => {
  try {
    const response = await fetch(`${url}/user`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(user),
    });
    return await response.json();
  } catch (error) {
    console.error(error);
  }
};

export const login = async (user) => {
  try {
    const response = await fetch(`${url}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(user),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    return error;
  }
};

export const logout = async () => {
  try {
    const response = await fetch(`${url}/auth/logout`, {
      method: "POST",
      credentials: "include",
    });
    const data = await response.json();
    return data;
  } catch (error) {
    return error;
  }
};

export const usernameExists = async (username) => {
  try {
    const response = await fetch(`${url}/utils/username-check/${username}`);
    return await response.json();
  } catch (error) {
    console.error(error);
  }
};

export const allUsers = async () => {
  try {
    const response = await fetch(`${url}/users`);
    return await response.json();
  } catch (error) {
    console.error(error);
  }
};

