class Comida {
    constructor(){
    this.AlmacenamientoComida=0;
    this.UltimaComida;
    this.image=loadImage('Leche.png');
    }

   updateAlmacenamientoComida(AlmacenamientoComida){
    this.AlmacenamientoComida=AlmacenamientoComida;
   }

   getHoraComida(UltimaComida){
     this.HoraComida=UltimaComida;
   }

   deductComida(){
     if(this.AlmacenamientoComida>0){
      this.AlmacenamientoComida=this.AlmacenamientoComida-1;
     }
    }

    getAlmacenamientoComida(){
      return this.AlmacenamientoComida;
    }

    display(){
      var x=80,y=100;
      
      imageMode(CENTER);
      image(this.image,720,220,70,70);
      
      if(this.AlmacenamientoComida!=0){
        for(var i=0;i<this.AlmacenamientoComida;i++){
          if(i%10==0){
            x=80;
            y=y+50;
          }
          image(this.image,x,y,50,50);
          x=x+30;
        }
      }
    }
}
