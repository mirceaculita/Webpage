(function () {
    const obj = new gameManager({
        element: document.querySelector(".gameWindow")
    });
    gameWindow = document.getElementById('gameWindow'); 
    setTimeout(() => {
    document.body.scrollTo(0,1000);
    }, 200);
    obj.init();

})();