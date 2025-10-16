import jsonClient from './jsonServerInstance';

export const getCertifications = async () => {
  const response = await jsonClient.get(`certifications/`);
  if (response.status === 200) {
    return response.data;
  } else {
    throw new Error('Failed to get certifications');
  }
};
