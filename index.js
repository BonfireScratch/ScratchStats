var userAPIdata;
var usermessages;
var oldprojects;
var offset;
var i;
var userprojects;
var os;
var userfollowers;

var xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function() {
    if (xhttp.readyState == 4 && xhttp.status == 200) {
       var response = xhttp.responseText;
       userAPIdata = response;
       loadpagefromAPI();
    }
};

function myFunction(usertext) {
document.getElementById('id01').style.display='none';
usertext = usertext.replace("@","");
usertext = usertext.replace("https://scratch.mit.edu/users/","");
usertext = usertext.replace("/","");
scratchusername=usertext;
document.getElementById("displayusername").innerHTML = usertext;
document.title = usertext + " | Stats+";
xhttp.open("GET", "https://cors.io/?https://api.scratch.mit.edu/users/" + usertext, true);
xhttp.send();
loadpagefromAPI();
}
updatepageuser();
function updatepageuser() {
document.getElementById("displayusername").innerHTML = scratchusername;
document.title = scratchusername + " | Stats+";
}

xhttp.open("GET", "https://api.scratch.mit.edu/users/" + scratchusername, true);
xhttp.send();
function loadpagefromAPI() {
	offset = 0;
	userprojects = 0;
	totalviews = 0;
	userfollowers = 0;
    var usercountry = getElementFromAPI(userAPIdata,"\"country\"");if (usercountry=="0") {usercountry="Location Not Given"}
    var userid = getElementFromAPI(userAPIdata,"\"id\"","true");
    var userlogo = getElementFromAPI(userAPIdata,"\"90x90\"");
    var useraboutme = getElementFromAPI(userAPIdata,"\"bio\"");
    var userdescription = getElementFromAPI(userAPIdata,"\"status\"");
    var userjoindate = getElementFromAPI(userAPIdata,"\"joined\"").substring(0,10);
    scratchusername = getElementFromAPI(userAPIdata,"\"username\"");
    
    var replacechar = '\\n';
    useraboutme = useraboutme.split(replacechar).join(" ");
    userdescription = userdescription.split(replacechar).join(" ");
    if (useraboutme=="\",") {useraboutme = "";}
    if (userdescription=="\",") {userdescription = "";}
    var replacechar = '\\"';
    useraboutme = useraboutme.split(replacechar).join('"');
    userdescription = userdescription.split(replacechar).join('"');
    
    document.getElementById("userbasicinfo").innerHTML = "Country: " + usercountry + " - User ID: " + userid + " - Join date: " + userjoindate;
    document.getElementById("userdisplaylogo").src = userlogo;
    document.getElementById("aboutme").innerHTML = useraboutme;
    document.getElementById("wiwo").innerHTML = userdescription;
    updatepageuser();
    getMessageCount();
	getActivity();
	getProjects();
	getFollowers();
	getFollowing();
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
function getMessageCount() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
           var response = xhttp.responseText;
           usermessages = getElementFromAPI(response,"\"count\"","true");
           document.getElementById("usermessagecount").innerHTML = "Unread Messages: " + usermessages;
       
    }
};
xhttp.open("GET", "https://cors.io/?https://api.scratch.mit.edu/users/" + scratchusername + "/messages/count", true);
xhttp.send();
}
      
function openscratchuser() { window.open("https://scratch.mit.edu/users/" + scratchusername);}
function openscratchuserfollowing() { window.open("https://scratch.mit.edu/users/" + scratchusername + "/following");}
function openscratchuserfollowers() { window.open("https://scratch.mit.edu/users/" + scratchusername + "/followers");}
function openscratchprojects() { window.open("https://scratch.mit.edu/users/" + scratchusername + "/projects");}
function getActivity() {
	var xhttp = new XMLHttpRequest();
	xhttp.open('GET', 'https://cors.io/?https://scratch.mit.edu/messages/ajax/user-activity/?user=' + scratchusername + '&max=1000000', true);
	xhttp.send();
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			var responsex = xhttp.responseText;
			var countactivity = (responsex.match(/<li>/g) || []).length;
			document.getElementById("activitycount").innerHTML = "Total Activity Actions: " + countactivity;
		}
	};
}
function getProjects() {
	var xhttp = new XMLHttpRequest();
	xhttp.open('GET', 'https://cors.io/?https://api.scratch.mit.edu/users/' + scratchusername + "/projects?offset=" + offset, true);
	xhttp.send();
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			var responsex = xhttp.responseText;
			var obj = JSON.parse(responsex);
			if(obj.length > 0) {
				lastProject = obj[obj.length-1].id;
				lastProject2 = obj.length!==1?obj[obj.length-2].id:0;
				lastProject3t = obj.length!==1?obj[obj.length-3].title:0;
				lastProject2t = obj.length!==1?obj[obj.length-2].title:0;
				lastProjectt = obj[obj.length-1].title;
				lastProject3p = obj.length!==1?obj[obj.length-3].image:0;
				lastProject2p = obj.length!==1?obj[obj.length-2].image:0;
				lastProjectp = obj[obj.length-1].image;
			}
			var i = obj.length;
			userprojects = userprojects + i;
			if (obj.length === 20) {
				offset = offset + 20;
				setTimeout(function(){getProjects(); }, 150);
			} else{
				document.getElementById("projectscount").innerHTML = "Shared Projects: " + userprojects;
				getBrowser(lastProject, lastProject2);
				document.getElementById("title1").innerHTML = lastProjectt;
				document.getElementById("title2").innerHTML = lastProject2t;
				document.getElementById("title3").innerHTML = lastProject3t;
				document.getElementById("thumb11").src = lastProjectp;
				document.getElementById("thumb21").src = lastProject2p;
				document.getElementById("thumb31").src = lastProject3p;
				
			}
		}
	}
}
function getBrowser(id,id2){
    checkua = new XMLHttpRequest();
    checkua.open("GET", 'https://cdn.projects.scratch.mit.edu/internalapi/project/' + id + '/get/', true);
    checkua.send();
    checkua.onreadystatechange = function() {
                if (checkua.readyState === 4 && checkua.status === 200) {
					useragent = JSON.parse(checkua.responseText).info.userAgent;
						if(useragent===undefined){
							if(id2!==0)getBrowser(id2,0);
							document.getElementById("browser").innerHTML = "Browser: Unknown";
							return;
						}
						getinfo = new XMLHttpRequest();
						getinfo.open("GET", 'https://helloacm.com/api/parse-user-agent/?s=' + encodeURI(useragent), true);
						getinfo.send();
						getinfo.onreadystatechange = function() {
							if (getinfo.readyState === 4 && getinfo.status === 200) {
								document.getElementById("browser").innerHTML = "Browser: " + JSON.parse(getinfo.responseText).browser;
								getinfo = new XMLHttpRequest();
								getinfo.open("GET", 'https://cors-anywhere.herokuapp.com/http://www.useragentstring.com/?uas=' + encodeURI(useragent) + "&getJSON=os_name", true);
								getinfo.send();
								getinfo.onreadystatechange = function() {
									if (getinfo.readyState === 4 && getinfo.status === 200) {
										os = JSON.parse(getinfo.responseText).os_name;
										document.getElementById("OS").innerHTML = "OS: " + os;
									} else {
										document.getElementById("OS").innerHTML = "OS: Unknown";
									}
								};
							}
						}
				};
	};
}
function getFollowers() {
	var xhttp = new XMLHttpRequest();
	xhttp.open('GET', 'https://cors.io/?https://api.scratch.mit.edu/users/' + scratchusername + "/following", true);
	xhttp.send();
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			var responsex = xhttp.responseText;
			var obj = JSON.parse(responsex);
			var following = obj[0];
			var following1 = obj[1];
			var following2 = obj[2];
			var following3 = obj[3];
			var following4 = obj[4];
			var followingn = following.username;
			var followingn1 = following1.username;
            var followingn2 = following2.username;
			var followingn3 = following3.username;
			var followingn4 = following4.username;
			var id1 = following.id;
			var id2 = following1.id;
			var id3 = following2.id;
			var id4 = following3.id;
			var id5 = following4.id;
			document.getElementById("title").innerHTML = followingn.substring(0,15);
			document.getElementById("titl1").innerHTML = followingn1.substring(0,15);
			document.getElementById("titl2").innerHTML = followingn2.substring(0,15);
			document.getElementById("titl3").innerHTML = followingn3.substring(0,15);
			document.getElementById("titl4").innerHTML = followingn4.substring(0,15);
			document.getElementById("thumb").src = "https://cdn2.scratch.mit.edu/get_image/user/" + id1 +"_60x60.png";
			document.getElementById("thumb1").src = "https://cdn2.scratch.mit.edu/get_image/user/" + id2 +"_60x60.png";
			document.getElementById("thumb2").src = "https://cdn2.scratch.mit.edu/get_image/user/" + id3 +"_60x60.png";
			document.getElementById("thumb3").src = "https://cdn2.scratch.mit.edu/get_image/user/" + id4 +"_60x60.png";
			document.getElementById("thumb4").src = "https://cdn2.scratch.mit.edu/get_image/user/" + id5 +"_60x60.png";
		}
	}
}
function getFollowing() {
	var xhttp = new XMLHttpRequest();
	xhttp.open('GET', 'https://cors.io/?https://api.scratch.mit.edu/users/' + scratchusername + "/followers", true);
	xhttp.send();
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			var responsex = xhttp.responseText;
			var obj = JSON.parse(responsex);
			var following = obj[0];
			var following1 = obj[1];
			var following2 = obj[2];
			var following3 = obj[3];
			var following4 = obj[4];
			var followingn = following.username;
			var followingn1 = following1.username;
            var followingn2 = following2.username;
			var followingn3 = following3.username;
			var followingn4 = following4.username;
			var id1 = following.id;
			var id2 = following1.id;
			var id3 = following2.id;
			var id4 = following3.id;
			var id5 = following4.id;
			document.getElementById("t1").innerHTML = followingn.substring(0,15);
			document.getElementById("titl11").innerHTML = followingn1.substring(0,15);
			document.getElementById("titl12").innerHTML = followingn2.substring(0,15);
			document.getElementById("titl13").innerHTML = followingn3.substring(0,15);
			document.getElementById("titl14").innerHTML = followingn4.substring(0,15);
			document.getElementById("thum2").src = "https://cdn2.scratch.mit.edu/get_image/user/" + id1 +"_60x60.png";
			document.getElementById("thum21").src = "https://cdn2.scratch.mit.edu/get_image/user/" + id2 +"_60x60.png";
			document.getElementById("thum22").src = "https://cdn2.scratch.mit.edu/get_image/user/" + id3 +"_60x60.png";
			document.getElementById("thum23").src = "https://cdn2.scratch.mit.edu/get_image/user/" + id4 +"_60x60.png";
			document.getElementById("thum24").src = "https://cdn2.scratch.mit.edu/get_image/user/" + id5 +"_60x60.png";
		}
	}
}
