class Player extends GameObject {
    constructor(config) {
        super(config);
        this.direction = config.direction || "Down";
        this.directionUpdate = {
            "Up": ["y", -1],
            "Down": ["y", 1],
            "Left": ["x", -1],
            "Right": ["x", 1],
        }
        this.world = config.world;
        this.coordDebug = document.getElementById("playerCoords");
        this.dialogManager = config.dialogManager;
    }

    updateIO(state) {
        if (this.dialogManager.active == false) {
            if (this.directionUpdate[state.direction] != undefined) {
                this.direction = state.direction;
                this.sprite.setAnimation(this.direction);
                this.sprite.setMovingState("walk");
                this.checkCollision();
            }
            else {
                this.sprite.setMovingState("idle");
            }
        }
        else {
            this.sprite.setMovingState("idle");
        }

        if (state.interact == "IntA") {
            this.dialogManager.say("Fisherman","I like fish");
        }
        
        if (state.interact == "IntB") {
            this.dialogManager.stopDialog();
        }
    }

    updatePositionNextLevel(newX, newY) {
        this.x = newX * 16;
        this.y = newY * 16;
    }

    checkCollision() {
        var futurePlayerX;
        var futurePlayerY;
        var closeFactor = 0.2;
        var worldBorders = [-1, 19, -1, 10.5];
        var roundedFuturePositionX;
        var roundedFuturePositionY;

        switch (this.direction) {

            case "Up":
                futurePlayerX = this.x / 16;
                futurePlayerY = this.y / 16 - closeFactor;
                break;
            case "Down":
                futurePlayerX = this.x / 16;
                futurePlayerY = this.y / 16 + closeFactor;
                break;
            case "Left":
                futurePlayerX = this.x / 16 - closeFactor;
                futurePlayerY = this.y / 16;
                break;
            case "Right":
                futurePlayerX = this.x / 16 + closeFactor;
                futurePlayerY = this.y / 16;
                break;

        }

        roundedFuturePositionX = Math.round(futurePlayerX);
        roundedFuturePositionY = Math.round(futurePlayerY);

        //Check if player is whithin world borders or if it must move to other plane
        if (futurePlayerX > worldBorders[0]) {
            if (futurePlayerX < worldBorders[1]) {
                if (futurePlayerY > worldBorders[2]) {
                    if (futurePlayerY < worldBorders[3]) {
                        try {
                            //Check type of the tile in front of player
                            var futureTile = this.world.propsArray[roundedFuturePositionY][roundedFuturePositionX];
                        } catch (error) {
                            console.log("Error fetching tile at coords from props array", roundedFuturePositionY, roundedFuturePositionX)
                        }

                        //If the tile in front is not a collider you can move
                        if (futureTile != 0) {
                            this.movePlayer();
                        }
                    }
                    else {
                        //Leave map down
                        this.world.updateMapLevel("Down");
                        this.y = this.y - (worldBorders[3] * 16);
                    }
                }
                else {
                    //Leave map up
                    this.world.updateMapLevel("Up");
                    this.y = this.y + (worldBorders[3] * 16);
                }
            }
            else {
                //Leave map right
                this.world.updateMapLevel("Right");
                this.x = this.x - (worldBorders[1] * 16);
            }
        }
        else {
            //Leave map left
            this.world.updateMapLevel("Left");
            this.x = this.x + (worldBorders[1] * 16);
        }

    }

    movePlayer() {
        //movePlayer
        const [axis, changeValue] = this.directionUpdate[this.direction]
        this[axis] += changeValue;
        // this.dialogManager.say("test");
    }

}