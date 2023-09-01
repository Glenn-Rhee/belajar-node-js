const nav = document.querySelectorAll(".nav-link");
if (window.location.href.includes("/contacts")) {
    nav[2].classList.add("fw-bold");
} else if (window.location.href.includes("/about")) {
    nav[1].classList.add("fw-bold");
} else {
    nav[0].classList.add("fw-bold");
}