const movingMenuLabelClassName = "moving-menu-label";

function UXkitInitMenus() {
    document.body.addEventListener("click", function (e) {
        checkMovingMenuClick(e.target);
    });
}

function checkMovingMenuClick(target) {
    console.log("yay testing!");
    if (!target.checkElementClass(movingMenuLabelClassName))
        return;

    console.log("yay!");
}

window.addEventListener("load", UXkitInitMenus);