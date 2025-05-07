// Função para pesquisar perguntas no FAQ
function searchperguntas() {
    const input = normalizeString(document.getElementById('searchInput').value.trim().toLowerCase());
    const perguntas = document.querySelectorAll('.pergunta');
  
    perguntas.forEach(pergunta => {
      const perguntaText = normalizeString(pergunta.querySelector('h3')?.innerText.toLowerCase() || '');
      const respostaText = normalizeString(pergunta.querySelector('.resposta')?.innerText.toLowerCase() || '');
  
      const matches = perguntaText.includes(input) || respostaText.includes(input) || input === '';
  
      pergunta.style.display = matches ? '' : 'none';
    });
  }
  

// Função para remover acentos e caracteres especiais de uma string
function normalizeString(str) {
    return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}


// função para converter link do json pra clicavel
const container = document.getElementById("faq");
      
    dados.forEach(item => {
    const div = document.createElement("div");
    div.className = "faq-item";

    const pergunta = document.createElement("h3");
    pergunta.innerText = item.pergunta;

    const resposta = document.createElement("p");
    resposta.innerHTML = item.resposta; // Usa innerHTML para interpretar o <a>

    div.appendChild(pergunta);
    div.appendChild(resposta);
    container.appendChild(div);
});
