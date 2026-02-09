<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    
    <script async src="https://www.googletagmanager.com/gtag/js?id=G-5WZHN0YR19"></script>
    <script>
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', 'G-5WZHN0YR19');
    </script>
    
    <title>WAGNER ABRAHÃO | Arquiteto do Invisível</title>
    <meta name="description" content="Wagner Abrahão - Literatura filosófica, espiritualidade e arquitetura do invisível.">
    
    <script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"></script>
    <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400;700&family=Cormorant+Garamond:ital,wght@0,300;0,400;0,700;1,400&family=Raleway:wght@200;400&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        :root {
            --ouro: #D4AF37;
            --preto: #050505;
            --cinza: #E0E0E0;
            --gradiente: linear-gradient(135deg, #D4AF37, #F9E076, #D4AF37);
        }
        
        body { background: var(--preto); color: var(--cinza); font-family: 'Cormorant Garamond', serif; overflow: hidden; }

        /* TELA DE BOAS-VINDAS (Ativa Música e Efeitos) */
        #tela-entrada {
            position: fixed; top: 0; left: 0; width: 100%; height: 100%;
            background: #000; z-index: 10000; display: flex; flex-direction: column;
            align-items: center; justify-content: center; transition: 1.5s ease;
        }
        .btn-adentrar {
            padding: 15px 45px; background: transparent; border: 1px solid var(--ouro);
            color: var(--ouro); font-family: 'Cinzel', serif; cursor: pointer;
            letter-spacing: 5px; transition: 0.5s; text-transform: uppercase;
        }
        .btn-adentrar:hover { background: var(--ouro); color: #000; box-shadow: 0 0 40px var(--ouro); }

        /* PAISAGEM 3D E PONTO DE LUZ */
        #cenario-fundo { position: fixed; top: 0; left: 0; width: 100%; height: 100%; z-index: 1; pointer-events: none; }
        #luz-cursor {
            position: fixed; width: 550px; height: 550px;
            background: radial-gradient(circle, rgba(212, 175, 55, 0.15) 0%, transparent 70%);
            transform: translate(-50%, -50%); pointer-events: none; z-index: 2;
        }

        /* NAVEGAÇÃO LATERAL CONSERTADA */
        #menu-lateral {
            position: fixed; right: 25px; top: 50%; transform: translateY(-50%);
            z-index: 1000; display: flex; flex-direction: column; gap: 20px;
        }
        .nav-btn {
            width: 50px; height: 50px; border-radius: 50%; background: rgba(0,0,0,0.85);
            border: 1px solid rgba(212,175,55,0.3); color: var(--ouro);
            display: flex; align-items: center; justify-content: center; cursor: pointer; transition: 0.4s;
        }
        .nav-btn:hover, .nav-btn.ativo { background: var(--ouro); color: #000; transform: scale(1.1); box-shadow: 0 0 20px var(--ouro); }

        /* ÁREA DE TEXTO ÚNICA (Hierarquia Corrigida) */
        #area-texto {
            position: absolute; top: 0; left: 0; width: 100%; height: 100%;
            z-index: 100; overflow-y: auto; scrollbar-width: none; padding: 100px 10% 150px;
        }
        #area-texto::-webkit-scrollbar { display: none; }
        
        .secao { display: none; opacity: 0; transform: translateY(30px); transition: 0.8s ease; max-width: 900px; margin: 0 auto; }
        .secao.ativa { display: block; opacity: 1; transform: translateY(0); }

        /* ÚNICO H1 EM TODO O SITE (Correção de Erro de Validação) */
        .h1-identidade { 
            font-family: 'Cinzel', serif; font-size: 4rem; 
            background: var(--gradiente); -webkit-background-clip: text; color: transparent; 
            text-align: center; margin-bottom: 5px; 
        }

        /* TÍTULOS DE SEÇÃO (H2) */
        .h2-titulo { 
            font-family: 'Cinzel', serif; font-size: 2.5rem; color: var(--ouro); 
            text-align: center; margin-bottom: 40px; border-bottom: 1px solid rgba(212,175,55,0.2); 
            padding-bottom: 15px; 
        }

        /* TÍTULOS DE CONTEÚDO (H3) */
        .h3-card { font-family: 'Cinzel', serif; font-size: 1.6rem; color: var(--ouro); margin-bottom: 15px; }

        /* FOTO DO AUTOR E CARDS */
        .moldura-foto { 
            width: 240px; height: 310px; margin: 0 auto 35px; border: 2px solid var(--ouro); 
            padding: 8px; background: #000; box-shadow: 0 0 35px rgba(212,175,55,0.25); 
        }
        .foto-principal { width: 100%; height: 100%; object-fit: cover; filter: sepia(0.15) contrast(1.1); }
        
        .card-vidro { 
            background: rgba(10,10,10,0.8); backdrop-filter: blur(12px); 
            border: 1px solid rgba(212,175,55,0.15); padding: 40px; margin-bottom: 30px; 
            transition: 0.4s ease;
        }
        .card-vidro:hover { border-color: var(--ouro); background: rgba(20,20,20,0.95); }
        
        p { font-size: 1.35rem; line-height: 1.8; text-align: justify; margin-bottom: 15px; }
        .texto-poema { font-style: italic; text-align: center; margin-bottom: 25px; white-space: pre-line; }

        /* CONTATO */
        .botao-contato {
            display: flex; align-items: center; justify-content: center; gap: 15px;
            text-decoration: none; color: var(--cinza); border: 1px solid rgba(212,175,55,0.3);
            padding: 20px; margin-top: 15px; transition: 0.3s;
        }
        .botao-contato:hover { background: var(--ouro); color: #000; }

        @media (max-width: 768px) {
            .h1-identidade { font-size: 2.6rem; }
            #menu-lateral { top: auto; bottom: 30px; right: 50%; transform: translateX(50%); flex-direction: row; }
        }
    </style>
</head>
<body>

    <audio id="musica-portal" loop><source src="musica.mp3" type="audio/mpeg"></audio>

    <div id="tela-entrada">
        <div style="text-align:center;">
            <h2 style="font-family:'Cinzel'; color:var(--ouro); letter-spacing:6px; margin-bottom:12px;">WAGNER ABRAHÃO</h2>
            <p style="font-family:'Raleway'; color:#777; letter-spacing:4px; margin-bottom:35px;">ARQUITETURA DO INVISÍVEL</p>
            <button class="btn-adentrar" onclick="despertarPortal()">ADENTRAR</button>
        </div>
    </div>

    <div id="cenario-fundo"></div>
    <div id="luz-cursor"></div>

    <nav id="menu-lateral">
        <div class="nav-btn ativo" onclick="irPara('home')" title="Início"><i class="fas fa-home"></i></div>
        <div class="nav-btn" onclick="irPara('poesia')" title="Reflexões"><i class="fas fa-feather"></i></div>
        <div class="nav-btn" onclick="irPara('aforismos')" title="Aforismos"><i class="fas fa-quote-right"></i></div>
        <div class="nav-btn" onclick="irPara('manuscritos')" title="Manuscritos"><i class="fas fa-book"></i></div>
        <div class="nav-btn" onclick="irPara('contato')" title="Conexão"><i class="fas fa-envelope"></i></div>
    </nav>

    <main id="area-texto">
        
        <section id="home" class="secao ativa">
            <div class="moldura-foto">
                <img src="26053.jpg" class="foto-principal" alt="Wagner Abrahão">
            </div>
            <h1 class="h1-identidade">WAGNER ABRAHÃO</h1>
            <p class="texto-poema" style="letter-spacing: 4px; color: #888; margin-bottom: 55px; font-style: normal;">FILOSOFIA • ESPIRITUALIDADE • LITERATURA</p>
            
            <div class="card-vidro">
                <h2 class="h2-secao">MISSÃO</h2>
                <p>Revelar as estruturas invisíveis que sustentam a nossa realidade cotidiana. Minha obra busca oferecer sentido e acalento através da palavra, conectando o visível ao transcendente de forma universal e acolhedora.</p>
            </div>
        </section>

        <section id="poesia" class="secao">
            <h2 class="h2-secao">POESIA</h2>
            <div class="card-vidro">
                <h3 class="h3-card">ANESTESIA DIVINA</h3>
                <p class="texto-poema">"Dante não sabia que estava dormindo.
                Durante anos, viveu em estado de espera silenciosa.
                Sua existência era um ponto central perpétuo,
                até que a perda se tornou revelação."</p>
            </div>
            <div class="card-vidro">
                <h3 class="h3-card">A MEMÓRIA DA LUZ</h3>
                <p class="texto-poema">"Antes da forma, havia apenas luz.
                Em cada átomo, uma centelha lembra sua origem divina.
                Esquecer é humano; lembrar é o caminho de volta."</p>
            </div>
        </section>

        <section id="aforismos" class="secao">
            <h2 class="h2-secao">AFORISMOS</h2>
            <div class="card-vidro">
                <h3 class="h3-card">O SILÊNCIO</h3>
                <p>"No vácuo entre as palavras, a sabedoria se revela. O silêncio não é ausência, é a plenitude do que ainda não foi dito".</p>
            </div>
            <div class="card-vidro">
                <h3 class="h3-card">A BELEZA</h3>
                <p>"A beleza verdadeira não está na perfeição da forma, mas na autenticidade da essência. É o invisível que torna o visível significativo".</p>
            </div>
        </section>

        <section id="manuscritos" class="secao">
            <h2 class="h2-secao">MANUSCRITOS</h2>
            <div class="card-vidro">
                <h3 class="h3-card">A ARQUITETURA DO INVISÍVEL</h3>
                <p>Um tratado sobre as estruturas ocultas que sustentam a nossa existência. Uma análise profunda sobre as fundações espirituais e os princípios da construção consciente.</p>
            </div>
            <div class="card-vidro">
                <h3 class="h3-card">A ANESTESIA DIVINA (OBRA)</h3>
                <p>Uma exploração sobre o despertar da consciência através da rendição absoluta. A obra investiga os véus da percepção que separam o cotidiano da vigília espiritual.</p>
            </div>
        </section>

        <section id="contato" class="secao">
            <h2 class="h2-secao">CONEXÃO</h2>
            <div class="card-vidro" style="text-align: center;">
                <p>Para partilhas, parcerias e diálogos:</p>
                <p style="color: var(--ouro); font-weight: bold; margin-bottom:30px; font-size: 1.5rem;">wagner.abrahao.31@gmail.com</p>
                
                <div style="display: flex; justify-content: center; gap: 30px; margin-top: 20px;">
                    <a href="https://instagram.com/wagnerabrahao_" target="_blank" style="color: var(--ouro); font-size: 2.2rem;"><i class="fab fa-instagram"></i></a>
                    <a href="https://tiktok.com/@wagner.abrahao" target="_blank" style="color: var(--ouro); font-size: 2.2rem;"><i class="fab fa-tiktok"></i></a>
                </div>
            </div>
        </section>
    </main>

    <script>
        // 1. DESPERTAR PORTAL (Música e Revelação)
        function despertarPortal() {
            document.getElementById('tela-entrada').style.opacity = '0';
            setTimeout(() => { document.getElementById('tela-entrada').style.display = 'none'; }, 1500);
            
            const musica = document.getElementById('musica-portal');
            musica.volume = 0.5;
            musica.play().catch(e => console.log("O áudio aguarda interação direta."));
        }

        // 2. NAVEGAÇÃO ENTRE PÁGINAS (JavaScript Consertado)
        function irPara(idSecao) {
            // Esconder todas as seções
            document.querySelectorAll('.secao').forEach(s => {
                s.classList.remove('ativa');
                s.style.display = 'none';
            });
            // Remover estado ativo dos botões
            document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('ativo'));

            // Mostrar a seção alvo
            const alvo = document.getElementById(idSecao);
            alvo.style.display = 'block';
            setTimeout(() => { alvo.classList.add('ativa'); }, 50);

            // Ativar o botão clicado
            const btnClicado = Array.from(document.querySelectorAll('.nav-btn')).find(b => b.getAttribute('onclick').includes(idSecao));
            if(btnClicado) btnClicado.classList.add('ativo');

            // Voltar scroll ao topo da área de texto
            document.getElementById('area-texto').scrollTo({ top: 0, behavior: 'smooth' });
        }

        // 3. PONTO DE LUZ QUE SEGUE O MOUSE
        document.addEventListener('mousemove', e => {
            const luz = document.getElementById('luz-cursor');
            luz.style.left = e.clientX + 'px';
            luz.style.top = e.clientY + 'px';
        });

        // 4. CENÁRIO 3D: Paisagem Infinita
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
        renderer.setSize(window.innerWidth, window.innerHeight);
        document.getElementById('cenario-fundo').appendChild(renderer.domElement);

        // Terreno (Paisagem Wireframe)
        const geometry = new THREE.PlaneGeometry(130, 130, 35, 35);
        const pos = geometry.attributes.position.array;
        for(let i=0; i<pos.length; i+=3) { pos[i+2] = Math.random() * 2.8; }
        const material = new THREE.MeshPhongMaterial({ color: 0x333333, wireframe: true, transparent: true, opacity: 0.2 });
        const terrain = new THREE.Mesh(geometry, material);
        terrain.rotation.x = -Math.PI / 2;
        scene.add(terrain);

        // Pirâmide de Luz Central
        const pGeo = new THREE.ConeGeometry(5, 10, 4);
        const pMat = new THREE.MeshPhongMaterial({ color: 0xD4AF37, transparent: true, opacity: 0.65 });
        const pyramid = new THREE.Mesh(pGeo, pMat);
        pyramid.position.y = 5;
        scene.add(pyramid);

        // Iluminação
        const light = new THREE.PointLight(0xFFD700, 1.8, 100);
        light.position.set(0, 12, 0);
        scene.add(light);
        camera.position.z = 28; camera.position.y = 10;

        function animate() {
            requestAnimationFrame(animate);
            terrain.rotation.z += 0.0004;
            pyramid.rotation.y += 0.006;
            renderer.render(scene, camera);
        }
        animate();

        window.addEventListener('resize', () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        });
    </script>
</body>
</html>
