const API_URL = "http://localhost:5001/api/quiz"; // Updated to port 5001

export const getQuestions = async () => {
  try {
    const response = await fetch(`${API_URL}/questions`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    if (!response.ok) throw new Error("Failed to fetch questions");
    return response.json();
  } catch (error) {
    console.error("Error fetching questions:", error);
    return { questions: [] };
  }
};

export const submitAnswer = async (answerData, token) => {
  try {
    const response = await fetch(`${API_URL}/submit`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(answerData),
    });
    return response.json();
  } catch (error) {
    console.error("Error submitting answer:", error);
    return { success: false };
  }
};

