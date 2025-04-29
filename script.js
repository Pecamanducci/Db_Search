const airtableEndpoint = "https://api.airtable.com/v0/appvccdvUXFaSh6lt/tblB2rXgUbs7VGk6t/";
const airtableKey = "pat0R6DNyQDDP4fTv.05e3b1af7fc6dcc16dabcccaf9f0fdd45f3c5c5ade3c0bfbd2ded2b9e9b26362";

document.getElementById("empresaForm").addEventListener("submit", async function (e) {
  e.preventDefault();
  const ratingValue = parseInt(document.getElementById("rating").value);
  let approval = "Não Aprovado";
  if (ratingValue >= 80) approval = "Aprovado";
  else if (ratingValue >= 60) approval = "Em Avaliação";

  const data = {
    records: [{
      fields: {
        Name: document.getElementById("name").value,
        "Valuation (DCF)": parseFloat(document.getElementById("valuationDcf").value),
        "Valuation (Múltiplos)": parseFloat(document.getElementById("valuationMultiplo").value),
        "Receita Anual": parseFloat(document.getElementById("receitaAnual").value),
        "Margem EBITDA (%)": parseFloat(document.getElementById("margemEbitda").value),
        "Margem Líquida (%)": parseFloat(document.getElementById("margemLiquida").value),
        "Crescimento Receita (%)": parseFloat(document.getElementById("crescimentoReceita").value),
        "Churn": parseFloat(document.getElementById("churn").value),
        "Risco Estratégico": document.getElementById("riscoEstrategico").value,
        "Insight Estratégico": document.getElementById("insightEstrategico").value,
        Rating: ratingValue,
        Approval: approval
      }
    }]
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
      headers: { Authorization: `Bearer ${airtableKey}` },
    });
    const data = await response.json();
    const tableBody = document.getElementById("empresasTableBody");
    tableBody.innerHTML = "";
    data.records.forEach((record) => {
      const rating = record.fields.Rating || 0;
      let scoreInvestimento = rating >= 80 ? "Alta Viabilidade" : rating >= 60 ? "Média Viabilidade" : "Baixa Viabilidade";
      const row = document.createElement("tr");
      row.innerHTML = `<td>${record.fields.Name || ""}</td><td>${record.fields["Valuation (DCF)"] || ""}</td><td>${record.fields["Valuation (Múltiplos)"] || ""}</td><td>${record.fields["Receita Anual"] || ""}</td><td>${record.fields["Margem EBITDA (%)"] || ""}</td><td>${record.fields["Margem Líquida (%)"] || ""}</td><td>${record.fields["Crescimento Receita (%)"] || ""}</td><td>${record.fields.Churn || ""}</td><td>${rating}</td><td>${record.fields.Approval || ""}</td><td><strong>${scoreInvestimento}</strong></td>`;
      tableBody.appendChild(row);
    });
  } catch (err) {
    console.error("Erro ao carregar empresas:", err.message);
  }
}
window.onload = loadEmpresas;