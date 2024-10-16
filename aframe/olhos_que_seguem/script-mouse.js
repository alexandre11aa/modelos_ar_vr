 // Função para calcular a direção dos olhos
function followMouse(event) {
  var scene = document.querySelector('a-scene');
  var mouseX = (event.clientX / window.innerWidth) * 2 - 1;
  var mouseY = -(event.clientY / window.innerHeight) * 2 + 1;

  // Define o limite de movimento para as pupilas
  var limit = 0.01;

  // Define novas posições para as pupilas
  var newX = mouseX * limit;
  var newY = mouseY * limit;

  // Aplica as novas posições
  document.querySelector('#pupil-left').setAttribute('position', `${newX} ${newY} 0.1`);
  document.querySelector('#pupil-right').setAttribute('position', `${newX} ${newY} 0.1`);
}

// Listener para detectar o movimento do mouse
// document.addEventListener('mousemove', followMouse);

function enableMouseTracking() {
    document.addEventListener('mousemove', followMouse);
}

function disableMouseTracking() {
    document.removeEventListener('mousemove', followMouse);
}

// Export functions
export { enableMouseTracking, disableMouseTracking };
