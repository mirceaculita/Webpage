class GameManager {
    constructor(config) {
        this.element = config.element;
        this.canvas = this.element.querySelector(".game-canvas");
        this.context = this.canvas.getContext("2d");
        this.player = null;
        this.Alchemist = null;
        this.world = null;
        this.IO = config.directionInput;
    }


    startGameLoop() {
        const FPS = 60; 
        const interval = 1000 / FPS; 
        let lastTime = performance.now(); 

        const iter = (currentTime) => {
            let deltaTime = currentTime - lastTime;

            if (deltaTime >= interval) {
                lastTime = currentTime - (deltaTime % interval); // Fix frame drift
                
                if (this.world.playerObj == null) {
                    this.world.playerObj = this.player;
                    this.world.NPCs = [this.Alchemist, this.Merchant];
                }

                //Clear screen
                this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

                //Game Loop
                this.world.draw(this.context);
                this.Alchemist.sprite.draw(this.context);
                this.Alchemist.advanceNpcOnPath();
                this.Merchant.sprite.draw(this.context);

                this.player.sprite.draw(this.context);
                this.player.updateIO({
                    direction: this.IO.direction
                });
            }

            requestAnimationFrame(iter);
        };

        requestAnimationFrame(iter);
    }

    init() {
        this.world = new World({
            width: 19,
            height: 10,
            src: "./world/Desert1.png",
            playerObj: this.player,
            NPCs: [this.Alchemist, this.Merchant]
        });
        this.Alchemist = new Npc({
            x: 8 * 16,
            y: 8 * 16,
            level: [0, 0],
            srcIdle: "./characters/Alchemist_idle.png",
            srcWalking: "./characters/Alchemist_walk.png"
        })
        this.Merchant = new Npc({
            x: 4 * 16,
            y: 8 * 16,
            level: [1, 0],
            srcIdle: "./characters/Merchant_idle.png",
            srcWalking: "./characters/Merchant_walk.png"
        })
        this.player = new Player({
            x: 5 * 16,
            y: 8 * 16,
            srcIdle: "./characters/Fisherman_idle.png",
            srcWalking: "./characters/Fisherman_walk.png",
            world: this.world
        });
        this.IO = new Input();
        this.IO.init();

        this.startGameLoop();
    }



}
