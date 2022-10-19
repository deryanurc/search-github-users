const githubForm = document.getElementById("github-form");
const nameInput = document.getElementById("githubname");
const clearButton = document.getElementById("clear-last-users");

const lastUsers = document.getElementById("last-users");
const github = new Github();
const ui = new UI();

eventListener();

function eventListener() {
    githubForm.addEventListener("submit", getData);
    clearButton.addEventListener("click", clearAllSearched);
    document.addEventListener("DOMContentLoaded", getAllSearched);

}

function getData(e) {
    let userName = nameInput.value.trim();

    if (userName === "") {
        alert("Lütfen geçerli bir kullanıcı adı girin");
    }
    else {

        github.getGithubData(userName)
            .then(response => {
                if (response.user.message === "Not Found") {
                    ui.showError("kullanıcı bulunamadı");
                }
                else {
                    ui.addSearchedUserToUI(userName);

                    Storage.addSearchedUserToStorage(userName);
                    ui.showUserInfo(response.user);
                    ui.showRepoInfo(response.repo);

                }
            })
            .catch(err => ui.showError(err));
    }
    ui.clearInput();
    e.preventDefault();
}

function clearAllSearched() {

    if (confirm("Are you sure?")) {
        Storage.clearAllSearchedUsersFromStorage();
        ui.clearAllSearchedFromUI();
    }

}
function getAllSearched() {
    let users = Storage.getSearchedUsersFromStorage();
    let result = "";
    users.forEach(user => {
        result += `<li class="list-group-item">${user}</li>`;

    });
    lastUsers.innerHTML = result;

}