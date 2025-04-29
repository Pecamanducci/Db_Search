
const airtableEndpoint = "https://api.airtable.com/v0/appvccdvUXFaSh6lt/tblB2rXgUbs7VGk6t/";
const airtableKey = "pat0R6DNyQDDP4fTv.05e3b1af7fc6dcc16dabcccaf9f0fdd45f3c5c5ade3c0bfbd2ded2b9e9b26362";

document.getElementById("empresaForm").addEventListener("submit", async function (e) {
  e.preventDefault();

  const name = document.getElementById("name").value;
  const valuationDcf = parseFloat(document.getElementById("valuationDcf").value);
  const valuationMultiplo = parseFloat(document.getElementById("valuationMultiplo").value);
  const receitaAnual = parseFloat(document.getElementById("receitaAnual").value);
  const margemEbitda = parseFloat(document.getElementById("margemEbitda").value);
  const margemLiquida = parseFloat(document.getElementById("margemLiquida").value);
  const crescimento = parseFloat(document.getElementById("crescimentoReceita").value);
  const churn = parseFloat(document.getElementById("churn").value);
  const risco = parseFloat(document.getElementById("risco").value);
  const insight = parseFloat(document.getElementById("insight").value);

  let rating = (margemEbitda * 0.2) + (margemLiquida * 0.1) + (crescimento * 0.2) + ((100 - churn) * 0.1) + (risco * 0.2) + (insight * 0.2);
  rating = Math.min(100, Math.max(0, Math.round(rating)));

  let approval = "Não Aprovado";
  if (rating >= 80) approval = "Aprovado";
  else if (rating >= 60) approval = "Em Avaliação";

  const data = {
    records: [{
      fields: {
        Name: name,
        "Valuation (DCF)": valuationDcf,
        "Valuation (Múltiplos)": valuationMultiplo,
        "Receita Anual": receitaAnual,
        "Margem EBITDA (%)": margemEbitda,
        "Margem Líquida (%)": margemLiquida,
        "Crescimento Receita (%)": crescimento,
        "Churn": churn,
        "Risco Estratégico": risco,
        "Insight Estratégico": insight,
        Rating: rating,
        Approval: approval
      }
    }]
  };

  try {
    const response = await fetch(airtableEndpoint, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${airtableKey}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
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
      headers: { Authorization: `Bearer ${airtableKey}` }
    });
    const data = await response.json();
    const tableBody = document.getElementById("empresasTableBody");
    tableBody.innerHTML = "";
    data.records.forEach((record) => {
      const f = record.fields;
      const rating = f.Rating || 0;
      let scoreInvestimento = rating >= 80 ? "Alta Viabilidade" : rating >= 60 ? "Média Viabilidade" : "Baixa Viabilidade";
      const row = document.createElement("tr");
      row.innerHTML = `<td>${f.Name || ""}</td><td>${f["Valuation (DCF)"] || ""}</td><td>${f["Valuation (Múltiplos)"] || ""}</td><td>${f["Receita Anual"] || ""}</td><td>${f["Margem EBITDA (%)"] || ""}</td><td>${f["Margem Líquida (%)"] || ""}</td><td>${f["Crescimento Receita (%)"] || ""}</td><td>${f["Churn"] || ""}</td><td>${rating}</td><td>${f.Approval || ""}</td><td><strong>${scoreInvestimento}</strong></td>`;
      tableBody.appendChild(row);
    });
  } catch (err) {
    console.error("Erro ao carregar empresas:", err.message);
  }
}
window.onload = loadEmpresas;
