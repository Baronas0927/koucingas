let form = document.querySelector("#mentorregistration");
let formBtn = document.querySelector("#formBtn");
let baseUrl = "http://127.0.0.1";
let port = ":8080";
const button = document.querySelector(".delete");


function addEventListenersOnDelete() {
    let deleteBnts = document.querySelectorAll(".delete");
    deleteBnts.forEach(btn => {
        btn.addEventListener("click", function (event) {
            event.preventDefault();
            deleteVacation(btn.getAttribute("mentorId"));
            showAlert("Ištrintas");
            window.scrollTo(0, 0);
        })
    });
}

function addEventListenersOnDelete() {
    let deleteBnts = document.querySelectorAll(".delete");
    deleteBnts.forEach(btn => {
        btn.addEventListener("click", function (event) {
            deleteMentor(btn.getAttribute("mentorId"));
        })
    });
}