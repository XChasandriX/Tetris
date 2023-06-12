'use strict'
//CONSTANTES
const W = 10//Ancho del tetris
const H = 10//Altura del tetris
const L = 30
const forma = []
const colores = ["red", "green", "cyan", "pink", "purple", "orange", "yellow"]
//cuadrado
forma[0] = [[1,1],[1,1]]
//palo
forma[1] = [[0,0,0,0],[1,1,1,1]]
//T
forma[2] = [[1,1,1],[0,1,0]]
//L
forma[3] = [[1,1,1],[0,0,1]]
//J
forma[4] = [[1,1,1],[1,0,0]]
//S
forma[5] = [[1,1,0],[0,1,1]]
//Z
forma[6] = [[0,1,1],[1,1,0]]
var canvas, ctx;
let pieza
let mapa = []
let intervalo
for (let i = 0; i < H; i++){
  mapa[i] = []
  for (let j = 0; j < W; j++)
    mapa[i][j]= 0
}
//CÓDIGO
window.onload = iniciar
window.onkeydown = presionar
//FUNCIONES
function presionar(event){//Mover con flechas
  if (event.key == "ArrowLeft")
    pieza.col--
  if (event.key == "ArrowRight")
    pieza.col++
  if (event.key == "ArrowDown")
    pieza.fila++
  if (pieza.col < 0)
    pieza.col = 0
  if (pieza.col > (W - pieza.forma[0].length) ){
    pieza.col = W - pieza.forma[0].length
  event.preventDefault()
  event.stopPropagation()
  }
}
function crearPieza(){
  let nume = Math.floor(Math.random()*forma.length)
  pieza ={
  forma: forma[nume],
  fila: -1,
  col: parseInt(W/2),
  color: colores[nume]
  }
}
function generar(){
  crearPieza()

}
function iniciar(){
  canvas = document.getElementById("canvas");//canvas
  ctx = canvas.getContext("2d");
  canvas.width = L * W
	canvas.height = L * H
	ctx.lineWidth = 2
	ctx.strokeStyle = 'white'
  generar()
  intervalo = setInterval(animadors, 850)
}
function dibujarcubo(fila, col, color){
  ctx.beginPath()
  ctx.moveTo(col*L, fila*L)
  ctx.lineTo((col+1)*L, fila*L)
  ctx.lineTo((col+1)*L, (fila+1)*L)
  ctx.lineTo(col*L, (fila+1)*L)
  ctx.lineTo(col*L, fila*L)
  ctx.fillStyle = color
  ctx.stroke()
  ctx.fill()
}
function dibujarpieza(piz){//pintar pieza
  for(let fila = 0; fila < piz.forma.length; fila++)
    for(let col = 0; col < piz.forma[fila].length; col++){
      if (piz.forma[fila][col] == 1)
        dibujarcubo(piz.fila+fila, piz.col+col, piz.color)
    }
}
function animadors(){
  ctx.clearRect(0 ,0 , W*L, H*L);
  //Si choca, la añadimos a piezas
  if(hachocado(pieza)){
    if (pieza.fila <= -1)
    fin_de_la_partida()
    else {
    metermapa(pieza)
    quitar_f()
    generar()
    }
  }
  //La movemos hacia abajo
  else{
    pieza.fila = pieza.fila+1
    if (pieza.fila >  H-3){
        metermapa(pieza)
        generar()
        quitar_f()
        //console.log(mapa)
      }
  }
    dibujarpieza(pieza)
    dibujarmapa()
}
function quitar_f(){
  console.log('quitar_f')

  for(let j = 0; j < H; j++ ){
    let hay0 = false
    for(let i = 0;i < W; i++)
      if (mapa[j][i] == 0)
        hay0 = true
    if (!hay0){
      quitar_f2(j)
      j--
    }
  }
}


function quitar_f2(fila){
  console.log(fila)
  for (let j = fila; j > 0; j--){
    for (let i = 0; i < W; i++){
      mapa[j][i] = mapa[j-1][i]
    }
  }
  /*for (let i = 0; i < W; i++){
    mapa[fila-1][i] = mapa[fila-2][i]
  }
  for (let i = 0; i < W; i++){
    mapa[fila-2][i] = mapa[fila-3][i]
  }*/
}
function fin_de_la_partida(){
  alert ("fin de la partida")
  clearInterval(intervalo)
}
function metermapa(pieza){
  for(let f = 0; f < pieza.forma.length; f++)
    for(let c = 0; c < pieza.forma[f].length; c++){
      //console.log(pieza.forma[f][c] == 1)
      if (pieza.forma[f][c] == 1){
        if (f+pieza.fila >= 0)
          mapa[f+pieza.fila][c+pieza.col] = pieza.color
      }
    }
}
function hachocado(pieza){
  for (let fila = 0; fila < pieza.forma.length; fila++)
    for(let col = 0; col < pieza.forma[fila].length; col++){
    if (pieza.forma[fila][col] == 1)
      if (fila+pieza.fila < H)
        if (col+pieza.col < W)
          if(mapa[fila+pieza.fila+1][col+pieza.col] != 0){
            console.log(pieza.col)
              return true
          }
  }
  return false
}
function dibujarmapa(){
  for(let f = 0; f < mapa.length; f++)
    for(let c = 0; c < mapa[f].length; c++){
      if(mapa[f][c] != 0)
        dibujarcubo(f, c, mapa[f][c])
  }
}
//////////////////////////////////////////////////////////////////
