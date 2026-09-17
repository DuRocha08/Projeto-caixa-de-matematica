
function abrirFormularioGaveta(nomeGaveta) {
    
    window.location.href = 'recurso.html?gaveta=' + encodeURIComponent(nomeGaveta);
}


window.onload = function() {
   
    let elementoTitulo = document.getElementById('titulo-gaveta-selecionada');
    if (elementoTitulo) {
        const parametrosDaURL = new URLSearchParams(window.location.search);
        const nomeGaveta = parametrosDaURL.get('gaveta');
        
        if (nomeGaveta) {
            elementoTitulo.innerText = "Gaveta: " + nomeGaveta;
            document.getElementById('gaveta').value = nomeGaveta;
        } else {
            elementoTitulo.innerText = "Nenhuma gaveta selecionada!";
        }
    }

   
    if (document.getElementById('lista-recursos')) {
        atualizarListaRecursos();
    }

   
    if (document.getElementById('lista-atividades')) {
        atualizarListaAtividades();
    }
};


async function salvarRecurso() {
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

    try {
        let resposta = await fetch('/api/recursos', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(novoRecurso)
        });

        if (resposta.ok) {
            alert("YAY! Guardado com sucesso na nuvem!");
            window.location.href = 'gavetas.html';
        } else {
            alert("Vixe... Deu um erro ao tentar salvar no banco de dados.");
        }
    } catch (erro) {
        console.error(erro);
        alert("Ops! Sem conexão com o servidor. Verifique sua internet.");
    }
}

async function salvarAtividade() {
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

    try {
        let resposta = await fetch('/api/atividades', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(novaAtividade)
        });

        if (resposta.ok) {
            alert("Incrível! Proposta registrada e enviada para a nuvem!");
            window.location.href = 'gavetas.html'; 
        } else {
            alert("Vixe... Deu um erro ao tentar salvar no banco de dados.");
        }
    } catch (erro) {
        console.error(erro);
        alert("Ops! Sem conexão com o servidor. Verifique sua internet.");
    }
}

async function atualizarListaRecursos() {
    let divLista = document.getElementById('lista-recursos');
   
    divLista.innerHTML = "<h3 style='text-align: center; color: #8089D2;'>Buscando materiais na nuvem... </h3>"; 

    try {
        let resposta = await fetch('/api/recursos');
        let listaBanco = await resposta.json();
        
        divLista.innerHTML = ""; 

        if (listaBanco.length === 0) {
           
            divLista.innerHTML = "<h3 style='text-align: center; color: #2C3F70;'>A caixinha de todos está vazia...</h3>";
            return;
        }

        for (let i = 0; i < listaBanco.length; i++) {
            let item = listaBanco[i];
            let cartaoHTML = `
                <div class="card-recurso">
                    <span class="gaveta-badge">${item.gaveta}</span>
                    <h3>${item.nome}</h3>
                    <p><strong>Tipo:</strong> ${item.tipo}</p>
                    <p><strong>Conceito/Aprendizagem:</strong> ${item.conceito}</p>
                    <p><strong>Público alvo:</strong> ${item.publico}</p>
                    <p><strong>Uso Pedagógico:</strong> ${item.uso}</p>
                    <p><strong>Fonte/Referência:</strong> ${item.fonte}</p>
                </div>
            `;
            divLista.innerHTML += cartaoHTML; 
        }
    } catch (erro) {
        console.error(erro);
        
        divLista.innerHTML = "<h3 style='text-align: center; color: #A5231C;'>Ops! Deu um problema ao puxar os dados.</h3>";
    }
}

async function atualizarListaAtividades() {
    let divLista = document.getElementById('lista-atividades');
   
    divLista.innerHTML = "<h3 style='text-align: center; color: #8089D2;'>Buscando atividades na nuvem... </h3>"; 

    try {
        let resposta = await fetch('/api/atividades');
        let listaBanco = await resposta.json();
        
        divLista.innerHTML = ""; 

        if (listaBanco.length === 0) {
           
            divLista.innerHTML = "<h3 style='text-align: center; color: #2C3F70;'>Nenhuma atividade na sala ainda...</h3>";
            return;
        }

        for (let i = 0; i < listaBanco.length; i++) {
            let item = listaBanco[i];
            
            let cartaoHTML = `
                <div class="card-recurso" style="border-color: #8089D2; background-color: #FFFFFF;">
                    <h3 style="color: #A5231C; border-bottom-color: #8089D2;">${item.titulo}</h3>
                    <p><strong>Público Etapa:</strong> ${item.publico}</p>
                    <p><strong>Objetivo:</strong> ${item.objetivo}</p>
                    <p><strong>Conceito:</strong> ${item.conceito}</p>
                    <p><strong>Material:</strong> ${item.material}</p>
                    <p><strong>Desenvolvimento:</strong> ${item.desenvolvimento}</p>
                    <p><strong>Mediação:</strong> ${item.mediacao}</p>
                    <p><strong>Avaliação:</strong> ${item.avaliacao}</p>
                    <p><strong>Justificativa:</strong> ${item.justificativa}</p>
                </div>
            `;
            divLista.innerHTML += cartaoHTML; 
        }
    } catch (erro) {
        console.error(erro);
       
        divLista.innerHTML = "<h3 style='text-align: center; color: #A5231C;'>Ops! Deu um problema ao puxar as atividades.</h3>";
    }
}
