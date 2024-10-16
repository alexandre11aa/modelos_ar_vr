let angleX = -30;
let angleY = 0;
let camDist = 500;

let lastMouseX = 0;
let lastMouseY = 0;
let isDragging = false;

let groundTexture, wallTexture;

let zoomLevel = 500;

let eyeRadius = 1;
let eyeDiameter = 0.3;
let eyeDistance = 15;

let centerX;
let centerY;
let centerZ;

function preload() {
  wallTexture = loadImage('images/textura_parede.png');
  groundTexture = loadImage('images/textura_piso.png');
  plateTexture = loadImage('images/textura_placa.png');
  van_gogh = loadImage('images/van_gogh.png');
  myFont = loadFont('fonts/times_new_roman.ttf');
}

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  centerX = 0;
  centerY = 166.5;
  centerZ = -40;
  
}

function draw() {
  background(200);
  
  let camX = 0;
  let camY = 0;
  let camZ = zoomLevel;
  camera(camX, camY, camZ, 0, 0, 0, 0, 1, 0); 

  // Movimenta a câmera com base nos ângulos
  rotateX(angleX);
  rotateY(angleY);
  
  // Desenha a parede  
  push();
  texture(wallTexture);
  rotateY(HALF_PI);
  translate(-151, -50, 0);
  box(300, 10, 300);
  pop();
  
  // Desenha o quadro de Van Gogh  
  push();
  texture(van_gogh);
  translate(0, -45, 150);
  box(100, 10, 130);
  pop();
  
  // Desenha placa para nome do quadro
  push();
  texture(plateTexture);
  translate(0, -45, 70);
  box(100, 10, 20);
  textFont(myFont); 
  textSize(16)
  textAlign(CENTER, CENTER);
  fill(0);
  translate(0, 5.1, 0.8);
  rotateX(-HALF_PI);
  textSize(8);
  text('Autorretrato Com \n Orelha Enfaixada ', 0, 0); // Texto na placa
  pop();

  // Desenha o chão
  push();
  texture(groundTexture);
  stroke(0);
  strokeWeight(1);
  plane(400, 500);
  pop(); 
  
  // Posição do mouse no sistema de coordenadas do canvas
  let mx = map(mouseX, 0, width, -eyeRadius, eyeRadius);
  let my = map(mouseY, 0, height, -eyeRadius, eyeRadius);
  
  // Calcula a distância do mouse ao centro
  let distance = dist(0, 0, mx, my);
  
  // Restringe a posição das esferas dentro do círculo invisível
  if (distance > eyeRadius) {
    let angle = atan2(my, mx);
    mx = cos(angle) * eyeRadius;
    my = sin(angle) * eyeRadius;
  }

  // Olho esquerdo
  push();
  translate(centerX + mx - eyeDistance / 2, centerZ, centerY - my); 
  fill(0);
  sphere(eyeDiameter);
  pop();
  
  // Olho direito
  push();
  translate(-0.5 + centerX + mx + eyeDistance / 2, centerZ, 1.1 + centerY - my); 
  fill(0);
  sphere(eyeDiameter);
  pop();
}

// Quando o botão do mouse for pressionado, ativa o modo de arraste
function mousePressed() {
  isDragging = true;
  lastMouseX = mouseX;
  lastMouseY = mouseY;
}

// Atualização dos ângulos de rotação com base no movimento do mouse
function mouseDragged() {
  if (isDragging) {
    let dx = mouseX - lastMouseX;
    let dy = mouseY - lastMouseY;

    angleY += dx * 0.01;
    angleX -= dy * 0.01;

    lastMouseX = mouseX;
    lastMouseY = mouseY;
  }
}

// Desativa o modo de arraste quando o botão do mouse for solto
function mouseReleased() {
  isDragging = false;
}

// Atualização para zoom de scroll do mouse
function mouseWheel(event) {
  zoomLevel += event.delta;

  zoomLevel = constrain(zoomLevel, 100, 2000);
}
