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

    }

    draw(context) {
        //Draw ground
        for (let i = 0; i < this.height; i++) {
            for (let j = 0; j < this.width; j++) {
                context.drawImage(this.worldSprites,
                    ground3[i][j]*32, 0,
                    32, 32,
                    j * 16, i * 16,
                    16, 16
                )
            }
        }
        //Draw props
        for (let i = 0; i < this.height; i++) {
            for (let j = 0; j < this.width; j++) {
                var tile = props0[i][j];
                var coordX = 0;
                var coordY = 0;
                if(tile <= 3){
                    coordX = tile;
                    coordY = 1;
                }
                if(tile > 3){
                    coordX = tile-4;
                    coordY = 2;
                }
                context.drawImage(this.worldSprites,
                    coordX*32, coordY*32,
                    32, 32,
                    j * 16, i * 16,
                    16, 16
                )
            }
        }




    }
}