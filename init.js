(function () {
    const obj = new GameManager({
        element: document.querySelector(".gameWindow"),
        dialogBoxDiv: document.querySelector(".dialogBox")
    });
    document.body.addEventListener('touchstart', (e) => e.preventDefault(), { passive: false });
    obj.init();

})();