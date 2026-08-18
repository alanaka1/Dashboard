
let table = new DataTable('#example', {
    scrollX: true,
    scrollY: "400px",

});

/**************************************** LTR / RTL CSS Switcher *************************************************/
const bootstrapCss = document.getElementById('bootstrapCss');
const directionCss = document.getElementById('directionCss');
const directionOptions = document.querySelectorAll('[data-direction]');
const currentDirection = document.getElementById('currentDirection');

const directionFiles = {
  ltr: {
    bootstrap: 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/css/bootstrap.min.css',
    integrity: 'sha384-sRIl4kxILFvY47J16cr9ZwB07vP4J8+LH7qKQnuqkuIAvNWLzeN8tE5YBujZqJLB',
    custom: 'style-ltr.css',
    lang: 'en'
  },
  rtl: {
    bootstrap: 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/css/bootstrap.rtl.min.css',
    integrity: 'sha384-CfCrinSRH2IR6a4e6fy2q6ioOX7O6Mtm1L9vRvFZ1trBncWmMePhzvafv7oIcWiW',
    custom: 'style-rtl.css',
    lang: 'ar'
  }
};

function setDirection(direction) {
  const selected = directionFiles[direction] ? direction : 'ltr';
  const files = directionFiles[selected];

  document.documentElement.dir = selected;
  document.documentElement.lang = files.lang;
  bootstrapCss.href = files.bootstrap;
  bootstrapCss.integrity = files.integrity;
  bootstrapCss.crossOrigin = 'anonymous';
  directionCss.href = files.custom;

  if (currentDirection) currentDirection.textContent = selected.toUpperCase();
  directionOptions.forEach((option) => {
    const isActive = option.dataset.direction === selected;
    option.classList.toggle('active', isActive);
    option.setAttribute('aria-current', isActive ? 'true' : 'false');
  });

  localStorage.setItem('dashboard-direction', selected);
  window.setTimeout(() => window.dispatchEvent(new Event('resize')), 150);
}

directionOptions.forEach((option) => {
  option.addEventListener('click', () => setDirection(option.dataset.direction));
});

setDirection(localStorage.getItem('dashboard-direction') || 'ltr');

/**************************************** Dark / Light Mode *************************************************/
const themeToggle = document.getElementById('themeToggle');

function setTheme(theme) {
  const selectedTheme = theme === 'dark' ? 'dark' : 'light';
  document.documentElement.setAttribute('data-bs-theme', selectedTheme);
  localStorage.setItem('dashboard-theme', selectedTheme);

  if (themeToggle) {
    const isDark = selectedTheme === 'dark';
    themeToggle.innerHTML = isDark
      ? '<i class="fa-solid fa-sun"></i>'
      : '<i class="fa-solid fa-moon"></i>';
    themeToggle.title = isDark ? 'Light mode' : 'Dark mode';
  }
}

const savedTheme = localStorage.getItem('dashboard-theme');
const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
setTheme(savedTheme || systemTheme);

if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    setTheme(document.documentElement.getAttribute('data-bs-theme') === 'dark' ? 'light' : 'dark');
  });
}

/**************************************** Sidebar Menu Open Close *************************************************/

let btn = document.querySelector('#btn');
let sidebarMenu = document.querySelector('.sidebar-menu');
let dashboardMainBtn = document.querySelector('.dashboard-main');

btn.onclick = function() {
  sidebarMenu.classList.toggle('active');
  dashboardMainBtn.classList.toggle('active');
}
/**************************************** Sidebar Menu Open Close *************************************************/


/**************************************** Chart JS *************************************************/
// https://www.chartjs.org/docs/latest/
// https://html-color.codes/ if you want to color JavaScript
let myChartDoughnut   = document.getElementById('myChartDoughnut');
let myChartLine       = document.getElementById('myChartLine');
let myCharBar         = document.getElementById('myCharBar');
let myChartPolarArea  = document.getElementById('myChartPolarArea');

let char1 = new Chart(myChartDoughnut, {
  type:'doughnut', // bar, horizontalBar, pie, line, doughnut, radar, polarArea
  data:{
    labels:['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
    datasets:[{
      label:'Population',
      data:[200, 50, 100, 70, 60, 30],
      //backgroundColor:'green',
      backgroundColor:[
        'rgb(255,51,51)',
        'rgb(54, 162, 235)',
        'rgb(255,255,102)',
        'rgb(201, 203, 207)',
        'rgb(221,160,221)',
        'rgb(255,165,0)'
      ],
      hoverOffset: 4
    }]
  }
});

let char2 = new Chart(myChartLine, {
  type:'line', // bar, horizontalBar, pie, line, doughnut, radar, polarArea
  data:{
    labels:['January', 'February', 'March', 'April', 'May', 'June',],
    datasets:[{
      label:'My First dataset',
      data:[0, 10, 5, 2, 20, 30, 45],
      //backgroundColor:'green',
        backgroundColor: 'rgb(255, 99, 132)',
        borderColor: 'rgb(255, 99, 132)',
      hoverOffset: 4
    }]
  }
});

let char3 = new Chart(myCharBar, {
  type:'bar', // bar, horizontalBar, pie, line, doughnut, radar, polarArea
  data:{
    label: 'Bar Dataset',
    labels:['January', 'February', 'March', 'April'],
    datasets:[{
      type: 'bar',
      label: 'Bar Dataset',
      data: [10, 20, 30, 40],
      borderColor: 'rgb(255, 99, 132)',
      backgroundColor: 'rgba(255, 99, 132, 0.2)'
    }, {
        type: 'line',
        label: 'Line Dataset',
        data: [50, 50, 50, 50],
        fill: false,
        borderColor: 'rgb(54, 162, 235)'
      }]
  }
});


let char4 = new Chart(myChartPolarArea, {
  type:'polarArea', // bar, horizontalBar, pie, line, doughnut, radar, polarArea
  data:{
    labels:[ 'Red', 'Green', 'Yellow', 'Grey', 'Blue'],
    datasets:[{
      label: 'My First Dataset',
      data: [11, 16, 7, 3, 14],
      backgroundColor:[
        'rgb(255, 99, 132)',
        'rgb(75, 192, 192)',
        'rgb(255, 205, 86)',
        'rgb(201, 203, 207)',
        'rgb(54, 162, 235)'
      ],
    }]
  }
});


