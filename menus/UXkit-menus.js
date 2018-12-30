const movingMenuLabelClassName = "moving-menu-label";

/**
 * Init for menus (event listeners etc.)
 */
function UXkitInitMenus() {
    document.body.addEventListener("click", function (e) {
        checkMovingMenuClick(e.target);
    });
}

/**
 * Check click for moving menu
 * @param {Element} target 
 */
function checkMovingMenuClick(target) {
    console.log("yay testing!");
    if (!target.checkElementClass(movingMenuLabelClassName))
        return;

    //console.log("yay!");
    var targetMenu = target.parentElement.querySelector('ul');

    target.parentElement.parentElement.toggleClass('moving-menu-active');
    target.parentElement.parentElement.toggleClass('moving-menu-inactive');
    targetMenu.toggleClass('moving-menu-active');
    targetMenu.toggleClass('moving-menu-inactive');
}

window.addEventListener("load", UXkitInitMenus);