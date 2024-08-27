// Função principal que é executada quando o conteúdo da página é totalmente carregado
document.addEventListener('DOMContentLoaded', function() {
    // Detecta o idioma do navegador
    const userLanguage = (navigator.language || navigator.userLanguage).substring(0, 2); // Obtém os primeiros 2 caracteres do idioma (ex: 'en', 'pt')
    
    // Define o idioma padrão se o idioma do navegador não for suportado
    const supportedLanguages = ['en', 'pt'];
    const language = supportedLanguages.includes(userLanguage) ? userLanguage : 'pt';

    // Armazena o idioma no localStorage e aplica a tradução
    localStorage.setItem('language', language);
    applyTranslations(language);
    loadFAQ(language);

    // Adiciona um listener para o seletor de idioma
    document.querySelector('.language-selector').addEventListener('click', function(event) {
        if (event.target.tagName === 'IMG') {
            const newLanguage = event.target.alt === 'English' ? 'en' : 'pt';
            changeLanguage(newLanguage);
        }
    });
});

// Função para aplicar traduções ao conteúdo da página
function applyTranslations(language) {
    fetch(`localidade/${language}.json`)
        .then(response => response.json())
        .then(translations => {
            document.title = translations.title;
            document.querySelector('#pageTitle').textContent = translations.title;
            document.querySelector('#searchInput').placeholder = translations.searchPlaceholder;
            document.querySelector('#footerText').innerHTML = translations.footerText;
            document.querySelector('.contact-button').textContent = translations.contactButton;
        })
        .catch(error => console.error('Erro ao carregar traduções:', error));
}

// Função para carregar e exibir as perguntas e respostas
function loadFAQ(language) {
    fetch(`localidade/data-${language}.json`)
        .then(response => response.json())
        .then(data => {
            const faqContainer = document.getElementById('faq');
            faqContainer.innerHTML = ''; // Limpar o conteúdo existente
            data.forEach((item, index) => {
                const perguntaDiv = document.createElement('div');
                perguntaDiv.classList.add('pergunta');
                perguntaDiv.innerHTML = `
                    <h3>Puzzle ${index + 1}) ${item.pergunta}</h3>
                    <p class="resposta"><strong>R:</strong> ${item.resposta}</p>
                `;
                faqContainer.appendChild(perguntaDiv);
            });
        })
        .catch(error => console.error('Erro ao carregar dados de FAQ:', error));
}

// Função para alterar o idioma da página
function changeLanguage(lang) {
    localStorage.setItem('language', lang);
    applyTranslations(lang);
    loadFAQ(lang);
}

// Função para pesquisar perguntas no FAQ
function searchperguntas() {
    const input = normalizeString(document.getElementById('searchInput').value.toLowerCase());
    const perguntas = document.querySelectorAll('.pergunta');

    perguntas.forEach(pergunta => {
        const perguntaText = normalizeString(pergunta.querySelector('h3').textContent.toLowerCase());

        // Verifica se o texto da pergunta contém o termo de busca
        if (perguntaText.includes(input) || input === '') {
            pergunta.style.display = '';
        } else {
            pergunta.style.display = 'none';
        }
    });
}

// Função para remover acentos e caracteres especiais de uma string
function normalizeString(str) {
    return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}
