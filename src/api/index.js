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
    const response = await fetch(`${url}/user/signup`, {
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
    const response = await fetch(`${url}/user/login`, {
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
    const response = await fetch(`${url}/user/logout`, {
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
    const response = await fetch(`${url}/misc/username-exists/${username}`);
    return await response.json();
  } catch (error) {
    console.error(error);
  }
};

export const allUsers = async () => {
  try {
    const response = await fetch(`${url}/misc/all-users`);
    return await response.json();
  } catch (error) {
    console.error(error);
  }
};

export const connect = async (userId) => {
  try {
    const response = await fetch(`${url}/socket/connect/${userId}`, {
      method: "POST",
      credentials: "include",
    });
    return await response.json();
  } catch (error) {
    console.error(error);
  }
};
