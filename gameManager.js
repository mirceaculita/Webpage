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

            if(this.world.playerObj == null){
                this.world.playerObj = this.player;
            }

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
            src: "./world/Desert1.png",
            playerObj: this.player
        });
        this.player = new Player({
            x: 5*16,
            y: 8*16,
            srcIdle: "./characters/Fisherman_idle.png",
            srcWalking: "./characters/Fisherman_walk.png",
            world: this.world
        });

        this.directionInput = new Input();
        this.directionInput.init();

        this.startGameLoop();
    }



}