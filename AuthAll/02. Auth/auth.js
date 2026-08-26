"use strict";

document.addEventListener("DOMContentLoaded", () => {

    /* =========================================================
       GLOBAL
    ========================================================= */

    const root = document.documentElement;

    const themeToggle =
        document.getElementById("themeToggle");


    /* =========================================================
       DARK / LIGHT MODE
    ========================================================= */

    function setTheme(theme) {

        const validTheme =
            theme === "dark"
                ? "dark"
                : "light";


        const dark =
            validTheme === "dark";


        root.setAttribute(
            "data-bs-theme",
            validTheme
        );


        localStorage.setItem(
            "auth-theme",
            validTheme
        );


        if (themeToggle) {

            themeToggle.innerHTML =
                dark
                    ? '<i class="fa-solid fa-sun"></i>'
                    : '<i class="fa-solid fa-moon"></i>';


            themeToggle.title =
                dark
                    ? "Light Mode"
                    : "Dark Mode";


            themeToggle.setAttribute(
                "aria-label",
                dark
                    ? "Switch to light mode"
                    : "Switch to dark mode"
            );

        }

    }


    const savedTheme =
        localStorage.getItem(
            "auth-theme"
        );


    setTheme(
        savedTheme === "dark"
            ? "dark"
            : "light"
    );


    themeToggle?.addEventListener(
        "click",
        () => {

            const currentTheme =
                root.getAttribute(
                    "data-bs-theme"
                ) || "light";


            setTheme(
                currentTheme === "dark"
                    ? "light"
                    : "dark"
            );

        }
    );


    /* =========================================================
       PASSWORD SHOW / HIDE
    ========================================================= */

    const passwordButtons =
        document.querySelectorAll(
            "[data-password-toggle]"
        );


    passwordButtons.forEach(
        (button) => {

            button.addEventListener(
                "click",
                () => {

                    const inputId =
                        button.dataset.passwordToggle;


                    const input =
                        document.getElementById(
                            inputId
                        );


                    if (!input) {
                        return;
                    }


                    const showPassword =
                        input.type === "password";


                    input.type =
                        showPassword
                            ? "text"
                            : "password";


                    button.innerHTML =
                        showPassword
                            ? '<i class="fa-regular fa-eye-slash"></i>'
                            : '<i class="fa-regular fa-eye"></i>';


                    button.setAttribute(
                        "aria-label",
                        showPassword
                            ? "Hide password"
                            : "Show password"
                    );

                }
            );

        }
    );

});