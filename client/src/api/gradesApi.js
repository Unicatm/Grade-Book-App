import apiClient from "./axios";

export const getStudentGrades = async () => {
  try {
    const response = await apiClient.get("/grades");
    return response.data;
  } catch (error) {
    throw error;
  }
};
