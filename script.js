let listaRecursos = []; 
let listaAtividades = [];

function mudarAba(abaDestino) {
   
    document.getElementById('aba1').classList.add('hidden');
    document.getElementById('aba2').classList.add('hidden');
    document.getElementById('aba3').classList.add('hidden');
    document.getElementById('aba4').classList.add('hidden');
    
  
    document.getElementById('btn-aba1').classList.remove('active');
    document.getElementById('btn-aba2').classList.remove('active');
    document.getElementById('btn-aba3').classList.remove('active');
    document.getElementById('btn-aba4').classList.remove('active');

  
    document.getElementById(abaDestino).classList.remove('hidden');
    document.getElementById('btn-' + abaDestino).classList.add('active');

    if (abaDestino === 'aba2') {
        atualizarListaRecursos();
    } else if (abaDestino === 'aba4') {
        atualizarListaAtividades();
    }
}

function salvarRecurso() {
    let gaveta = document.getElementById('gaveta').value;
    let nome = document.getElementById('nome').value;
    let tipo = document.getElementById('tipo').value;
    let conceito = document.getElementById('conceito').value;
    let publico = document.getElementById('publico').value;
    let uso = document.getElementById('uso').value;
    let fonte = document.getElementById('fonte').value;

    if (nome.trim() === "") {
        alert("Ops! Você esqueceu de colocar o Nome do recurso!");
        return;
    }

    let novoRecurso = { gaveta, nome, tipo, conceito, publico, uso, fonte };
    listaRecursos.push(novoRecurso);
    
    alert("YAY! Guardado com sucesso na caixinha!");

   
    document.getElementById('nome').value = "";
    document.getElementById('tipo').value = "";
    document.getElementById('conceito').value = "";
    document.getElementById('publico').value = "";
    document.getElementById('uso').value = "";
    document.getElementById('fonte').value = "";
}

function salvarAtividade() {
    let titulo = document.getElementById('atv-titulo').value;
    let publico = document.getElementById('atv-publico').value;
    let objetivo = document.getElementById('atv-objetivo').value;
    let conceito = document.getElementById('atv-conceito').value;
    let material = document.getElementById('atv-material').value;
    let desenvolvimento = document.getElementById('atv-desenvolvimento').value;
    let mediacao = document.getElementById('atv-mediacao').value;
    let avaliacao = document.getElementById('atv-avaliacao').value;
    let justificativa = document.getElementById('atv-justificativa').value;

    if (titulo.trim() === "") {
        alert("Ei! A atividade precisa de um Título!");
        return;
    }

    let novaAtividade = { titulo, publico, objetivo, conceito, material, desenvolvimento, mediacao, avaliacao, justificativa };
    listaAtividades.push(novaAtividade);
    
    alert("Incrível! 🚀 Proposta de atividade registrada com sucesso!");

    document.getElementById('atv-titulo').value = "";
    document.getElementById('atv-publico').value = "";
    document.getElementById('atv-objetivo').value = "";
    document.getElementById('atv-conceito').value = "";
    document.getElementById('atv-material').value = "";
    document.getElementById('atv-desenvolvimento').value = "";
    document.getElementById('atv-mediacao').value = "";
    document.getElementById('atv-avaliacao').value = "";
    document.getElementById('atv-justificativa').value = "";
}

function atualizarListaRecursos() {
    let divLista = document.getElementById('lista-recursos');
    divLista.innerHTML = ""; 

    if (listaRecursos.length === 0) {
        divLista.innerHTML = "<h3 style='text-align: center; color: #999;'>Sua caixinha está vazia... <br>Volte e guarde algum material!</h3>";
        return;
    }

    for (let i = 0; i < listaRecursos.length; i++) {
        let item = listaRecursos[i];
        let cartaoHTML = `
            <div class="card-recurso">
                <span class="gaveta-badge">${item.gaveta}</span>
                <h3>${item.nome}</h3>
                <p><strong>Tipo:</strong> ${item.tipo}</p>
                <p><strong>Conceito/Aprendizagem:</strong> ${item.conceito}</p>
                <p><strong>Público alvo:</strong> ${item.publico}</p>
                <p><strong>Uso Pedagógico / Ideia:</strong> ${item.uso}</p>
                <p><strong>Fonte/Referência:</strong> ${item.fonte}</p>
            </div>
        `;
        divLista.innerHTML += cartaoHTML; 
    }
}

function atualizarListaAtividades() {
    let divLista = document.getElementById('lista-atividades');
    divLista.innerHTML = ""; 

    if (listaAtividades.length === 0) {
        divLista.innerHTML = "<h3 style='text-align: center; color: #999;'>Nenhuma atividade planejada ainda... <br>Vamos criar uma proposta!</h3>";
        return;
    }

    for (let i = 0; i < listaAtividades.length; i++) {
        let item = listaAtividades[i];
        let cartaoHTML = `
            <div class="card-recurso" style="border-color: #FF8C00; background-color: #FFF5EE;">
                <h3 style="color: #FF8C00; border-bottom-color: #FF8C00;">${item.titulo}</h3>
                <p><strong>Público Etapa:</strong> ${item.publico}</p>
                <p><strong>Objetivo de Aprendizagem:</strong> ${item.objetivo}</p>
                <p><strong>Conceito Matemático:</strong> ${item.conceito}</p>
                <p><strong>Material (da Caixa):</strong> ${item.material}</p>
                <p><strong>Desenvolvimento:</strong> ${item.desenvolvimento}</p>
                <p><strong>Mediação do Professor:</strong> ${item.mediacao}</p>
                <p><strong>Avaliação da Aprendizagem:</strong> ${item.avaliacao}</p>
                <p><strong>Justificativa da Escolha:</strong> ${item.justificativa}</p>
            </div>
        `;
        divLista.innerHTML += cartaoHTML; 
    }
}
