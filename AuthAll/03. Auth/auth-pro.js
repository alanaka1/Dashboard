"use strict";

document.addEventListener("DOMContentLoaded", () => {

    const root =
        document.documentElement;

    const themeToggle =
        document.getElementById(
            "themeToggle"
        );


    /* =========================================================
       DARK / LIGHT
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
            "dashboard-theme",
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

        }

    }


    const savedTheme =
        localStorage.getItem(
            "dashboard-theme"
        );


    setTheme(
        savedTheme === "dark"
            ? "dark"
            : "light"
    );


    themeToggle?.addEventListener(
        "click",
        () => {

            const current =
                root.getAttribute(
                    "data-bs-theme"
                );


            setTheme(
                current === "dark"
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
                        button.dataset
                            .passwordToggle;


                    const input =
                        document.getElementById(
                            inputId
                        );


                    if (!input) {
                        return;
                    }


                    const isPassword =
                        input.type ===
                        "password";


                    input.type =
                        isPassword
                            ? "text"
                            : "password";


                    button.innerHTML =
                        isPassword

                            ? '<i class="fa-regular fa-eye-slash"></i>'

                            : '<i class="fa-regular fa-eye"></i>';

                }
            );

        }
    );

});