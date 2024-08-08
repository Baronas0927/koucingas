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
        <td>
          <form action="" class="editform" method="get">
            <button class="btn btn-primary editBtn"  name="editId" value="${mentor.id}">Redaguoti</button> 
             </form> 
             <form action="" class="delform" method="get">
                 <button class="btn btn-danger deleteBtn" type="submit" name="deleteId" value="${mentor.id}">delete</button>
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
    let deletes = document.querySelectorAll(".delform");
    let edits =   document.querySelectorAll(".editform");
    // console.log(deletes);
    console.log(edits);
    
    deletes.forEach(form => {
        // console.log("i listen");
        form.addEventListener("submit", delStuff);
    });
    edits.forEach(form =>{
        form.addEventListener("submit",editStuff);
});
    // console.log("lalala");
}
function editStuff(event){
    event.preventDefault();

    const form = event.target;
    const idValue = form.querySelector('button[name="editId"]').value;
    console.log(`ID value: ${idValue}`);
    //parasome uzklausa post i backenda "8080" redagavimui su idValue ka redaguoti
    
}
function delStuff(event) {
    event.preventDefault();
    const form = event.target;
    const idValue = form.querySelector('button[name="deleteId"]').value;
    console.log(`ID value: ${idValue}`);
    const formData = { id: idValue };
    fetch(`${baseUrl}${port}/api/mentors`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"  // Set the Content-Type header to application/json
        },
        body: JSON.stringify(formData),
    })
        .then(response => {
            if (response.ok) {
                showAlert("Ištrintas");
                form.reset();
                getMentors();
            }
        })
    //parasome uzklausa post i backenda "8080" trinimui su idValue ka trinti
}
function updateMentor() {
    event.preventDefault();
    const form = event.target;
    const idValue = form.querySelector('button[name="updateId"]').value;
    //==== kur formdata su VISAIS name surname ir bla bla?
    fetch(`${baseUrl}${port}/api/mentors/${idValue}`, {
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
    fetch(`${baseUrl}${port}/api/mentors`)
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