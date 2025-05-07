
document.getElementById("dueForm").addEventListener("submit", function(e) {
    e.preventDefault();
    const data = new FormData(e.target);
    const jsonData = {};
    data.forEach((value, key) => jsonData[key] = value);

    fetch("https://api.airtable.com/v0/appvccdvUXFaSh6lt/Due Diligence", {
        method: "POST",
        headers: {
            "Authorization": "Bearer pat0R6DNyQDDP4fTv.05e3b1af7fc6dcc16dabcccaf9f0fdd45f3c5c5ade3c0bfbd2ded2b9e9b26362",
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ fields: jsonData })
    })
    .then(response => {
        if (!response.ok) throw new Error("Erro no cadastro");
        alert("Cadastro realizado com sucesso!");
        e.target.reset();
    })
    .catch(error => {
        alert("Erro: " + error.message);
    });
});
