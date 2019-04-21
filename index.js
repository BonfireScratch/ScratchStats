var username = "";
var browser = "?";
var os = "?";
var projects = [];
var total = [];

function loadUser(user, pushHistory) {
	var usern = user;
	if (user[0] === "@") {
		usern = usern.substring(1, 100);
	} else if (user == "" || user == " ") {
		return;
	}
	
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			var res = JSON.parse(xhttp.responseText);
			if (res.code) {
				notFoundError();
			} else {
				getStats(res, pushHistory);
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

function getStats(res, pushHistory) {
	username = res.username;
	if(pushHistory) {
		history.pushState({}, "", `#${username}`);
	}
	projects = [];
	total = [];
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
			if (res.length === 0 && offset !== 0) {
				loadedProjects();
			}
			res.forEach((project) => {
				projects.push(project);
			});
			if (res.length !== lim) {
				loadedProjects();
				getProjectStats();
			}
		}
	};
	xhttp.open("GET", `https://api.scratchstats.com/scratch/users/${username}/projects/?limit=${lim}&offset=${offset}`, true);
	xhttp.send();
}

function loadedProjects() {
	var lastProject = projects[projects.length - 1].id;
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			var res = JSON.parse(xhttp.responseText);
			var userAgent = res.meta ? res.meta.agent : (res.info ? res.info.userAgent : "");
			if (userAgent) {
				browser = new UAParser(userAgent).getBrowser();
				os = new UAParser(userAgent).getOS();
				if (!browser.name) {
					browser = "?";
				} else if (!os.name) {
					os = "?";
				}
				document.getElementById("os").innerHTML = `OS: ${os.name} ${os.version}`;
				document.getElementById("browser").innerHTML = `Browser: ${browser.name}`;
			}
		}
	};
	xhttp.open("GET", `https://projects.scratch.mit.edu/${lastProject}`, true);
	xhttp.send();
}

function sortProjects(stat) {
	var projArray = projects.slice();
	projArray.sort((a, b) => {
		return b.stats[stat] - a.stats[stat];
	});
	return projArray;
}

function getTotal() {
	var statsArray = ["views", "loves", "favorites", "comments"];
	var statsResults = [];
	statsArray.forEach((stat) => {
		var st = 0;
		projects.forEach((project) => {
			st += project.stats[stat];
		}); 
		statsResults[stat] = st;
	});
	return statsResults;
}

function getProjectStats() {
	var lastProject = projects[projects.length - 1];
	var lastProject2 = projects[projects.length - 2];
	var lastProject3 = projects[projects.length - 3];
	
	var views = sortProjects("views");
	var popProject = views[0];
	var popProject2 = views[1];
	var popProject3 = views[2];
	
	var loves = sortProjects("loves");
	var lovProject = loves[0];
	var lovProject2 = loves[1];
	var lovProject3 = loves[2];
	
	var totStats = getTotal();
	
	document.getElementById("fProjectName").innerHTML = lastProject.title.substring(0, 25);
	document.getElementById("sProjectName").innerHTML = lastProject2.title.substring(0, 25);
	document.getElementById("tProjectName").innerHTML = lastProject3.title.substring(0, 25);
	document.getElementById("fProjHref").href = `https://scratch.mit.edu/projects/${lastProject.id}/`;
	document.getElementById("sProjHref").href = `https://scratch.mit.edu/projects/${lastProject2.id}/`;
	document.getElementById("tProjHref").href = `https://scratch.mit.edu/projects/${lastProject3.id}/`;
	document.getElementById("fProjectImg").src = `https://cdn2.scratch.mit.edu/get_image/project/${lastProject.id}_216x163.png`;
	document.getElementById("sProjectImg").src = `https://cdn2.scratch.mit.edu/get_image/project/${lastProject2.id}_216x163.png`;
	document.getElementById("tProjectImg").src = `https://cdn2.scratch.mit.edu/get_image/project/${lastProject3.id}_216x163.png`;
	
	document.getElementById("fViewName").innerHTML = popProject.title.substring(0, 25);
	document.getElementById("sViewName").innerHTML = popProject2.title.substring(0, 25);
	document.getElementById("tViewName").innerHTML = popProject3.title.substring(0, 25);
	document.getElementById("fViewHref").href = `https://scratch.mit.edu/projects/${popProject.id}/`;
	document.getElementById("sViewHref").href = `https://scratch.mit.edu/projects/${popProject2.id}/`;
	document.getElementById("tViewHref").href = `https://scratch.mit.edu/projects/${popProject3.id}/`;
	document.getElementById("fViewImg").src = `https://cdn2.scratch.mit.edu/get_image/project/${popProject.id}_216x163.png`;
	document.getElementById("sViewImg").src = `https://cdn2.scratch.mit.edu/get_image/project/${popProject2.id}_216x163.png`;
	document.getElementById("tViewImg").src = `https://cdn2.scratch.mit.edu/get_image/project/${popProject3.id}_216x163.png`;
	
	document.getElementById("fLoveName").innerHTML = lovProject.title.substring(0, 25);
	document.getElementById("sLoveName").innerHTML = lovProject2.title.substring(0, 25);
	document.getElementById("tLoveName").innerHTML = lovProject3.title.substring(0, 25);
	document.getElementById("fLoveHref").href = `https://scratch.mit.edu/projects/${lovProject.id}/`;
	document.getElementById("sLoveHref").href = `https://scratch.mit.edu/projects/${lovProject2.id}/`;
	document.getElementById("tLoveHref").href = `https://scratch.mit.edu/projects/${lovProject3.id}/`;
	document.getElementById("fLoveImg").src = `https://cdn2.scratch.mit.edu/get_image/project/${lovProject.id}_216x163.png`;
	document.getElementById("sLoveImg").src = `https://cdn2.scratch.mit.edu/get_image/project/${lovProject2.id}_216x163.png`;
	document.getElementById("tLoveImg").src = `https://cdn2.scratch.mit.edu/get_image/project/${lovProject3.id}_216x163.png`;
	
	document.getElementById("totViews").innerHTML = `Total Views: ${totStats["views"]}`;
	document.getElementById("totLoves").innerHTML = `Total Loves: ${totStats["loves"]}`;
	document.getElementById("totFavourites").innerHTML = `Total Favourites: ${totStats["favorites"]}`;
	document.getElementById("totComments").innerHTML = `Total Comments: ${totStats["comments"]}`;
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

if (location.hash) {
	window.location = `#${location.hash.substring(1, 100)}`;
}

window.onhashchange = () => {
	loadUser(location.hash.substring(1), true);
}

loadUser('griffpatch', false);
