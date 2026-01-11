const API_BASE_URL = "http://localhost:5000/api";

export const signupUser = async (userData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    const data = await response.json();
    return { success: response.ok, data };
  } catch (error) {
    return { success: false, data: { message: error.message } };
  }
};
