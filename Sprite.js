class Sprite {
    constructor(config) {
        this.visible = true;

        this.walkingImage = new Image();
        this.idleImage = new Image();

        this.image = this.idleImage;
        this.walkingImage.onload = () => {
            this.isWalkingLoaded = true;
        }

        this.idleImage.onload = () => {
            this.isIdleLoaded = true;
        }

        this.walkingImage.src = config.srcWalking;
        this.idleImage.src = config.srcIdle;

        this.movingState = "idle";

        //Animation config
        this.animation = config.animation || {
            Down: [
                [0, 0], [1, 0], [2, 0], [3, 0]
            ],
            Up: [
                [0, 3], [1, 3], [2, 3], [3, 3]
            ],
            Left: [
                [0, 1], [1, 1], [2, 1], [3, 1]
            ],
            Right: [
                [0, 2], [1, 2], [2, 2], [3, 2]
            ]
        }

        this.moveState = "idle";
        this.currentAnimation = "Down";
        this.currentAnimationFrame = 0;

        this.animationFrameLimit = config.animationFrameLimit || 8;
        this.animationFrameProgress = this.animationFrameProgress;

        this.gameObject = config.gameObject;

        this.spriteWidth = config.spriteWidth || 16;
        this.spriteHeight = config.spriteHeight || 24;
        this.spriteOffsetY = config.spriteOffsetY || 14;
    }

    setMovingState(moveState) {
        if (moveState == "idle" && this.isWalkingLoaded && this.isIdleLoaded) {
            this.moveState = moveState;
            this.image = this.idleImage;
        }
        
        if (moveState == "walk" && this.isWalkingLoaded && this.isIdleLoaded) {
            this.moveState = moveState;
            this.image = this.walkingImage;
        }
    }

    get frame() {
        return this.animation[this.currentAnimation][this.currentAnimationFrame];
    }

    updateAnimationProgress() {
        if (this.animationFrameProgress > 0) {
            this.animationFrameProgress -= 1;
            return;
        }

        this.animationFrameProgress = this.animationFrameLimit;
        this.currentAnimationFrame += 1;

        if (this.frame == undefined) {
            this.currentAnimationFrame = 0;
        }
    }

    setAnimation(anim) {
        if (this.currentAnimation != anim) {
            this.currentAnimation = anim;
            this.currentAnimationFrame = 0;
            this.animationFrameProgress = this.animationFrameLimit;
        }
    }

    draw(context) {
        if(this.visible){
        const x = this.gameObject.x;
        const y = this.gameObject.y;
        const [frameX, frameY] = this.frame;
        context.drawImage(this.image,
            frameX * this.spriteWidth, frameY * this.spriteHeight,
            this.spriteWidth, this.spriteHeight,
            x, y-this.spriteOffsetY,
            this.spriteWidth, this.spriteHeight
        )

        this.updateAnimationProgress();}
    }
}
