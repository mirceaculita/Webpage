(function () {
    const obj = new gameManager({
        element: document.querySelector(".gameWindow")
    });
    document.body.addEventListener('touchstart', (e) => e.preventDefault(), { passive: false });
    obj.init();

})();