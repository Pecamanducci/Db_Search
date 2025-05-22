
// Lógica simulada de avaliação IA
function avaliarPorIA(form) {
    // Simula prompt estruturado
    const risco = Number(form.risco.value);
    const insight = Number(form.insight.value);

    let rating, explicacao, classe;
    if (risco <= 30 && insight >= 65) {
        rating = 'Alto';
        explicacao = "A empresa apresenta risco controlado e bons insights estratégicos. Sinal verde para avanço.";
        classe = 'rating-alto';
    } else if (risco <= 70 && insight >= 40) {
        rating = 'Médio';
        explicacao = "A empresa apresenta risco moderado, mas potencial estratégico. Requer monitoramento.";
        classe = 'rating-medio';
    } else {
        rating = 'Baixo';
        explicacao = "A empresa está com alto risco e baixo insight. Atenção especial necessária!";
        classe = 'rating-baixo';
    }

    return {
        rating,
        explicacao,
        classe,
        logica: `Se risco ≤ 30 e insight ≥ 65: Alto; risco ≤ 70 e insight ≥ 40: Médio; senão: Baixo.`
    };
}

document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('ddForm');
    const iaResultDiv = document.getElementById('iaResult');
    const analisarBtn = document.getElementById('analisarIA');
    const historicoUl = document.getElementById('historico');
    let historico = [];

    analisarBtn.onclick = function() {
        const resultado = avaliarPorIA(form);
        iaResultDiv.innerHTML = `<span class="${resultado.classe}">Rating IA: ${resultado.rating}</span><br>
            <small>${resultado.explicacao}</small><br>
            <small><b>Lógica:</b> ${resultado.logica}</small>`;
        form.dataset.ratingIa = resultado.rating;
        form.dataset.ratingExplicacao = resultado.explicacao;
        form.dataset.ratingLogica = resultado.logica;
    };

    form.onsubmit = function(e) {
        e.preventDefault();
        const empresa = form.empresa.value;
        const tipoDD = form.tipoDD.value;
        const item = form.item.value;
        const status = form.status.value;
        const risco = form.risco.value;
        const insight = form.insight.value;
        const rating = form.dataset.ratingIa || '-';
        const explicacao = form.dataset.ratingExplicacao || '-';
        const logica = form.dataset.ratingLogica || '-';
        const data = new Date().toLocaleString();

        historico.unshift({
            data,
            empresa, tipoDD, item, status, risco, insight,
            rating, explicacao, logica
        });

        renderHistorico();

        alert("Cadastro realizado com sucesso!");
        form.reset();
        iaResultDiv.innerHTML = "";
        delete form.dataset.ratingIa;
        delete form.dataset.ratingExplicacao;
        delete form.dataset.ratingLogica;
    };

    function renderHistorico() {
        historicoUl.innerHTML = '';
        historico.forEach(h => {
            historicoUl.innerHTML += `<li>
                <b>${h.data}</b> | <b>${h.empresa}</b> (${h.tipoDD}) — <span class="rating-${h.rating.toLowerCase()}">Rating: ${h.rating}</span>
                <br>Risco: <b>${h.risco}</b>, Insight: <b>${h.insight}</b> <br>
                <i>${h.explicacao}</i>
                <br><small>Lógica usada: ${h.logica}</small>
                <hr></li>`;
        });
    }
});
