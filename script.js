document.getElementById("empresaForm").addEventListener("submit", async function (e) {
  e.preventDefault();

  const name = document.getElementById("name").value;
  const cnpj = parseInt(document.getElementById("cnpj").value);
  const faturamento = parseFloat(document.getElementById("faturamento").value);
  const churn = parseFloat(document.getElementById("churn").value);
  const cac = parseFloat(document.getElementById("cac").value);
  const contato = document.getElementById("contato").value;

  const data = {
    records: [
      {
        fields: {
          Name: name,
          CNPJ: cnpj,
          Faturamento: faturamento,
          Churn: churn,
          CAC: cac,
          Contato: contato,
        },
      },
    ],
  };

  try {
    const response = await fetch("https://api.airtable.com/v0/appvccdvUXFaSh6lt/tblB2rXgUbs7VGk6t", {
      method: "POST",
      headers: {
        Authorization: "Bearer pat0R6DNyQDDP4fTv.05e3b1af7fc6dcc16dabcccaf9f0fdd45f3c5c5ade3c0bfbd2ded2b9e9b26362",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) throw new Error("Erro ao cadastrar.");

    alert("Empresa cadastrada com sucesso!");
    document.getElementById("empresaForm").reset();
  } catch (err) {
    alert("Erro ao cadastrar: " + err.message);
  }
});
