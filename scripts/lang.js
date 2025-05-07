document.addEventListener('DOMContentLoaded', function () {
    const dropdown = document.getElementById('languageDropdown');
    const selectedFlag = document.getElementById('selectedFlag');
    const options = dropdown.querySelectorAll('.option');

    // Define idioma salvo ou detecta do navegador
    let language = localStorage.getItem('language');
    if (!language) {
        const userLanguage = (navigator.language || navigator.userLanguage).substring(0, 2);
        const supportedLanguages = ['en', 'pt'];
        language = supportedLanguages.includes(userLanguage) ? userLanguage : 'pt';
        localStorage.setItem('language', language);
    }

    // Aplica idioma salvo
    selectedFlag.src = `imagens/flags/${language}.png`;
    if (language !== 'pt') {
        applyTranslations(language);
    }

    if (document.getElementById('faq')) {
        loadFAQ(language);
    }

    // Abre/fecha dropdown ao clicar
    dropdown.querySelector('.selected').addEventListener('click', () => {
        dropdown.classList.toggle('open');
    });

    // Clique em uma opção
    options.forEach(option => {
        option.addEventListener('click', () => {
            const lang = option.getAttribute('data-lang');
            selectedFlag.src = `imagens/flags/${lang}.png`;
            dropdown.classList.remove('open');
            changeLanguage(lang);
        });
    });

    // Fecha dropdown ao clicar fora
    document.addEventListener('click', function (e) {
        if (!dropdown.contains(e.target)) {
            dropdown.classList.remove('open');
        }
    });
});

// Função para aplicar as traduções de idioma
function applyTranslations(language) {
    fetch(`langs/site-${language}.json`)
        .then(response => response.json())
        .then(translations => {
            if (!translations) return;

            if (translations.title && document.querySelector('#pageTitle')) {
                document.title = translations.title;
                document.querySelector('#pageTitle').textContent = translations.title;
            }

            if (document.querySelector('#searchInput') && translations.searchPlaceholder) {
                document.querySelector('#searchInput').placeholder = translations.searchPlaceholder;
            }

            if (document.querySelector('#footerText') && translations.footerText) {
                document.querySelector('#footerText').innerHTML = translations.footerText;
            }

            if (document.querySelector('.contact-button') && translations.contactButton) {
                document.querySelector('.contact-button').textContent = translations.contactButton;
            }

            if (document.querySelector('#aboutTitle')) {
                document.querySelector('#aboutTitle').textContent = translations.aboutTitle;
                document.querySelector('#aboutText1').textContent = translations.aboutText1;
                document.querySelector('#aboutText2').textContent = translations.aboutText2;
                document.querySelector('#whoWeAreTitle').textContent = translations.whoWeAreTitle;
                document.querySelector('#whoWeAreText').innerHTML = translations.whoWeAreText;
                document.querySelector('#whyThisSiteTitle').textContent = translations.whyThisSiteTitle;
                document.querySelector('#whyThisSiteText').textContent = translations.whyThisSiteText;
            }

            if (document.querySelector('#contactTitle')) {
                document.querySelector('#contactTitle').textContent = translations.contactTitle;
                document.querySelector('#contactText').textContent = translations.contactText;
                document.querySelector('#contactButton').textContent = translations.contactButton;
            }

            if (document.querySelector('#privacyPolicyTitle')) {
                document.querySelector('#privacyPolicyTitle').textContent = translations.privacyPolicyTitle;
                document.querySelector('#privacyPolicyText1').textContent = translations.privacyPolicyText1;
                document.querySelector('#privacyPolicyText2').textContent = translations.privacyPolicyText2;
                document.querySelector('#privacyPolicyText3').textContent = translations.privacyPolicyText3;
                document.querySelector('#cookiesText').textContent = translations.cookiesText;
            }

            if (document.querySelector('#backToHome') && translations.backToHome) {
                document.querySelector('#backToHome').textContent = translations.backToHome;
            }

            if (translations.navbar) {
                updateNavbar(translations.navbar);
            }
        })
        .catch(error => console.error('Erro ao carregar traduções:', error));
}

// Função para traduzir navbar
function updateNavbar(navbarTranslations) {
    if (!navbarTranslations) return;

    const navbarLinks = document.querySelectorAll('.navbar a');
    navbarLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === 'index.html') {
            link.textContent = navbarTranslations.home;
        } else if (href === 'sobre.html') {
            link.textContent = navbarTranslations.about;
        } else if (href === 'contato.html') {
            link.textContent = navbarTranslations.contact;
        } else if (href === 'privacidade.html') {
            link.textContent = navbarTranslations.privacy;
        }
    });
}

// Carrega FAQ traduzido
function loadFAQ(language) {
    fetch(`langs/faq-${language}.json`)
        .then(response => response.json())
        .then(data => {
            const faqContainer = document.getElementById('faq');
            if (!faqContainer) return;
            faqContainer.innerHTML = '';
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

// Altera idioma
function changeLanguage(lang) {
    localStorage.setItem('language', lang);

    if (lang !== 'pt') {
        applyTranslations(lang);
    } else {
        location.reload(); // PT é conteúdo padrão
    }

    if (document.getElementById('faq')) {
        loadFAQ(lang);
    }
}

// Oculta seletor de idioma ao rolar
window.addEventListener('scroll', function () {
    const langSelector = document.querySelector('.language-selector');
    if (!langSelector) return;

    langSelector.style.display = window.scrollY > 10 ? 'none' : 'flex';
});
