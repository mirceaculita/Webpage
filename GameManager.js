class GameManager {
    constructor(config) {
        this.element = config.element;
        this.dialogBoxDiv = config.dialogBoxDiv;
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
                    this.world.NPCs = [this.Alchemist, this.Merchant, this.bird];
                }

                //Clear screen
                this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

                //Game Loop
                //Draw world
                this.world.draw(this.context);

                //Draw NPCs
                this.Alchemist.sprite.draw(this.context);
                this.Alchemist.advanceNpcOnPath();
                this.Merchant.sprite.draw(this.context);

                //Draw player
                this.player.sprite.draw(this.context);
                this.player.updateIO({
                    direction: this.IO.direction,
                    interact: this.IO.interact
                });
                this.bird.sprite.draw(this.context);
                this.bird.advanceNpcOnPath();

            }

            requestAnimationFrame(iter);
        };

        requestAnimationFrame(iter);
    }

    init() {
        
        this.dialogManager = new Dialog();

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
            loopPath: true,
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
            world: this.world,
            dialogManager: this.dialogManager
        });

        this.bird = new Npc({
            x: -2 * 16,
            y: 5 * 16,
            level: [0, 0],
            path: [[-2, 5], [21, 5]],
            spriteWidth: 16,
            moving: "false",
            spriteHeight: 16,
            NpcType: "bird",
            loopPath: false,
            animation: {
                Right: [
                    [0, 1],[1,1],[2,1],[3,1],[4,1],[5,1],[6,1],[7,1]
                ],
                
                Left: [
                    [0, 0],[1,0],[2,0],[3,0],[4,0],[5,0],[6,0],[7,0]
                ],
                
                Up: [
                    [0, 0],[1,0],[2,0],[3,0],[4,0],[5,0],[6,0],[7,0]
                ],
                
                Down: [
                    [0, 0],[1,0],[2,0],[3,0],[4,0],[5,0],[6,0],[7,0]
                ]
            },
            srcIdle: "./characters/BirdSprite.png",
            srcWalking: "./characters/BirdSprite.png"
        })
        this.IO = new Input();
        this.IO.init();
        
        this.startGameLoop();
    }



}
