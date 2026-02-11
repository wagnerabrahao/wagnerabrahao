document.addEventListener('DOMContentLoaded', () => {
    
    // 1. ANIMAÇÃO DE REVELAÇÃO (SCROLL REVEAL)
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = "1";
                entry.target.style.transform = "translateY(0)";
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.card, .poem, .philosophical-text').forEach(el => {
        el.style.opacity = "0";
        el.style.transform = "translateY(30px)";
        el.style.transition = "all 0.8s ease-out";
        observer.observe(el);
    });

    // 2. LOG DE LANÇAMENTO
    console.log("Portal Luz Interior de Wagner Abrahão: Ativado para Missão Reconforto.");
});
