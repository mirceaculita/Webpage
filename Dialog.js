class Dialog {
    constructor() {
        this.dialogBox = document.getElementById("dialogBoxDiv");
        this.dialogMessage = document.getElementById("messageText");
        this.speakerImage = document.getElementById("speakerImage");
        this.active = false;
    }

    say(speaker, message) {
        if (this.active == false) { 
            if (this.dialogBox == undefined) {
                this.dialogBox = document.getElementById("dialogBoxDiv");
                this.dialogMessage = document.getElementById("messageText");
                this.speakerImage = document.getElementById("speakerImage");
            }
            this.speakerImage.style.backgroundImage = "url(./characters/"+speaker+"_profile.png";
            this.active = true;
            this.dialogMessage.innerHTML = message;
            this.dialogBox.style.visibility = "visible";
        }
    }

    stopDialog() {
        this.active = false;
        this.dialogBox.style.visibility = "hidden";
    }

}