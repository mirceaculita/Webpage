class StoryLineManager {

    constructor() {
        this.storyProgress = 0;
        this.storyLength = 100;
    }
    
    advanceStoryLine(value) {
        this.storyProgress += value;
        console.log("Current game progress = "+this.storyProgress);
    }

    getStoryProgress(){
        return this.storyProgress;
    }

}