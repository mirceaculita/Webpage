class Npc extends GameObject {
    constructor(config) {
        super(config);
        this.direction = config.direction || "Down";
        this.world = config.world;
        this.level = config.level || [0, 0];
        this.pathProgress = 0;
        this.speed = 1;
        this.moving = config.moving || "true";
        this.loopPath = config.loopPath;
        this.moving = config.moving;
        this.reachedEndOfPath = null;
        this.directionUpdate = {
            "Up": ["y", -this.speed],
            "Down": ["y", this.speed],
            "Left": ["x", -this.speed],
            "Right": ["x", this.speed],
        }
    }

    advanceNpcOnPath() {
        var npcMapPosX = Math.round(this.x / 16);
        var npcMapPosY = Math.round(this.y / 16);
        if (this.moving == "true") {
            this.sprite.setMovingState("walk");

            if (this.path[this.pathProgress][0] >= npcMapPosX) {
                this.direction = "Right";
            }
            else {
                this.direction = "Left";
            }

            if ((this.path[this.pathProgress][0] == npcMapPosX) && (this.path[this.pathProgress][1] != npcMapPosY)) {
                if (this.path[this.pathProgress][1] >= npcMapPosY) {
                    this.direction = "Down";
                }
                else {
                    this.direction = "Up";
                }
            }

            this.sprite.setAnimation(this.direction);
            
            // console.log(npcMapPosX, npcMapPosY, this.direction, this.pathProgress);
            this.moveNPC();

            if ((this.path[this.pathProgress][0] == npcMapPosX) && (this.path[this.pathProgress][1] == npcMapPosY)) {
                this.pathProgress++;
            }

            if (this.pathProgress == this.path.length && this.loopPath == true) {
                this.pathProgress = 0;
            }
            else if (this.pathProgress == this.path.length && this.loopPath == false) {
                this.moving = "false";
                this.reachedEndOfPath = true;
            }


        }
        else {
            this.sprite.setMovingState("idle");
            this.sprite.setAnimation("Down");
        }

    }

    moveNPC() {
        this.reachedEndOfPath = false;
        const [axis, changeValue] = this.directionUpdate[this.direction]
        this[axis] += changeValue;
    }


}

