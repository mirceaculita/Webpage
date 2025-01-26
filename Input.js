class Input {
    constructor() {
        this.heldDirection = [];
        this.map = {
            "KeyW": "Up",
            "KeyS": "Down",
            "KeyA": "Left",
            "KeyD": "Right",
        }
        this.body = document.getElementById("body");
        this.dPad = document.getElementById("D_Pad");
        this.dpad_up = document.getElementById("dpad_up");
        this.dpad_down = document.getElementById("dpad_down");
        this.dpad_left = document.getElementById("dpad_left");
        this.dpad_right = document.getElementById("dpad_right");
    }



    get direction() {
        switch (this.heldDirection[0]) {
            case "Up":
                this.dPad.style.backgroundImage = "url(./BACKGROUND/dpad_up.png)";
                break;
            case "Down":
                this.dPad.style.backgroundImage = "url(./BACKGROUND/dpad_down.png)";
                break;
            case "Left":
                this.dPad.style.backgroundImage = "url(./BACKGROUND/dpad_left.png)";
                break;
            case "Right":
                this.dPad.style.backgroundImage = "url(./BACKGROUND/dpad_right.png)";
                break;
            default:
                this.dPad.style.backgroundImage = "url(./BACKGROUND/dpad_none.png)";
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