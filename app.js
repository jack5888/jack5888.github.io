document.addEventListener('DOMContentLoaded', async function() {
    try {
        // Load language content
        const englishContent = await fetch('english.html').then(response => response.text());
        const chineseContent = await fetch('chinese.html').then(response => response.text());
        
        // Insert English content (default)
        insertLanguageContent('english', englishContent);
        
        // Store Chinese content for later use
        window.chineseContent = chineseContent;
        
        // Set up language toggle buttons
        setupLanguageToggle();
        
        // Set default active language
        setActiveLanguage('english');
    } catch (error) {
        console.error('Error loading language content:', error);
    }
});

function setupLanguageToggle() {
    const languageButtons = document.querySelectorAll('.language-button');
    
    languageButtons.forEach(button => {
        button.addEventListener('click', function() {
            const language = this.getAttribute('data-lang');
            
            // Remove active class from all buttons
            languageButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Set active language
            setActiveLanguage(language);
        });
    });
}

function setActiveLanguage(language) {
    // Hide all language sections
    const allSections = document.querySelectorAll('[data-lang-section]');
    allSections.forEach(section => section.classList.remove('active'));
    
    // Show selected language sections
    const activeSections = document.querySelectorAll(`[data-lang-section="${language}"]`);
    activeSections.forEach(section => section.classList.add('active'));
    
    // If language is chinese and not yet loaded, load it
    if (language === 'chinese' && !document.querySelector('[data-lang-section="chinese"]')) {
        insertLanguageContent('chinese', window.chineseContent);
    }
}

function insertLanguageContent(language, content) {
    // Parse the HTML content
    const parser = new DOMParser();
    const doc = parser.parseFromString(content, 'text/html');
    
    // Get all sections from the parsed document
    const headerContent = doc.querySelector('.header-content');
    const heroContent = doc.querySelector('.hero-content');
    const programsContent = doc.querySelector('.programs-content');
    const ctaContent = doc.querySelector('.cta-content');
    
    // Insert header content
    if (headerContent) {
        const targetHeader = document.querySelector('.hero-container');
        const headerDiv = document.createElement('div');
        headerDiv.setAttribute('data-lang-section', language);
        headerDiv.innerHTML = headerContent.innerHTML;
        targetHeader.appendChild(headerDiv);
    }
    
    // Insert hero content
    if (heroContent) {
        const targetHero = document.querySelector('section.hero .hero-content');
        const heroDiv = document.createElement('div');
        heroDiv.setAttribute('data-lang-section', language);
        heroDiv.innerHTML = heroContent.innerHTML;
        targetHero.appendChild(heroDiv);
    }
    
    // Insert programs content
    if (programsContent) {
        const targetPrograms = document.querySelector('section.programs .container');
        const programsDiv = document.createElement('div');
        programsDiv.setAttribute('data-lang-section', language);
        programsDiv.innerHTML = programsContent.innerHTML;
        // Insert before the programs-grid
        targetPrograms.insertBefore(programsDiv, targetPrograms.querySelector('.programs-grid'));
    }
    
    // Insert CTA content
    if (ctaContent) {
        const targetCTA = document.querySelector('section.cta .container');
        const ctaDiv = document.createElement('div');
        ctaDiv.setAttribute('data-lang-section', language);
        ctaDiv.innerHTML = ctaContent.innerHTML;
        targetCTA.appendChild(ctaDiv);
    }
    
    // If this is the default language, activate it
    if (language === 'english') {
        setActiveLanguage(language);
    }
}
