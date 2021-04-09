//variáveis bolinha
let xBolinha = 300;
let yBolinha = 200
let diametro = 15;
let raio = diametro/2

//variáveis velocidade
let velocidadexBolinha = 6;
let velocidadeyBolinha = 6;

//variáveis raquete
let xRaquete = 10
let yRaquete = 150
let raqueteComprimento = 10
let alturaRaquete = 70

//variáveis oponente
let xRaqueteOponente = 585;
let yRaqueteOponente = 150
let velocidadeyOponente;
let chanceDeErrar = 0;

let colidiu = false;

//placar do jogo
let meusPontos = 0;
let pontosOponente= 0;

//sons do jogo
let raquetada;
let ponto;
let trilha;

function preload(){
  trilha = loadSound ("trilha.mp3");
  ponto = loadSound ("ponto.mp3");
  raquetada = loadSound ("raquetada.mp3");
}

function setup() {
  createCanvas(600, 400);
  trilha.loop()
}

function draw() {
  background(0);
  mostraBolinha ();
  movimentaBolinha ();
  verificaBorda ();
  mostraRaquete(xRaquete, yRaquete);
  movimentaRaquete();
  //verificarColisao();
  colisaoMinhaRaquete(xRaquete, yRaquete);
  mostraRaquete(xRaqueteOponente, yRaqueteOponente);
  movimentaRaqueteOponente();
  colisaoMinhaRaquete (xRaqueteOponente, yRaqueteOponente);
  incluiPlacar();
  marcaPonto();
}

function mostraBolinha (){
  circle (xBolinha, yBolinha, diametro)
  
}

function mostraRaquete (x,y){
  rect (x, y, raqueteComprimento, alturaRaquete)
  
}

function movimentaBolinha (){
  xBolinha += velocidadexBolinha;
  yBolinha += velocidadeyBolinha;
  
}

function verificaBorda (){
    if (xBolinha + raio > width || 
     xBolinha - raio < 0){
    velocidadexBolinha *= -1;
  }
  if (yBolinha + raio > height ||
     yBolinha - raio < 0)
    velocidadeyBolinha *= -1;
  
}

function movimentaRaquete (){
  if (keyIsDown (UP_ARROW) && (yRaquete > 0)){
  yRaquete -= 10;
      }
   if(keyIsDown (DOWN_ARROW) && (yRaquete + alturaRaquete < height)){
    yRaquete += 10;
  }
  
}


function verificarColisao (){
  if (xBolinha - raio < xRaquete + raqueteComprimento && yBolinha - alturaRaquete < yRaquete && yBolinha + raio > yRaquete)
    velocidadexBolinha *= -1;
  raquetada.play();
}


function colisaoMinhaRaquete (x, y){
  colidiu =
  collideRectCircle(x,y, raqueteComprimento, alturaRaquete, xBolinha, yBolinha, raio);
  if (colidiu){
    velocidadexBolinha *= -1;
    raquetada.play();
  }
}

function movimentaRaqueteOponente (){
  velocidadeyOponente = yBolinha - yRaqueteOponente - raqueteComprimento /2 - 32;
  yRaqueteOponente += velocidadeyOponente + chanceDeErrar;
  calcularChanceDeErrar();
}

function incluiPlacar (){
  stroke (255);
  textAlign (CENTER);
  textSize (16);
  fill(color(255, 140, 0));
  rect(150, 10, 40, 20);
  fill(255);
  text(meusPontos, 170, 26);
  fill(color(255, 140, 0));
  rect(450, 10, 40, 20);
  fill(255);
  text(pontosOponente, 470, 26);
}

function marcaPonto(){
  if (xBolinha > 590){
    meusPontos += 1;
    ponto.play();
  }
  if (xBolinha < 10){
    pontosOponente += 1;
    ponto.play();
  }
}

function calcularChanceDeErrar (){
  if (pontosOponente > meusPontos){
    chanceDeErrar + 1
  }
  if (chanceDeErrar >= 39){
    chanceDeErrar = 40
  }
  else {
    chanceDeErrar -= 1
    if (chanceDeErrar <= 35){
      chanceDeErrar = 35
    }
  }
  }

