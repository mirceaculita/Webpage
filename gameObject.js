class GameObject{
    constructor(config){
        this.x = config.x || 0;
        this.y = config.y || 0;
        this.sprite = new Sprite({
            gameObject: this,
            srcIdle: config.srcIdle,
            srcWalking: config.srcWalking,
            spriteHeight: config.spriteHeight,
            spriteWidth: config.spriteWidth,
            animation: config.animation,
            spriteOffsetY: config.spriteOffsetY
        });
    }

    update(){

    }
}