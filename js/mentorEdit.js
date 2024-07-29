let form = document.querySelector("#mentorregistration");
let formBtn = document.querySelector("#formBtn");
let baseUrl = "http://127.0.0.1";
let port = ":8080";
const button = document.querySelector(".edit");
edit.id = 'edit';
getMentors();
function getMentors(){
    fetch(`${baseUrl}${port}/getMentors`)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            fillTable(data);
        })
}
function createMentor(){
    event.preventDefault();
    const form = event.target;

    fetch(`${baseUrl}${port}/createMentor`, {
        method: "POST",
        body: JSON.stringify(formData)
    })
        .then(response => {
            if (response.ok) {
                showAlert("Sukurtas");
                form.reset();
                getMentors();
            }
        })
}

function updateMentor(){
    event.preventDefault();
    const form = event.target;
    fetch(`${baseUrl}${port}/updateMentor`, {
        method: "POST",
        body: JSON.stringify(formData),
    })
        .then(response => {
            if (response.ok) {
                showAlert("Atnaujintas");
                form.reset();
                getMentors();
            }
        })
}

function fillTable(data){
    let table = document.querySelector("#table");
    let HTML = "";
    let counter = 1;
    data.forEach(mentor => {
        console.log("mentor");
        HTML += `
        <tr>
            <td>${counter++}</td>
            <td>${mentor.name}</td>
            <td>${mentor.surname}</td>
            <td>${mentor.email}</td>
            <td>${mentor.mobile}</td>
            <td>${mentor.password}</td>
            <td>${updateBnts.addEventListenersOnUpdate}</td>
            <td>${deleteBnts.addEventListenersOnDelete}</td>
           
        </tr>
        `
    });
    table.innerHTML += HTML;
    addEventListenersOnUpdate();
    addEventListenersOnDelete();
}

function addEventListenersOnUpdate() {
    let updateBnts = document.querySelectorAll(".update");
    updateBnts.forEach(btn => {
        btn.addEventListener("click", function (event) {
            event.preventDefault();
            editMentor(btn.getAttribute("mentorId"));
            window.scrollTo(0, 0);
        });
    })
}
function addEventListenersOnDelete() {
    let deleteBnts = document.querySelectorAll(".delete");
    deleteBnts.forEach(btn => {
        btn.addEventListener("click", function (event) {
            deleteMentor(btn.getAttribute("mentorId"));
        })
    });
}
// function fillForm(mentor) {
//     document.querySelector("#manufacturer").value = mentor.manufacturer;
//     document.querySelector("#model").value = mentor.model;
//     document.querySelector("#releaseYear").value = mentor.releaseYear;
//     document.querySelector("#fuelType").value = vacation.fuelType;
// }