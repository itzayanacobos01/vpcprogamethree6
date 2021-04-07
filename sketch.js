var perro,perroTriste,perroFeliz, database;
var AComida,AlmacenamientoComida;
var TiempoComida,UltimaComida;
var Alimentado,AgregarComida;
var ComidaObj;

function preload(){
perroTriste=loadImage("Perro.png");
perroFeliz=loadImage("PerroFeliz.png");
}

function setup() {
  database=firebase.database();
  createCanvas(1000,400);

  ComidaObj = new Comida();

  AlmacenamientoComida=database.ref('Comida');
  AlmacenamientoComida.on("value",readStock);
  
  perro=createSprite(800,200,150,150);
  perro.addImage(perroTriste);
  perro.scale=0.15;
  
  Alimentado=createButton("Alimenta al perro");
  Alimentado.position(700,95);
  Alimentado.mousePressed(PerroAlimentado);

  AgregarComida=createButton("Agregar Comida");
  AgregarComida.position(800,95);
  AgregarComida.mousePressed(AgregarComida);

}

function draw() {
  background(46,139,87);
  ComidaObj.display();

  TiempoComida=database.ref('tiempoComida');
  TiempoComida.on("value",function(data){
    UltimaComida=data.val();
  });
 
  fill(255,255,254);
  textSize(15);
  if(UltimaComida>=12){
    text("Ultima alimento : "+ UltimaComida%12 + " PM", 350,30);
   }else if(UltimaComida==0){
     text("Ultimo alimento : 12 AM",350,30);
   }else{
     text("Ultimo alimento: "+ UltimaComida + " AM", 350,30);
   }
 
  drawSprites();
}

//function to read food Stock
function readStock(data){
  AComida=data.val();
  ComidaObj.updateAlmacenamientoComida(foodS);
}


//function to update food stock and last fed time
function AlimentarPerro(){
  dog.addImage(PerroFeliz);
  
  var Almacenamiento_Comida_val = ComidaObj.getAlmacenamientoComida();
  if(Almacenamiento_Comida_val <= 0){
      ComidaObj.updateAlmacenamientoComida(Almacenamiento_Comida_val *0);
  }else{
      ComidaObj.updateAlmacenamientoComida(Almacenamiento_Comida_val -1);
  }
  
  database.ref('/').update({
    Comida:ComidaObj.getAlmacenamientoComida(),
    TiempoComida:hour()
  })
}

//function to add food in stock
function AgregarComida(){
  AComida++;
  database.ref('/').update({
    Comida:AComida
  })
}
