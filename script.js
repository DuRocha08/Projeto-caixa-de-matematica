document.addEventListener('DOMContentLoaded', () => {
    

    const formAtividade = document.getElementById('form-atividade');
    if (formAtividade) {
        formAtividade.addEventListener('submit', async (e) => {
            e.preventDefault();

            const novaAtividade = {
                titulo: document.getElementById('titulo').value,
                autor: document.getElementById('autor').value,
                publico: document.getElementById('publico').value,
                conceito: document.getElementById('conceito').value,
                objetivo: document.getElementById('objetivo').value,
                material: document.getElementById('material').value,
                desenvolvimento: document.getElementById('desenvolvimento').value
            };

            try {
                const resposta = await fetch('/api/atividades', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(novaAtividade)
                });

                if (resposta.ok) {
                    alert('Atividade guardada com sucesso! 📦✨');
                    formAtividade.reset();
                    // Redireciona o usuário direto para a lista
                    window.location.href = 'lista de atividades.html';
                } else {
                    alert('Ops! Deu um erro ao guardar.');
                }
            } catch (erro) {
                console.error('Erro:', erro);
            }
        });
    }


    const divLista = document.getElementById('lista-atividades');
    if (divLista) {
        carregarAtividades();
    }
});

async function carregarAtividades() {
    try {
        const resposta = await fetch('/api/atividades');
        const atividades = await resposta.json();
        
        const divLista = document.getElementById('lista-atividades');
        divLista.innerHTML = ''; 

        if (atividades.length === 0) {
            divLista.innerHTML = '<p style="text-align:center;">Nenhuma atividade cadastrada ainda. Seja o primeiro a criar!</p>';
            return;
        }

        atividades.forEach(ativ => {
            const nomeAutor = ativ.autor ? ativ.autor : 'Anônimo';

            const card = document.createElement('div');
            card.className = 'atividade-card';
            
            card.innerHTML = `
                <h3>${ativ.titulo}</h3>
                <span class="autor-tag">✏️ Criada por: ${nomeAutor}</span>
                <p class="info-p"><strong>Público:</strong> ${ativ.publico || '-'}</p>
                <p class="info-p"><strong>Conceito:</strong> ${ativ.conceito || '-'}</p>
                <p class="info-p"><strong>Objetivo:</strong> ${ativ.objetivo || '-'}</p>
            `;
            
            divLista.appendChild(card);
        });
    } catch (erro) {
        console.error('Erro ao carregar atividades:', erro);
    }
}
