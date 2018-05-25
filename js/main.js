//declare base URL to use in Fetch method
var url1 = "https://api.github.com/users/";

//add event listeners to search
document.getElementById("searchButton").addEventListener("click", fetchUser);
document.getElementById("searchButton").addEventListener("click", fetchRepos);
document.getElementById("gitSearch").addEventListener("keydown", function (event) {
	if (event.which == 13) {
		fetchUser();
		fetchRepos();
	}
});

//functions to call fetch using correct URLs
function fetchUser() {
	var username = document.getElementById("gitSearch").value;
	var url3 = "https://api.github.com/users/" + username;
	fetchJSON(url3, createNameDisplay, errorHandler);
};

function fetchRepos() {
	var username = document.getElementById("gitSearch").value;
	var url3 = "https://api.github.com/users/" + username + "/repos?per_page=100"
	fetchJSON(url3, createTable, errorHandler);
};

//base Fetch function 
function fetchJSON(url, successCallback, failureCallback) {
	fetch(url)
		.then(function (response) {
			if (response.ok) {
				return response.json();
			}
			throw new Error(response.statusText);
		}).then(function (json) {
			successCallback(json);

		}).catch(function (error) {
			console.log("Request failed " + error.message);
			failureCallback();
		});
}

//function to create user info display + hide/show content
function createNameDisplay(JSONData) {
	document.getElementById("gitSearch").value = "";

	//hide/show content
	document.getElementById("errorDiv").classList.add("hide");
	document.getElementById("repoTableDiv").classList.remove("hide");
	document.getElementById("titleDiv").classList.remove("hide");

	//create and fill HTML elements
	var avatarURL = JSONData.avatar_url;
	var username = JSONData.login;
	var fullName = JSONData.name;
	var bio = JSONData.bio;

	document.getElementById("avatarImg").setAttribute("src", avatarURL);
	document.getElementById("usernameDiv").innerHTML = "@" + username;
	document.getElementById("fullNameDiv").innerHTML = fullName;
	document.getElementById("bioDiv").innerHTML = bio;
}

//function to create user repo table + hide/show irrelevant content
function createTable(JSONData) {
	document.getElementById("gitSearch").value = "";
	
	//hide/show content
	document.getElementById("errorDiv").classList.add("hide");
	document.getElementById("repoTableDiv").classList.remove("hide");
	document.getElementById("titleDiv").classList.remove("hide");

	document.getElementById("tbody").innerHTML = " ";

	document.getElementById("caption").innerHTML = "Repositories";

	//create and fill table
	for (var i = 0; i < JSONData.length; i++) {

		var row = document.createElement("tr");
		var nameCell = document.createElement("td");
		nameCell.setAttribute("class", "nameCell");
		var statsCell = document.createElement("td");
		statsCell.setAttribute("class", "statsCell");
		var starImg = document.createElement("img");
		var forkImg = document.createElement("img");
		var repoName = JSONData[i].name;
		var starsCount = JSONData[i].stargazers_count;
		var starImgURL = "https://upload.wikimedia.org/wikipedia/commons/thumb/8/88/Octicons-star.svg/2000px-Octicons-star.svg.png";
		starImg.setAttribute("src", starImgURL);
		starImg.setAttribute("class", "icon");

		var forkCount = JSONData[i].forks_count;
		var forkImgURL = "http://timhettler.github.io/sassconf-2015/slides/assets/svg/fork.svg";
		forkImg.setAttribute("src", forkImgURL);
		forkImg.setAttribute("class", "icon");

		nameCell.append(repoName);
		statsCell.append(starImg);
		statsCell.append(starsCount);
		statsCell.append(forkImg);
		statsCell.append(forkCount);
		row.append(nameCell);
		row.append(statsCell);
		document.getElementById("tbody").append(row);

	}
}

//function if no user found
function errorHandler() {
	//hide/show relevant content
	document.getElementById("errorDiv").classList.remove("hide");
	document.getElementById("repoTableDiv").classList.add("hide");
	document.getElementById("titleDiv").classList.add("hide");
}