let baseUrl = "http://127.0.0.1";
let port = ":8000";
console.log("siunčiqm duomenis is formos");
function createMentor(event) {
    event.preventDefault();
    const form = event.target;
    const formData = {};
    for (let field of form.elements) {
        if (field.name) {
            formData[field.name] = field.value;
        }
    }
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

function getMentors() {
    fetch(`${baseUrl}${port}/getMentors`)
        .then(response => response.json())
        .then(data => {
            fillTable(data);
        })
}
function fillTable(data) {
    let registration = document.querySelector("#registration");
    let HTML = "";
    let counter = 1;
    data.forEach(mentor => {
        HTML += `
        <tr> 
        <td>${counter++}</td>
        <td>${mentor.name}</td>   
        <td>${mentor.surname}</td>    
        <td>${mentor.inputemail4}</td>
        <td>${mentor.inputpassword4}</td>
        <td>
            <a href="" mentorId="${mentor.id}"class="btn btn-sm btn-primary update"><i class="fas fa-edit"></i> Taisyti</a>
            <a href="" mentorId="${mentor.id}"class="btn btn-sm btn-primary update"><i class="fas fa-edit"></i> Ištrinti</a>
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

function deleteMentor(event, mentorId) {
    event.preventDefault();
    const formData = { "id": mentorId };
    fetch(`${baseUrl}${port}/deleteMentor`, {
        method: "POST",
        body: JSON.stringify(formData)
    })
        .then(response => {
            if (response.ok) {
                showAlert("Ištrintas");
                getMentors();
            }
        })
    window.scrollTo(0, 0);
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
setTimeout(() => {
    alertsContainer.innerHTML = '';
}, 3000);