class Dialog {
    constructor() {
        this.dialogBox = document.getElementById("dialogBoxDiv");
        this.dialogMessage = document.getElementById("messageText");
        this.speakerImage = document.getElementById("speakerImage");
        this.active = false;
        this.speed = 20;
        this.messageProgress = 0;
        this.messageText = null;
        this.canStopDialog = false;
    }

    say(speaker, message) {

        this.canStopDialog = false;
        console.log("dialog in progress " + this.dialogInProgress);
        if (this.active == false) {
            if (this.dialogBox == undefined) {
                this.dialogBox = document.getElementById("dialogBoxDiv");
                this.dialogMessage = document.getElementById("messageText");
                this.speakerImage = document.getElementById("speakerImage");
            }
            this.messageText = message;
            this.speakerImage.style.backgroundImage = "url(./characters/" + speaker + "_profile.png";
            this.active = true;
            this.dialogBox.style.visibility = "visible";
            for (var i = 0; i < message.length; i++) {
                this.typeWriter(message, i);
            }

        }
    }

    typeWriter(message, i) {
        setTimeout(() => {
            console.log(message.charAt(i));
            if (i == message.length - 1) {
                this.canStopDialog = true;
                console.log("dialog in progress " + this.dialogInProgress);
            }
            this.dialogMessage.innerHTML += message.charAt(i);
        }, this.speed * i);
    }
    stopDialog() {
        if (this.canStopDialog == true) {
            this.active = false;
            this.dialogMessage.innerHTML = "";
            this.messageProgress = 0;
            this.dialogBox.style.visibility = "hidden";
            this.canStopDialog = false;
        }
    }

}