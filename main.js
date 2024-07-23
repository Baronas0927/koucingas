let form = document.querySelector("#registration");
let formBtn = document.querySelector("#formBtn");
let alertsContainer = document.querySelector("#alerts");
let baseUrl = "http://127.0.0.1";
let port = ":8000";

form.addEventListener("submit", createUser);
getUsers();

function createUser(event){
    event.preventDefault();
    const form = event.target;
    const formData = {};
    for(let field of form.elements){
        if(field.name){
            formData[field.name] = field.value;
        }
    }
    fetch (`${baseUrl}${port}/createUser`, {
        method: "POST",
        body: JSON.stringify(formData)
    })
    .then(Response => {
        if(response.ok){
            showAlert("Sukurtas");
            form.reset();
            getUsers();
        }
    })

}
function getUsers(){
    fetch(`${baseUrl}${port}/getUsers`)
        .then(response => response.json())
        .then(data => {
            fillTable(data);
        })
}
function fillTable(data){
    let registration = document.querySelector("#registration");
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
function addEventListenersOnUpdate(){
    let updateBnts = document.querySelectorAll(".update");
    updateBnts.forEach(btn => {
        btn.addEventListener("click", function (event){
            event.preventDefault();
            editUser(btn.getAttribute("userId"));
            window.scrollTo(0,0);
        }

    });
}

function deleteUser(userId){
    event.preventDefault();
    const formData = {"id": userId};
    fetch (`${baseUrl}${port}/deleteUser`,{
        method: "POST",
        body: JSON.stringify(formData)
    })
    .then(response => {
        if(response.ok){
            showAlert("Ištrintas");
            getUsers();
        }
    })
    window.scrollTo(0,0);
}

function editUser(id){
    toggleForm(true);
    getUser(id);
}

function getUser(id){
    fetch(`${baseUrl}${port}/getUser?id=${id}`)
        .then(response => response.json())
        .then(data => {
            fillForm(data);
        })
}

function toggleForm(state){
    formBtn.classList.toggle("btn-success");
    formBtn.classList.toggle("btn-primary");
    document.querySelector("#id").value = "";
    if(state){
        formBtn.innerText = "Atnaujinti";
        form.removeEventListener("submit", updateUser);
        form.addEventListener("submit", createUser);
    }
}

function showAlert(state){
    alertsContainer.innerHTML = `
    <div class = "alert alert-success">
        <strong>Success!</strong>Vartotojas sėkmingai ${status}.
    </div>
        `};
    setTimeout(() => {
        alertsContainer.innerHTML = '';
    }, 3000);