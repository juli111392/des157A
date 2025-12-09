(function () {
    "use strict";
    console.log("reading js");

    // Get screen elements
    const startScreen = document.querySelector("#start-screen");
    const formScreen = document.querySelector("#form-screen");
    const finalScreen = document.querySelector("#final-screen");
    
    // Get buttons and form
    const startBtn = document.querySelector("#start-btn");
    const form = document.querySelector("#madlib-form");

    // Start button - go to form screen
    startBtn.addEventListener("click", function() {
        startScreen.classList.remove("active");
        formScreen.classList.add("active");
    });

    // Form submission - process and go to final screen
    form.addEventListener("submit", function(event) {
        event.preventDefault();

        // Capture input values
        const userName = document.querySelector("#name").value;
        const userAdj = document.querySelector("#adj").value;
        const userColor = document.querySelector("#color").value;
        const userItem = document.querySelector("#item").value;
        const userTool = document.querySelector("#tool").value;

        // Insert values into final screen (all instances of name)
        document.querySelector("#name-out").textContent = userName;
        document.querySelector("#name-out-2").textContent = userName;
        document.querySelector("#name-out-3").textContent = userName;
        document.querySelector("#name-out-4").textContent = userName;
        
        document.querySelector("#adj-out").textContent = userAdj;
        document.querySelector("#color-out").textContent = userColor;
        document.querySelector("#item-out").textContent = userItem;
        document.querySelector("#tool-out").textContent = userTool;

        // Switch to final screen
        formScreen.classList.remove("active");
        finalScreen.classList.add("active");
    });

})();