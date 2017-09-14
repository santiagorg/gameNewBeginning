
var canvas = document.querySelector('canvas');
canvas.width = innerWidth;
canvas.height = innerHeight;
var ctx = canvas.getContext('2d');


var primeravez = true; //first time pj appear
var moveRight = true; //block-allow move right
var moveLeft = true; //block-allow move left

var speed = 12; //speed of movement
var curFrame = 0; 
var frameCount = 4; //total of frames (img per row)

//player's charac.
var srcX = 0;
var srcY = 0;
var srcYleft = 151;//move left
var x = 69;
var y = innerHeight - 170;
var widthImg = 85;
var heightImg = 151;
var img = new Image();
img.src = "images/spritemini.png";

//way's charac.
var srcX1 = 0;
var srcY1 = 0;
var x1 = 0;
var y1 = innerHeight - 48;
var widthImg1 = 2294;
var heightImg1 = 89;
var img1 = new Image();
img1.src = "images/way.png";

var fondo = new Image();
fondo.src ='images/fondo.jpg';
var xBg = 0;
var yBg = 0;
var widthBg = fondo.width;
var heightBg = fondo.height;



function drawPj(){
  ctx.drawImage(img,srcX,srcY,widthImg,heightImg,x,y,widthImg,heightImg);
}

function drawWay(){
  ctx.drawImage(img1,srcX1,srcY1,widthImg1,heightImg1,x1,y1,widthImg1,heightImg1);
}
function drawBg(){
  ctx.drawImage(fondo,0,0,innerWidth,innerHeight - 48);
}

function updateFrame(keyCode,moveRight){
  if(keyCode == 37){
    curFrame = ++curFrame % frameCount;
    srcX = curFrame * widthImg;
    ctx.clearRect(x,y,widthImg,heightImg);
    
    x -= speed;
    
    
  }
  if(keyCode == 39){
    curFrame = ++curFrame % frameCount;
    srcX = curFrame * widthImg;
    ctx.clearRect(x,y,widthImg,heightImg);
    if(moveRight == true){
      x += speed;
    }
    
  }
}
var tiempo = 0;
var stop;


function comenzar(){
    clearTimeout(stop);
    dibujar(ctx);
}

function detener(){
  
  clearTimeout(stop);

}
function dibujar(ctx){
    ctx.clearRect(xBg,yBg,widthBg,heightBg);

    //moving bg
    ctx.drawImage(fondo,tiempo,0,innerWidth,innerHeight - 48);//old bg R-L
    ctx.drawImage(fondo,tiempo-innerWidth,0,innerWidth,innerHeight - 48);//new bg R-L

    //moving way
    ctx.drawImage(img1,tiempo,y1,widthImg1,heightImg1);
    ctx.drawImage(img1,tiempo-innerWidth,y1,widthImg1,heightImg1);
    if(x>=innerWidth/2){
      tiempo -= speed;
    }
    else{
      tiempo += speed;
    }
    
    if(tiempo<0){
         tiempo = tiempo + innerWidth; 
    }
}

function draw(){
  if (primeravez == true){
    primeravez = false;
    drawBg();
    drawWay();
    drawPj();
  }
  else{
    document.onkeydown = function(e){
      if ( e == null ) {
          teclaC = window.event.keyCode;
      }else {  
          teclaC = event.keyCode;
      }

      if(e.keyCode == 37){
        updateFrame(e.keyCode,moveRight);

        // drawBg();//al refrescar el bg, no hay bordes blancos de transicion del muñeco
        drawWay();

        if (x < 69){
          x = 69;
          // console.log("izq: "+x);
          ctx.drawImage(img,srcX,srcYleft,widthImg,heightImg,69,y,widthImg,heightImg);
          
        }else{

          ctx.drawImage(img,srcX,srcYleft,widthImg,heightImg,x,y,widthImg,heightImg);
          
        }
        
      } 
      if(e.keyCode == 39){
        updateFrame(e.keyCode,moveRight);
        // console.log(x);

        if( x < 69){
          x = 69;
        }       
       ctx.clearRect(x,y,widthImg,heightImg);
        if(x >= innerWidth/2){
          moveRight = false;
          comenzar();
        }else{
          moveRight = true;
          // detener();
          // drawBg();
          drawWay();
        }
//si omito linea 160 y 131 el fondo mantiene y continua el movimiento         
        
        drawPj();
        
      }
    }
    
  }
    
}

setInterval(draw,100);





// function agregarEventosTeclado(){
//   agregarEvento(document,"keydown",function(e){
//     //Tecla presionada a true
//     teclado[e.keyCode] = true;
//   });
//   agregarEvento(document,"keyup",function(e){
//     //Tecla presionada a false
//     teclado[e.keyCode] = false;
//   });

//   function agregarEventos(elemento,nombreEvento,funcion){
//     if(elemento,addEventListener){
//       elemento.addEventListener(nombreEvento,funcion,false);
//     }else if(elemento.attachEvent){
//       //Para Internet Explorer
//       elemento,attachEvent(nombreEvento,funcion);
//     }
//   }
// }

// function moverTeddy(){
//   if(teclado[37]){
//     teddy.x -= 10;
//     if(teddy.x < 10){
//       teddy.x = 10;
//     }
//   }
//   if(teclado[39]){
//     teddy.x += 10;
//     if(teddy.x > 10){
//       teddy.x = 10;
//     }
//   }
// }
























// var x = 00;
// var y = 0;
// var dx = 4;
// var dy = 4;
// var width = 100;
// var height = 100;
// var radiusX = width/2;
// var radiusY = height/2;
// function animate(){
//   requestAnimationFrame(animate);
//   c.clearRect(0,0,innerWidth,innerHeight);
//   // c.beginPath();
//   // c.arc(x, y, radius, 0, Math.PI * 2, false);
//   // c.strokeStyle='red';
//   // c.stroke();

//   var img = new Image();
//     img.src = "images/torso.png";
//   img.onload = function(){
//       imageDraw = c.drawImage(img, 69,innerHeight - 79, img.width/5, img.height/5);
//     }
  

//   //Si es > innerWidth, dx será negativo esa vez 
//   //para que vaya a la izquierda.
//   //Si es < 0, dx será positivo para ir a derecha
//   if(34.5 + img.width/5 > innerWidth){
//     dx= -dx;
//   }
//   if(34.5 - img.width/5 < 0){
//     dx= +dx;
//   }
//   // //lo mismo pero con el eje y
//   // if (y + radius > innerHeight || y - radius < 0){
//   //  dy = -dy;
//   // }

//   69 += dx;
//    // y += dy;

// }
// animate();



// c.beginPath();
// c.fillStyle = 'gold'/*'#2A0A29'*/;
// c.fillRect(0,innerHeight - 35,innerWidth,innerHeight);
// c.fill();






// //lineas del camino (pasar a funcion para movmiento)

// 	var xArc = 0;
// 	for (i=0;i<=innerWidth;i++){
		
// 		if(xArc % 120 ==0 ){
// 			xArc += 60;
// 		}else{
// 			c.beginPath();
// 			c.arc(xArc+=6, innerHeight - 25, 1.5, 0, Math.PI, true);
// 			c.strokeStyle='black';
// 			c.stroke();

// 			c.beginPath();
// 			c.arc(xArc+=6, innerHeight - 25, 1.5, 0, Math.PI, false);
// 			c.strokeStyle='#151515';
// 			c.stroke();
// 		}
		
		
// 	}
// 	var xArc = 0;
// 	for (i=0;i<=innerWidth;i++){
// 		if(xArc % 100 ==0){
// 			xArc += 40;
// 		}else{
// 			c.beginPath();
// 			c.arc(xArc+=3, innerHeight - 10, 1.5, 0, Math.PI, true);
// 			c.strokeStyle='#151515';
// 			c.stroke();

// 			c.beginPath();
// 			c.arc(xArc+=7, innerHeight - 10, 1.5, 0, Math.PI, false);
// 			c.strokeStyle='black';
// 			c.stroke();
// 		}
// 	}
