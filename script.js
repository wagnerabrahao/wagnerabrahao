// script.js
document.addEventListener('DOMContentLoaded', function() {
    
    // ===== MENU MOBILE =====
    const menuToggle = document.getElementById('menu-toggle');
    const nav = document.querySelector('nav');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            nav.classList.toggle('active');
            // Mudar ícone do menu
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
                // Simulação de envio
                emailInput.value = '';
                
                // Mensagem de sucesso
                const successMessage = document.createElement('p');
                successMessage.textContent = 'Obrigado por se inscrever! Em breve você receberá nossas mensagens especiais.';
                successMessage.style.color = '#7a9a95';
                successMessage.style.marginTop = '15px';
                successMessage.style.fontWeight = '600';
                
                // Remover mensagem anterior se existir
                const existingMessage = newsletterForm.nextElementSibling;
                if (existingMessage && existingMessage.classList.contains('success-message')) {
                    existingMessage.remove();
                }
                
                successMessage.classList.add('success-message');
                newsletterForm.parentNode.insertBefore(successMessage, newsletterForm.nextSibling);
                
                // Remover mensagem após 5 segundos
                setTimeout(() => {
                    successMessage.remove();
                }, 5000);
            } else {
                // Mensagem de erro
                const errorMessage = document.createElement('p');
                errorMessage.textContent = 'Por favor, insira um email válido.';
                errorMessage.style.color = '#e74c3c';
                errorMessage.style.marginTop = '15px';
                
                // Remover mensagem anterior se existir
                const existingMessage = newsletterForm.nextElementSibling;
                if (existingMessage && existingMessage.classList.contains('error-message')) {
                    existingMessage.remove();
                }
                
                errorMessage.classList.add('error-message');
                newsletterForm.parentNode.insertBefore(errorMessage, newsletterForm.nextSibling);
                
                // Remover mensagem após 5 segundos
                setTimeout(() => {
                    errorMessage.remove();
                }, 5000);
            }
        });
    }
    
    // ===== ANIMAÇÃO DE SCROLL PARA SEÇÕES =====
    const sections = document.querySelectorAll('section');
    const navItems = document.querySelectorAll('.nav-link');
    
    // Observador de interseção para destacar item ativo no menu
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
    
    // ===== EFETIO DE DIGITAÇÃO NO TÍTULO PRINCIPAL =====
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
        
        // Iniciar efeito após um breve delay
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
    
    // Configurar estado inicial para animação
    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        cardObserver.observe(card);
    });
    
    // ===== BOTÃO DE VOLTAR AO TOPO =====
    // Criar botão
    const backToTopButton = document.createElement('button');
    backToTopButton.innerHTML = '<i class="fas fa-chevron-up"></i>';
    backToTopButton.className = 'back-to-top';
    backToTopButton.setAttribute('aria-label', 'Voltar ao topo');
    document.body.appendChild(backToTopButton);
    
    // Estilizar botão
    backToTopButton.style.position = 'fixed';
    backToTopButton.style.bottom = '30px';
    backToTopButton.style.right = '30px';
    backToTopButton.style.width = '50px';
    backToTopButton.style.height = '50px';
    backToTopButton.style.borderRadius = '50%';
    backToTopButton.style.backgroundColor = '#7a9a95';
    backToTopButton.style.color = 'white';
    backToTopButton.style.border = 'none';
    backToTopButton.style.fontSize = '1.2rem';
    backToTopButton.style.cursor = 'pointer';
    backToTopButton.style.boxShadow = '0 3px 10px rgba(0, 0, 0, 0.2)';
    backToTopButton.style.opacity = '0';
    backToTopButton.style.visibility = 'hidden';
    backToTopButton.style.transition = 'all 0.3s ease';
    backToTopButton.style.zIndex = '99';
    backToTopButton.style.display = 'flex';
    backToTopButton.style.alignItems = 'center';
    backToTopButton.style.justifyContent = 'center';
    
    // Mostrar/ocultar botão ao rolar
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTopButton.style.opacity = '1';
            backToTopButton.style.visibility = 'visible';
        } else {
            backToTopButton.style.opacity = '0';
            backToTopButton.style.visibility = 'hidden';
        }
    });
    
    // Voltar ao topo ao clicar
    backToTopButton.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // ===== CORREÇÃO DO LINK DE EMAIL =====
    // Garantir que todos os links de email abram o cliente de email
    const emailLinks = document.querySelectorAll('a[href^="mailto"]');
    emailLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Se o link não tiver um endereço de email válido, prevenir o comportamento padrão
            if (!this.href || this.href === 'mailto:') {
                e.preventDefault();
                // Mostrar um alerta amigável
                alert('Por favor, use um cliente de email configurado para entrar em contato conosco.');
            }
        });
    });
});
