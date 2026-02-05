<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Wagner Abrahão | O Arquiteto do Invisível</title>
    <link href="https://fonts.googleapis.com/css2?family=Cinzel+Decorative:wght@400;700;900&family=Cormorant+Garamond:ital,wght@0,300;0,600;1,400&display=swap" rel="stylesheet">
    
    <style>
        :root { 
            --gold: #c5a059; 
            --gold-bright: #ffdfa0;
            --obsidian: #050505; 
            --text: #e0e0e0; 
            --glow: rgba(197, 160, 89, 0.4); 
        }

        body, html { margin: 0; padding: 0; background: var(--obsidian); color: var(--text); font-family: 'Cormorant Garamond', serif; overflow-x: hidden; cursor: none; }

        /* Grão de Filme e Textura Vintage */
        body::after {
            content: ""; position: fixed; inset: 0;
            background: url('https://www.transparenttextures.com/patterns/stardust.png');
            opacity: 0.08; pointer-events: none; z-index: 10000;
        }

        canvas { position: fixed; top: 0; left: 0; z-index: -1; filter: contrast(1.2) brightness(0.7); }

        /* Cursor Customizado: O Bisturi de Luz */
        #cursor-aura {
            width: 40px; height: 40px; border: 1px solid var(--gold); border-radius: 50%;
            position: fixed; pointer-events: none; z-index: 10001;
            transition: transform 0.15s ease-out, opacity 0.3s; transform: translate(-50%, -50%);
            box-shadow: 0 0 20px var(--glow);
        }

        /* O Portal de Entrada (Luxo 1920) */
        #gate { 
            position: fixed; inset: 0; background: radial-gradient(circle, #1a1a1a 0%, var(--obsidian) 100%); 
            z-index: 9999; display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; 
        }
        .gate-deco { width: 300px; height: 2px; background: var(--gold); margin: 20px 0; box-shadow: 0 0 15px var(--gold); }
        .gate-title { font-family: 'Cinzel Decorative'; font-size: 4rem; color: var(--gold); letter-spacing: 15px; text-shadow: 0 0 30px var(--gold); }
        .gate-btn { 
            border: 1px solid var(--gold); color: var(--gold); background: transparent; 
            padding: 20px 60px; cursor: pointer; font-family: 'Cinzel Decorative'; 
            letter-spacing: 8px; font-size: 1.2rem; transition: 1s; margin-top: 40px;
        }
        .gate-btn:hover { background: var(--gold); color: #000; box-shadow: 0 0 50px var(--gold); }

        /* Navegação */
        nav { position: fixed; top: 0; width: 100%; display: flex; justify-content: center; gap: 40px; padding: 40px 0; z-index: 1000; }
        nav a { color: var(--gold); text-decoration: none; text-transform: uppercase; letter-spacing: 4px; font-family: 'Cinzel Decorative'; font-size: 0.8rem; cursor: pointer; opacity: 0.6; transition: 0.5s; }
        nav a:hover, nav a.active { opacity: 1; text-shadow: 0 0 15px var(--gold); border-bottom: 1px solid var(--gold); }

        /* Conteúdo Dinâmico */
        .container { position: relative; z-index: 100; padding: 150px 10% 100px; }
        .page { display: none; opacity: 0; transform: translateY(30px); transition: 1.5s cubic-bezier(0.19, 1, 0.22, 1); }
        .page.active { display: block; opacity: 1; transform: translateY(0); }

        .central-name { font-family: 'Cinzel Decorative'; font-size: clamp(2rem, 8vw, 5.5rem); letter-spacing: 20px; color: var(--gold); margin-bottom: 50px; text-align: center; }

        /* Bio Transmutada */
        .bio-section { display: flex; align-items: center; gap: 80px; flex-wrap: wrap; justify-content: center; }
        .bio-frame { border: 10px double var(--gold); padding: 15px; position: relative; transition: 1s; }
        .bio-frame:hover { transform: rotate(1deg) scale(1.02); box-shadow: 0 0 50px var(--glow); }
        .bio-text { flex: 1; min-width: 320px; font-size: 1.8rem; line-height: 1.9; font-style: italic; text-align: justify; }

        /* Cards de Relíquias (Evolução 4D) */
        .grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 40px; margin-top: 80px; }
        .card { 
            border: 1px solid rgba(197, 160, 89, 0.3); padding: 60px 40px; 
            background: rgba(5,5,5,0.8); backdrop-filter: blur(15px); transition: 0.8s; 
            text-align: center; position: relative;
        }
        .card:hover { border-color: var(--gold-bright); transform: translateY(-20px); background: rgba(197, 160, 89, 0.1); }
        .card::before { content: "◈"; position: absolute; top: 20px; left: 50%; transform: translateX(-50%); color: var(--gold); opacity: 0.5; }

        /* Poesia e Verbo */
        .poetry-wrap { max-width: 800px; margin: 100px auto; border-left: 1px solid var(--gold); padding-left: 40px; text-align: left; }
        .poetry-line { font-size: 2.2rem; margin-bottom: 20px; opacity: 0.9; transition: 1s; }

        /* Modal Alquímico */
        #modal { position: fixed; inset: 0; background: rgba(0,0,0,0.95); z-index: 5000; display: none; align-items: center; justify-content: center; }
        .modal-body { border: 1px solid var(--gold); padding: 60px; background: var(--obsidian); max-width: 700px; box-shadow: 0 0 80px var(--glow); }

    </style>
</head>
<body>

    <div id="cursor-aura"></div>

    <div id="gate">
        <div class="gate-title">WAGNER ABRAHÃO</div>
        <div class="gate-deco"></div>
        <p style="letter-spacing: 5px; opacity: 0.7;">LITERATURA VISCERAL • FILOSOFIA • DESPERTAR</p>
        <button class="gate-btn" onclick="unlock()">ENTRAR NO SANTUÁRIO</button>
    </div>

    <nav>
        <a onclick="show('home')" id="nav-home" class="active">O Arquiteto</a>
        <a onclick="show('obras')">Relíquias</a>
        <a onclick="show('verbo')">O Verbo</a>
        <a onclick="show('freq')">Frequências</a>
    </nav>

    <div class="container">
        <div id="home" class="page active">
            <h1 class="central-name">O ARQUITETO</h1>
            <div class="bio-section">
                <div class="bio-frame">
                    <img src="perfil.jpg" alt="Wagner" style="width:300px; filter: sepia(0.5) contrast(1.1);" onerror="this.style.display='none'">
                </div>
                <div class="bio-text">
                    "Não sintonizo apenas instrumentos de madeira; sintonizo a pulsação do ser. Sou um cirurgião do invisível, um tradutor de frequências e o guardião da linhagem que transmuta o trauma em ouro. <br><br>Através da literatura visceral, opero o despertar daqueles que cansaram da anestesia do mundo e buscam a arquitetura da própria alma."
                </div>
            </div>
        </div>

        <div id="obras" class="page">
            <h1 class="central-name">RELÍQUIAS</h1>
            <div class="grid">
                <div class="card" onclick="openBook('anestesia')"><h3>A ANESTESIA DIVINA</h3><p>O Bisturi do Silêncio</p></div>
                <div class="card" onclick="openBook('arquitetura')"><h3>ARQUITETURA DO INVISÍVEL</h3><p>Restauração da Alma</p></div>
                <div class="card" onclick="openBook('alquimia')"><h3>ALQUIMIA DO SER</h3><p>A Alma Oculta do Mundo</p></div>
            </div>
        </div>

        <div id="verbo" class="page">
            <h1 class="central-name">O VERBO</h1>
            <div class="poetry-wrap">
                <div class="poetry-line">"O que você solta não cai no chão,"</div>
                <div class="poetry-line">"cai nas mãos do Universo"</div>
                <div class="poetry-line">"para virar transmutação."</div>
                <div class="line" style="width: 100px; height: 1px; background: var(--gold); margin: 40px 0;"></div>
                <p style="font-size: 1.5rem; opacity: 0.7; font-style: italic;">
                    "Somos templos em reforma, esperando a liturgia certa para voltarmos a ser sagrados."
                </p>
            </div>
        </div>

        <div id="freq" class="page">
            <h1 class="central-name">FREQUÊNCIAS</h1>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
                <iframe width="100%" height="315" src="https://www.youtube.com/embed/vtf-YBteqW4" frameborder="0" allowfullscreen></iframe>
                <iframe width="100%" height="315" src="https://www.youtube.com/embed/5-cAWczw_Ec" frameborder="0" allowfullscreen></iframe>
            </div>
        </div>
    </div>

    <div id="modal" onclick="this.style.display='none'">
        <div class="modal-body" id="m-content"></div>
    </div>

    <div id="yt-player"></div>

    <script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"></script>
    <script src="https://www.youtube.com/iframe_api"></script>

    <script>
        // Sistema de Áudio (Bach)
        let player;
        function onYouTubeIframeAPIReady() {
            player = new YT.Player('yt-player', {
                height: '0', width: '0', videoId: 'vtf-YBteqW4', // Link de Bach
                playerVars: { 'autoplay': 0, 'loop': 1, 'playlist': 'vtf-YBteqW4' }
            });
        }

        function unlock() {
            const gate = document.getElementById('gate');
            gate.style.opacity = '0';
            gate.style.transform = 'scale(1.5) rotate(2deg)';
            setTimeout(() => { 
                gate.style.display = 'none';
                player.playVideo();
            }, 2000);
        }

        function show(id) {
            document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
            document.querySelectorAll('nav a').forEach(a => a.classList.remove('active'));
            setTimeout(() => {
                document.getElementById(id).classList.add('active');
                document.getElementById('nav-' + id).classList.add('active');
            }, 100);
        }

        // Cursor Magnético
        const aura = document.getElementById('cursor-aura');
        document.addEventListener('mousemove', e => {
            aura.style.left = e.clientX + 'px';
            aura.style.top = e.clientY + 'px';
        });

        // 4D Three.js - Poeira de Ouro Alquímica
        let scene = new THREE.Scene(), camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
        let renderer = new THREE.WebGLRenderer({alpha: true, antialias: true});
        renderer.setSize(window.innerWidth, window.innerHeight);
        document.body.appendChild(renderer.domElement);

        let geo = new THREE.BufferGeometry();
        let pts = [];
        for(let i=0; i<25000; i++) {
            pts.push(THREE.MathUtils.randFloatSpread(50), THREE.MathUtils.randFloatSpread(50), THREE.MathUtils.randFloatSpread(50));
        }
        geo.setAttribute('position', new THREE.Float32BufferAttribute(pts, 3));
        let cloud = new THREE.Points(geo, new THREE.PointsMaterial({color: 0xc5a059, size: 0.012, transparent: true, opacity: 0.5}));
        scene.add(cloud);
        camera.position.z = 12;

        function animate() {
            requestAnimationFrame(animate);
            cloud.rotation.y += 0.0004;
            cloud.rotation.x += 0.0001;
            // Efeito 4D: Distorção suave baseada no scroll
            cloud.position.z = Math.sin(window.scrollY * 0.001) * 2;
            renderer.render(scene, camera);
        }
        animate();

        const descriptions = {
            anestesia: "O despertar de Dante Oliveira Morais através do colapso. Onde o silêncio se torna a única voz verdadeira.",
            alquimia: "O guia para transmutar as sombras em poder. Uma peregrinação para o centro do ser.",
            arquitetura: "A restauração da alma. Romance sobre a memória e o tempo. 'O que a memória ama, fica eterno'."
        };

        function openBook(id) {
            document.getElementById('m-content').innerHTML = `
                <h1 style="font-family:'Cinzel Decorative'; color:var(--gold);">${id.toUpperCase()}</h1>
                <p style="font-size:1.6rem; font-style:italic; margin-top:30px;">${descriptions[id]}</p>
            `;
            document.getElementById('modal').style.display = 'flex';
        }
    </script>
</body>
</html>
