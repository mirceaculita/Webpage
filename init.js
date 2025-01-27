(function () {
    const obj = new gameManager({
        element: document.querySelector(".gameWindow")
    });
    gameWindow = document.getElementById('gameWindow'); 
    obj.init();

})();