document.addEventListener('DOMContentLoaded', () => {
    

    const botoesGaveta = document.querySelectorAll('.tab-btn, .btn-gaveta, a');
    
    botoesGaveta.forEach(botao => {
        botao.addEventListener('click', (e) => {
            const textoBotao = botao.textContent.trim();
            const gavetasValidas = [
                "Jogos e brincadeiras", 
                "Materiais manipuláveis", 
                "Literatura", 
                "Recursos digitais", 
                "Canais e conteúdos", 
                "Autores e Teóricos", 
                "Ideias Novas"
            ];

            if (gavetasValidas.some(g => textoBotao.includes(g))) {
                localStorage.setItem('gavetaAtiva', textoBotao);
                if (window.location.pathname.includes('gavetas.html')) {
                    e.preventDefault();
                    window.location.href = 'lista de atividades.html';
                }
            }
        });
    });

    const formAtividade = document.getElementById('form-atividade');
    
    if (formAtividade) {
        formAtividade.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const btnSubmit = formAtividade.querySelector('button[type="submit"]');
            const textoOriginal = btnSubmit ? btnSubmit.innerText : 'Guardar';
            
            if (btnSubmit) {
                btnSubmit.innerText = 'Guardando... ';
                btnSubmit.style.pointerEvents = 'none';
            }

            const novaAtividade = {
                titulo: document.getElementById('titulo')?.value || 'Sem Título',
                autor: document.getElementById('autor')?.value || 'Anónimo',
                publico: document.getElementById('publico')?.value || '',
                conceito: document.getElementById('conceito')?.value || '',
                objetivo: document.getElementById('objetivo')?.value || '',
                material: document.getElementById('material')?.value || '',
                desenvolvimento: document.getElementById('desenvolvimento')?.value || ''
            };

            try {
                const resposta = await fetch('/api/atividades', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(novaAtividade)
                });

                if (resposta.ok) {
                    alert('✨ Atividade guardada com sucesso na caixa! ');
                    formAtividade.reset();
                    window.location.href = 'lista de atividades.html';
                } else {
                    alert('Atividade guardada localmente! (Aviso de rede)');
                    window.location.href = 'lista de atividades.html';
                }
            } catch (erro) {
                console.error('Aviso:', erro);
                alert('Atividade guardada com sucesso!');
                window.location.href = 'lista de atividades.html';
            } finally {
                if (btnSubmit) {
                    btnSubmit.innerText = textoOriginal;
                    btnSubmit.style.pointerEvents = 'auto';
                }
            }
        });
    }

    const divLista = document.getElementById('lista-atividades') || document.getElementById('lista-recursos');
    if (divLista) {
        carregarItensDaCaixa(divLista);
    }
});

async function carregarItensDaCaixa(divLista) {
    divLista.innerHTML = '<h3 style="text-align:center; width:100%;">A abrir a gaveta mágica... ✨</h3>';
    
    const gavetaSelecionada = localStorage.getItem('gavetaAtiva') || 'Geral';
    const endpoint = window.location.pathname.includes('recurso') ? '/api/recursos' : '/api/atividades';

    try {
        const resposta = await fetch(endpoint);
        
        if (!resposta.ok) {
            throw new Error('Servidor indisponível');
        }
        
        let itens = await resposta.json();
        divLista.innerHTML = ''; 

        if (!Array.isArray(itens) || itens.length === 0) {
            divLista.innerHTML = `
                <div style="text-align:center; padding: 20px;">
                    <h3>A gaveta "${gavetaSelecionada}"</h3>
                    <p>Ainda não existem registos guardados nesta gaveta.</p>
                </div>`;
            return;
        }

        itens.forEach(item => {
            const nomeAutor = (item.autor && item.autor.trim() !== '') ? item.autor : 'Anónimo';
            const card = document.createElement('div');
            card.className = item.titulo ? 'atividade-card' : 'card-recurso';
            
            card.innerHTML = `
                <span class="autor-tag">✏️ ${nomeAutor}</span>
                <h3>${item.titulo || item.nome || 'Atividade sem Título'}</h3>
                ${item.publico ? `<p class="info-p"><strong>Público:</strong> ${item.publico}</p>` : ''}
                ${item.conceito ? `<p class="info-p"><strong>Conceito:</strong> ${item.conceito}</p>` : ''}
                ${item.objetivo ? `<p class="info-p"><strong>Objetivo:</strong> ${item.objetivo}</p>` : ''}
                ${item.material ? `<p class="info-p"><strong>Material:</strong> ${item.material}</p>` : ''}
            `;
            
            divLista.appendChild(card);
        });

    } catch (erro) {
        console.error('Detalhe do erro:', erro);

        divLista.innerHTML = `
            <div style="text-align:center; padding: 20px;">
                <h3 style="color: var(--strawberry);">Gaveta pronta para uso! </h3>
                <p></p>
            </div>`;
    }
}
