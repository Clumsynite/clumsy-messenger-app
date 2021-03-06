// Test
// export const url = "http://localhost:5000";
// Deploy
export const url = "https://clumsy-messenger.herokuapp.com";

export const ping = async () => {
  try {
    return await fetch(`${url}`);
  } catch (error) {
    console.error(error);
  }
};

export const signup = async (user) => {
  try {
    const response = await fetch(`${url}/users`, {
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

export const updateProfile = async (user) => {
  try {
    const response = await fetch(`${url}/users`, {
      method: "PUT",
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
    const response = await fetch(`${url}/utils/check-username/${username}`);
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

export const connectedUsers = async () => {
  try {
    const response = await fetch(`${url}/utils/users-connected`, {
      credentials: "include",
    });
    return await response.json();
  } catch (error) {
    console.error(error);
  }
};

export const otherUsers = async () => {
  try {
    const response = await fetch(`${url}/utils/users-other`, {
      credentials: "include",
    });
    return await response.json();
  } catch (error) {
    console.error(error);
  }
};

export const newMessage = async (message) => {
  try {
    const response = await fetch(`${url}/message/new`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(message),
    });
    return await response.json();
  } catch (error) {
    console.error(error);
  }
};

export const readMessages = async () => {
  try {
    const response = await fetch(`${url}/message/`, {
      credentials: "include",
    });
    return await response.json();
  } catch (error) {
    console.error(error);
  }
};

export const deleteMessage = async (id) => {
  try {
    const response = await fetch(`${url}/message/${id}`, {
      method: "DELETE",
      credentials: "include",
    });
    const data = await response.json();
    return data;
  } catch (error) {
    return error;
  }
};
