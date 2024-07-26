let baseUrl = "http://127.0.0.1";
let port = ":8080";
console.log("siunčiam duomenis is formos");
document.querySelector("#userregistration").addEventListener("submit",createUser);
// toggleForm(true);
function createUser(event) {
    event.preventDefault();
    console.log("labas");
    const form = event.target;
    const formData = {};
    for (let field of form.elements) {
        if (field.name) {
            formData[field.name] = field.value;
        }
    }
    console.log(`${baseUrl}${port}/api/users`);
    console.log(JSON.stringify(formData));

    fetch(`${baseUrl}${port}/api/users`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
    })
    .then(response => {
        if (response.ok) {
            showAlert("Sukurtas");
            form.reset();
        } else {
            return response.text().then(text => { throw new Error(text); });
        }
    })
    .catch(error => {
        console.error('Error:', error);
        showAlert('An error occurred: ' + error.message);
    });
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