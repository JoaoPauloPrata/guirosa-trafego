import React, { useEffect, useState } from 'react';
import { fetchData } from '../services/api'; // Supondo que você tenha uma função fetchData

const ReportPage = () => {
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [reportData, setReportData] = useState([]);

    const handleDateChange = (event) => {
        const { name, value } = event.target;
        if (name === 'startDate') {
            setStartDate(value);
        } else if (name === 'endDate') {
            setEndDate(value);
        }
    };

    useEffect(() => {
        const loadData = async () => {
            if (startDate && endDate) {
                try {
                    const dataResponse = await fetchData('getData', startDate, endDate);
                    setReportData(dataResponse.data);
                } catch (error) {
                    console.error('Erro ao carregar dados:', error);
                }
            }
        };

        loadData();
    }, [startDate, endDate]); // Dependências que disparam o efeito

    return (
        <div>
            <h1>Relatório</h1>
            <label>
                Data de Início:
                <input
                    type="date"
                    name="startDate"
                    value={startDate}
                    onChange={handleDateChange}
                />
            </label>
            <label>
                Data de Fim:
                <input
                    type="date"
                    name="endDate"
                    value={endDate}
                    onChange={handleDateChange}
                />
            </label>
            <div>
                {reportData.map((item, index) => (
                    <div key={index}>
                        <h2>{item["Titulo do Criativo"]}</h2>
                        <img src={item["UrlImage"]} alt={item["Titulo do Criativo"]} />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ReportPage; 