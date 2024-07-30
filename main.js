function main() {
    // Obtém o elemento do canvas do documento HTML
    const canvas = document.querySelector('#c');

    // Cria um renderizador WebGL usando o canvas
    const renderer = new THREE.WebGLRenderer({ canvas });

    // Define os parâmetros da câmera
    const fov = 75; // Campo de visão
    const aspect = canvas.width / canvas.height; // Aspect ratio
    const near = 0.1; // Plano de corte próximo
    const far = 5; // Plano de corte distante

    // Cria uma câmera de perspectiva com os parâmetros definidos
    const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
    camera.position.z = 2; // Define a posição da câmera ao longo do eixo Z

    // Cria uma cena vazia
    const scene = new THREE.Scene();

    // Cria um grupo para o símbolo
    const reactSymbol = new THREE.Group();

    // Define o tamanho e cores para os elementos do símbolo
    const sphereRadius = 0.2;
    const torusRadius = 0.06;
    const boxSize = 0.3;
    const colors = [0x61DAFB, 0xE44D26, 0x61DAFB, 0x8CC84B];

    const video = document.createElement('video');
    video.src = '/della-jumba-fusion.mp4';
    video.muted = true;
    video.loop = true;
    video.play();

    const dellaToneTexture = new THREE.TextureLoader().load('/della-tonne.png');
    const jumbaGifTexture = new THREE.VideoTexture(video);
    const gigaDellaTexture = new THREE.TextureLoader().load('/mine-della.png');
    const happyDellaTexture = new THREE.TextureLoader().load('/happy-della.png');

    const materials = [
        new THREE.MeshBasicMaterial({ map: dellaToneTexture }),
        new THREE.MeshBasicMaterial({ map: jumbaGifTexture }),
        new THREE.MeshBasicMaterial({ map: gigaDellaTexture }),
        new THREE.MeshBasicMaterial({ map: happyDellaTexture })
    ];

    for (let i = 0; i < materials.length; i++) {
        const sphereGeometry = new THREE.SphereGeometry(sphereRadius, 32, 32);
        const sphere = new THREE.Mesh(sphereGeometry, materials[i]);
        sphere.position.set(Math.cos((i * Math.PI) / 2), Math.sin((i * Math.PI) / 2), 0);
        reactSymbol.add(sphere);
    }

    // Cria um cubo (caixa) para envolver o símbolo com textura
    const cubeTextureLoader = new THREE.TextureLoader();
    const cubeTexture = cubeTextureLoader.load('/della.png'); // Substitua pelo caminho correto para a textura do cubo

    // Cria o material do cubo com a textura
    const cubeMaterial = new THREE.MeshPhongMaterial({ map: cubeTexture });

    // Cria um cubo (caixa) para envolver o símbolo com textura
    const boxGeometry = new THREE.BoxGeometry(boxSize, boxSize, boxSize);
    const box = new THREE.Mesh(boxGeometry, cubeMaterial);
    reactSymbol.add(box);

    // Adiciona o grupo do símbolo à cena
    scene.add(reactSymbol);

    // Adiciona um plano para dar contexto
    const planeGeometry = new THREE.PlaneGeometry(5, 5, 32, 32);
    const planeMaterial = new THREE.MeshPhongMaterial({ color: 0x808080, side: THREE.DoubleSide });
    const plane = new THREE.Mesh(planeGeometry, planeMaterial);
    plane.rotation.x = Math.PI / 2;
    scene.add(plane);

    // Configura a cor e intensidade da luz direcional
    const color = 0xffffff;
    const intensity = 1;

    const color2 = 0xff00ff; // Cor rosa
    const intensity2 = 0.8; // Intensidade reduzida

    // Cria uma luz direcional com a cor e intensidade especificadas
    const light = new THREE.DirectionalLight(color, intensity);
    const light2 = new THREE.DirectionalLight(color2, intensity2);

    // Define a posição da luz direcional na cena
    light.position.set(1, 2, 4);
    light2.position.set(-1, -2, -4); // Posição oposta à primeira luz

    // Adiciona a luz direcional à cena
    scene.add(light);
    scene.add(light2);

    // Função para renderizar a cena
    function render() {
        // Renderiza a cena com a câmera
        

        renderer.render(scene, camera);
        
        // Chama a função render novamente na próxima atualização de quadro
        requestAnimationFrame(render);
    }

    // Adiciona interação do mouse para rotação
    let isDragging = false;
    let previousMousePosition = {
        x: 0,
        y: 0
    };

    canvas.addEventListener('mousedown', (event) => {
        isDragging = true;
    });

    canvas.addEventListener('mousemove', (event) => {
        const deltaMove = {
            x: event.clientX - previousMousePosition.x,
            y: event.clientY - previousMousePosition.y
        };

        if (isDragging) {
            const deltaRotationQuaternion = new THREE.Quaternion()
                .setFromEuler(new THREE.Euler(
                    (deltaMove.y * Math.PI) / 180,
                    (deltaMove.x * Math.PI) / 180,
                    0,
                    'XYZ'
                ));

            reactSymbol.quaternion.multiplyQuaternions(deltaRotationQuaternion, reactSymbol.quaternion);
        }

        previousMousePosition = {
            x: event.clientX,
            y: event.clientY
        };
    });

    canvas.addEventListener('mouseup', (event) => {
        isDragging = false;
    });

    // Chama a função render para iniciar o loop de renderização
    render();
}

// Chama a função principal para iniciar o aplicativo
main();
