let display = document.getElementById("display");
let internal = "";
let operatorPressed = false; // when use enter operato the opertor is not visible in display
let btns = document.querySelectorAll(".btn");

// Button click events
btns.forEach(btn => {
    btn.addEventListener("click", function () {
        let value = this.innerText;
        handleInput(value);
    });
});

// this is function to handle input click or keyboard
function handleInput(value) {
    // Clear
    if (value === "C") {
        display.value = "";
        internal = "";
        operatorPressed = false;
    } 
    // Delete
    else if (value === "DEL") {
        display.value = display.value.slice(0, -1);
        internal = internal.slice(0, -1);
    } 
    // Multiply
    else if (value === "×") {
        internal += "*";
        operatorPressed = true;
    } 
    // Divide
    else if (value === "÷") {
        internal += "/";
        operatorPressed = true;
    } 
    // Add
    else if (value === "+") {
        internal += "+";
        operatorPressed = true;
    } 
    // Subtract
    else if (value === "-") {
        internal += "-";
        operatorPressed = true;
    } 
    // Equal
    else if (value === "=") {
        try {
            display.value = eval(internal);
            internal = display.value; // result becomes new internal
            operatorPressed = false;
        } catch (e) {
            display.value = "Error";
            internal = "";
        }
    } 
    // Numbers
    else {
        if (operatorPressed) {
            display.value = value;
            operatorPressed = false;
        } else {
            display.value += value;
        }
        internal += value;
    }
}

// This is Keyboard support according to requirement
document.addEventListener("keydown", function(event) {
    const key = event.key;

    if (!isNaN(key)) { // numbers 0-9
        handleInput(key);
    } else if (key === "+") {
        handleInput("+");
    } else if (key === "-") {
        handleInput("-");
    } else if (key === "*") {
        handleInput("×"); // map to × button
    } else if (key === "/") {
        handleInput("÷"); // map to ÷ button
    } else if (key === "Enter") {
        handleInput("=");
    } else if (key === "Backspace") {
        handleInput("DEL");
    } else if (key.toLowerCase() === "c") {
        handleInput("C");
    }
});
