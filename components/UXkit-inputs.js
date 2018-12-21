function UXkitInitInputs() {
    var floatingInputs = document.querySelectorAll(".floating-input > input");
    for (let i = 0; i < floatingInputs.length; i++) {
        const input = floatingInputs[i];
        
        // input.addEventListener("change", function (e) {
        //     checkFloatingInput(e.target);
        // });
        input.addEventListener("input", function (e) {
            checkFloatingInput(e.target);
        });
    }
}

function checkFloatingInput(inputElement) {
    if (inputElement.value != "")
        document.querySelector("[for='" + inputElement.id + "'").classList.add("floating-input-label-float");
    else
        document.querySelector("[for='" + inputElement.id + "'").classList.remove("floating-input-label-float");
}

window.addEventListener("load", UXkitInitInputs);