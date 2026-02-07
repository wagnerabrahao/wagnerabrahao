<!DOCTYPE html>
<html lang="pt-br" data-domain="wagnerabrahao.com.br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0">
    <title>Wagner Abrahão | Arquiteto do Invisível</title>
    
    <link rel="canonical" href="https://wagnerabrahao.com.br">
    <meta name="description" content="Site oficial de Wagner Abrahão - Arquiteto do Invisível. Poesia, espiritualidade, manuscritos e arquitetura.">
    <meta property="og:title" content="Wagner Abrahão | Arquiteto do Invisível">
    <meta property="og:url" content="https://wagnerabrahao.com.br">
    
    <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400;700;900&family=Cormorant+Garamond:ital,wght@0,300;0,400;0,700;1,300&family=Great+Vibes&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    
    <style>
        :root {
            --dominio-ouro: #D4AF37;
            --dominio-bright: #FFD700;
            --dominio-prata: #E8E8E8;
            --glass-dark: rgba(10, 10, 10, 0.9);
            --lapis: #00FFFF;
        }

        * { margin: 0; padding: 0; box-sizing: border-box; -webkit-tap-highlight-color: transparent; }
        body, html { background: #000; color: #fff; font-family: 'Cormorant Garamond', serif; overflow-x: hidden; height: 100%; cursor: none; }

        #canvas-3d { position: fixed; inset: 0; z-index: 1; pointer-events: auto; }
        #cursor { width: 12px; height: 12px; background: #fff; border-radius: 50%; position: fixed; pointer-events: none; z-index: 10000; box-shadow: 0 0 25px 10px #fff, 0 0 50px 20px var(--dominio-ouro); transform: translate(-50%, -50%); mix-blend-mode: screen; }

        /* PORTAL DE ENTRADA */
        #portal-dominio { position: fixed; inset: 0; z-index: 9999; background: #000; display: flex; justify-content: center; align-items: center; transition: 2s; }
        #portal-bg { position: absolute; inset: 0; background: url('https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=2070&auto=format&fit=crop') center/cover; filter: brightness(0.2); }
        .portal-content { position: relative; z-index: 10; text-align: center; width: 90%; }
        .dominio-titulo { font-family: 'Cinzel', serif; font-size: clamp(2.5rem, 10vw, 5rem); letter-spacing: 0.3em; background: linear-gradient(135deg, #D4AF37, #FFD700); -webkit-background-clip: text; color: transparent; margin-bottom: 1rem; animation: pulse 4s infinite; }
        .gate-btn { border: 2px solid var(--dominio-ouro); color: #fff; background: rgba(212, 175, 55, 0.1); padding: 25px 80px; cursor: pointer; font-family: 'Cinzel'; letter-spacing: 5px; text-transform: uppercase; margin-top: 50px; transition: 0.5s; backdrop-filter: blur(10px); }

        /* NAVEGAÇÃO */
        nav { position: fixed; top: 0; width: 100%; display: flex; justify-content: center; flex-wrap: wrap; gap: 30px; padding: 30px 10px; z-index: 2000; opacity: 0; transition: 2s; background: linear-gradient(to bottom, rgba(0,0,0,0.95), transparent); backdrop-filter: blur(10px); }
        nav a { color: var(--dominio-prata); text-decoration: none; text-transform: uppercase; letter-spacing: 2px; font-size: 0.8rem; cursor: pointer; opacity: 0.6; transition: 0.5s; font-family: 'Cinzel'; }
        nav a:hover, nav a.active { opacity: 1; color: var(--dominio-ouro); border-bottom: 1px solid var(--dominio-ouro); }

        /* CONTEÚDO */
        .container { position: relative; z-index: 100; height: 100vh; width: 100%; display: flex; flex-direction: column; align-items: center; opacity: 0; transition: 2s; padding: 150px 8% 100px; overflow-y: auto; scrollbar-width: none; }
        .container::-webkit-scrollbar { display: none; }
        .pagina-dominio { display: none; width: 100%; max-width: 1100px; animation: slideUp 1s forwards; }
        .pagina-dominio.active { display: block; }
        @keyframes slideUp { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }

        .titulo-secao { font-family: 'Cinzel'; color: var(--dominio-ouro); font-size: 2.2rem; text-align: center; margin-bottom: 60px; letter-spacing: 10px; text-transform: uppercase; border-bottom: 1px solid rgba(212,175,55,0.3); padding-bottom: 15px; }

        /* ESTILO DOS CARDS (BLUR 50PX & OPACO) */
        .card-dominio, .obra-card { 
            font-size: 1.3rem; line-height: 2; color: var(--dominio-prata); 
            padding: 50px; background: var(--glass-dark);
            border: 1px solid rgba(212,175,55,0.2); width: 100%;
            backdrop-filter: blur(50px); -webkit-backdrop-filter: blur(50px);
            margin-bottom: 40px; text-align: center;
        }
        .card-titulo { font-family: 'Cinzel'; color: var(--dominio-ouro); margin-bottom: 20px; letter-spacing: 3px; }
        .assinatura-card { font-family: 'Great Vibes'; font-size: 2.5rem; color: var(--dominio-ouro); text-align: right; margin-top: 30px; }

        .grid-obras { display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 30px; }
        .rede-icon { width: 50px; height: 50px; border-radius: 50%; border: 1px solid var(--lapis); display: flex; align-items: center; justify-content: center; color: var(--lapis); text-decoration: none; transition: 0.4s; }
        .rede-icon:hover { background: var(--lapis); color: #000; transform: scale(1.1); }

        @media (max-width: 768px) { body { cursor: auto; } #cursor { display: none !important; } .container { padding-top: 130px; } }
        @keyframes pulse { 0%, 100% { transform: scale(1); opacity: 0.8; } 50% { transform: scale(1.02); opacity: 1; } }
    </style>
</head>
<body>

    <div id="cursor"></div>
    <canvas id="canvas-3d"></canvas>

    <div id="portal-dominio">
        <div id="portal-bg"></div>
        <div class="portal-content">
            <h1 class="dominio-titulo">WAGNER ABRAHÃO</h1>
            <div style="font-family:'Great Vibes'; font-size:2.5rem; color:#fff; margin-top:10px;">Arquiteto do Invisível</div>
            <button class="gate-btn" onclick="unlock()">Ativar Harmonia</button>
            <div style="font-family:'Cinzel'; color:var(--lapis); margin-top:30px; letter-spacing:4px; opacity:0.6;">wagnerabrahao.com.br</div>
        </div>
    </div>

    <nav id="nav-dominio">
        <a onclick="mostrarPagina('inicio')" class="active">O Arquiteto</a>
        <a onclick="mostrarPagina('poemas')">Poemas</a>
        <a onclick="mostrarPagina('obras')">Manuscritos</a>
        <a onclick="mostrarPagina('afins')">Afins</a>
        <a onclick="mostrarPagina('contato')">Contato</a>
    </nav>

    <div class="container" id="main-container">
        <section id="inicio" class="pagina-dominio active">
            <h2 class="titulo-secao">O Arquiteto do Invisível</h2>
            <div class="card-dominio">
                <p>"Arquiteto das frequências que acolhem e iluminam. Minha obra busca ser apenas um suporte para quem procura acalento na densidade da vida. Através da harmonia do Verbo, convido você a reconhecermos, juntos, a arquitetura de luz que já habita em cada um de nós."</p>
                <div class="assinatura-card">Wagner Abrahão</div>
            </div>
        </section>

        <section id="poemas" class="pagina-dominio">
            <h2 class="titulo-secao">Poemas Arcanos</h2>
            <div class="card-dominio">
                <h3 class="card-titulo">ANESTESIA DIVINA</h3>
                <p style="font-style: italic;">Dante não sabia que estava dormindo. Durante quarenta e dois anos, viveu em estado de anestesia divina. Excesso de rotina, de precisão, de identidades fixas. Sua existência era um Lá central perpétuo. Até que a perda se tornou revelação.</p>
                <div class="assinatura-card">Wagner Abrahão</div>
            </div>
            <div class="card-dominio">
                <h3 class="card-titulo">ARQUITETURA DO INVISÍVEL</h3>
                <p style="font-style: italic;">"O corpo não mente; ele traduz o que a alma não consegue mais carregar. Quando o ego silencia, os sentidos se expandem para oferecer suporte ao próximo. Onde despertar e paz se encontram, o Arquiteto constrói pontes de sabedoria."</p>
                <div class="assinatura-card">Wagner Abrahão</div>
            </div>
        </section>

        <section id="obras" class="pagina-dominio">
            <h2 class="titulo-secao">Manuscritos</h2>
            <div class="grid-obras">
                <div class="obra-card"><h3 class="card-titulo">A Anestesia Divina</h3><p>O despertar místico através da rendição absoluta ao invisível.</p><div class="assinatura-card" style="font-size:1.8rem;">Wagner Abrahão</div></div>
                <div class="obra-card"><h3 class="card-titulo">A Arquitetura do Invisível</h3><p>Um tratado sobre as estruturas ocultas que sustentam a realidade eterna.</p><div class="assinatura-card" style="font-size:1.8rem;">Wagner Abrahão</div></div>
                <div class="obra-card"><h3 class="card-titulo">A Centelha Inquieta</h3><p>A jornada poética da luz que resiste ao vácuo da matéria.</p><div class="assinatura-card" style="font-size:1.8rem;">Wagner Abrahão</div></div>
                <div class="obra-card"><h3 class="card-titulo">Alquimia do Ser</h3><p>Saga alquímica sobre a conexão das frequências espirituais.</p><div class="assinatura-card" style="font-size:1.8rem;">Wagner Abrahão</div></div>
            </div>
        </section>

        <section id="afins" class="pagina-dominio">
            <h2 class="titulo-secao">Afins</h2>
            <div class="card-dominio">
                <h3 class="card-titulo">AFORISMOS</h3>
                <p>"O despertar não é alcançar algo novo, mas reconhecer o que sempre foi. A verdadeira morada não tem paredes - habita no silêncio entre os pensamentos."</p>
                <div class="assinatura-card">Wagner Abrahão</div>
            </div>
        </section>

        <section id="contato" class="pagina-dominio">
            <h2 class="titulo-secao">Contato</h2>
            <div class="card-dominio">
                <a href="mailto:wagner.abrahao.31@gmail.com" style="color:var(--dominio-ouro); text-decoration:none; font-family:'Cinzel';">wagner.abrahao.31@gmail.com</a>
                <div style="display:flex; justify-content:center; gap:25px; margin-top:40px;">
                    <a href="https://www.instagram.com/wagnerabrahao_/" target="_blank" class="rede-icon"><i class="fab fa-instagram"></i></a>
                    <a href="https://www.tiktok.com/@wagner.abrahao" target="_blank" class="rede-icon"><i class="fab fa-tiktok"></i></a>
                    <a href="https://www.threads.com/@wagnerabrahao_" target="_blank" class="rede-icon"><i class="fab fa-threads"></i></a>
                </div>
            </div>
        </section>
    </div>

    <div id="yt-player" style="display:none;"></div>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"></script>
    <script src="https://www.youtube.com/iframe_api"></script>

    <script>
        let player, isReady = false;
        function onYouTubeIframeAPIReady() {
            player = new YT.Player('yt-player', {
                height: '0', width: '0', videoId: 'UkgSbK_PjXw',
                playerVars: { 'autoplay': 0, 'controls': 0, 'mute': 0, 'loop': 1, 'playlist': 'UkgSbK_PjXw', 'playsinline': 1 },
                events: { 'onReady': (e) => { isReady = true; } }
            });
        }

        function unlock() {
            if(isReady && player) { player.unMute(); player.setVolume(85); player.playVideo(); setTimeout(() => player.playVideo(), 50); }
            document.getElementById('portal-dominio').style.opacity = '0';
            setTimeout(() => {
                document.getElementById('portal-dominio').style.display = 'none';
                document.getElementById('nav-dominio').style.opacity = '1';
                document.getElementById('main-container').style.opacity = '1';
                document.getElementById('canvas-3d').style.opacity = '1';
            }, 1500);
        }

        function mostrarPagina(id) { 
            document.querySelectorAll('.pagina-dominio').forEach(p => p.classList.remove('active')); 
            document.querySelectorAll('nav a').forEach(a => a.classList.remove('active')); 
            document.getElementById(id).classList.add('active');
            if(event) event.target.classList.add('active'); 
            document.getElementById('main-container').scrollTo({top: 0, behavior: 'smooth'});
        }

        // MOTOR 3D - PIRÂMIDE PRATA DE QUÉOPS
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 4000);
        const renderer = new THREE.WebGLRenderer({ canvas: document.getElementById('canvas-3d'), alpha: true, antialias: true });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        camera.position.set(0, 150, 500);
        scene.add(new THREE.AmbientLight(0xffffff, 1.2));
        const sun = new THREE.DirectionalLight(0xffffff, 1.5); sun.position.set(400, 800, 400); scene.add(sun);
        
        const pyramid = new THREE.Group();
        const silverM = new THREE.MeshStandardMaterial({ color: 0xE0E0E0, metalness: 0.95, roughness: 0.05, flatShading: true });
        const goldM = new THREE.MeshStandardMaterial({ color: 0xFFD700, metalness: 1, roughness: 0.1 });
        
        let levels = 180; let baseSize = 320; let h = 2.0;
        for(let i=0; i<levels; i++) {
            let size = baseSize * (1 - i/levels); if(size < 1) break;
            let layer = new THREE.Mesh(new THREE.BoxGeometry(size, h, size), silverM);
            layer.position.set(0, i*h, 0); pyramid.add(layer);
        }
        const cap = new THREE.Mesh(new THREE.ConeGeometry(15, 25, 4), goldM); cap.position.y = levels*h + 10; pyramid.add(cap);
        pyramid.position.y = -180; scene.add(pyramid);

        function animate() { requestAnimationFrame(animate); pyramid.rotation.y += 0.001; renderer.render(scene, camera); }
        animate();

        if(window.innerWidth > 768) { document.addEventListener('mousemove', (e) => { const c=document.getElementById('cursor'); c.style.left=e.clientX+'px'; c.style.top=e.clientY+'px'; }); }
        window.addEventListener('resize', () => { camera.aspect=window.innerWidth/window.innerHeight; camera.updateProjectionMatrix(); renderer.setSize(window.innerWidth, window.innerHeight); });
    </script>
</body>
</html>
