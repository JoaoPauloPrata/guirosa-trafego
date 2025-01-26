import axios from 'axios';

const BASE_URL = 'https://goodash-825756149287.us-central1.run.app/api';

export const login = async (login, password) => {
  try {
    const response = await axios.post(`${BASE_URL}/auth/login`, {
      login: login,
      password: password
    }, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    });

    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
      return true;
    }

    return false;
  } catch (error) {
    console.error('Erro ao fazer login:', error);
    throw error;
  }
};

// Funções para gerenciamento de clientes
export const getClientReport = async (id) => {
  try {
    const response = await fetch(`${BASE_URL}/ClientReport/${id}`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
    });
    return await response.json();
  } catch (error) {
    console.error('Erro ao buscar relatório:', error);
    throw error;
  }
};

export const createClientReport = async (clientData) => {
  try {
    const response = await fetch(`${BASE_URL}/ClientReport`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify(clientData),
    });
    return await response.json();
  } catch (error) {
    console.error('Erro ao criar relatório:', error);
    throw error;
  }
};

export const updateClientReport = async (id, clientData) => {
  try {
    const response = await fetch(`${BASE_URL}/ClientReport/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify(clientData),
    });
    return await response.json();
  } catch (error) {
    console.error('Erro ao atualizar relatório:', error);
    throw error;
  }
};

export const deleteClientReport = async (id) => {
  try {
    const response = await fetch(`${BASE_URL}/ClientReport/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
    });
    return await response.json();
  } catch (error) {
    console.error('Erro ao deletar relatório:', error);
    throw error;
  }
};

export const fetchReportConfig = async (reportId) => {
  try {
    const response = await fetch(`${BASE_URL}/ClientReport/${reportId}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Erro ao buscar configuração do relatório:', error);
    throw error;
  }
};

export const fetchMetrics = async (reportUrl, startDate, endDate) => {
  try {
    const response = await fetch(`${reportUrl}?action=getData&startDate=${startDate}&endDate=${endDate}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Erro ao buscar métricas:', error);
    throw error;
  }
};

export const fetchCreativeUrls = async (reportUrl) => {
  try {
    const response = await fetch(`${reportUrl}?action=getUrls`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Erro ao buscar URLs dos criativos:', error);
    throw error;
  }
}; 