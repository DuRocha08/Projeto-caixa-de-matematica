const bancoDeDadosGavetas = {
    gaveta1: {
        titulo: "MATERIAIS MANIPULÁVEIS",
        introducao: "Nesta gaveta reunimos materiais concretos onde a criança aprende matemática tocando e experimentando. Baseados em Piaget, a criança constrói o número na ação, e em Montessori e Vygotsky, que defendem o material sensorial e a mediação.",
        conteudo: [
            { subtitulo: "Materiais de construção geométrica", texto: "Incentivar os alunos a montar figuras e estruturas, desenvolvendo percepção espacial, formas geométricas e raciocínio lógico.", img: "img/formas.jpg" },
            { subtitulo: "Material de centena, dezena e unidade", texto: "Representar números de forma concreta, facilitando a compreensão do valor posicional e da composição e decomposição dos números.", img: "img/material-dourado.jpg" },
            { subtitulo: "Copos numerados", texto: "Relacionar números às respectivas quantidades, praticando contagem, ordenação e operações matemáticas.", img: "img/copos.jpg" },
            { subtitulo: "Jogos de tabuleiro e trilhas numéricas", texto: "Desenvolver contagem, sequência numérica, adição, subtração e raciocínio lógico.", img: "img/tabuleiro.jpg" },
            { subtitulo: "Cartões Numéricos", texto: "Os cartões numéricos podem ser utilizados para trabalhar o reconhecimento e a sequência dos números, relacionando o algarismo à sua escrita por extenso.", img: "img/cartoes.jpg" }
        ]
    },
    gaveta2: {
        titulo: "JOGOS E BRINCADEIRAS",
        introducao: "Esta gaveta reúne uma seleção de jogos físicos e brincadeiras motoras voltados para o ensino de Matemática nos Anos Iniciais do Ensino Fundamental.",
        conteudo: [
            { subtitulo: "Grupos (jogo físico de agrupamento)", texto: "Conceito matemático: desenvolvimento da contagem, noção de agrupamento e cálculo mental rápido. Público: 1º ao 4º ano.", img: "img/grupos.jpg" },
            { subtitulo: "Estafeta dos Números", texto: "Conceito matemático: resolução de operações básicas (adição e subtração), velocidade de cálculo mental. Público: 1º ao 5º ano.", img: "img/estafeta.jpg" }
        ]
    },
    gaveta3: {
        titulo: "RECURSOS DIGITAIS",
        introducao: "Plataformas e recursos digitais interativos voltados para o pensamento matemático.",
        conteudo: [
            { subtitulo: "Escola Games (Site)", texto: "Operações fundamentais, cálculo mental, resolução de problemas. Público: 1º ao 5º ano.", img: "img/escolagames.jpg" },
            { subtitulo: "IXL Learning (Programa Online)", texto: "Desenvolvimento progressivo do pensamento matemático (contagem, geometria, frações).", img: "img/ixl.jpg" }
        ]
    },
    gaveta4: {
        titulo: "CANAIS E CONTEÚDOS",
        introducao: "Vídeos lúdicos para ensinar matemática de forma visual e divertida.",
        conteudo: [
            { subtitulo: "Vídeo 1 - Descobrindo a adição", texto: "Link: https://youtu.be/5VoXOFOSETI <br>Trabalha a ideia de juntar e acrescentar quantidades. BNCC: EF01MA06 e EF01MA08." },
            { subtitulo: "Vídeo 2 - Unidade e dezena", texto: "Link: https://youtu.be/O17tkPBHmol <br>Canal: Alfabrinca. Unidades, dezenas e contagem." },
            { subtitulo: "Vídeo 3 - Quiz das formas geométricas", texto: "Link: https://youtu.be/sXfj2Qh88h0 <br>Figuras como círculo, quadrado, triângulo e retângulo." },
            { subtitulo: "Vídeo 4 - Soma com dinossauros", texto: "Link: https://youtu.be/prsJNR0Zbqg <br>Canal: Smile and Learn. Adição lúdica." },
            { subtitulo: "Vídeo 5 - Subtração com dinossauros", texto: "Link: https://youtu.be/V0NVAh4Adxs <br>Canal: Smile and Learn. Subtração e separação." }
        ]
    },
    gaveta5: {
        titulo: "LITERATURA",
        introducao: "A literatura infantil como porta de entrada para a matemática na Educação Infantil.",
        conteudo: [
            { subtitulo: "NÚMEROS E QUANTIDADE", texto: "• A Cesta de Dona Maricota (Tatiana Belinky)<br>• Dez Sacizinhos (Tatiana Belinky)" },
            { subtitulo: "GRANDEZAS E MEDIDAS", texto: "• Quem vai ficar com o pêssego? (Yoon Ah-Hae)<br>• O Grande Rabanete (Tatiana Belinky)" },
            { subtitulo: "ESPAÇO E FORMAS", texto: "• Clact... Clact... Clact... (Liliana Cinetto)<br>• O Ponto (Peter H. Reynolds)" },
            { subtitulo: "PARA BEBÊS", texto: "Livros: Dez Dedinhos, Dez na Cama." }
        ]
    },
    gaveta6: {
        titulo: "AUTORES E TEÓRICOS",
        introducao: "Autores que explicam por que ensinamos matemática manipulando, jogando e com mediação.",
        conteudo: [
            { subtitulo: "JEAN PIAGET", texto: "Classificação, seriação e conservação do número.", img: "img/piaget.jpg" },
            { subtitulo: "LEV VYGOTSKY", texto: "Zona de Desenvolvimento Proximal (ZDP), mediação e linguagem.", img: "img/vygotsky.jpg" },
            { subtitulo: "JOHN VAN DE WALLE", texto: "Valor posicional e resolução de problemas.", img: "img/vandewalle.jpg" },
            { subtitulo: "UBIRATAN D'AMBROSIO", texto: "Etnomatemática (matemática do cotidiano).", img: "img/dambrosio.jpg" }
        ]
    },
    gaveta7: {
        titulo: "IDEIAS NOVAS",
        introducao: "O propósito da nossa caixa de matemática é mostrar que a matemática pode ser ensinada de uma forma mais leve, divertida e interessante.",
        conteudo: [
            { subtitulo: "Quem somos nós?", texto: "A nossa caixa visa tornar o aprendizado dinâmico, fazendo com que a criança participe, explore e aprenda brincando através de situações do dia a dia." }
        ]
    }
};

function mostrarGaveta(idGaveta) {
    const container = document.getElementById('gavetas-container');
    const gaveta = bancoDeDadosGavetas[idGaveta];
    
    if (!container || !gaveta) return;
    
    let htmlContent = `
        <section class="gaveta-section">
            <h2>${gaveta.titulo}</h2>
            <p class="intro-gaveta">${gaveta.introducao}</p>
    `;
    
    if (gaveta.conteudo && gaveta.conteudo.length > 0) {
        htmlContent += `<div class="gaveta-itens">`;
        gaveta.conteudo.forEach(item => {
            htmlContent += `<article class="item-card">`;
            if (item.img) {
                htmlContent += `<img src="${item.img}" alt="${item.subtitulo}" class="card-img">`;
            }
            htmlContent += `<h3>${item.subtitulo}</h3>`;
            htmlContent += `<p>${item.texto}</p>`;
            htmlContent += `</article>`;
        });
        htmlContent += `</div>`;
    }
    
    htmlContent += `</section>`;
    container.innerHTML = htmlContent;
}
