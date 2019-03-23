var username;
var projects = [];

function loadUser(user) {
	var usern = user;
	if (user[0] === "@") {
		usern = usern.substring(1, 100);
	}
	
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			var res = JSON.parse(xhttp.responseText);
			if (res.code) {
				notFoundError();
			} else {
				getStats(res);
			}
		}
	};
	xhttp.open("GET", `https://api.scratchstats.com/scratch/users/${usern}`, true);
	xhttp.send();
}

function notFoundError() {
	$("#errorModal").modal("show");
	setTimeout(function () {
		$("#errorModal").modal("hide");
	}, 4000);
}

function getStats(res) {
	username = res.username;
	var id = res.id;
	var st = res.scratchteam;
	var joined = new Date(res.history.joined);
	joined = joined.toLocaleDateString("en-us", {weekday: "short", year: "numeric", month: "short", day: "numeric", hour: "numeric", minute: "2-digit", second: "2-digit"});
	var country = res.profile.country;
	var aboutme = res.profile.bio;
	var wiwo = res.profile.status;
	var pic = `https://cdn2.scratch.mit.edu/get_image/user/${id}_90x90.png`;
	getMsg();
	proj(0);
	if (st === false) {
		st = "Scratcher";
	} else {
		st = "Scratch Team Member";
	}
	document.getElementById("username").innerHTML = username.toUpperCase();
	document.getElementById("country").innerHTML = `Location: ${country}`;
	document.getElementById("id").innerHTML = `Account ID: ${id}`;
	document.getElementById("date").innerHTML = `Join Date: ${joined}`;
	document.getElementById("st").innerHTML = st;
	document.getElementById("logo").src = pic;
}

function proj(offset) {
	var lim = 40;
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			var res = JSON.parse(xhttp.responseText);
			if (res.length === lim) {
				proj(offset + lim);
			}
			if (res.length !== 0) {
				var lastProject = res[res.length-1].id;
			}
			if (res.length === 0 && offset !== 0) {
				loadedProjects();
			}
			res.forEach((project) => {
				projects.push(project);
			});
			if (res.length !== lim) {
				loadedProjects();
			}
		}
	};
	xhttp.open("GET", `https://api.scratchstats.com/scratch/users/${username}/projects/?limit=${lim}&offset=${offset}`, true);
	xhttp.send();
}

function loadedProjects() {
	console.log(projects);
}

function getMsg() {
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			var res = JSON.parse(xhttp.responseText);
			var msg = res.count;
			document.getElementById("msg").innerHTML = `Unread Messages: ${msg}`;
		}
	};
	xhttp.open("GET", `https://api.scratchstats.com/scratch/users/${username}/messages/count`, true);
	xhttp.send();
}

function openProfile() {
	window.open(`https://scratch.mit.edu/users/${username}`);
}