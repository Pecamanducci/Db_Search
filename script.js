
const form = document.getElementById('cadastroForm');
const table = document.getElementById('dadosTable').querySelector('tbody');
const promptBtn = document.getElementById('promptBtn');
const exportBtn = document.getElementById('exportBtn');
const promptOutput = document.getElementById('promptOutput');


let dados = [
    {
        empresa: 'Agilysys',
        tipo: 'Financeira',
        item: 'Controle de receitas e margens',
        status: 'Concluído',
        risco: 15,
        insight: 88
    },
    {
        empresa: 'Alkami',
        tipo: 'Operacional',
        item: 'Pressão regulatória',
        status: 'Em Progresso',
        risco: 50,
        insight: 78
    },
    {
        empresa: 'CS Disco',
        tipo: 'Legal',
        item: 'Forte queima de caixa',
        status: 'Pendente',
        risco: 72,
        insight: 67
    }
];

let url = "https://api.airtable.com/v0/appvccdvUXFaSh6lt/tblB2rXgUbs7VGk6t  ";
let apiKey = "patLshvq2WnQd5p57.1869288e6a2e29a01f7d1bbe754eea7f506b311d0d1241d01be7b06318b83269";

fetch(url, {
    headers: {
        Authorization: 'Bearer ' + apiKey
    }
})
    .then(res => res.json())
    .then(dadosFetch => {

        console.log(dados);
        renderTable()
        renderAnalise(dadosFetch);
    })
    .catch(err => console.log(err));


function renderTable() {
    table.innerHTML = '';
    for (let d of dados) {
        table.innerHTML += `
        <tr>
            <td>${d.empresa}</td>
            <td>${d.tipo}</td>
            <td>${d.item}</td>
            <td>${d.status}</td>
            <td>${d.risco}</td>
            <td>${d.insight}</td>
        </tr>
        `;
    }
}



form.onsubmit = function (e) {
    e.preventDefault();
    let empresa = document.getElementById('empresa').value;
    let tipo = document.getElementById('tipo').value;
    let item = document.getElementById('item').value;
    let status = document.getElementById('status').value;
    let risco = document.getElementById('risco').value;
    let insight = document.getElementById('insight').value;
    // let documento = document.getElementById('documento').files[0]; // para integração futura

    dados.push({ empresa, tipo, item, status, risco, insight });
    renderTable();
    form.reset();
}

exportBtn.onclick = function () {
    // Exportar para CSV
    let csv = "Empresa,Tipo DD,Item,Status,Risco,Insight\n";
    dados.forEach(d => {
        csv += `${d.empresa},${d.tipo},${d.item},${d.status},${d.risco},${d.insight}\n`;
    });
    let blob = new Blob([csv], { type: 'text/csv' });
    let url = URL.createObjectURL(blob);
    let a = document.createElement('a');
    a.href = url;
    a.download = 'due_diligence_export.csv';
    a.click();
    URL.revokeObjectURL(url);
}

promptBtn.onclick = function () {
    let prompt = `PROMPT GERADO:\n
                  Analise comparativamente as empresas Agilysys, Alkami e CS Disco considerando os seguintes dados:
                    - Margens, risco, insight estratégico e status do Due Diligence cadastrado
                    - Dados financeiros relevantes (exemplo simulado: EBITDA, receita, churn, etc.)

                    Aponte qual empresa apresenta o melhor perfil para investimento no contexto de search funds. Justifique sua resposta de forma quantitativa e qualitativa, considerando o cenário macroeconômico e os riscos setoriais.

                Base de dados (simulação):
${dados.map(d => `${d.empresa} | Tipo: ${d.tipo} | Status: ${d.status} | Risco: ${d.risco} | Insight: ${d.insight}`).join('\n')}

No final, indique: 1) Recomendação de investimento e 2) Estratégia para mitigar riscos.`;
    promptOutput.style.display = "block";
    promptOutput.innerText = prompt;
}

function renderAnalise(analiseIA) {
    let analise = ``;

    for (let d of analiseIA.records) {
        const nome = d.fields['Name'];
        const analiseIA = d.fields['AnaliseIA'];
        analise += `<p> Empresa: ${nome} </p>
                    <strong> ${analiseIA} </strong>
                     <hr/> `;
    };
    document.getElementById("analiseDiv").innerHTML = analise;
}

function exibirRelatorioIA() {
    console.log("exibir relatorio");
    document.getElementById("analiseDiv").style = "visibility: visible";
}
