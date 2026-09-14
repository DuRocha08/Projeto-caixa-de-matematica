
let listaRecursos = []; 


function mudarAba(abaDestino) {

    document.getElementById('aba1').classList.add('hidden');
    document.getElementById('aba2').classList.add('hidden');
    
  
    document.getElementById('btn-aba1').classList.remove('active');
    document.getElementById('btn-aba2').classList.remove('active');

    
    document.getElementById(abaDestino).classList.remove('hidden');
    document.getElementById('btn-' + abaDestino).classList.add('active');

   
    if (abaDestino === 'aba2') {
        atualizarLista();
    }
}


function salvarRecurso() {
    let gaveta = document.getElementById('gaveta').value;
    let nome = document.getElementById('nome').value;
    let conceito = document.getElementById('conceito').value;
    let publico = document.getElementById('publico').value;
    let uso = document.getElementById('uso').value;
    let fonte = document.getElementById('fonte').value;

    if (nome.trim() === "") {
        alert("Ops! 🛑 Você esqueceu de colocar o Nome!");
        return;
    }

    
    let novoRecurso = {
        gaveta: gaveta,
        nome: nome,
        conceito: conceito,
        publico: publico,
        uso: uso,
        fonte: fonte
    };

    listaRecursos.push(novoRecurso);
    alert("YAY! 🎉 Guardado com sucesso na caixinha!");

 
    document.getElementById('nome').value = "";
    document.getElementById('conceito').value = "";
    document.getElementById('publico').value = "";
    document.getElementById('uso').value = "";
    document.getElementById('fonte').value = "";
}


function atualizarLista() {
    let divLista = document.getElementById('lista-recursos');
    divLista.innerHTML = ""; 

    if (listaRecursos.length === 0) {
        divLista.innerHTML = "<h3 style='text-align: center; color: #999;'>Sua caixinha está vazia... 🎈<br>Volte e guarde alguma coisa!</h3>";
        return;
    }

    
    for (let i = 0; i < listaRecursos.length; i++) {
        let item = listaRecursos[i];
        
        let cartaoHTML = `
            <div class="card-recurso">
                <span class="gaveta-badge">${item.gaveta}</span>
                <h3>📌 ${item.nome}</h3>
                <p><strong>🧠 Conceito:</strong> ${item.conceito}</p>
                <p><strong>👦👧 Público:</strong> ${item.publico}</p>
                <p><strong>🎨 Uso Pedagógico:</strong> ${item.uso}</p>
                <p><strong>🔗 Fonte:</strong> ${item.fonte}</p>
            </div>
        `;
        divLista.innerHTML += cartaoHTML; 
    }
}