// eyes-camera.js
function updateEyeDirection() {
    var camera = document.querySelector('a-camera').object3D;
    var eyeLeft = document.querySelector('#pupil-left');
    var eyeRight = document.querySelector('#pupil-right');

    // Posição da câmera
    var cameraDirection = new THREE.Vector3();
    camera.getWorldDirection(cameraDirection);

    // Inverte a direção
    cameraDirection.x *= -1;
    cameraDirection.y *= -1;

    // Define o limite de movimento para as pupilas
    var limit = 0.015; // ajuste conforme necessário

    // Define novas posições para as pupilas com base na direção da câmera
    var newX = cameraDirection.x * limit;
    var newY = cameraDirection.y * limit;

    // Aplica as novas posições
    eyeLeft.setAttribute('position', `${newX} ${newY} 0.1`);
    eyeRight.setAttribute('position', `${newX} ${newY} 0.1`);
}

// Atualiza a direção dos olhos a cada frame
function animate() {
    updateEyeDirection();
    requestAnimationFrame(animate);
}

// Inicia a animação
export function startCameraTracking() {
    animate();
}
