import React, { useState } from 'react';
import '../styles/Dashboard.css';

const Dashboard = ({ onSelectClient }) => {
  const [clients, setClients] = useState([]);
  const [isAddingClient, setIsAddingClient] = useState(false);
  const [newClient, setNewClient] = useState({
    name: '',
    logo: '',
    apiUrl: ''
  });

  const handleAddClient = (e) => {
    e.preventDefault();
    setClients([...clients, { ...newClient, id: Date.now() }]);
    setNewClient({ name: '', logo: '', apiUrl: '' });
    setIsAddingClient(false);
  };

  const handleDeleteClient = (id) => {
    setClients(clients.filter(client => client.id !== id));
  };

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1>Gerenciamento de Clientes</h1>
        <button 
          className="add-client-button"
          onClick={() => setIsAddingClient(true)}
        >
          Adicionar Cliente
        </button>
      </header>

      {isAddingClient && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Adicionar Novo Cliente</h2>
            <form onSubmit={handleAddClient}>
              <div className="form-group">
                <label>Nome do Cliente</label>
                <input
                  type="text"
                  value={newClient.name}
                  onChange={(e) => setNewClient({...newClient, name: e.target.value})}
                  required
                />
              </div>
              <div className="form-group">
                <label>URL da Logo</label>
                <input
                  type="url"
                  value={newClient.logo}
                  onChange={(e) => setNewClient({...newClient, logo: e.target.value})}
                  required
                />
              </div>
              <div className="form-group">
                <label>URL da API</label>
                <input
                  type="url"
                  value={newClient.apiUrl}
                  onChange={(e) => setNewClient({...newClient, apiUrl: e.target.value})}
                  required
                />
              </div>
              <div className="modal-buttons">
                <button type="submit">Salvar</button>
                <button 
                  type="button" 
                  onClick={() => setIsAddingClient(false)}
                >
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="clients-grid">
        {clients.map(client => (
          <div key={client.id} className="client-card">
            <img src={client.logo} alt={client.name} className="client-logo" />
            <h3>{client.name}</h3>
            <div className="client-actions">
              <button onClick={() => onSelectClient(client)}>
                Ver Relatório
              </button>
              <button 
                className="delete-button"
                onClick={() => handleDeleteClient(client.id)}
              >
                Excluir
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard; 