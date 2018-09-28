var xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function() {
    if (xhttp.readyState == 4 && xhttp.status == 200) {
       var response = xhttp.responseText;
       userAPIdata = response;
       loadpagefromAPI();
    }
};

function myFunction(usertext, proj) {
document.getElementById('id01').style.display='none';
usertext = usertext.replace("@","");
usertext = usertext.replace("https://scratch.mit.edu/users/","");
usertext = usertext.replace("/","");
scratchusername=usertext;
project = proj;
xhttp.open("GET", "https://api.scratch.mit.edu/users/" + scratchusername + "/projects/" + project, true);
xhttp.send();
loadpagefromAPI();
}
var getuserinputdata = -1;
var userAPIdata;
var scratchusername;
var project;
function loadpagefromAPI() {
	var title = getElementFromAPI(userAPIdata,"\"title\"");
	var desc = getElementFromAPI(userAPIdata,"\"description\"");
	var instr = getElementFromAPI(userAPIdata,"\"instructions\"");
	document.getElementById("title").innerHTML = title;
	document.getElementById("credits").innerHTML = desc.substring(0,500);
	document.getElementById("instructions").innerHTML = instr.substring(0,500);
	document.getElementById("by").innerHTML = "by " + scratchusername;
	getStats();
}
function getElementFromAPI(API,element,isinterger) {
    var str = "";
    var i = API.indexOf(element)+element.length+2;if (isinterger == "true") {i=i-1}
    if (isinterger == "true") {
        do {
            str = str + API.charAt(i);
            i = i+1;
        } while (API.charAt(i) != "," && i < API.length && API.charAt(i) != "}")
        
    } else {
    do {
        str = str + API.charAt(i);
        i = i+1;
    } while ((API.charAt(i) != "\"" || (API.charAt(i) == "\"" && API.charAt(i-1) == "\\")) && i < API.length)}
    
    return str;
}
function getStats() {
	var xhttp = new XMLHttpRequest();
	xhttp.open('GET', 'https://api.scratch.mit.edu/users/' + scratchusername + '/projects/' + project, true);
	xhttp.send();
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			var responsex = xhttp.responseText;
			var obj = JSON.parse(responsex);
			var views = obj.stats.views;
			var loves = obj.stats.loves;
			var favs = obj.stats.favorites;
			var comms = obj.stats.comments;
			document.getElementById("stats").innerHTML = views + " views - " + loves + " loves - " + favs + " favorites - " + comms + " comments";
		}
	};
}
function openscratchuser() { window.open("https://scratch.mit.edu/projects/" + project);}