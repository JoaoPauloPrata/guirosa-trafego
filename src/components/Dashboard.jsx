import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllClientReports, createClientReport, deleteClientReport } from '../services/api';
import '../styles/Dashboard.css';
import Loading from './Loading';
import ErrorPopup from './ErrorPopup';

const Dashboard = ({ onLogout }) => {
  const navigate = useNavigate();
  const [reports, setReports] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAddingClient, setIsAddingClient] = useState(false);
  const [error, setError] = useState('');
  const [newClient, setNewClient] = useState({
    clientName: '',
    reportName: '',
    reportGetUrl: '',
    logoFile: null
  });
  const [previewLogo, setPreviewLogo] = useState(null);

  useEffect(() => {
    loadReports();
  }, []);

  const loadReports = async () => {
    try {
      setIsLoading(true);
      const data = await getAllClientReports();
      setReports(data);
    } catch (error) {
      setError('Erro ao carregar relatórios');
      console.error('Erro ao carregar relatórios:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewClient({...newClient, logoFile: file});
      // Criar preview da imagem
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewLogo(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddClient = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    
    console.log('Dados do formulário:', newClient); // Debug

    try {
      // Validar se todos os campos necessários estão preenchidos
      if (!newClient.clientName || !newClient.reportName || !newClient.reportGetUrl || !newClient.logoFile) {
        throw new Error('Por favor, preencha todos os campos');
      }

      const response = await createClientReport(newClient);
      console.log('Resposta da API:', response); // Debug
      
      if (response) {
        await loadReports(); // Recarrega a lista de relatórios
        setNewClient({
          clientName: '',
          reportName: '',
          reportGetUrl: '',
          logoFile: null
        });
        setPreviewLogo(null);
        setIsAddingClient(false);
      } else {
        throw new Error('Erro ao criar relatório');
      }
    } catch (error) {
      console.error('Erro detalhado:', error); // Debug detalhado
      setError(error.message || 'Erro ao adicionar cliente');
    } finally {
      setIsLoading(false);
    }
  };

  const handleOpenNewTab = (report) => {
    const path = `/report/${report.id}`;
    window.open(window.location.origin + path, '_blank');
  };

  const handleDeleteClient = async (id) => {
    if (window.confirm('Tem certeza que deseja excluir este relatório?')) {
      setIsLoading(true);
      try {
        await deleteClientReport(id);
        await loadReports();
      } catch (error) {
        setError('Erro ao deletar relatório');
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleError = (message) => {
    setError(message);
  };

  const clearError = () => {
    setError('');
  };

  return (
    <div className="dashboard-container">
      {isLoading && <Loading />}
      {error && <ErrorPopup message={error} onClose={clearError} />}
      
      <nav className="top-nav">
        <div className="nav-content">
          <h1>Gerenciar Relatórios</h1>
          <div className="nav-actions">
            <button 
              className="add-client-button"
              onClick={() => setIsAddingClient(true)}
            >
              Adicionar Relatório
            </button>
            <button 
              className="logout-button"
              onClick={onLogout}
            >
              Sair
            </button>
          </div>
        </div>
      </nav>

      <div className="dashboard-content">
        {isAddingClient && (
          <div className="modal-overlay">
            <div className="modal-content">
              <h2>Adicionar Novo Relatório</h2>
              <form onSubmit={handleAddClient}>
                <div className="form-group">
                  <label>Nome do Cliente</label>
                  <input
                    type="text"
                    value={newClient.clientName}
                    onChange={(e) => setNewClient({...newClient, clientName: e.target.value})}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Nome do Relatório</label>
                  <input
                    type="text"
                    value={newClient.reportName}
                    onChange={(e) => setNewClient({...newClient, reportName: e.target.value})}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>URL do Relatório - (Link para GET do APP SCRIPTS)</label>
                  <input
                    type="url"
                    value={newClient.reportGetUrl}
                    onChange={(e) => setNewClient({...newClient, reportGetUrl: e.target.value})}
                    required
                  />
                </div>
                <div className="form-group logo-upload">
                  <label>Logo do Cliente</label>
                  <div className="logo-preview-container">
                    {previewLogo && (
                      <img 
                        src={previewLogo} 
                        alt="Preview" 
                        className="logo-preview"
                      />
                    )}
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleLogoChange}
                    className="file-input"
                    required
                  />
                </div>
                <div className="modal-buttons">
                  <button type="submit" disabled={isLoading}>
                    {isLoading ? 'Salvando...' : 'Salvar'}
                  </button>
                  <button 
                    type="button" 
                    onClick={() => setIsAddingClient(false)}
                    disabled={isLoading}
                  >
                    Cancelar
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        <div className="clients-grid">
          {reports.map(report => (
            <div key={report.id} className="client-card">
              <img 
                src={report.logoUrl || 'https://via.placeholder.com/100'} 
                alt={report.clientName} 
                className="client-logo" 
              />
              <h3>{report.clientName}</h3>
              <p className="report-name">{report.reportName}</p>
              <div className="client-actions">
                <button onClick={() => handleOpenNewTab(report)}>
                  Ver Relatório
                </button>
                <button 
                  className="delete-button"
                  onClick={() => handleDeleteClient(report.id)}
                >
                  Excluir
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 