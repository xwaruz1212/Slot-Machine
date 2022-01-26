

const app = new PIXI.Application({backgroundColor: 0x2ead9e});
document.body.appendChild(app.view);

app.renderer.resize(window.innerWidth, window.innerHeight);

const REEL_SIZE = 160;
const SYMBOL_SIZE = 150;

const center = 350;

var slotTextures;

var reels = [];



app.loader
    .add('images/duck.png', 'images/duck.png')
    .add('images/7.png', 'images/7.png')
    .add('images/bells.png', 'images/bells.png')
    .add('images/bananas.png', 'images/bananas.png')
    .add('images/cat.png', 'images/cat.png')
    .add('images/cherry.png', 'images/cherry.png')
    .add('images/startbutton.png', 'images/spinbutton.png')
    .load(onAssetsLoaded);



function onAssetsLoaded() {
    
    slotTextures = [
        PIXI.Texture.from('images/duck.png'),
        PIXI.Texture.from('images/7.png'),
        PIXI.Texture.from('images/bells.png'),
        PIXI.Texture.from('images/bananas.png'),
        PIXI.Texture.from('images/cat.png'),
        PIXI.Texture.from('images/cherry.png')
    ];
    
    createReels()
    createUI()
    
}



function createReels() {

    var reelContainer = new PIXI.Container();
    for (let i = 0; i < 3; i++) {
        const column = new PIXI.Container();
        column.x = i * REEL_SIZE;
        reelContainer.addChild(column);

        const reel = {
            container: column,
            symbols: [],
            position: 0,
            previousPosition: 0,
        };

        for (let j = 0; j < 3; j++) {
            const symbol = new PIXI.Sprite(slotTextures[Math.floor(Math.random() * slotTextures.length)]);
            symbol.y = j * SYMBOL_SIZE + 100;
            symbol.x = i * SYMBOL_SIZE + center;
            symbol.width = SYMBOL_SIZE;
            symbol.height = SYMBOL_SIZE;
            reel.symbols.push(symbol);
            column.addChild(symbol);
        }
        reels.push(reel);
    }
    app.stage.addChild(reelContainer);

    console.log(reels)
}


function createUI(){
    const style = new PIXI.TextStyle({
        dropShadow: true,
        dropShadowAlpha: 10,
        dropShadowColor: "#3a3636",
        fill: [
            "white",
            "#6e6e6e"
        ],
        fontFamily: "\"Times New Roman\", Times, serif",
        fontSize: 40,
        fontStyle: "italic",
        fontWeight: "bolder",
        letterSpacing: 20,
        lineJoin: "round",
        stroke: "#0a0000",
        strokeThickness: 6
    });
   
    const startbutton = new PIXI.Sprite.from('images/spinbutton.png');
    startbutton.x = 580;
    startbutton.y = 600;
    app.stage.addChild(startbutton);

    //spin interactivity
    startbutton.interactive = true;
    startbutton.buttonMode = true;
    startbutton.addListener( 'pointerdown', onSpinButtonClick)

    const titleText = new PIXI.Text('LUCKY DUCKY SLOTS', style)
    titleText.x = 370;
    titleText.y = 50;

    app.stage.addChild(titleText);

}

function onSpinButtonClick() {
    //clearImages()
    //displayImages()
    //ChecktheSymbols()
    
}

function clearImages() {
    for( let j=0; j<symbols.length ; j++){
        for( let i=0; i<symbols[j].length ; i++){
            app.stage.removeChild(symbols[j][i])
        }
        app.stage.removeChild(symbols[j])
    }

    symbols.splice(0)
    
}

function ChecktheSymbols() {
    for( let j=0; j<symbols.length ; j++) {
        var temp = symbols[j][0].texture;
        var check = true;

        for( let i=1; i<symbols[j].length ; i++){
            
            if( symbols[j][i].texture != temp) {

                check = false;
            }
        }
        if ( check == true){
           console.log('WIN');
        }
        
    }
}

