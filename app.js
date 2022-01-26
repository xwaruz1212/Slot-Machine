

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
    reelContainer.x = 500;
    reelContainer.y = 100;
    
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

        for (let j = 0; j < 4; j++) {
            const symbol = new PIXI.Sprite(slotTextures[Math.floor(Math.random() * slotTextures.length)]);
            symbol.y = j * SYMBOL_SIZE;
            symbol.x = Math.round((SYMBOL_SIZE - symbol.width) / 2);
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
    if (running) return;
    running = true;
    
    for (let i = 0; i < reels.length; i++) {
        const r = reels[i];
        const extra = Math.floor(Math.random() * 3);
        const target = r.position + 10 + i * 5 + extra;
        const time = 2500 + i * 600 + extra * 600;
        tweenTo(r, 'position', target, time, backout(0.5), null, i === reels.length - 1 ? tweeningDone : null);
    }

    //ChecktheSymbols()
}


// TO DO : convert this function
function ChecktheSymbols() {
    /*for( let j=0; j<symbols.length ; j++) {
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
        
    }*/
}

function tweeningDone() {
    running = false;
}

// Listen for animate update.
app.ticker.add((delta) => {
        for (let i = 0; i < reels.length; i++) {
            const r = reels[i];
            r.previousPosition = r.position;

            for (let j = 0; j < r.symbols.length; j++) {
                const s = r.symbols[j];
                const prevy = s.y;
                s.y = ((r.position + j) % r.symbols.length) * SYMBOL_SIZE - SYMBOL_SIZE;
                if (s.y < 0 && prevy > SYMBOL_SIZE) {
                    s.texture = slotTextures[Math.floor(Math.random() * slotTextures.length)];
                    s.scale.x = s.scale.y = Math.min(SYMBOL_SIZE / s.texture.width, SYMBOL_SIZE / s.texture.height);
                    s.x = Math.round((SYMBOL_SIZE - s.width) / 2);
                }
            }
        }
});



// tweening function.
var running = false;
const tweening = [];
function tweenTo(object, property, target, time, easing, onchange, oncomplete) {
    const tween = {
        object,
        property,
        propertyBeginValue: object[property],
        target,
        easing,
        time,
        change: onchange,
        complete: oncomplete,
        start: Date.now(),
    };

    tweening.push(tween);
    return tween;
}
// Listen for animate update.
app.ticker.add((delta) => {
    const now = Date.now();
    const remove = [];
    for (let i = 0; i < tweening.length; i++) {
        const t = tweening[i];
        const phase = Math.min(1, (now - t.start) / t.time);

        t.object[t.property] = lerp(t.propertyBeginValue, t.target, t.easing(phase));
        if (t.change) t.change(t);
        if (phase === 1) {
            t.object[t.property] = t.target;
            if (t.complete) t.complete(t);
            remove.push(t);
        }
    }
    for (let i = 0; i < remove.length; i++) {
        tweening.splice(tweening.indexOf(remove[i]), 1);
    }
});

// Basic lerp funtion.
function lerp(a1, a2, t) {
    return a1 * (1 - t) + a2 * t;
}

// Backout function from tweenjs.
// https://github.com/CreateJS/TweenJS/blob/master/src/tweenjs/Ease.js
function backout(amount) {
    return (t) => (--t * t * ((amount + 1) * t + amount) + 1);
}