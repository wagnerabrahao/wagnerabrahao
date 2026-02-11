// Efeito de scroll suave para os links do menu
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Mensagem de boas-vindas no console (Filosófica)
console.log("Wagner Abrahão - A Arquitetura do Invisível online.");

// Função para garantir que o áudio comece suave (opcional)
const audio = document.getElementById('bg-music');
if(audio) {
    audio.volume = 0.5; // Define volume médio
}
