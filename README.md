<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=yes">
    <title>Wagner Abrahão | Arquiteto do Invisível</title>
    
    <link href="https://fonts.googleapis.com/css2?family=Bodoni+Moda:ital,wght@0,700;0,900;1,400&family=Marcellus&family=Great+Vibes&display=swap" rel="stylesheet">
    
    <style>
        :root { --gold: #D4AF37; --bright-gold: #FFD700; --silver: #E0E0E0; --white: #ffffff; --glass: rgba(255, 255, 255, 0.05); --lapis: #00ffff; --sand: #C2B280; }
        * { margin: 0; padding: 0; box-sizing: border-box; -webkit-tap-highlight-color: transparent; }
        
        body, html { background: #000; color: #fff; font-family: 'Marcellus', serif; overflow-x: hidden; height: 100%; cursor: none; }

        #canvas-3d { position: fixed; inset: 0; z-index: 1; pointer-events: auto; opacity: 0; transition: opacity 3s ease; touch-action: pan-y; }

        #cursor { 
            width: 12px; height: 12px; background: #fff; border-radius: 50%; 
            position: fixed; pointer-events: none; z-index: 10000; 
            box-shadow: 0 0 25px 10px #fff, 0 0 50px 20px var(--bright-gold); 
            transform: translate(-50%, -50%); mix-blend-mode: screen;
        }

        #gate { position: fixed; inset: 0; z-index: 9999; display: flex; align-items: center; justify-content: center; background: #000; transition: 2.5s cubic-bezier(0.7, 0, 0.3, 1); }
        #gate-bg { position: absolute; inset: 0; background: url('https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=2070&auto=format&fit=crop') center/cover; filter: grayscale(0.7) brightness(0.2); }
        
        .gate-content { position: relative; z-index: 10; text-align: center; width: 90%; }
        .gate-title { font-family: 'Bodoni Moda'; font-size: clamp(2.5rem, 10vw, 5rem); font-weight: 900; letter-spacing: 15px; text-transform: uppercase; color: var(--silver); }
        
        .gate-btn { 
            border: 2px solid var(--bright-gold); color: #fff; background: rgba(212, 175, 55, 0.1); 
            padding: 25px 80px; cursor: pointer; font-family: 'Bodoni Moda'; letter-spacing: 10px; 
            text-transform: uppercase; font-size: 0.9rem; margin-top: 50px; transition: 1s; 
            backdrop-filter: blur(20px); animation: goldPulse 3s infinite;
        }
        @keyframes goldPulse {
            0% { box-shadow: 0 0 10px rgba(255, 215, 0, 0.3); border-color: var(--gold); }
            50% { box-shadow: 0 0 40px rgba(255, 215, 0, 0.7); border-color: var(--bright-gold); transform: scale(1.02); }
            100% { box-shadow: 0 0 10px rgba(255, 215, 0, 0.3); border-color: var(--gold); }
        }
        .gate-btn:hover { background: var(--bright-gold); color: #000; letter-spacing: 15px; animation: none; }

        nav { 
            position: fixed; top: 0; width: 100%; display: flex; justify-content: center; 
            flex-wrap: wrap; gap: clamp(10px, 4vw, 40px); padding: 35px 10px; z-index: 2000; opacity: 0; transition: 2s;
            background: linear-gradient(to bottom, rgba(0,0,0,0.9) 0%, transparent 100%);
            backdrop-filter: blur(15px);
        }
        nav a { color: var(--silver); text-decoration: none; text-transform: uppercase; letter-spacing: 3px; font-size: 0.75rem; cursor: pointer; opacity: 0.5; transition: 0.5s; font-weight: bold; }
        nav a:hover, nav a.active { opacity: 1; color: var(--gold); border-bottom: 1px solid var(--gold); }

        .container { position: relative; z-index: 100; height: 100vh; width: 100%; display: flex; flex-direction: column; align-items: center; opacity: 0; transition: 2.5s; padding: 160px 8% 100px; overflow-y: auto; scrollbar-width: none; }
        .container::-webkit-scrollbar { display: none; }
        
        .page { display: none; width: 100%; max-width: 1100px; animation: slideUp 1.5s ease forwards; }
        .page.active { display: block; }
        @keyframes slideUp { from { opacity: 0; transform: translateY(40px); } to { opacity: 1; transform: translateY(0); } }

        .secao-titulo { font-family: 'Bodoni Moda'; color: var(--gold); font-size: 2.2rem; text-align: center; margin-bottom: 60px; letter-spacing: 15px; text-transform: uppercase; border-bottom: 1px solid rgba(212,175,55,0.3); padding-bottom: 20px; }

        .verbo-text-block { 
            font-size: 1.25rem; line-height: 2.2; color: var(--silver); 
            text-align: center; margin-bottom: 60px; font-style: italic;
            padding: 45px; background: rgba(0,0,0,0.4);
            border: 1px solid rgba(212,175,55,0.1); width: 100%;
            display: flex; flex-direction: column; align-items: center;
            /* EFEITO FOSCO REFORÇADO */
            backdrop-filter: blur(25px); -webkit-backdrop-filter: blur(25px);
        }
        .verbo-header { font-family: 'Bodoni Moda'; color: var(--gold); font-size: 1.6rem; margin-bottom: 25px; letter-spacing: 4px; text-transform: uppercase; font-style: normal; border-bottom: 1px solid var(--gold); padding-bottom: 10px; }
        .verbo-content { max-width: 800px; text-align: center; white-space: pre-wrap; }

        .livros-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(350px, 1fr)); gap: 40px; width: 100%; }
        /* EFEITO FOSCO NAS CAIXAS DOS LIVROS */
        .caixa-dourada { border: 1px solid var(--gold); background: rgba(212, 175, 55, 0.04); padding: 45px; backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px); transition: 0.8s; text-align: center; }
        .caixa-dourada:hover { transform: translateY(-15px); box-shadow: 0 30px 60px rgba(212, 175, 55, 0.2); }
        
        /* CORES RESTAURADAS */
        .livro-titulo { color: var(--gold) !important; font-family: 'Bodoni Moda'; margin-bottom: 15px; text-transform: uppercase; }
        .livro-resumo { color: var(--white) !important; opacity: 0.9; font-style: italic; margin-top: 15px; line-height: 1.7; }
        .livro-assinatura { color: var(--gold) !important; margin-top:20px; font-family:'Great Vibes'; font-size:1.8rem; }

        .portal-btn { width: 60px; height: 60px; border: 2px solid var(--lapis); border-radius: 50%; display: flex; align-items: center; justify-content: center; fill: var(--lapis); transition: 0.6s; background: rgba(0,255,255,0.05); }
        .portal-btn:hover { background: var(--lapis); fill: #000; transform: scale(1.15) translateY(-5px); box-shadow: 0 0 30px rgba(0, 255, 255, 0.4); }

        @media (max-width: 768px) {
            body { cursor: auto; } #cursor { display: none !important; }
            .container { padding-top: 130px; }
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
            <div style="font-family:'Great Vibes'; font-size:2.8rem; color:var(--silver); margin-top:15px;">Arquiteto do Invisível</div>
            <button class="gate-btn" onclick="unlock()">Ativar Harmonia</button>
        </div>
    </div>

    <nav id="main-nav">
        <a onclick="show('home')" class="active">O Arquiteto</a>
        <a onclick="show('contos')">Poemas e Aforismos</a>
        <a onclick="show('obras')">Manuscritos</a>
        <a onclick="show('contato')">Contato</a>
    </nav>

    <div class="container" id="main-container">
        <div id="home" class="page active">
            <div class="glass-box" style="background: rgba(0,0,0,0.5); padding: 60px; backdrop-filter: blur(30px); -webkit-backdrop-filter: blur(30px); border: 1px solid rgba(255,255,255,0.1);">
                <div style="display: flex; align-items: center; gap: 50px; flex-wrap: wrap; justify-content: center;">
                    <img src="perfil.jpg" alt="Wagner Abrahão" style="width: 240px; height: 340px; object-fit: cover; border: 1px solid rgba(255,255,255,0.2);">
                    <div style="flex: 1; min-width: 300px; font-size: 1.2rem; line-height: 2.1; font-style: italic;">
                        "Arquiteto das frequências que acolhem e iluminam. Minha obra busca ser apenas um suporte para quem procura acalento na densidade da vida. Através da harmonia do Verbo, convido você a reconhecermos, juntos, a arquitetura de luz que já habita em cada um de nós."
                    </div>
                </div>
                <div style="font-family:'Great Vibes'; font-size:3.5rem; color:var(--gold); text-align:right; margin-top:50px;">Wagner Abrahão</div>
            </div>
        </div>

        <div id="contos" class="page">
            <h2 class="secao-titulo">Poemas e Aforismos</h2>
            
            <div class="verbo-text-block">
                <div class="verbo-header">Anestesia Divina</div>
                <div class="verbo-content">Dante não sabia que estava dormindo.
Durante quarenta e dois anos, viveu em estado de anestesia divina.
Excesso de rotina, de precisão, de identidades fixas. 
Sua existência era um Lá central perpétuo.
Até que a perda se tornou revelação, 
e o corpo começou a falar a linguagem da harmonia invisível.</div>
            </div>

            <div class="verbo-text-block">
                <div class="verbo-header">A Arquitetura do Invisível</div>
                <div class="verbo-content">"O corpo não mente; ele traduz o que a alma não consegue mais carregar. Quando o ego silencia, os sentidos se expandem para oferecer suporte ao próximo. Onde despertar e paz se encontram, o Arquiteto constrói pontes de sabedoria."</div>
            </div>
        </div>

        <div id="obras" class="page">
            <h2 class="secao-titulo">Manuscritos</h2>
            <div class="livros-grid">
                <div class="caixa-dourada"><h3 class="livro-titulo">A Anestesia Divina</h3><p class="livro-resumo">O despertar místico através da rendição absoluta ao invisível e o colapso do ego.</p><div class="livro-assinatura">Wagner Abrahão</div></div>
                <div class="caixa-dourada"><h3 class="livro-titulo">A Arquitetura do Invisível</h3><p class="livro-resumo">Um tratado sobre as estruturas ocultas que sustentam a realidade eterna.</p><div class="livro-assinatura">Wagner Abrahão</div></div>
                <div class="caixa-dourada"><h3 class="livro-titulo">A Centelha Inquieta</h3><p class="livro-resumo">A jornada poética da luz que resiste ao vácuo da matéria.</p><div class="livro-assinatura">Wagner Abrahão</div></div>
                <div class="caixa-dourada"><h3 class="livro-titulo">Alquimia do Ser</h3><p class="livro-resumo">Saga alquímica sobre a conexão das frequências espirituais através das gerações.</p><div class="livro-assinatura">Wagner Abrahão</div></div>
            </div>
        </div>

        <div id="contato" class="page">
            <div style="text-align: center; padding-top: 50px;">
                <a href="mailto:wagner.abrahao.31@gmail.com" style="color:var(--white); font-size: 1rem; text-decoration: none; border-bottom: 2px solid var(--gold); font-family: 'Bodoni Moda'; opacity: 0.8;">wagner.abrahao.31@gmail.com</a>
                <div class="social-portal-grid" style="display:flex; gap:30px; justify-content:center; margin-top:40px;">
                    <a href="https://www.instagram.com/wagnerabrahao_/" target="_blank" class="portal-btn"><svg viewBox="0 0 24 24" width="28"><path d="M7.75 2h8.5A5.75 5.75 0 0 1 22 7.75v8.5A5.75 5.75 0 0 1 16.25 22h-8.5A5.75 5.75 0 0 1 2 16.25v-8.5A5.75 5.75 0 0 1 7.75 2zm0 1.5a4.25 4.25 0 0 0-4.25 4.25v8.5a4.25 4.25 0 0 0 4.25 4.25h8.5a4.25 4.25 0 0 0 4.25-4.25v-8.5a4.25 4.25 0 0 0-4.25-4.25h-8.5zm8.12 3.63a.87.87 0 1 1 0 1.74.87.87 0 0 1 0-1.74zM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10zm0 1.5a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7z"/></svg></a>
                    <a href="https://www.tiktok.com/@wagner.abrahao" target="_blank" class="portal-btn"><svg viewBox="0 0 24 24" width="28"><path d="M12.53.02C13.84 0 15.14.01 16.44 0c.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.06-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.03 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.28-2.26.54-4.5 2.1-6.11 1.62-1.67 3.97-2.58 6.3-2.4v4.27c-1.2-.07-2.47.3-3.36 1.12-.8.71-1.22 1.75-1.17 2.82.02 1.02.48 2.04 1.25 2.73.94.83 2.27 1.12 3.48.77 1.14-.27 2.09-1.15 2.53-2.22.18-.51.25-1.05.24-1.58.02-3.34 0-6.68.01-10.03z"/></svg></a>
                    <a href="https://www.threads.com/@wagnerabrahao_" target="_blank" class="portal-btn"><svg viewBox="0 0 24 24" width="28"><path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm0 18a8 8 0 1 1 8-8 8 8 0 0 1-8 8z"/><path d="M15.11 15.06a3.59 3.59 0 0 1-2.92 1.44 3.39 3.39 0 0 1-3.41-3.39 3.39 3.39 0 0 1 3.41-3.39c.86 0 1.63.31 2.22.82l1.04-1.12a5.16 5.16 0 0 0-3.26-1.19 4.88 4.88 0 0 0-4.91 4.88 4.88 4.88 0 0 0 4.91 4.88c1.37 0 2.58-.57 3.44-1.48l-1.52-1.45z"/></svg></a>
                </div>
            </div>
        </div>
    </div>

    <div id="yt-player" style="display:none;"></div>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/three@0.128.0/examples/js/controls/OrbitControls.js"></script>
    <script src="https://www.youtube.com/iframe_api"></script>

    <script>
        let player, isReady = false;
        function onYouTubeIframeAPIReady() {
            player = new YT.Player('yt-player', {
                height: '0', width: '0', videoId: 'UkgSbK_PjXw',
                playerVars: { 'autoplay': 1, 'controls': 0, 'mute': 0, 'loop': 1, 'playlist': 'UkgSbK_PjXw' },
                events: { 'onReady': (e) => { isReady = true; } }
            });
        }
        function unlock() {
            if(isReady && player) { 
                player.unMute(); player.setVolume(80); player.playVideo(); 
                // GATILHO UNIVERSAL (MOBILE/DESKTOP)
                setTimeout(() => { player.playVideo(); }, 100);
            }
            document.getElementById('gate').style.opacity = '0';
            setTimeout(() => {
                document.getElementById('gate').style.display = 'none';
                document.getElementById('main-nav').style.opacity = '1';
                document.getElementById('main-container').style.opacity = '1';
                document.getElementById('canvas-3d').style.opacity = '1';
            }, 1500);
        }
        function show(id) { 
            document.querySelectorAll('.page').forEach(p => p.classList.remove('active')); 
            document.querySelectorAll('nav a').forEach(a => a.classList.remove('active')); 
            document.getElementById(id).classList.add('active');
            if(event) event.target.classList.add('active'); 
            document.getElementById('main-container').scrollTo({top: 0, behavior: 'smooth'});
        }
        const scene = new THREE.Scene();
        scene.fog = new THREE.FogExp2(0x000000, 0.0006);
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 4000);
        const renderer = new THREE.WebGLRenderer({ canvas: document.getElementById('canvas-3d'), alpha: true, antialias: true });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        camera.position.set(0, 100, 400);
        const controls = new THREE.OrbitControls(camera, renderer.domElement);
        controls.enableDamping = true; controls.autoRotate = true; controls.autoRotateSpeed = 0.4;
        const goldSun = new THREE.SpotLight(0xFFD700, 5, 2000, Math.PI/4, 0.5, 2);
        goldSun.position.set(300, 600, 300); scene.add(goldSun);
        scene.add(new THREE.AmbientLight(0x404040, 2));
        
        const starGeo = new THREE.BufferGeometry(); const starC = [];
        for(let i=0; i<12000; i++) starC.push(THREE.MathUtils.randFloatSpread(3500), THREE.MathUtils.randFloatSpread(3500), THREE.MathUtils.randFloatSpread(3500));
        starGeo.setAttribute('position', new THREE.Float32BufferAttribute(starC, 3));
        const stars = new THREE.Points(starGeo, new THREE.PointsMaterial({ color: 0xaaaaaa, size: 0.8, transparent: true, opacity: 0.5 })); scene.add(stars);

        // RECONSTRUÇÃO DA PIRÂMIDE DE QUÉOPS (BLOCOS REAIS)
        const pyramid = new THREE.Group();
        const stoneM = new THREE.MeshPhongMaterial({ color: 0xC2B280, specular: 0x111111, shininess: 2, flatShading: true });
        const goldM = new THREE.MeshStandardMaterial({ color: 0xD4AF37, metalness: 1, roughness: 0.1 });
        
        let levels = 150; let baseSize = 240; let h = 1.8;
        for(let i=0; i<levels; i++) {
            let size = baseSize * (1 - i/levels); if(size < 1) break;
            let geo = new THREE.BoxGeometry(size, h, size);
            let layer = new THREE.Mesh(geo, stoneM);
            layer.position.set(0, i*h, 0);
            pyramid.add(layer);
        }
        const cap = new THREE.Mesh(new THREE.ConeGeometry(10, 15, 4), goldM); cap.position.y = levels*h + 6; pyramid.add(cap);
        const owl = new THREE.Group();
        owl.add(new THREE.Mesh(new THREE.SphereGeometry(2.5, 8, 8), new THREE.MeshStandardMaterial({color: 0x3d2b1f})));
        const eL = new THREE.Mesh(new THREE.SphereGeometry(0.6, 8, 8), new THREE.MeshBasicMaterial({color: 0x00ffff})); eL.position.set(-0.8, 0.8, 1.8);
        const eR = eL.clone(); eR.position.set(0.8, 0.8, 1.8);
        owl.add(eL, eR); owl.position.y = cap.position.y + 10; pyramid.add(owl);
        
        pyramid.position.y = -120; scene.add(pyramid);

        function animate() {
            requestAnimationFrame(animate);
            controls.update();
            stars.rotation.y += 0.0001;
            renderer.render(scene, camera);
        }
        animate();

        if(window.innerWidth > 768) {
            document.addEventListener('mousemove', (e) => { 
                const c=document.getElementById('cursor'); c.style.left=e.clientX+'px'; c.style.top=e.clientY+'px'; 
            });
        }
        window.addEventListener('resize', () => { camera.aspect=window.innerWidth/window.innerHeight; camera.updateProjectionMatrix(); renderer.setSize(window.innerWidth, window.innerHeight); });
    </script>
</body>
</html>
