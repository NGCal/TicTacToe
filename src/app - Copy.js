var x_pos = 394;
var y_pos = 170;
var HelloWorldLayer = cc.Layer.extend({
    sprite:null,
    figuras:[],
   // image:null,
    jugador:0,
    turnos:9,
    dibujar:function(location,event){
        var pos = location.getLocation();
        var juego = event.getCurrentTarget();
        if(0 < juego.turnos){
        for(var figura of juego.figuras){
             var cuadro = figura.getBoundingBox();
            if(cc.rectContainsPoint(cuadro,pos)){
                if(this.jugador){
                figura.setTexture(res.X_png);
                }
                figura.setVisible(true);
                } 
};  
            cc.log("Turno: "+juego.turnos);
            juego.turnos -= 1;
        };
        return true;
    } ,
   ubicar:function(){
        var image = res.O_png;
        
        for(var i = 0; i < 3; i++)
            for(var j = 0; j < 3; j++)
                {
                    var figura = new cc.Sprite(image);
                    figura.setPosition((x_pos + 86*j),(y_pos + 98*i));
                    figura.setVisible(false);
                    this.addChild(figura,1);
                    this.figuras.push(figura);
                }
    },
    cambioJugador:function(){
        if(this.jugador){
        this.jugador = 0;
        }
        else{
           this.jugador = 1;
        }
        //this.turnos -=1;
    }
    ,
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
            onTouchEnded: this.cambioJugador
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

