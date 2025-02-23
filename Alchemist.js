class Alchemist extends Npc {
    constructor(config) {
        super(config);
        this.path = config.path || [[15, 3]];
        this.dialogManager = config.dialogManager;
        this.storyLineManager = config.storyLineManager;
    }

    update(state) {

        // Initiate dialogue first
        if (this.sprite.visible && this.storyLineManager.storyProgress == 0) {
            this.advanceStory();
        }
        if (this.reachedEndOfPath == true) {
            this.advanceStory();
        }

        if (state.interact == "IntA") {
            this.advanceStory();
        }
    }

    advanceStory() {
        switch (this.storyLineManager.storyProgress) {
            case 0:
                this.storyDialogSay("Alchemist", "Hey...you...wake up! What are you doing here? ");
                break;

            case 2:
                this.storyDialogSay("Alchemist", "What do you mean you dont know??");
                break;

            case 4:
                this.moving = "true";
                this.loopPath = false;
                this.storyLineManager.advanceStoryLine(1);
                break;

            case 5:
                if (this.reachedEndOfPath == true) {
                    this.storyDialogSay("Alchemist", "I moved here now!");
                    this.storyLineManager.advanceStoryLine(1);
                    break;
                }
        }

    }

    storyDialogSay(characterImage, messageText) {
        this.dialogManager.stopDialog();
        this.dialogManager.say(characterImage, messageText);
        this.storyLineManager.advanceStoryLine(1);
    }
}