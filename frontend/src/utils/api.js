import axios from 'axios';

const API_BASE_URL = 'https://survey-backend-ktjp.onrender.com/api';

export const submitUserInfo = async (userData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/survey/user`, userData);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

export const submitSurveyResponse = async (surveyData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/survey/submit`, surveyData);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

export const getUserData = async (userId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/survey/user/${userId}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

export const getSurveyResponse = async (responseId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/survey/response/${responseId}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};
