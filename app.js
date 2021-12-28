let type = "WebGL";
if (!PIXI.utils.isWebGLSupported()) {
  type = "canvas";
}

PIXI.utils.sayHello(type);

const app = new PIXI.Application({width: 1500, height: 800});
document.body.appendChild(app.view);

PIXI.Loader.shared
.add ("images/duck.png")
.add ("images/7.png")
.add ("images/bells.png")

.load(setup);

function setup() {
	const duck = new PIXI.Sprite(
  PIXI.Loader.shared.resources["images/duck.png"].texture);
  duck.x = 400;
  duck.y = 300;
  const Sduck = new PIXI.Sprite(
    PIXI.Loader.shared.resources["images/duck.png"].texture);
    Sduck.x = 600;
    Sduck.y = 100;
  const seven = new PIXI.Sprite(
    PIXI.Loader.shared.resources["images/7.png"].texture);
    seven.x = 600;
    seven.y = 300;
    const Sseven = new PIXI.Sprite(
      PIXI.Loader.shared.resources["images/7.png"].texture);
      Sseven.x = 800;
      Sseven.y = 100;
    const bells = new PIXI.Sprite(
      PIXI.Loader.shared.resources["images/bells.png"].texture);
      bells.x = 800;
      bells.y = 300;
      const Sbells = new PIXI.Sprite(
        PIXI.Loader.shared.resources["images/bells.png"].texture);
      Sbells.x = 400;
      Sbells.y = 100;
  
  app.stage.addChild(seven,duck,bells,Sduck,Sseven,Sbells);

}



