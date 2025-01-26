class gameManager {
    constructor(config) {
        this.element = config.element;
        this.canvas = this.element.querySelector(".game-canvas");
        this.context = this.canvas.getContext("2d");
        this.player = null;
        this.world = null;
        this.directionInput = config.directionInput;
    }
    

    startGameLoop() {
        const iter = () => {
            //Clear screen
            this.context.clearRect(0,0, this.canvas.width, this.canvas.height);

            //Game Loop
            this.world.draw(this.context);
            this.player.sprite.draw(this.context);
            this.player.update({
                arrow: this.directionInput.direction
            });

            

            requestAnimationFrame(() => {
                iter();
            })
        }
        iter();
    }

    init() {
        this.world = new World({
            width: 19,
            height: 10,
            src: "./world/Desert1.png"
        });
        this.player = new Player({
            x: 0*16,
            y: 0*16,
            srcIdle: "./characters/Fisherman_idle.png",
            srcWalking: "./characters/Fisherman_walk.png"
        });

        this.directionInput = new Input();
        this.directionInput.init();

        this.startGameLoop();
    }



}