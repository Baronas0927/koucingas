
let baseUrl = "http://127.0.0.1";
let port = ":8080";
const button = document.querySelector(".delete");


function addEventListenersOnDelete() {
    let deleteBnts = document.querySelectorAll(".delete");
    deleteBnts.forEach(btn => {
        btn.addEventListener("click", function (event) {
            event.preventDefault();
            deleteMentor(btn.getAttribute("mentorId"));
            showAlert("Ištrintas");
            window.scrollTo(0, 0);
        })
    });
}

function deleteMentor(mentorId) {
    console.log(mentorId);
    const formData = { "id": mentorId };
    fetch(`${baseUrl}${port}/api/mentors`, {
        method: "POST",
        body: JSON.stringify(formData)
    })
        .then(response => {
            if (response.ok) {
                getMentors();
                showAlert("Ištrintas");
            }
        })
}
