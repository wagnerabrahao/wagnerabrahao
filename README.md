<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=yes">
    <title>Wagner Abrahão | Arquiteto do Invisível</title>
    <meta name="description" content="Arquiteto das frequências que acolhem e iluminam. Obras, poemas e manuscritos de Wagner Abrahão.">
    <link href="https://fonts.googleapis.com/css2?family=Bodoni+Moda:ital,wght@0,700;0,900;1,400&family=Marcellus&family=Great+Vibes&display=swap" rel="stylesheet">
    <style>
        :root { 
            --gold: #D4AF37; 
            --bright-gold: #FFD700; 
            --silver: #E0E0E0; 
            --white: #ffffff; 
            --glass-dark: rgba(5, 5, 5, 0.9); 
            --lapis: #00ffff; 
            --dark-bg: #000;
        }
        * { 
            margin: 0; 
            padding: 0; 
            box-sizing: border-box; 
            -webkit-tap-highlight-color: transparent; 
        }
        body, html { 
            background: var(--dark-bg); 
            color: var(--white); 
            font-family: 'Marcellus', serif; 
            overflow-x: hidden; 
            height: 100%; 
            cursor: none; 
        }
        #canvas-3d { 
            position: fixed; 
            inset: 0; 
            z-index: 1; 
            pointer-events: auto; 
        }
        #cursor { 
            width: 12px; 
            height: 12px; 
            background: var(--white); 
            border-radius: 50%; 
            position: fixed; 
            pointer-events: none; 
            z-index: 10000; 
            box-shadow: 0 0 25px 10px var(--white), 0 0 50px 20px var(--bright-gold); 
            transform: translate(-50%, -50%); 
            mix-blend-mode: screen; 
        }
        #gate { 
            position: fixed; 
            inset: 0; 
            z-index: 9999; 
            display: flex; 
            align-items: center; 
            justify-content: center; 
            background: var(--dark-bg); 
            transition: opacity 1.5s ease, visibility 1.5s ease; 
        }
        #gate.hidden { 
            opacity: 0; 
            visibility: hidden; 
        }
        #gate-bg { 
            position: absolute; 
            inset: 0; 
            background: url('https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=2070&auto=format&fit=crop') center/cover; 
            filter: brightness(0.2); 
        }
        .gate-content { 
            position: relative; 
            z-index: 10; 
            text-align: center; 
            padding: 20px;
        }
        .gate-title { 
            font-family: 'Bodoni Moda'; 
            font-size: clamp(2.5rem, 10vw, 5rem); 
            font-weight: 900; 
            letter-spacing: 15px; 
            text-transform: uppercase; 
            color: var(--silver); 
            margin-bottom: 30px;
            text-shadow: 0 0 10px rgba(255, 255, 255, 0.5);
        }
        .gate-btn { 
            border: 2px solid var(--bright-gold); 
            color: var(--white); 
            background: rgba(212, 175, 55, 0.1); 
            padding: 20px 60px; 
            cursor: pointer; 
            font-family: 'Bodoni Moda'; 
            letter-spacing: 8px; 
            text-transform: uppercase; 
            margin-top: 30px; 
            transition: all 0.5s; 
            backdrop-filter: blur(10px); 
            animation: goldPulse 3s infinite; 
            font-size: 1rem;
            border-radius: 2px;
        }
        .gate-btn:hover, .gate-btn:focus { 
            background: rgba(212, 175, 55, 0.3); 
            transform: scale(1.05); 
            outline: none;
        }
        @keyframes goldPulse { 
            0%, 100% { box-shadow: 0 0 10px var(--gold); } 
            50% { box-shadow: 0 0 30px var(--bright-gold); } 
        }
        nav { 
            position: fixed; 
            top: 0; 
            width: 100%; 
            display: flex; 
            justify-content: center; 
            flex-wrap: wrap; 
            gap: 20px; 
            padding: 20px 10px; 
            z-index: 2000; 
            opacity: 0; 
            transition: opacity 1s ease; 
            background: linear-gradient(to bottom, rgba(0,0,0,0.9), transparent); 
        }
        nav.visible { 
            opacity: 1; 
        }
        nav a { 
            color: var(--silver); 
            text-decoration: none; 
            text-transform: uppercase; 
            letter-spacing: 2px; 
            font-size: 0.75rem; 
            cursor: pointer; 
            opacity: 0.6; 
            transition: all 0.5s; 
            padding: 5px 10px;
            border-bottom: 1px solid transparent;
        }
        nav a:hover, nav a.active, nav a:focus { 
            opacity: 1; 
            color: var(--gold); 
            border-bottom: 1px solid var(--gold); 
            outline: none;
        }
        .container { 
            position: relative; 
            z-index: 100; 
            min-height: 100vh; 
            width: 100%; 
            display: flex; 
            flex-direction: column; 
            align-items: center; 
            opacity: 0; 
            transition: opacity 1s ease; 
            padding: 150px 8% 100px; 
            overflow-y: auto; 
            scrollbar-width: none; 
        }
        .container.visible { 
            opacity: 1; 
        }
        .page { 
            display: none; 
            width: 100%; 
            max-width: 1000px; 
            animation: slideUp 1s ease forwards; 
        }
        .page.active { 
            display: block; 
        }
        @keyframes slideUp { 
            from { opacity: 0; transform: translateY(30px); } 
            to { opacity: 1; transform: translateY(0); } 
        }
        .secao-titulo { 
            font-family: 'Bodoni Moda'; 
            color: var(--gold); 
            font-size: clamp(1.5rem, 4vw, 2rem); 
            text-align: center; 
            margin-bottom: 40px; 
            letter-spacing: 8px; 
            text-transform: uppercase; 
            border-bottom: 1px solid rgba(212,175,55,0.2); 
            padding-bottom: 15px; 
        }
        
        /* ESTILO OPACO E FOSCO (BLUR 50PX) */
        .verbo-text-block, .caixa-dourada { 
            background: var(--glass-dark); 
            padding: 30px; 
            margin-bottom: 30px;
            border: 1px solid rgba(212,175,55,0.3); 
            border-radius: 2px;
            backdrop-filter: blur(30px); 
            -webkit-backdrop-filter: blur(30px);
            text-align: center; 
            transition: all 0.5s;
        }
        .verbo-text-block:hover, .caixa-dourada:hover { 
            transform: translateY(-5px);
            box-shadow: 0 10px 30px rgba(212, 175, 55, 0.1);
            border-color: rgba(212,175,55,0.5);
        }
        .verbo-header { 
            font-family: 'Bodoni Moda'; 
            color: var(--gold); 
            font-size: 1.3rem; 
            margin-bottom: 20px; 
            letter-spacing: 3px; 
            text-transform: uppercase; 
        }
        .verbo-content { 
            color: var(--silver); 
            line-height: 1.8; 
            font-style: italic; 
            font-size: 1.1rem; 
        }

        /* MANUSCRITOS DOURADOS */
        .livro-titulo { 
            color: var(--gold) !important; 
            font-family: 'Bodoni Moda'; 
            text-transform: uppercase; 
            margin-bottom: 15px; 
            font-size: 1.3rem;
        }
        .livro-resumo { 
            color: var(--white) !important; 
            font-size: 1rem; 
            opacity: 0.9; 
            line-height: 1.6; 
            margin-bottom: 15px;
        }
        .livro-assinatura { 
            color: var(--gold) !important; 
            font-family: 'Great Vibes'; 
            font-size: 1.8rem; 
            margin-top: 20px; 
        }

        .social-portal-grid { 
            display: flex; 
            gap: 20px; 
            justify-content: center; 
            margin-top: 40px; 
            flex-wrap: wrap;
        }
        .portal-btn { 
            width: 50px; 
            height: 50px; 
            border: 2px solid var(--lapis); 
            border-radius: 50%; 
            display: flex; 
            align-items: center; 
            justify-content: center; 
            fill: var(--lapis); 
            transition: all 0.5s; 
            background: rgba(0,255,255,0.05); 
        }
        .portal-btn:hover, .portal-btn:focus { 
            background: var(--lapis); 
            fill: var(--dark-bg); 
            transform: scale(1.1); 
            outline: none;
        }

        /* Responsividade aprimorada */
        @media (max-width: 768px) { 
            body { cursor: auto; } 
            #cursor { display: none !important; } 
            .container { padding: 120px 5% 80px; } 
            nav { gap: 10px; padding: 15px 5px; }
            nav a { font-size: 0.7rem; letter-spacing: 1px; }
            .gate-title { letter-spacing: 8px; }
            .gate-btn { padding: 15px 40px; letter-spacing: 5px; }
            .verbo-text-block, .caixa-dourada { 
                padding: 20px; 
                margin-bottom: 20px;
                backdrop-filter: blur(20px);
            }
        }

        @media (max-width: 480px) {
            .gate-title { letter-spacing: 5px; }
            .gate-btn { padding: 12px 30px; font-size: 0.9rem; }
            .secao-titulo { letter-spacing: 5px; }
        }

        /* Melhorias de acessibilidade */
        .sr-only {
            position: absolute;
            width: 1px;
            height: 1px;
            padding: 0;
            margin: -1px;
            overflow: hidden;
            clip: rect(0, 0, 0, 0);
            white-space: nowrap;
            border: 0;
        }

        /* Scroll suave */
        html {
            scroll-behavior: smooth;
        }

        /* Foco visível para navegação por teclado */
        *:focus {
            outline: 2px solid var(--bright-gold);
            outline-offset: 2px;
        }
    </style>
</head>
<body>
    <div id="cursor"></div>
    <canvas id="canvas-3d"></canvas>

    <div id="gate">
        <div id="gate-bg"></div>
        <div class="gate-content">
            <h1 class="gate-title">Wagner Abrahão</h1>
            <p style="color: var(--silver); margin-bottom: 20px; font-style: italic;">Arquiteto do Invisível</p>
            <button class="gate-btn" onclick="unlock()" id="unlock-btn">Ativar Harmonia</button>
            <p style="color: var(--silver); margin-top: 20px; font-size: 0.9rem; opacity: 0.7;">Aperte qualquer tecla ou clique para entrar</p>
        </div>
    </div>

    <nav id="main-nav">
        <a href="#home" onclick="show('home')" class="active" aria-current="page">O Arquiteto</a>
        <a href="#contos" onclick="show('contos')">Poemas e Aforismos</a>
        <a href="#obras" onclick="show('obras')">Manuscritos</a>
        <a href="#contato" onclick="show('contato')">Contato</a>
    </nav>

    <div class="container" id="main-container">
        <div id="home" class="page active">
            <div class="verbo-text-block">
                <div class="verbo-content">
                    "Arquiteto das frequências que acolhem e iluminam. Minha obra busca ser apenas um suporte para quem procura acalento na densidade da vida. Através da harmonia do Verbo, convido você a reconhecermos, juntos, a arquitetura de luz que já habita em cada um de nós."
                </div>
                <div style="font-family:'Great Vibes'; font-size:3rem; color:var(--gold); text-align:right; margin-top:30px;">Wagner Abrahão</div>
            </div>
        </div>

        <div id="contos" class="page">
            <h2 class="secao-titulo">Poemas e Aforismos</h2>
            <div class="verbo-text-block">
                <div class="verbo-header">Anestesia Divina</div>
                <div class="verbo-content">Dante não sabia que estava dormindo. Durante quarenta e dois anos, viveu em estado de anestesia divina. Excesso de rotina, de precisão, de identidades fixas. Sua existência era um Lá central perpétuo. Até que a perda se tornou revelação.</div>
            </div>
            <div class="verbo-text-block">
                <div class="verbo-header">A Arquitetura do Invisível</div>
                <div class="verbo-content">"O corpo não mente; ele traduz o que a alma não consegue mais carregar. Quando o ego silencia, os sentidos se expandem para oferecer suporte ao próximo. Onde despertar e paz se encontram, o Arquiteto constrói pontes de sabedoria."</div>
            </div>
        </div>

        <div id="obras" class="page">
            <h2 class="secao-titulo">Manuscritos</h2>
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 25px;">
                <div class="caixa-dourada" tabindex="0"><h3 class="livro-titulo">A Anestesia Divina</h3><p class="livro-resumo">O despertar místico através da rendição absoluta ao invisível.</p><div class="livro-assinatura">Wagner Abrahão</div></div>
                <div class="caixa-dourada" tabindex="0"><h3 class="livro-titulo">A Arquitetura do Invisível</h3><p class="livro-resumo">Um tratado sobre as estruturas ocultas que sustentam a realidade eterna.</p><div class="livro-assinatura">Wagner Abrahão</div></div>
                <div class="caixa-dourada" tabindex="0"><h3 class="livro-titulo">A Centelha Inquieta</h3><p class="livro-resumo">A jornada poética da luz que resiste ao vácuo da matéria.</p><div class="livro-assinatura">Wagner Abrahão</div></div>
                <div class="caixa-dourada" tabindex="0"><h3 class="livro-titulo">Alquimia do Ser</h3><p class="livro-resumo">Saga alquímica sobre a conexão das frequências espirituais.</p><div class="livro-assinatura">Wagner Abrahão</div></div>
            </div>
        </div>

        <div id="contato" class="page">
            <h2 class="secao-titulo" style="margin-bottom: 20px;">Contato</h2>
            <div class="verbo-text-block" style="max-width: 600px; margin: 0 auto;">
                <p style="color: var(--silver); margin-bottom: 30px; line-height: 1.8;">
                    Para conversas sobre arquitetura espiritual, colaborações ou simplesmente compartilhar reflexões, estou disponível através dos canais abaixo.
                </p>
                <a href="mailto:wagner.abrahao.31@gmail.com" style="color:var(--white); font-size: 1.2rem; text-decoration: none; border-bottom: 2px solid var(--gold); font-family: 'Bodoni Moda'; padding-bottom: 5px;">
                    wagner.abrahao.31@gmail.com
                </a>
                <div class="social-portal-grid">
                    <a href="https://www.instagram.com/wagnerabrahao_/" target="_blank" class="portal-btn" aria-label="Instagram">
                        <svg viewBox="0 0 24 24" width="24"><path d="M7.75 2h8.5A5.75 5.75 0 0 1 22 7.75v8.5A5.75 5.75 0 0 1 16.25 22h-8.5A5.75 5.75 0 0 1 2 16.25v-8.5A5.75 5.75 0 0 1 7.75 2zm0 1.5a4.25 4.25 0 0 0-4.25 4.25v8.5a4.25 4.25 0 0 0 4.25 4.25h8.5a4.25 4.25 0 0 0 4.25-4.25v-8.5a4.25 4.25 0 0 0-4.25-4.25h-8.5zm8.12 3.63a.87.87 0 1 1 0 1.74.87.87 0 0 1 0-1.74zM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10zm0 1.5a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7z"/></svg>
                    </a>
                    <a href="https://www.tiktok.com/@wagner.abrahao" target="_blank" class="portal-btn" aria-label="TikTok">
                        <svg viewBox="0 0 24 24" width="24"><path d="M12.53.02C13.84 0 15.14.01 16.44 0c.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.06-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.03 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.28-2.26.54-4.5 2.1-6.11 1.62-1.67 3.97-2.58 6.3-2.4v4.27c-1.2-.07-2.47.3-3.36 1.12-.8.71-1.22 1.75-1.17 2.82.02 1.02.48 2.04 1.25 2.73.94.83 2.27 1.12 3.48.77 1.14-.27 2.09-1.15 2.53-2.22.18-.51.25-1.05.24-1.58.02-3.34 0-6.68.01-10.03z"/></svg>
                    </a>
                    <a href="https://www.threads.com/@wagnerabrahao_" target="_blank" class="portal-btn" aria-label="Threads">
                        <svg viewBox="0 0 24 24" width="24"><path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm0 18a8 8 0 1 1 8-8 8 8 0 0 1-8 8z"/><path d="M15.11 15.06a3.59 3.59 0 0 1-2.92 1.44 3.39 3.39 0 0 1-3.41-3.39 3.39 3.39 0 0 1 3.41-3.39c.86 0 1.63.31 2.22.82l1.04-1.12a5.16 5.16 0 0 0-3.26-1.19 4.88 4.88 0 0 0-4.91 4.88 4.88 4.88 0 0 0 4.91 4.88c1.37 0 2.58-.57 3.44-1.48l-1.52-1.45z"/></svg>
                    </a>
                </div>
            </div>
        </div>
    </div>

    <div id="yt-player" style="display:none;"></div>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/three@0.128.0/examples/js/controls/OrbitControls.js"></script>
    <script src="https://www.youtube.com/iframe_api"></script>

    <script>
        // Variáveis globais
        let player, isReady = false;
        let isUnlocked = false;
        
        // Função da API do YouTube
        function onYouTubeIframeAPIReady() {
            player = new YT.Player('yt-player', {
                height: '0', 
                width: '0', 
                videoId: 'UkgSbK_PjXw',
                playerVars: { 
                    'autoplay': 1, 
                    'controls': 0, 
                    'mute': 1, 
                    'loop': 1, 
                    'playlist': 'UkgSbK_PjXw', 
                    'playsinline': 1 
                },
                events: { 
                    'onReady': (e) => { 
                        isReady = true; 
                        console.log('YouTube Player está pronto');
                    },
                    'onStateChange': (e) => {
                        // Log para depuração
                        if (e.data === YT.PlayerState.PLAYING) {
                            console.log('Vídeo está tocando');
                        }
                    }
                }
            });
        }
        
        // Função para desbloquear a experiência
        function unlock() {
            if (isUnlocked) return;
            
            console.log('Desbloqueando experiência...');
            isUnlocked = true;
            
            // Ativar música se estiver pronta
            if (isReady && player) { 
                try {
                    player.unMute(); 
                    player.setVolume(50); // Volume mais moderado
                    player.playVideo(); 
                    
                    // Reforço mobile para garantir o play
                    setTimeout(() => { 
                        try { 
                            player.playVideo(); 
                        } catch(e) {
                            console.log('Erro ao tentar tocar vídeo:', e);
                        }
                    }, 100);
                } catch(e) {
                    console.log('Erro ao controlar player:', e);
                }
            } else {
                console.log('Player não está pronto ainda');
            }
            
            // Animação de saída do portal
            const gate = document.getElementById('gate');
            gate.classList.add('hidden');
            
            // Mostrar navegação e conteúdo
            setTimeout(() => {
                document.getElementById('main-nav').classList.add('visible');
                document.getElementById('main-container').classList.add('visible');
                
                // Foco no primeiro elemento navegável para acessibilidade
                document.querySelector('nav a').focus();
            }, 800);
        }
        
        // Função para navegar entre páginas
        function show(id) { 
            document.querySelectorAll('.page').forEach(p => p.classList.remove('active')); 
            document.querySelectorAll('nav a').forEach(a => a.classList.remove('active')); 
            document.getElementById(id).classList.add('active');
            
            // Ativar link correspondente
            const activeLink = Array.from(document.querySelectorAll('nav a')).find(a => 
                a.getAttribute('href') === `#${id}` || a.onclick && a.onclick.toString().includes(`'${id}'`)
            );
            if (activeLink) {
                activeLink.classList.add('active');
            }
            
            // Scroll para o topo da página
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
        
        // Cena 3D
        let scene, camera, renderer, controls, pyramid;
        
        function init3DScene() {
            // Configurar cena
            scene = new THREE.Scene();
            camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 4000);
            renderer = new THREE.WebGLRenderer({ 
                canvas: document.getElementById('canvas-3d'), 
                alpha: true, 
                antialias: true 
            });
            renderer.setSize(window.innerWidth, window.innerHeight);
            camera.position.set(0, 150, 500);
            
            // Controles de órbita
            controls = new THREE.OrbitControls(camera, renderer.domElement);
            controls.enableDamping = true; 
            controls.autoRotate = true; 
            controls.autoRotateSpeed = 0.5;
            controls.minDistance = 200;
            controls.maxDistance = 1000;
            
            // Iluminação
            scene.add(new THREE.AmbientLight(0xffffff, 0.8));
            const sun = new THREE.DirectionalLight(0xffffff, 1.2); 
            sun.position.set(500, 500, 500); 
            scene.add(sun);
            
            // Estrelas de fundo
            const starGeo = new THREE.BufferGeometry(); 
            const starC = [];
            for(let i = 0; i < 10000; i++) {
                starC.push(
                    THREE.MathUtils.randFloatSpread(3000), 
                    THREE.MathUtils.randFloatSpread(3000), 
                    THREE.MathUtils.randFloatSpread(3000)
                );
            }
            starGeo.setAttribute('position', new THREE.Float32BufferAttribute(starC, 3));
            scene.add(new THREE.Points(starGeo, new THREE.PointsMaterial({ 
                color: 0xffffff, 
                size: 0.7 
            })));
            
            // PIRÂMIDE DE QUÉOPS PRATEADA MODERNA
            pyramid = new THREE.Group();
            const silverM = new THREE.MeshStandardMaterial({ 
                color: 0xC0C0C0, 
                metalness: 0.9, 
                roughness: 0.1 
            });
            
            let levels = 160; 
            let baseSize = 300; 
            let h = 2;
            
            for(let i = 0; i < levels; i++) {
                let size = baseSize * (1 - i/levels); 
                if(size < 1) break;
                
                let layer = new THREE.Mesh(
                    new THREE.BoxGeometry(size, h, size), 
                    silverM
                );
                layer.position.set(0, i*h, 0);
                pyramid.add(layer);
            }
            
            const cap = new THREE.Mesh(
                new THREE.ConeGeometry(15, 25, 4), 
                new THREE.MeshStandardMaterial({
                    color: 0xFFD700, 
                    metalness: 1,
                    roughness: 0.2
                })
            );
            cap.position.y = levels*h + 10; 
            pyramid.add(cap);
            pyramid.position.y = -150; 
            scene.add(pyramid);
            
            // Animação
            function animate() { 
                requestAnimationFrame(animate); 
                
                // Rotação suave da pirâmide
                pyramid.rotation.y += 0.0005;
                
                controls.update(); 
                renderer.render(scene, camera); 
            }
            animate();
        }
        
        // Cursor personalizado
        function initCustomCursor() {
            if(window.innerWidth > 768) {
                document.addEventListener('mousemove', (e) => { 
                    const cursor = document.getElementById('cursor'); 
                    cursor.style.left = e.clientX + 'px'; 
                    cursor.style.top = e.clientY + 'px'; 
                });
            }
        }
        
        // Event Listeners
        document.addEventListener('DOMContentLoaded', () => {
            // Inicializar cena 3D
            init3DScene();
            
            // Inicializar cursor personalizado
            initCustomCursor();
            
            // Permitir desbloqueio com tecla
            document.addEventListener('keydown', (e) => {
                if (!isUnlocked) {
                    unlock();
                }
            });
            
            // Permitir desbloqueio com clique/touch em qualquer lugar do portal
            document.getElementById('gate').addEventListener('click', unlock);
            
            // Foco no botão de desbloqueio para acessibilidade
            document.getElementById('unlock-btn').focus();
            
            // Ajustar cena 3D ao redimensionar janela
            window.addEventListener('resize', () => { 
                camera.aspect = window.innerWidth / window.innerHeight; 
                camera.updateProjectionMatrix(); 
                renderer.setSize(window.innerWidth, window.innerHeight); 
            });
            
            // Atualizar ano no footer se necessário
            const currentYear = new Date().getFullYear();
            document.querySelectorAll('.current-year').forEach(el => {
                el.textContent = currentYear;
            });
        });
        
        // Função auxiliar para detectar dispositivos móveis
        function isMobileDevice() {
            return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
        }
    </script>
</body>
</html>
