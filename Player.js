class Player extends gameObject {
    constructor(config) {
        super(config);
        this.direction = config.direction || "Down";
        this.directionUpdate = {
            "Up": ["y", -1],
            "Down": ["y", 1],
            "Left": ["x", -1],
            "Right": ["x", 1],
        }
        this.arrow = config.arrow;
        this.walking = false;
    }

    update(state) {
        var walking;
        this.updateSpriteAnim(state);
        if (state.arrow != undefined) {
            walking = true;
            this.updatePosition();
            if (state.arrow) {
                this.direction = state.arrow;
            }
        }
        else {
            walking = false;
        }
        this.updateMovingState(walking);

    }

    updatePosition() {
        var futurePlayerColumn;
        var futurePlayerLine;
        var closeFactor = 0.2;
        switch (this.direction) {

            case "Up":
                futurePlayerColumn = this.x / 16;
                futurePlayerLine = this.y / 16 - closeFactor;
                break;
            case "Down":
                futurePlayerColumn = this.x / 16;
                futurePlayerLine = this.y / 16 + closeFactor;
                break;
            case "Left":
                futurePlayerColumn = this.x / 16 - closeFactor;
                futurePlayerLine = this.y / 16;
                break;
            case "Right":
                futurePlayerColumn = this.x / 16 + closeFactor;
                futurePlayerLine = this.y / 16;
                break;

        }
        var roundedFuturePositionColumn = Math.round(futurePlayerColumn);
        var roundedFuturePositionLine = Math.round(futurePlayerLine);
        if ((futurePlayerColumn < 19 && futurePlayerColumn > -1) && (futurePlayerLine < 10 && futurePlayerLine > -1)){
            try {
                var futureTile = props0[roundedFuturePositionLine][roundedFuturePositionColumn];
            } catch (error) {
                console.log("error fetching tile at coords from props array", roundedFuturePositionLine,roundedFuturePositionColumn)
            }

            //if the next tile is not a cactus you can move
            if(futureTile != 0){
                const [prop, change] = this.directionUpdate[this.direction]
                this[prop] += change;
            }
        }
    }

    updateSpriteAnim() {
        this.sprite.setAnimation(this.direction);
    }

    updateMovingState(walkState) {
        if (walkState) {
            this.sprite.setMovingState("walk");
        }
        else {
            this.sprite.setMovingState("idle");
        }

    }

}