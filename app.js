let type = "WebGL";
if (!PIXI.utils.isWebGLSupported()) {
  type = "canvas";
}

PIXI.utils.sayHello(type);

const app = new PIXI.Application({width: 1500, height: 800, antialias: true, transparent: false, resolution: 1 });
document.body.appendChild(app.view);

app.stage
