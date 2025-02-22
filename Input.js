class Input {
    constructor() {
        this.heldDirection = [];
        this.heldInteract = [];
        this.map = {
            "KeyW": "Up",
            "KeyS": "Down",
            "KeyA": "Left",
            "KeyD": "Right",
            "IntA": "InterA",
            "IntB": "InterB",
        }
        this.body = document.getElementById("body");
        this.dPad = document.getElementById("D_Pad");
        this.dpad_up = document.getElementById("dpad_up");
        this.dpad_down = document.getElementById("dpad_down");
        this.dpad_left = document.getElementById("dpad_left");
        this.dpad_right = document.getElementById("dpad_right");
        this.interact_A = document.getElementById("interact_A");
        this.interact_B = document.getElementById("interact_B");
        this.interacting = false;
        this.dPad_Img_Src_Arr = ["./BACKGROUND/dpad_up.png", "./BACKGROUND/dpad_down.png", "./BACKGROUND/dpad_left.png", "./BACKGROUND/dpad_right.png", "./BACKGROUND/dpad_none.png"];
    }

    /* WHEN PRESSING INTERACT IF THERE IS NOTHING IN FRONT OF PLAYER SAY SOMETHING RANDOM. iF THERE IS SOMETHING IN FRON OF THE PLAYER
    SAY SOMETHING ABOUT THE ITEM OR INTERACT WITH IT */

    get interact() {
        if (this.heldInteract[0] != undefined) {
            if (this.interacting == false) {
                this.interacting = true;
                return this.heldInteract[0];
            }
            else {
                return undefined;
            }
        }
        else
            return undefined;
    }

    get direction() {
        var preloadedImages = [];
        for (let i = 0; i < this.dPad_Img_Src_Arr.length; i++) {

            preloadedImages[i] = new Image();
            preloadedImages[i].src = this.dPad_Img_Src_Arr[i];
        }

        switch (this.heldDirection[0]) {
            case "Up":
                this.dPad.style.backgroundImage = "url(" + preloadedImages[0].src + ")";
                break;
            case "Down":
                this.dPad.style.backgroundImage = "url(" + preloadedImages[1].src + ")";
                break;
            case "Left":
                this.dPad.style.backgroundImage = "url(" + preloadedImages[2].src + ")";
                break;
            case "Right":
                this.dPad.style.backgroundImage = "url(" + preloadedImages[3].src + ")";
                break;
            default:
                this.dPad.style.backgroundImage = "url(" + preloadedImages[4].src + ")";
                break;
        }
        return this.heldDirection[0];
    }

    init() {


        document.addEventListener('touchmove', ev => {
            ev.preventDefault();
            ev.stopImmediatePropagation();
        }, { passive: false });

        document.addEventListener("keydown", key => {
            const dir = this.map[key.code];
            if (dir && this.heldDirection.indexOf(dir) == -1) {
                this.heldDirection.unshift(dir);

            }
        });

        document.addEventListener("keyup", key => {
            const dir = this.map[key.code];
            const index = this.heldDirection.indexOf(dir);
            if (index > -1) {
                this.heldDirection.splice(index, 1);
            }
        });

        //Mouse input
        this.dpad_up.addEventListener("mousedown", (e) => {
            const dir = this.map["KeyW"];
            if (dir && this.heldDirection.indexOf(dir) == -1) {
                this.heldDirection.unshift(dir);
            }
        });
        this.dpad_up.addEventListener("mouseup", (e) => {
            const dir = this.map["KeyW"];
            const index = this.heldDirection.indexOf(dir);
            if (index > -1) {
                this.heldDirection.splice(index, 1);
            }
        });

        this.dpad_down.addEventListener("mousedown", (e) => {
            const dir = this.map["KeyS"];
            if (dir && this.heldDirection.indexOf(dir) == -1) {
                this.heldDirection.unshift(dir);

            }
        });
        this.dpad_down.addEventListener("mouseup", (e) => {
            const dir = this.map["KeyS"];
            const index = this.heldDirection.indexOf(dir);
            if (index > -1) {
                this.heldDirection.splice(index, 1);
            }
        });

        this.dpad_right.addEventListener("mousedown", (e) => {
            const dir = this.map["KeyD"];
            if (dir && this.heldDirection.indexOf(dir) == -1) {
                this.heldDirection.unshift(dir);

            }
        });

        this.dpad_right.addEventListener("mouseup", (e) => {
            const dir = this.map["KeyD"];
            const index = this.heldDirection.indexOf(dir);
            if (index > -1) {
                this.heldDirection.splice(index, 1);
            }
        });

        this.dpad_left.addEventListener("mousedown", (e) => {
            const dir = this.map["KeyA"];
            if (dir && this.heldDirection.indexOf(dir) == -1) {
                this.heldDirection.unshift(dir);

            }
        });
        this.dpad_left.addEventListener("mouseup", (e) => {
            const dir = this.map["KeyA"];
            const index = this.heldDirection.indexOf(dir);
            if (index > -1) {
                this.heldDirection.splice(index, 1);
            }
        });

        //Desktop interact
        this.interact_A.addEventListener("mousedown", (e) => {
            this.interact_A.style.backgroundColor = "rgba(0, 0, 0, 0.239)";
            const dir = "IntA";
            console.log("mousedown");
            if (dir && this.heldInteract.indexOf(dir) == -1) {
                this.heldInteract.unshift(dir);
            }

        });
        this.interact_A.addEventListener("mouseup", (e) => {
            this.interact_A.style.backgroundColor = "transparent";
            this.interacting = false;
            const dir = "IntA";
            const index = this.heldInteract.indexOf(dir);
            if (index > -1) {
                this.heldInteract.splice(index, 1);
            }
        });
        this.interact_B.addEventListener("mousedown", (e) => {
            this.interact_B.style.backgroundColor = "rgba(0, 0, 0, 0.239)";

            const dir = "IntB";
            if (dir && this.heldInteract.indexOf(dir) == -1) {
                this.heldInteract.unshift(dir);
            }
        });
        this.interact_B.addEventListener("mouseup", (e) => {
            this.interact_B.style.backgroundColor = "transparent";

            const dir = "IntB";
            const index = this.heldInteract.indexOf(dir);
            if (index > -1) {
                this.heldInteract.splice(index, 1);
            }
        });

        //Touch interact
        this.interact_A.addEventListener("pointerdown", (e) => {
            this.interact_A.style.backgroundColor = "rgba(0, 0, 0, 0.239)";

            const dir = "IntA";
            if (dir && this.heldInteract.indexOf(dir) == -1) {
                this.heldInteract.unshift(dir);
            }
        });
        this.interact_A.addEventListener("pointerup", (e) => {
            this.interact_A.style.backgroundColor = "transparent";

            const dir = "IntA";
            const index = this.heldInteract.indexOf(dir);
            if (index > -1) {
                this.heldInteract.splice(index, 1);
            }
        });
        this.interact_B.addEventListener("pointerdown", (e) => {
            this.interact_B.style.backgroundColor = "rgba(0, 0, 0, 0.239)";

            const dir = "IntB";
            if (dir && this.heldInteract.indexOf(dir) == -1) {
                this.heldInteract.unshift(dir);
            }
        });
        this.interact_B.addEventListener("pointerup", (e) => {
            this.interact_B.style.backgroundColor = "transparent";

            const dir = "IntB";
            const index = this.heldInteract.indexOf(dir);
            if (index > -1) {
                this.heldInteract.splice(index, 1);
            }
        });

        //Touch input
        this.dpad_up.addEventListener("pointerdown", (e) => {
            const dir = this.map["KeyW"];
            if (dir && this.heldDirection.indexOf(dir) == -1) {
                this.heldDirection.unshift(dir);

            }
        });
        this.dpad_up.addEventListener("pointerup", (e) => {
            const dir = this.map["KeyW"];
            const index = this.heldDirection.indexOf(dir);
            if (index > -1) {
                this.heldDirection.splice(index, 1);
            }
        });

        this.dpad_down.addEventListener("pointerdown", (e) => {
            const dir = this.map["KeyS"];
            if (dir && this.heldDirection.indexOf(dir) == -1) {
                this.heldDirection.unshift(dir);

            }
        });
        this.dpad_down.addEventListener("pointerup", (e) => {
            const dir = this.map["KeyS"];
            const index = this.heldDirection.indexOf(dir);
            if (index > -1) {
                this.heldDirection.splice(index, 1);
            }
        });

        this.dpad_right.addEventListener("pointerdown", (e) => {
            const dir = this.map["KeyD"];
            if (dir && this.heldDirection.indexOf(dir) == -1) {
                this.heldDirection.unshift(dir);

            }
        });
        this.dpad_right.addEventListener("pointerup", (e) => {
            const dir = this.map["KeyD"];
            const index = this.heldDirection.indexOf(dir);
            if (index > -1) {
                this.heldDirection.splice(index, 1);
            }
        });

        this.dpad_left.addEventListener("pointerdown", (e) => {
            const dir = this.map["KeyA"];
            if (dir && this.heldDirection.indexOf(dir) == -1) {
                this.heldDirection.unshift(dir);

            }
        });
        this.dpad_left.addEventListener("pointerup", (e) => {
            const dir = this.map["KeyA"];
            const index = this.heldDirection.indexOf(dir);
            if (index > -1) {
                this.heldDirection.splice(index, 1);
            }
        });

    }
}