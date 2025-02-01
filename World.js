class World {
    constructor(config) {
        this.width = config.width;
        this.height = config.height;

        this.worldSprites = new Image();
        this.worldSprites.src = config.src;
        this.worldSprites.onload = () => {
            this.isGroundLoaded = true;
        }
        this.isDrawn = false;
        this.currentLevel = config.currentLevel || 0;
        this.playerObj = config.player;
        this.props = null;
        this.ground = null;
        this.mapGround = [
            [ground00, ground01, ground02],
            [ground10, ground11, ground12],
            [ground20, ground21, ground22]
        ]
        this.mapProps = [
            [props00, props01, props02],
            [props10, props11, props12],
            [props20, props21, props22]
        ]
        this.mapCoordinates = [0,0];

        this.NPCs = config.NPCs;
    }


    updateMapLevel(dir) {
        //Leave map right
        if(dir == "Right"){
            this.mapCoordinates = [this.mapCoordinates[0],this.mapCoordinates[1]+1];
        }
        //Leave map left
        if(dir == "Left"){
            this.mapCoordinates = [this.mapCoordinates[0],this.mapCoordinates[1]-1];
        }
        //Leave map down
        if(dir == "Down"){
            this.mapCoordinates = [this.mapCoordinates[0]+1,this.mapCoordinates[1]];
        }
        //Leave map up
        if(dir == "Up"){
            this.mapCoordinates = [this.mapCoordinates[0]-1,this.mapCoordinates[1]];
        }

    }



    draw(context) {
        
        //Update NPC positions
        for(let i = 0; i<this.NPCs.length; i++){
            if((this.NPCs[i].level[0] != this.mapCoordinates[0]) || (this.NPCs[i].level[1] != this.mapCoordinates[1])){
                this.NPCs[i].sprite.visible = false;
            }
            else{
                this.NPCs[i].sprite.visible = true;
            }
        }
        
        this.ground = this.mapGround[this.mapCoordinates[0]][this.mapCoordinates[1]];
        this.props = this.mapProps[this.mapCoordinates[0]][this.mapCoordinates[1]];

        //Draw ground
        for (let i = 0; i < this.height; i++) {
            for (let j = 0; j < this.width; j++) {
                context.drawImage(this.worldSprites,
                    this.ground[i][j] * 32, 0,
                    32, 32,
                    j * 16, i * 16,
                    16, 16
                )
            }
        }
        //Draw props
        for (let i = 0; i < this.height; i++) {
            for (let j = 0; j < this.width; j++) {
                var tile = this.props[i][j];
                var coordX = 0;
                var coordY = 0;
                if (tile <= 3) {
                    coordX = tile;
                    coordY = 1;
                }
                if (tile > 3) {
                    coordX = tile - 4;
                    coordY = 2;
                }
                context.drawImage(this.worldSprites,
                    coordX * 32, coordY * 32,
                    32, 32,
                    j * 16, i * 16,
                    16, 16
                )
            }
        }
    }

    get propsArray(){
        return this.props;
    }
}