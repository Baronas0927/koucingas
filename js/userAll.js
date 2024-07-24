let form = document.querySelector("#registrationuser");
let formBtn = document.querySelector("#formBtn");
let alertsContainer = document.querySelector("#alerts");
let baseUrl = "http://127.0.0.1";
let port = ":8080";
getUsers();
function getUsers() {
    fetch(`${baseUrl}${port}/api/mentors`)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            fillTable(data);
        })
}
function fillTable(data) {
    let registration = document.querySelector("#registrationuser");
    let HTML = "";
    let counter = 1;
    data.forEach(user => {
        HTML += `
        <tr> 
        <td>${counter++}</td>
        <td>${user.name}</td>   
        <td>${user.surname}</td>    
        <td>${user.inputemail4}</td>
        <td>${user.inputpassword4}</td>
        <td>
            <a href="" userId="${user.id}"class="btn btn-sm btn-primary update"><i class="fas fa-edit"></i> Taisyti</a>
            <a href="" userId="${user.id}"class="btn btn-sm btn-primary update"><i class="fas fa-edit"></i> Ištrinti</a>
        </td>
        </tr>
        `
    });
    registration.innerHTML = HTML;
    addEventListenersOnDelete();
    addEventListenersOnUpdate();

}
function addEventListenersOnUpdate() {
    let updateBnts = document.querySelectorAll(".update");
    updateBnts.forEach(btn => {
        btn.addEventListener("click", function (event) {
            event.preventDefault();
            editMentor(btn.getAttribute("userId"));
            window.scrollTo(0, 0);
        });
    })
}
function addEventListenersOnDelete() {
    let deleteBnts = document.querySelectorAll(".delete");
    deleteBnts.forEach(btn => {
        btn.addEventListener("click", function (event) {
            deleteMentor(btn.getAttribute("userId"));
        })
    });
}
function editMentor(id) {
    toggleForm(true);
    getMentor(id);
}

function getMentor(id) {
    fetch(`${baseUrl}${port}/getMentor?id=${id}`)
        .then(response => response.json())
        .then(data => {
            fillForm(data);
        })
}

function toggleForm(state) {
    formBtn.classList.toggle("btn-success");
    formBtn.classList.toggle("btn-primary");
    document.querySelector("#id").value = "";
    if (state) {
        formBtn.innerText = "Atnaujinti";
        form.removeEventListener("submit", updateMentor);
        form.addEventListener("submit", createMentor);
    }
}
function showAlert(state) {
    alertsContainer.innerHTML = `
    <div class = "alert alert-success">
        <strong>Success!</strong>Vartotojas sėkmingai ${state}.
    </div>
        `};