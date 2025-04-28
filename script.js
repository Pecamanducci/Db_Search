const airtableEndpoint = "https://api.airtable.com/v0/appvccdvUXFaSh6lt/tblB2rXgUbs7VGk6t/";
const airtableKey = "pat0R6DNyQDDP4fTv.05e3b1af7fc6dcc16dabcccaf9f0fdd45f3c5c5ade3c0bfbd2ded2b9e9b26362";

document.getElementById("empresaForm").addEventListener("submit", async function (e) {
  e.preventDefault();

  const data = {
    records: [
      {
        fields: {
          Name: document.getElementById("name").value,
          CNPJ: parseInt(document.getElementById("cnpj").value),
          Faturamento: parseFloat(document.getElementById("faturamento").value),
          Churn: parseFloat(document.getElementById("churn").value),
          CAC: parseFloat(document.getElementById("cac").value),
          Contato: document.getElementById("contato").value,
          "Valuation (DCF)": parseFloat(document.getElementById("valuationDcf").value),
          "Valuation (Múltiplos)": parseFloat(document.getElementById("valuationMultiplo").value),
          "Receita Anual": parseFloat(document.getElementById("receitaAnual").value),
          "Margem EBITDA (%)": parseFloat(document.getElementById("margemEbitda").value),
          "Margem Líquida (%)": parseFloat(document.getElementById("margemLiquida").value),
          "Crescimento Receita (%)": parseFloat(document.getElementById("crescimentoReceita").value),
          "Risco Estratégico": document.getElementById("riscoEstrategico").value,
          "Insight Estratégico": document.getElementById("insightEstrategico").value,
          Rating: parseInt(document.getElementById("rating").value),
          Approval: document.getElementById("approval").value
        },
      },
    ],
  };

  try {
    const response = await fetch(airtableEndpoint, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${airtableKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) throw new Error("Erro ao cadastrar.");

    alert("Empresa cadastrada com sucesso!");
    document.getElementById("empresaForm").reset();
    loadEmpresas();
  } catch (err) {
    alert("Erro ao cadastrar: " + err.message);
  }
});

async function loadEmpresas() {
  try {
    const response = await fetch(airtableEndpoint, {
      headers: {
        Authorization: `Bearer ${airtableKey}`,
      },
    });

    if (!response.ok) throw new Error("Erro ao carregar empresas.");

    const data = await response.json();
    const tableBody = document.getElementById("empresasTableBody");
    if (!tableBody) return;

    tableBody.innerHTML = "";

    data.records.forEach((record) => {
      const rating = record.fields.Rating || 0;
      let scoreInvestimento = "";
      if (rating >= 80) {
        scoreInvestimento = "Alta Viabilidade";
      } else if (rating >= 60) {
        scoreInvestimento = "Média Viabilidade";
      } else {
        scoreInvestimento = "Baixa Viabilidade";
      }

      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${record.fields.Name || ""}</td>
        <td>${record.fields.CNPJ || ""}</td>
        <td>${record.fields.Faturamento || ""}</td>
        <td>${record.fields.Churn || ""}</td>
        <td>${record.fields.CAC || ""}</td>
        <td>${record.fields.Contato || ""}</td>
        <td>${record.fields["Valuation (DCF)"] || ""}</td>
        <td>${record.fields["Valuation (Múltiplos)"] || ""}</td>
        <td>${record.fields["Receita Anual"] || ""}</td>
        <td>${rating}</td>
        <td>${record.fields.Approval || ""}</td>
        <td><strong>${scoreInvestimento}</strong></td>
      `;
      tableBody.appendChild(row);
    });
  } catch (err) {
    console.error("Erro ao carregar tabela:", err.message);
  }
}

window.onload = loadEmpresas;
