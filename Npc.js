class Npc extends GameObject {
    constructor(config) {
        super(config);
        this.direction = config.direction || "Down";
        this.world = config.world;
        this.level = config.level || [0, 0];
        this.path = config.path || [[3, 7], [15, 3]];
        this.pathProgress = 0;
        this.speed = 1;
        this.moving = true;
        this.loopPath = true;
        this.directionUpdate = {
            "Up": ["y", -this.speed],
            "Down": ["y", this.speed],
            "Left": ["x", -this.speed],
            "Right": ["x", this.speed],
        }
    }

    advanceNpcOnPath() {

        var playerMapPosX = Math.round(this.x / 16);
        var playerMapPosY = Math.round(this.y / 16);

        if (this.moving) {
            this.sprite.setMovingState("walk");

            if (this.path[this.pathProgress][0] >= playerMapPosX) {
                this.direction = "Right";
            }
            else {
                this.direction = "Left";
            }

            if ((this.path[this.pathProgress][0] == playerMapPosX) && (this.path[this.pathProgress][1] != playerMapPosY)) {
                if (this.path[this.pathProgress][1] >= playerMapPosY) {
                    this.direction = "Down";
                }
                else {
                    this.direction = "Up";
                }
            }

            this.sprite.setAnimation(this.direction);

            if ((this.path[this.pathProgress][0] == playerMapPosX) && (this.path[this.pathProgress][1] == playerMapPosY)) {
                this.pathProgress++;
            }

            if (this.pathProgress == this.path.length && this.loopPath == true) {
                this.pathProgress = 0;
            }
            else if (this.pathProgress == this.path.length && this.loopPath == false) {
                this.moving = false;
            }

            // console.log(playerMapPosX, playerMapPosY, this.direction, this.pathProgress);
            this.moveNPC();
        }
        else {
            this.sprite.setMovingState("idle");
            this.sprite.setAnimation("Down");
        }
    }

    moveNPC() {
        const [axis, changeValue] = this.directionUpdate[this.direction]
        this[axis] += changeValue;
    }


}

