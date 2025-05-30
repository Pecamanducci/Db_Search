const form = document.getElementById('cadastroForm');
const table = document.getElementById('dadosTable').querySelector('tbody');
const promptBtn = document.getElementById('promptBtn');
const exportBtn = document.getElementById('exportBtn');
const promptOutput = document.getElementById('promptOutput');

let dados = [
    {
        empresa: 'Alkami',
        tipo: 'Operacional',
        item: 'Pressão regulatória',
        status: 'Em Progresso',
        risco: 50,
        insight: 78,
        decisao: 'Em Avaliação',
        comentario: 'A Alkami apresenta risco moderado, porém alto insight estratégico. Os principais riscos referem-se à pressão regulatória e necessidade de adaptação tecnológica. Contudo, o potencial de crescimento e as margens indicam viabilidade de investimento, desde que haja acompanhamento próximo de indicadores operacionais. Decisão segue em avaliação, aguardando mais informações do setor jurídico e compliance.'
    }
];

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
            <td>${d.decisao || '-'}</td>
            <td>${d.comentario || '-'}</td>
        </tr>
        `;
    }
}
renderTable();

form.onsubmit = function (e) {
    e.preventDefault();
    let empresa = document.getElementById('empresa').value;
    let tipo = document.getElementById('tipo').value;
    let item = document.getElementById('item').value;
    let status = document.getElementById('status').value;
    let risco = document.getElementById('risco').value;
    let insight = document.getElementById('insight').value;
    let decisao = document.getElementById('decisao').value;
    let comentario = document.getElementById('comentario').value;

    dados.push({ empresa, tipo, item, status, risco, insight, decisao, comentario });
    renderTable();
    form.reset();
}

exportBtn.onclick = function () {
    // Exportar para CSV
    let csv = "Empresa,Tipo DD,Item,Status,Risco,Insight,Decisão Final,Comentário da Decisão\n";
    dados.forEach(d => {
        csv += `${d.empresa},${d.tipo},${d.item},${d.status},${d.risco},${d.insight},${d.decisao},${d.comentario}\n`;
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
    let prompt = `PROMPT GERADO:
Analise a empresa Alkami Technology considerando os seguintes dados:
- Tipo de Due Diligence: Operacional
- Item Avaliado: Pressão regulatória
- Status: Em Progresso
- Risco: 50
- Insight Estratégico: 78

Com base nos dados acima, forneça uma decisão final (Aprovado, Em Avaliação, Não Aprovado) e justifique de forma crítica, citando os principais fatores que influenciam a decisão. Sugira também estratégias para mitigar riscos identificados.`;
    promptOutput.style.display = "block";
    promptOutput.innerText = prompt;
}

function exibirRelatorioIA() {
    // Você pode adicionar código aqui para exibir relatórios de IA se desejar
    alert('Relatório de IA exibido! (Personalize conforme seu projeto)');
}
