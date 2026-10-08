let display = document.getElementById("display");

let buttons = document.querySelectorAll("button");

buttons.forEach(function(button) {

    button.addEventListener("click", function() {

        let value = button.innerText;

        if (value === "C") {
            display.value = "0";
        }

        else if (value === "=") {

    try {
        let expression = display.value;

        expression = expression.replace("×", "*");
        expression = expression.replace("÷", "/");
        expression = expression.replace("−", "-");

        display.value = eval(expression);
    } 
    catch {
        display.value = "Error";
    }

}

       else {

    if (display.value === "0" || display.value === "Error") {
        display.value = value;
    }

    else {
        display.value += value;
    }

}

    });

});
document.addEventListener("keydown", function(event) {

    let key = event.key;

    if (
        (key >= "0" && key <= "9") ||
        key === "+" ||
        key === "-" ||
        key === "*" ||
        key === "/" ||
        key === "."
    ) {

        if (display.value === "0") {
            display.value = key;
        } 
        else {
            display.value += key;
        }

    }

    else if (key === "Enter" || key === "=") {

        try {
            display.value = eval(display.value);
        } 
        catch {
            display.value = "Error";
        }

    }

    else if (key === "Backspace") {

        display.value = display.value.slice(0, -1);

        if (display.value === "") {
            display.value = "0";
        }

    }

    else if (key === "Escape") {
        display.value = "0";
    }

});