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
        this.world = config.world;
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

    updatePositionNextLevel(newColumn, newLine){
        this.x = newColumn*16;
        this.y = newLine*16;
    }

    updatePosition() {
        var futurePlayerColumn;
        var futurePlayerLine;
        var closeFactor = 0.2;
        var props = this.world.propsArray;
        var minColumn = -1;
        var maxColumn = 19;
        var minLine = -1;
        var maxLine = 10.5;
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
        if ((futurePlayerColumn < maxColumn && futurePlayerColumn > minColumn) && (futurePlayerLine < maxLine && futurePlayerLine > minLine)){
            try {
                var futureTile = props[roundedFuturePositionLine][roundedFuturePositionColumn];
            } catch (error) {
                console.log("error fetching tile at coords from props array", roundedFuturePositionLine,roundedFuturePositionColumn)
            }

            //if the next tile is not a cactus you can move
            if(futureTile != 0){
                this.move();
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

    move(){

        var roundedPositionColumn = Math.round(this.x / 16); 
        var roundedPositionLine = Math.round(this.y / 16); 

        //movePlayer
        const [prop, change] = this.directionUpdate[this.direction]
        this[prop] += change;

        //send player pos to world object
        this.world.updatePlayerPosition(roundedPositionColumn,roundedPositionLine,this.direction);
    }



}