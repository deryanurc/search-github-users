class UI {
    constructor() {
        this.profileDiv = document.getElementById("profile");
        this.repoDiv = document.getElementById("repos");
        this.lastUsers = document.getElementById("last-users");
        this.inputField = document.getElementById("githubname");
        this.cardBody = document.querySelector(".container-search-card-body");
    }
    clearInput() {
        this.inputField.value = "";

    }
    showUserInfo(user) {
        this.profileDiv.innerHTML = `
        <div class="card-body" id="ui-div">
        <div class="row">
          <div id="ui-div-row">
          <div id="ui-head">
              <a href="${user.html_url}" target="_blank">
                <img class="ui-div-image" src="${user.avatar_url}">
              </a>
              <hr>
              <div id="fullName"><strong>${user.name}</strong></div>
               <hr>
               <div id="bio">${user.bio}</div>
              
           </div>
              <div id="ui-body-div">
              <div id="buttons-div">
                   <button  class="buttons" id="body-followers-button">
                    Takipçi <span id="follower-span">${user.followers}</span>
                   </button>
                   <button class="buttons" id="body-following-button">
                    Takip edilen <span id="following-span">${user.following}</span>
                   </button>
                   <button class="buttons" id="body-repos-button">
                    Repolar <span id="repos-button">${user.public_repos}</span>
                   </button>
                   </div>
                   <hr>
                   <div id="body-list-div">
                   <li class="list-group">
                     <li class="list-group-item">
                       <img src="images/company.png" width="30px"> <span class="image-span" id="company">${user.company}</span>
                     </li>
                     
                     <li class="list-group-item">
                      <img src="images/location.png" width="30px"><span class="image-span" id="location">${user.location}</span>
                     </li>
    
                     <li class="list-group-item">
                      <img src="images/mail.png" width="30px"><span class="image-span" id="mail">${user.email}</span>
                     </li>
                   </li>
                   </div>
              </div>
       </div>
       </div>
    </div>
        
        `;
    }

    showError(message) {
        const div = document.createElement("div");
        div.className = "alert";
        div.textContent = message;

        this.cardBody.appendChild(div);
        setTimeout(() => {
            div.remove();
        }, 2000)
    }

    showRepoInfo(repos) {
        this.repoDiv.innerHTML = "";

        repos.forEach(repo => {
            this.repoDiv.innerHTML += `
            
      <div id="repo-div">
            <div id="repo-head">
               <a href="${repo.html_url}" target="_blank" id="repoName">${repo.name}</a>
           </div>
          <div id="repo-body">
             <button class="btn">
                Starlar <span id="repo-star">${repo.stargazers_count}</span>
             </button>
             <button class="btn">
                Forklar <span id="repo-forks">${repo.forks_count}</span>
            </button>
         </div>
       </div>
            
            `;
        })
    }
    addSearchedUserToUI(userName) {
        let users = Storage.getSearchedUsersFromStorage();

        if (users.indexOf(userName) === -1) {

            const li = document.createElement("li");
            li.className = "list-group-item";
            li.textContent = userName;

            this.lastUsers.appendChild(li);

        }
    }
    clearAllSearchedFromUI() {
        while (this.lastUsers.firstElementChild !== null) {
            this.lastUsers.removeChild(this.lastUsers.firstElementChild);
        }
    }
}