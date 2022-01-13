

const app = new PIXI.Application({backgroundColor: 0x000000});
document.body.appendChild(app.view);

app.renderer.resize(window.innerWidth, window.innerHeight);


app.loader
    .add('images/duck.png', 'images/duck.png')
    .add('images/7.png', 'images/7.png')
    .add('images/bells.png', 'images/bells.png')
    .add('images/bananas.png', 'images/bananas.png')
    .add('images/cat.png', 'images/cat.png')
    .add('images/cherry.png', 'images/cherry.png')
    .load(onAssetsLoaded);


const REEL_WIDTH = 160;
const SYMBOL_SIZE = 150;

const center = 300


function onAssetsLoaded() {
    
    const slotTextures = [
        PIXI.Texture.from('images/duck.png'),
        PIXI.Texture.from('images/7.png'),
        PIXI.Texture.from('images/bells.png'),
        PIXI.Texture.from('images/bananas.png'),
        PIXI.Texture.from('images/cat.png'),
        PIXI.Texture.from('images/cherry.png')
    ];
    
    //Displaying images in loop
    for (let j=0 ; j < 3 ; j++){
        for (let i=0 ; i < 4 ; i++){
            
            const symbol = new PIXI.Sprite(slotTextures[Math.floor(Math.random() * slotTextures.length)]);
            symbol.y = 1.5* j * SYMBOL_SIZE;
            symbol.x = 1.5* i * SYMBOL_SIZE + center;

            console.log(symbol.y , " ", symbol.x);



            app.stage.addChild(symbol);
        }
        
    }



}



