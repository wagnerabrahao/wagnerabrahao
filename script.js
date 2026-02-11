document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.getElementById('menu-toggle');
    const navList = document.querySelector('nav');
    const containerLivros = document.getElementById('livros-dinamicos');

    // 1. CARREGAMENTO DINÂMICO DE LIVROS
    if (containerLivros) {
        fetch('books.json')
            .then(response => response.json())
            .then(livros => {
                containerLivros.innerHTML = livros.map(livro => `
                    <div class="card book-card">
                        <h3>${livro.titulo}</h3>
                        <p>${livro.descricao}</p>
                    </div>
                `).join('');
                console.log("Trilogia Wagner Abrahão carregada com sucesso.");
            })
            .catch(error => console.error("Erro ao carregar manuscritos:", error));
    }

    // 2. MENU MOBILE
    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            navList.style.display = navList.style.display === 'block' ? 'none' : 'block';
        });
    }

    // 3. SCROLL SUAVE
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
});
