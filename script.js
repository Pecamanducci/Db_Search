
document.getElementById("ddForm").addEventListener("submit", async function (e) {
  e.preventDefault();

  const empresa = document.getElementById("empresa").value;
  const tipoDD = document.getElementById("tipoDD").value;
  const item = document.getElementById("item").value;
  const status = document.getElementById("status").value;
  const risco = parseInt(document.getElementById("risco").value);
  const insight = parseInt(document.getElementById("insight").value);

  const data = {
    records: [
      {
        fields: {
          Empresa: empresa,
          "Tipo de DD": tipoDD,
          Item: item,
          Status: status,
          Risco: risco,
          "Insight Estratégico": insight
        }
      }
    ]
  };

  try {
    const response = await fetch("https://api.airtable.com/v0/appvccdvUXFaSh6lt/tblsjtXFF6GfS8WYY", {
      method: "POST",
      headers: {
        Authorization: "Bearer pat0R6DNyQDDP4fTv.05e3b1af7fc6dcc16dabcccaf9f0fdd45f3c5c5ade3c0bfbd2ded2b9e9b26362",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) throw new Error("Erro ao cadastrar.");

    alert("Item de Due Diligence cadastrado com sucesso!");
    document.getElementById("ddForm").reset();
  } catch (err) {
    alert("Erro ao cadastrar: " + err.message);
  }
});
