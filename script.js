document.addEventListener('DOMContentLoaded', function() {
    
    // ===== MENU MOBILE =====
    const menuToggle = document.getElementById('menu-toggle');
    const nav = document.querySelector('nav');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            nav.classList.toggle('active');
            if (nav.classList.contains('active')) {
                menuToggle.classList.remove('fa-bars');
                menuToggle.classList.add('fa-times');
            } else {
                menuToggle.classList.remove('fa-times');
                menuToggle.classList.add('fa-bars');
            }
        });
    }
    
    // Fechar menu ao clicar em um link
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (nav.classList.contains('active')) {
                nav.classList.remove('active');
                menuToggle.classList.remove('fa-times');
                menuToggle.classList.add('fa-bars');
            }
        });
    });
    
    // ===== FORMULÁRIO DE NEWSLETTER =====
    const newsletterForm = document.getElementById('newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const emailInput = this.querySelector('input[type="email"]');
            const email = emailInput.value;
            
            if (email && validateEmail(email)) {
                emailInput.value = '';
                const successMessage = document.createElement('p');
                successMessage.textContent = 'Obrigado por se inscrever! Em breve você receberá nossas mensagens especiais.';
                successMessage.style.color = '#7a9a95';
                successMessage.style.marginTop = '15px';
                successMessage.style.fontWeight = '600';
                successMessage.classList.add('success-message');
                
                const existingMessage = newsletterForm.nextElementSibling;
                if (existingMessage && existingMessage.classList.contains('success-message')) {
                    existingMessage.remove();
                }
                newsletterForm.parentNode.insertBefore(successMessage, newsletterForm.nextSibling);
                
                setTimeout(() => {
                    successMessage.remove();
                }, 5000);
            } else {
                const errorMessage = document.createElement('p');
                errorMessage.textContent = 'Por favor, insira um email válido.';
                errorMessage.style.color = '#e74c3c';
                errorMessage.style.marginTop = '15px';
                errorMessage.classList.add('error-message');
                
                const existingMessage = newsletterForm.nextElementSibling;
                if (existingMessage && existingMessage.classList.contains('error-message')) {
                    existingMessage.remove();
                }
                newsletterForm.parentNode.insertBefore(errorMessage, newsletterForm.nextSibling);
                
                setTimeout(() => {
                    errorMessage.remove();
                }, 5000);
            }
        });
    }
    
    // ===== ANIMAÇÃO DE SCROLL PARA SEÇÕES =====
    const sections = document.querySelectorAll('section');
    const navItems = document.querySelectorAll('.nav-link');
    
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.3
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                navItems.forEach(item => {
                    item.classList.remove('active');
                    if (item.getAttribute('href') === `#${id}`) {
                        item.classList.add('active');
                    }
                });
            }
        });
    }, observerOptions);
    
    sections.forEach(section => {
        observer.observe(section);
    });
    
    // ===== FUNÇÃO PARA VALIDAR EMAIL =====
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
    
    // ===== EFEITO DE DIGITAÇÃO NO TÍTULO PRINCIPAL =====
    const heroTitle = document.querySelector('.hero h2');
    if (heroTitle) {
        const originalText = heroTitle.textContent;
        heroTitle.textContent = '';
        let i = 0;
        function typeWriter() {
            if (i < originalText.length) {
                heroTitle.textContent += originalText.charAt(i);
                i++;
                setTimeout(typeWriter, 50);
            }
        }
        setTimeout(typeWriter, 500);
    }
    
    // ===== ANIMAÇÃO DE CARDS AO ROLAR =====
    const cards = document.querySelectorAll('.card, .poem, .meditation');
    const cardObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1
    });
    
    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        cardObserver.observe(card);
    });
    
    // ===== BOTÃO DE VOLTAR AO TOPO (COM CLASSE CSS) =====
    const backToTopButton = document.createElement('button');
    backToTopButton.innerHTML = '<i class="fas fa-chevron-up"></i>';
    backToTopButton.className = 'back-to-top';
    backToTopButton.setAttribute('aria-label', 'Voltar ao topo');
    document.body.appendChild(backToTopButton);
    
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTopButton.classList.add('show');
        } else {
            backToTopButton.classList.remove('show');
        }
    });
    
    backToTopButton.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
});
