import { Seminar } from '../models/studentProcess';
import { convertSeminarToGraduationProcess, creationProcess } from '../helper/process';
import { InitGraduationProcess } from './models/GraduationProcess';
import apiClient from './apiInstance';

const getProcess = async () => {
  try {
    const response = await apiClient.get('graduation');
    return response.data;
  } catch (error) {
    console.error('Error al obtener los procesos:', error);
    throw error;
  }
};

const updateProcess = async (seminar: Seminar) => {
  try {
    const graduation = convertSeminarToGraduationProcess(seminar);
    const response = await apiClient.put(`graduation/${seminar.id}`, graduation);
    return response.data;
  } catch (error) {
    console.error('Error al obtener los procesos:', error);
    throw error;
  }
};

const getStudentById = async (studentId: number) => {
  try {
    const response = await apiClient.get(`graduation/${studentId}`);
    return response.data;
  } catch (error) {
    console.error('Error al obtener los procesos:', error);
    throw error;
  }
};

const createGraduationProcess = async (seminar: InitGraduationProcess) => {
  try {
    const graduation = creationProcess(seminar);

    const response = await apiClient.post(`graduation`, graduation);
    if (response.status === 201 && response.data) {
      return response.data;
    }
    throw new Error('Unexpected response from the server');
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('Error creating graduation process:', error);
    }
    throw error;
  }
};

export { getProcess, getStudentById, updateProcess, createGraduationProcess };
