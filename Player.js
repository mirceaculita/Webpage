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
        this.interacting = false;
        this.lookingAt = null;
        this.storyLineManager = config.storyLineManager;
        this.storyProgressValue = 0;
    }

    update(state) {
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
            if (this.dialogManager.canStopDialog == false) {
                this.interactWithWorld();
            }
            else {
                this.advanceStory();
            }
        }
    }

    updatePositionNextLevel(newX, newY) {
        this.x = newX * 16;
        this.y = newY * 16;
    }

    interactWithWorld() {
        console.log("Interact with " + this.lookingAt);
        this.interacting = true;
        switch (this.lookingAt) {
            //cactus
            case 0:
                this.dialogManager.say("Fisherman", "I have to be careful around these cacti...");
                break;
            //bush
            case 1:
                this.dialogManager.say("Fisherman", "This bush is small enough I can walk around it...");
                break;
            //sign1
            case 61:
                switch (this.direction) {
                    case "Down":
                        this.dialogManager.say("Fisherman", "I can't read this sign from the back. Maybe I should look from the front...");
                        break;
                    case "Up":
                        this.dialogManager.say("Sign", "This way to merchant...");
                        break;
                    case "Left":
                        this.dialogManager.say("Fisherman", "Hmm, I can't see what it says. I need to look at the front of the sign...");
                        break;
                    case "Right":
                        this.dialogManager.say("Fisherman", "Hmm, I can't see what it says. I need to look at the front of the sign...");
                        break;
                }


                break;
            //sign2
            case 62:
                switch (this.direction) {
                    case "Down":
                        this.dialogManager.say("Fisherman", "I can't read this sign from the back. Maybe I should look from the front...");
                        break;
                    case "Up":
                        this.dialogManager.say("Sign", "This way to something...");
                        break;
                    case "Left":
                        this.dialogManager.say("Fisherman", "Hmm, I can't see what it says. I need to look at the front of the sign...");
                        break;
                    case "Right":
                        this.dialogManager.say("Fisherman", "Hmm, I can't see what it says. I need to look at the front of the sign...");
                        break;
                }
                break;
            //Alchemist
            case 11:
                this.dialogManager.say("Alchemist", "I cannot help anymore...");
                break;
            default:
                this.dialogManager.say("Fisherman", "I like fish...");
                break;
        }
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

        //Check if player is within world borders or if it must move to other plane
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

                        this.lookingAt = futureTile;
                        //If the tile in front is not a collider you can move
                        if (futureTile != 0 && (futureTile < 60 || futureTile == undefined) && futureTile != 11) {
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



    advanceStory() {
        switch (this.storyLineManager.storyProgress) {
            case 1:
                this.storyDialogSay("Fisherman", "I dont know... ");

                break;
            case 3:
                this.storyDialogSay("Fisherman", "I mean I dont remember what happened...");
                break;

            default:

                this.dialogManager.stopDialog();
                break;
        }
    }

    storyDialogSay(characterImage, messageText) {
        this.dialogManager.stopDialog();
        this.dialogManager.say(characterImage, messageText);
        this.storyLineManager.advanceStoryLine(1);
    }

}