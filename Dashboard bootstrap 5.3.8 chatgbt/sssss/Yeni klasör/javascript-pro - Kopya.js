"use strict";

document.addEventListener("DOMContentLoaded", function () {

    /* ========================================================
       GLOBAL ELEMENTS
    ======================================================== */

    const root = document.documentElement;

    const sidebar = document.getElementById("sidebar");
    const appContent = document.getElementById("appContent");

    const sidebarToggle = document.getElementById("sidebarToggle");
    const sidebarClose = document.getElementById("sidebarClose");
    const sidebarOverlay = document.getElementById("sidebarOverlay");

    const themeToggle = document.getElementById("themeToggle");

    const bootstrapCss = document.getElementById("bootstrapCss");
    const directionCss = document.getElementById("directionCss");

    const directionOptions =
        document.querySelectorAll(".direction-option");


    /* ========================================================
       SIDEBAR
    ======================================================== */

    function isMobile() {

        return window.innerWidth < 992;

    }


    function closeMobileSidebar() {

        if (sidebar) {
            sidebar.classList.remove("mobile-open");
        }

        if (sidebarOverlay) {
            sidebarOverlay.classList.remove("show");
        }

        document.body.classList.remove("sidebar-open");

    }


    if (sidebarToggle) {

        sidebarToggle.addEventListener("click", function () {

            if (!sidebar) return;


            if (isMobile()) {

                sidebar.classList.toggle("mobile-open");

                if (sidebarOverlay) {

                    sidebarOverlay.classList.toggle(
                        "show",
                        sidebar.classList.contains("mobile-open")
                    );

                }

                document.body.classList.toggle(
                    "sidebar-open",
                    sidebar.classList.contains("mobile-open")
                );

            } else {

                sidebar.classList.toggle("collapsed");

                if (appContent) {

                    appContent.classList.toggle(
                        "sidebar-collapsed"
                    );

                }

            }

        });

    }


    if (sidebarClose) {

        sidebarClose.addEventListener(
            "click",
            closeMobileSidebar
        );

    }


    if (sidebarOverlay) {

        sidebarOverlay.addEventListener(
            "click",
            closeMobileSidebar
        );

    }


    window.addEventListener("resize", function () {

        if (!isMobile()) {

            closeMobileSidebar();

        }

    });


    /* ========================================================
       DARK / LIGHT THEME
    ======================================================== */

    function setTheme(theme) {

        if (
            theme !== "light" &&
            theme !== "dark"
        ) {

            theme = "light";

        }


        root.setAttribute(
            "data-bs-theme",
            theme
        );


        localStorage.setItem(
            "dashboard-theme",
            theme
        );


        /*
         * Change Icon
         */

        if (themeToggle) {

            if (theme === "dark") {

                themeToggle.innerHTML =
                    '<i class="fa-solid fa-sun"></i>';

                themeToggle.title =
                    "Switch to Light Mode";

            } else {

                themeToggle.innerHTML =
                    '<i class="fa-solid fa-moon"></i>';

                themeToggle.title =
                    "Switch to Dark Mode";

            }

        }


        /*
         * Update Charts safely
         */

        if (
            typeof window.updateChartsTheme === "function"
        ) {

            window.updateChartsTheme();

        }

    }


    /*
     * Load saved theme
     */

    const savedTheme =
        localStorage.getItem(
            "dashboard-theme"
        );


    if (savedTheme) {

        setTheme(savedTheme);

    } else {

        /*
         * Default = Light
         */

        setTheme("light");

    }


    /*
     * Theme Button
     */

    if (themeToggle) {

        themeToggle.addEventListener(
            "click",
            function () {

                const currentTheme =
                    root.getAttribute(
                        "data-bs-theme"
                    ) || "light";


                const newTheme =
                    currentTheme === "dark"
                        ? "light"
                        : "dark";


                setTheme(newTheme);

            }
        );

    }


    /* ========================================================
       LTR / RTL
    ======================================================== */

    function setDirection(direction) {

        if (
            direction !== "ltr" &&
            direction !== "rtl"
        ) {

            direction = "ltr";

        }


        const rtl =
            direction === "rtl";


        /* HTML direction */

        root.setAttribute(
            "dir",
            direction
        );


        root.setAttribute(
            "lang",
            rtl
                ? "ar"
                : "en"
        );


        /* Bootstrap */

        if (bootstrapCss) {

            bootstrapCss.href = rtl

                ? "https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/css/bootstrap.rtl.min.css"

                : "https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/css/bootstrap.min.css";

        }


        /* Direction CSS */

        if (directionCss) {

            directionCss.href = rtl
                ? "style-rtl-pro.css"
                : "style-ltr-pro.css";

        }


        /* Save */

        localStorage.setItem(
            "dashboard-direction",
            direction
        );


        /* Dropdown active item */

        directionOptions.forEach(
            function (option) {

                const optionDirection =
                    option.dataset.direction;


                option.classList.toggle(
                    "active",
                    optionDirection === direction
                );

            }
        );


        /*
         * Resize Charts after RTL/LTR
         */

        setTimeout(function () {

            if (
                typeof window.resizeDashboardCharts ===
                "function"
            ) {

                window.resizeDashboardCharts();

            }

        }, 300);

    }


    /*
     * Saved Direction
     */

    const savedDirection =
        localStorage.getItem(
            "dashboard-direction"
        ) || "ltr";


    setDirection(
        savedDirection
    );


    /*
     * Direction dropdown
     */

    directionOptions.forEach(
        function (option) {

            option.addEventListener(
                "click",
                function () {

                    const direction =
                        this.dataset.direction;


                    setDirection(
                        direction
                    );

                }
            );

        }
    );


    /* ========================================================
       DATATABLE
    ======================================================== */

    const ordersTable =
        document.getElementById(
            "ordersTable"
        );


    if (
        ordersTable &&
        typeof DataTable !== "undefined"
    ) {

        try {

            new DataTable(
                "#ordersTable",
                {

                    scrollX: true,

                    responsive: false,

                    pageLength: 5,

                    lengthMenu: [
                        5,
                        10,
                        25,
                        50
                    ],

                    order: [
                        [0, "desc"]
                    ],

                    language: {

                        search: "",

                        searchPlaceholder:
                            "Search orders...",

                        lengthMenu:
                            "_MENU_",

                        info:
                            "Showing _START_ to _END_ of _TOTAL_ orders",

                        infoEmpty:
                            "No orders",

                        zeroRecords:
                            "No matching orders"

                    }

                }
            );

        } catch (error) {

            console.error(
                "DataTable error:",
                error
            );

        }

    } else {

        console.warn(
            "DataTables library not loaded."
        );

    }


    /* ========================================================
       CHARTS
    ======================================================== */

    const dashboardCharts = [];


    if (
        typeof Chart !== "undefined"
    ) {

        Chart.defaults.font.family =
            "Inter, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif";

        Chart.defaults.responsive =
            true;

        Chart.defaults.maintainAspectRatio =
            false;


        /* ====================================================
           REVENUE CHART
        ==================================================== */

        const revenueCanvas =
            document.getElementById(
                "revenueChart"
            );


        if (revenueCanvas) {

            try {

                const revenueChart =
                    new Chart(
                        revenueCanvas,
                        {

                            type:
                                "line",

                            data: {

                                labels: [
                                    "Jan",
                                    "Feb",
                                    "Mar",
                                    "Apr",
                                    "May",
                                    "Jun",
                                    "Jul",
                                    "Aug"
                                ],

                                datasets: [

                                    {

                                        label:
                                            "Revenue",

                                        data: [
                                            12000,
                                            15000,
                                            13200,
                                            19000,
                                            22800,
                                            21100,
                                            28200,
                                            32600
                                        ],

                                        borderColor:
                                            "#6366f1",

                                        backgroundColor:
                                            "rgba(99,102,241,.12)",

                                        borderWidth:
                                            3,

                                        tension:
                                            .38,

                                        fill:
                                            true,

                                        pointRadius:
                                            3

                                    },

                                    {

                                        label:
                                            "Expenses",

                                        data: [
                                            8000,
                                            9300,
                                            8800,
                                            11000,
                                            12500,
                                            11900,
                                            14100,
                                            15100
                                        ],

                                        borderColor:
                                            "#ef4444",

                                        backgroundColor:
                                            "rgba(239,68,68,.08)",

                                        borderWidth:
                                            3,

                                        tension:
                                            .38,

                                        fill:
                                            false,

                                        pointRadius:
                                            3

                                    }

                                ]

                            },

                            options: {

                                interaction: {

                                    intersect:
                                        false,

                                    mode:
                                        "index"

                                },

                                plugins: {

                                    legend: {

                                        position:
                                            "top",

                                        align:
                                            "end",

                                        labels: {

                                            usePointStyle:
                                                true

                                        }

                                    }

                                },

                                scales: {

                                    x: {

                                        grid: {

                                            display:
                                                false

                                        }

                                    },

                                    y: {

                                        beginAtZero:
                                            true,

                                        ticks: {

                                            callback:
                                                function (value) {

                                                    return "$" +
                                                        (
                                                            value / 1000
                                                        ) +
                                                        "k";

                                                }

                                        }

                                    }

                                }

                            }

                        }
                    );


                dashboardCharts.push(
                    revenueChart
                );

            } catch (error) {

                console.error(
                    "Revenue Chart Error:",
                    error
                );

            }

        }


        /* ====================================================
           CATEGORY CHART
        ==================================================== */

        const categoryCanvas =
            document.getElementById(
                "categoryChart"
            );


        if (categoryCanvas) {

            try {

                const categoryChart =
                    new Chart(
                        categoryCanvas,
                        {

                            type:
                                "doughnut",

                            data: {

                                labels: [
                                    "Electronics",
                                    "Fashion",
                                    "Home",
                                    "Other"
                                ],

                                datasets: [

                                    {

                                        data: [
                                            38,
                                            27,
                                            21,
                                            14
                                        ],

                                        backgroundColor: [
                                            "#6366f1",
                                            "#22c55e",
                                            "#f59e0b",
                                            "#38bdf8"
                                        ],

                                        borderWidth:
                                            0,

                                        hoverOffset:
                                            8

                                    }

                                ]

                            },

                            options: {

                                cutout:
                                    "72%",

                                plugins: {

                                    legend: {

                                        position:
                                            "bottom",

                                        labels: {

                                            usePointStyle:
                                                true,

                                            padding:
                                                18

                                        }

                                    }

                                }

                            }

                        }
                    );


                dashboardCharts.push(
                    categoryChart
                );

            } catch (error) {

                console.error(
                    "Category Chart Error:",
                    error
                );

            }

        }


        /* ====================================================
           ORDER STATUS
        ==================================================== */

        const ordersCanvas =
            document.getElementById(
                "ordersChart"
            );


        if (ordersCanvas) {

            try {

                const ordersChart =
                    new Chart(
                        ordersCanvas,
                        {

                            type:
                                "doughnut",

                            data: {

                                labels: [
                                    "Completed",
                                    "Processing",
                                    "Pending",
                                    "Cancelled"
                                ],

                                datasets: [

                                    {

                                        data: [
                                            52,
                                            24,
                                            16,
                                            8
                                        ],

                                        backgroundColor: [
                                            "#22c55e",
                                            "#3b82f6",
                                            "#f59e0b",
                                            "#ef4444"
                                        ],

                                        borderWidth:
                                            0,

                                        hoverOffset:
                                            8

                                    }

                                ]

                            },

                            options: {

                                cutout:
                                    "70%",

                                plugins: {

                                    legend: {

                                        position:
                                            "bottom",

                                        labels: {

                                            usePointStyle:
                                                true,

                                            padding:
                                                15

                                        }

                                    }

                                }

                            }

                        }
                    );


                dashboardCharts.push(
                    ordersChart
                );

            } catch (error) {

                console.error(
                    "Orders Chart Error:",
                    error
                );

            }

        }

    } else {

        console.error(
            "Chart.js library is not loaded."
        );

    }


    /* ========================================================
       CHART THEME
    ======================================================== */

    window.updateChartsTheme =
        function () {

            if (
                typeof Chart === "undefined"
            ) {

                return;

            }


            const dark =
                root.getAttribute(
                    "data-bs-theme"
                ) === "dark";


            Chart.defaults.color =
                dark
                    ? "#adb5bd"
                    : "#6b7280";


            Chart.defaults.borderColor =
                dark
                    ? "rgba(255,255,255,.10)"
                    : "rgba(0,0,0,.08)";


            dashboardCharts.forEach(
                function (chart) {

                    chart.update();

                }
            );

        };


    window.resizeDashboardCharts =
        function () {

            dashboardCharts.forEach(
                function (chart) {

                    chart.resize();

                }
            );

        };


    /*
     * Apply theme to charts
     */

    window.updateChartsTheme();


    /* ========================================================
       DEBUG
    ======================================================== */

    console.log(
        "%cAdminPro loaded successfully ✓",
        "color:#22c55e;font-weight:bold;font-size:14px;"
    );

});