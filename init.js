(function () {
    const obj = new gameManager({
        element: document.querySelector(".gameWindow")
    });
    gameWindow = document.getElementById('gameWindow'); 
    document.body.scrollTo(0,1000);
    obj.init();

})();