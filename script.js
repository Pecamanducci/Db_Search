
document.addEventListener("DOMContentLoaded", function () {
    const API_KEY = "pat0R6DNyQDDP4fTv.05e3b1af7fc6dcc16dabcccaf9f0fdd45f3c5c5ade3c0bfbd2ded2b9e9b26362";
    const BASE_ID = "appvccdvUXFaSh6lt";
    const TABLE_NAME = "Db_Search";
    const url = `https://api.airtable.com/v0/${BASE_ID}/${TABLE_NAME}`;

    fetch(url, {
        headers: {
            Authorization: `Bearer ${API_KEY}`
        }
    })
    .then(response => response.json())
    .then(data => {
        const tbody = document.querySelector("#empresas-table tbody");
        data.records.forEach(record => {
            const f = record.fields;
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${f.Name || ''}</td>
                <td>${f["Valuation (DCF)"] || ''}</td>
                <td>${f["Valuation (Múltiplos)"] || ''}</td>
                <td>${f["Receita Anual"] || ''}</td>
                <td>${f["Margem EBITDA (%)"] || ''}</td>
                <td>${f["Margem Líquida (%)"] || ''}</td>
                <td>${f["Crescimento Receita (%)"] || ''}</td>
                <td>${f["Churn (%)"] || ''}</td>
                <td>${f["Risco Estratégico"] || ''}</td>
                <td>${f["Insight Estratégico"] || ''}</td>
                <td>${f["Rating"] || ''}</td>
                <td>${f["Approval"] || ''}</td>
            `;
            tbody.appendChild(row);
        });
    })
    .catch(error => console.error("Erro ao buscar dados:", error));
});
