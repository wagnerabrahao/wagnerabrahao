document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.getElementById('menu-toggle');
    const navList = document.querySelector('nav');

    // Menu Mobile
    menuToggle.addEventListener('click', () => {
        navList.style.display = navList.style.display === 'block' ? 'none' : 'block';
    });

    // Scroll Suave
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    console.log("Portal Wagner Abrahão: Estabilizado e Ativo.");
});
