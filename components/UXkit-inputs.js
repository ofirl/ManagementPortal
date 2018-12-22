const inputTagName = 'INPUT';
const floatingInputClassName = 'floating-input';

function UXkitInitInputs() {
    document.body.addEventListener("input", function (e) {
        checkFloatingInput(e.target);
    });
}

function checkFloatingInput(target) {
    if (target.tagName != inputTagName)
        return;
    if (!target.parentElement.classList.contains(floatingInputClassName))
        return;

    if (target.value != "")
        document.querySelector("[for='" + target.id + "'").classList.add("floating-input-label-float");
    else
        document.querySelector("[for='" + target.id + "'").classList.remove("floating-input-label-float");
}

window.addEventListener("load", UXkitInitInputs);