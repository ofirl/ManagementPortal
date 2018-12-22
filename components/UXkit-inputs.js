const inputTagName = 'INPUT';
const floatingInputClassName = 'floating-input';

function UXkitInitInputs() {
    document.body.addEventListener("input", function (e) {
        checkFloatingInput(e.target);
    });
}

function checkFloatingInput(target) {
    if (!target.checkElementTag(inputTagName))
        return;
    if (!target.checkElementParentClass(floatingInputClassName))
        return;

    if (target.value != "")
        document.querySelector("[for='" + target.id + "'").classList.add("floating-input-label-float");
    else
        document.querySelector("[for='" + target.id + "'").classList.remove("floating-input-label-float");
}

window.addEventListener("load", UXkitInitInputs);