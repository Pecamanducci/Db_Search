
document.getElementById("empresaForm").addEventListener("submit", async function (e) {
  e.preventDefault();

  const name = document.getElementById("name").value;
  const valuationDcf = parseFloat(document.getElementById("valuationDcf").value);
  const valuationMultiplo = parseFloat(document.getElementById("valuationMultiplo").value);
  const receita = parseFloat(document.getElementById("receita").value);
  const risco = document.getElementById("risco").value;
  const insight = document.getElementById("insight").value;
  const rating = parseInt(document.getElementById("rating").value);
  const approval = document.getElementById("approval").value;

  const data = {
    records: [
      {
        fields: {
          Name: name,
          "Valuation (DCF)": valuationDcf,
          "Valuation (Múltiplos)": valuationMultiplo,
          "Receita Anual": receita,
          "Risco Estratégico": risco,
          "Insight Estratégico": insight,
          "Rating (0–100)": rating,
          "Approval": approval
        }
      }
    ]
  };

  try {
    const response = await fetch("https://api.airtable.com/v0/appvccdvUXFaSh6lt/tblB2rXgUbs7VGk6t", {
      method: "POST",
      headers: {
        Authorization: "Bearer pat0R6DNyQDDP4fTv.05e3b1af7fc6dcc16dabcccaf9f0fdd45f3c5c5ade3c0bfbd2ded2b9e9b26362",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });

    if (!response.ok) throw new Error("Erro ao cadastrar.");

    alert("Empresa cadastrada com sucesso!");
    document.getElementById("empresaForm").reset();
  } catch (err) {
    alert("Erro ao cadastrar: " + err.message);
  }
});
