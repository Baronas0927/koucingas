let form = document.querySelector("#mentorregistration");
let formBtn = document.querySelector("#formBtn");
let alertsContainer = document.querySelector("#alerts");
let baseUrl = "http://127.0.0.1";
let port = ":8080";
getMentors();
function getMentors() {
    fetch(`${baseUrl}${port}/api/mentors`)
        .then(response => response.json())
        .then(data => {
            fillTable(data);
        })
}
function fillTable(data) {
    let registration = document.querySelector("#mentorregistration");
    let HTML = "";
    let counter = 1;
    console.log(data);
    data.forEach(mentor => {
        HTML += `
        <tr> 
        <td>${counter++}</td>
        <td>${mentor.name}</td>   
        <td>${mentor.surname}</td>    
        <td>${mentor.email}</td>
        <td>${mentor.mobile}</td>
        <td>${mentor.password}</td>
        <td>${mentor.id} <button id="updateBtn">Edit</button> ${mentor.id} <button>Delete</button></td>
        <td>
            <form action="" class="delform" method="get">
                <button class="btn btn-danger" type="submit" name="id" value="${mentor.id}">there u go</button>
            </form>

        </td>
        </tr>
        `
    });
    registration.innerHTML += HTML;
    addListeners();
    //kvieciam redagavimo listeneriu uzdejima/aktyvavima
    // addEventListenersOnDelete(); 
    // addEventListenersOnUpdate();

}
function updStuff(params) {
    //siunciam uzklausas kazkokias
}

function addListeners() {
    let forms = document.querySelectorAll(".delform");
    console.log(forms);
    forms.forEach(form => {
        console.log("i listen");
        form.addEventListener("submit", delStuff);
    });
    console.log("lalala");
}

function delStuff(event) {
    event.preventDefault();

    const form = event.target;
    const idValue = form.querySelector('button[name="id"]').value;
    console.log(`ID value: ${idValue}`);
    //parasome uzklausa post i backenda "8080" trinimui su idValue ka trinti
}
function updateMentor() {
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

function getMentor(id) {
    fetch(`${baseUrl}${port}/getMentor?id=${id}`)
        .then(response => response.json())
        .then(data => {
            fillForm(data);
        })
}


function showAlert(state) {
    alertsContainer.innerHTML = `
    <div class = "alert alert-success">
        <strong>Success!</strong>Mentorius sėkmingai ${state}.
    </div>
        `};