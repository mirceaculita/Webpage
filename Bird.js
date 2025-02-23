class Bird extends Npc {
    constructor(config) {
        super(config);
    }


    advanceNpcOnPath() {

        var npcMapPosX = Math.round(this.x / 16);
        var npcMapPosY = Math.round(this.y / 16);
        if (this.moving == "true") {
            // console.log(this.loopPath, npcMapPosX, npcMapPosY);
            if (this.path[this.pathProgress][0] >= npcMapPosX) {
                this.direction = "Right";
            }
            else {
                this.direction = "Left";
            }

            this.sprite.setAnimation(this.direction);

            if ((this.path[this.pathProgress][0] == npcMapPosX) && (this.path[this.pathProgress][1] == npcMapPosY)) {
                this.pathProgress++;
            }

            if (this.pathProgress == this.path.length && this.loopPath == true) {
                this.pathProgress = 0;
            }
            else if (this.pathProgress == this.path.length && this.loopPath == false) {
                this.moving = "false";
            }
            this.moveNPC();
        }
        else {
            this.sprite.setMovingState("idle");
            this.sprite.setAnimation("Down");
            var randomNum = Math.floor(Math.random() * 1000);

            if (randomNum > 898) {
                var randomY = Math.floor(Math.random() * (9 - 2 + 1) + 2);
                var random_Dir = Math.random() < 0.5;
                var randomLevelX = Math.floor(Math.random() * (3 - 0 + 1) + 0);
                var randomLevelY = Math.floor(Math.random() * (3 - 0 + 1) + 0);
                this.level = [randomLevelX, randomLevelY];
                if (random_Dir) {
                    this.path = [[-2, randomY], [21, randomY]];
                    this.x = -2 * 16;
                    this.y = randomY * 16;
                } else {
                    this.path = [[21, randomY], [-2, randomY]];
                    this.x = 21 * 16;
                    this.y = randomY * 16;
                }
                this.pathProgress = 0;
                this.moving = "true";
            }
        }
        // console.log(npcMapPosX, npcMapPosY, this.direction, this.pathProgress);



    }

    moveNPC() {
        const [axis, changeValue] = this.directionUpdate[this.direction]
        this[axis] += changeValue;
    }




}