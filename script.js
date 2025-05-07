const tableBody = document.getElementById("table-body");

const API_KEY = "keyXXXXXXXXXXXXXXXX";  // substitua com sua key real
const BASE_ID = "appvccdvUXFaSh6lt";
const TABLE_NAME = "Due Diligence";

fetch(`https://api.airtable.com/v0/${BASE_ID}/${TABLE_NAME}`, {
    headers: {
        Authorization: `Bearer ${API_KEY}`
    }
})
.then(response => response.json())
.then(data => {
    const records = data.records;
    records.forEach(record => {
        const fields = record.fields;
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${fields.Empresa || ""}</td>
            <td>${fields["Tipo de DD"] || ""}</td>
            <td>${fields["Item Avaliado"] || ""}</td>
            <td>${fields.Status || ""}</td>
            <td>${fields["Risco (0-100)"] || ""}</td>
            <td>${fields["Insight Estratégico"] || ""}</td>
            <td>${fields.Rating || ""}</td>
            <td>${fields.Approval || ""}</td>
        `;
        tableBody.appendChild(row);
    });
})
.catch(error => {
    console.error("Erro ao buscar dados:", error);
});
