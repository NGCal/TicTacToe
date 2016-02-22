var x_pos = 394;
var y_pos = 170;
var HelloWorldLayer = cc.Layer.extend({
    sprite:null,
    figuras:[],
    jugadas:[[3,2,3],[4,5,6],[7,8,9]],
   // image:null,
    jugador:0,
    jGanador:0,
    turnos:9,
    playerLabel: new cc.LabelTTF("Jugador no. 1", "Arial", 38),
    digito: function(n){
        while(n>=10){
            n = Math.floor(n/10) ;     
        }
        return n;
    },
    dibujar:function(location,event){
        var pos = location.getLocation();
        var juego = event.getCurrentTarget();
        
        for(var figura of juego.figuras){
             var cuadro = figura.getBoundingBox();
            //cc.log(figura.isVisible());
            if(figura.isVisible()===false && juego.jGanador === 0){
            if(cc.rectContainsPoint(cuadro,pos)){
                juego.ganador(figura.getPositionX(),figura.getPositionY(),this.jugador);
                if(this.jugador){
                figura.setTexture(res.X_png);
                  this.jugador = 0;
                    }
                else{
                        this.jugador = 1;
                    }
                juego.etiqueta(this.jugador,juego.etiqueta)
                //cc.log("Posicion:"+x+","+figura.getPositionY());
                figura.setVisible(true);
                //this.cambioJugador;
                juego.turnos -= 1;
                } 
            };
};  
            cc.log("Turno: "+juego.turnos);
             if(juego.turnos === 0 && juego.jGanador === 0){
                //cc.log("Es un empate!!");
                 var size = cc.winSize;
                        var mesageLabel = new cc.LabelTTF("Es un empate", "Arial", 38);
                       mesageLabel.x = size.width / 2;
                        mesageLabel.y = size.height / 2 ;
                        juego.addChild(mesageLabel, 5);
                        
            }
        
    
        return true;
    } ,
    ganador: function(n,m,jugador){
        if (this.turnos=== 9)
            {
                jugador = 0;
            }
        var x = this.digito(n)-3;
        var y = this.digito(m)-1;
       // cc.log(n);
    this.jugadas[x][y] = jugador;
    //cc.log( this.jugadas[x][y]);
    //cc.log("Esto:: "+this.jugadas[0][0]+" "+this.jugadas[0][1]+" "+this.jugadas[0][2]);   
    if (this.turnos <= 5)
            {
                if(this.jugadas[0][0]===this.jugadas[0][1] && this.jugadas[0][0]===this.jugadas[0][2]||
                 this.jugadas[1][0]===this.jugadas[1][1] && this.jugadas[1][0]===this.jugadas[1][2] ||
                  this.jugadas[2][0]===this.jugadas[2][1] && this.jugadas[2][0]===this.jugadas[2][2]||
                  this.jugadas[0][0]===this.jugadas[1][0] && this.jugadas[0][0]===this.jugadas[2][0]||
                  this.jugadas[0][1]===this.jugadas[1][1] && this.jugadas[0][1]===this.jugadas[2][1]||
                  this.jugadas[0][2]===this.jugadas[1][2] && this.jugadas[0][2]===this.jugadas[2][2]||
                  this.jugadas[0][0]===this.jugadas[1][1] && this.jugadas[0][0]===this.jugadas[2][2]||
                  this.jugadas[0][2]===this.jugadas[1][1] && this.jugadas[0][2]===this.jugadas[2][0])
                    {
                        cc.log("Felicidades jugador "+jugador+" haz ganado");
                        var size = cc.winSize;
                        var helloLabel = new cc.LabelTTF("Jugador "+(jugador +1 )+" gana", "Arial", 38);
                        helloLabel.x = size.width / 2;
                        helloLabel.y = size.height / 2 ;
        
                        this.addChild(helloLabel, 5);
                        
                        this.jGanador = 1;
                    }
            }
    
    },
    etiqueta:function(jugador,etiqueta){
        var size = cc.winSize;
           etiqueta.x = size.width / 2;
         etiqueta.y = size.height / 2 + 150;
        jugador += 1;
       // etiqueta.setString("Jugador no. "+jugador);
        //this.addChild(playerLabel, 5);
    },
   ubicar:function(){
        var image = res.O_png;
        
        for(var i = 0; i < 3; i++)
            for(var j = 0; j < 3; j++)
                {
                    var figura = new cc.Sprite(image);
                    //figura.setPosition((x_pos + 86*j),(y_pos + 98*i));
                    figura.attr({
                        x:x_pos + 86*j,
                        y:y_pos + 98*i
                    })
                    figura.setVisible(false);
                    this.addChild(figura,1);
                    this.figuras.push(figura);
                }
    },
    ctor:function () {
        //////////////////////////////
        // 1. super init first
        this._super();

        /////////////////////////////
        // 2. add a menu item with "X" image, which is clicked to quit the program
        //    you may modify it.
        // ask the window size
        var size = cc.winSize;

        /////////////////////////////
        // 3. add your codes below...
        // add a label shows "Hello World"
        // create and initialize a label
        var helloLabel = new cc.LabelTTF("TicTacToe V0.1", "Arial", 38);
        // position the label on the center of the screen
        helloLabel.x = size.width / 2;
        helloLabel.y = size.height / 2 + 200;
        // add the label as a child to this layer
        this.addChild(helloLabel, 5);

        // add "HelloWorld" splash screen"
        this.sprite = new cc.Sprite(res.tablero_png);
        this.sprite.attr({
            x: size.width / 2,
            y: size.height / 2
        });
        this.addChild(this.sprite, 0);
        /*if (1)
            {
                this.image = res.O_png;
            };
        
        this.figura = new cc.Sprite(this.image);
        this.figura.attr({
            x: x_pos,
            y: y_pos
        });
        
        this.addChild(this.figura,0);
        cc.log(this.figura.x + ","+this.figura.y);
       // this.figura.setVisible(false);*/
        this.ubicar();
        
        cc.eventManager.addListener({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            onTouchBegan: this.dibujar,
            
        },this);
        
        
        
        

        return true;
    }
});

var HelloWorldScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new HelloWorldLayer();
        this.addChild(layer);
    }
});

