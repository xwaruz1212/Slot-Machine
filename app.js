

const app = new PIXI.Application({backgroundColor: 0x2ead9e});
document.body.appendChild(app.view);

app.renderer.resize(window.innerWidth, window.innerHeight);

const REEL_SIZE = 160;
const SYMBOL_SIZE = 150;

const center = 300;

var slotTextures;

var symbols = [];



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
    
    displayImages()
    console.log(symbols);
    createUI()
    
}


function displayImages() {
    for (let j=0 ; j < 3 ; j++){
        for (let i=0 ; i < 3 ; i++){
            
            const symbol = new PIXI.Sprite(slotTextures[Math.floor(Math.random() * slotTextures.length)]);
            symbol.y = j * REEL_SIZE + 100;
            symbol.x = i * REEL_SIZE + center;
            symbol.width = SYMBOL_SIZE;
            symbol.height = SYMBOL_SIZE;
            console.log(symbol.y , " ", symbol.x);



            app.stage.addChild(symbol);
            symbols.push(symbol);

        }
        
    }
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
    startbutton.x = 380;
    startbutton.y = 600;
    app.stage.addChild(startbutton);

    //spin interactivity
    startbutton.interactive = true;
    startbutton.buttonMode = true;
    startbutton.addListener( 'pointerdown', onSpinButtonClick)

    const titleText = new PIXI.Text('LUCKY DUCKY SLOTS', style)
    titleText.x = 170;
    titleText.y = 50;

    app.stage.addChild(titleText);

}

function onSpinButtonClick() {
    clearImages()
    displayImages()
}

function clearImages() {
    for( let i=0; i<symbols.length ; i++){
        app.stage.removeChild(symbols[i])
    }

    symbols.splice(0)
    
}





