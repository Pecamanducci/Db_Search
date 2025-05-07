
document.addEventListener("DOMContentLoaded", function () {
    const data = [
        {
            nome: "Agilysys", dcf: "$700M", mult: "$750M", receita: "$237M",
            ebitda: "21%", liquida: "6%", crescimento: "4%", churn: "10%",
            risco: "86", insight: "88", rating: "86", approval: "Aprovado"
        },
        {
            nome: "Alkami", dcf: "$600M", mult: "$580M", receita: "$200M",
            ebitda: "-3%", liquida: "-24%", crescimento: "7%", churn: "12%",
            risco: "72", insight: "78", rating: "72", approval: "Em Avaliação"
        },
        {
            nome: "CS Disco", dcf: "$400M", mult: "$420M", receita: "$133M",
            ebitda: "-12%", liquida: "-68%", crescimento: "2%", churn: "20%",
            risco: "58", insight: "67", rating: "43", approval: "Não Aprovado"
        }
    ];

    const tbody = document.querySelector("#empresas-table tbody");
    data.forEach(emp => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${emp.nome}</td>
            <td>${emp.dcf}</td>
            <td>${emp.mult}</td>
            <td>${emp.receita}</td>
            <td>${emp.ebitda}</td>
            <td>${emp.liquida}</td>
            <td>${emp.crescimento}</td>
            <td>${emp.churn}</td>
            <td>${emp.risco}</td>
            <td>${emp.insight}</td>
            <td>${emp.rating}</td>
            <td>${emp.approval}</td>
        `;
        tbody.appendChild(row);
    });
});
