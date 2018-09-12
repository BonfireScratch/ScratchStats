var xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
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
xhttp.open("GET", "https://api.scratch.mit.edu/users/" + usertext, true);
xhttp.send();
loadpagefromAPI();
}
var getuserinputdata = -1;
var scratchusername;
var userAPIdata;
var usermessages;
var oldprojects;
var offset;
var i;
var userprojects;
var os;
if (getuserinputdata == -1) {

}
else {scratchusername=getuserinputdata}
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
    var usercountry = getElementFromAPI(userAPIdata,"\"country\"");if (usercountry=="0") {usercountry="Not Given"}
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
           document.getElementById("usermessagecount").innerHTML = "Current Message Count: " + usermessages;
       
    }
};
xhttp.open("GET", "https://api.scratch.mit.edu/users/" + scratchusername + "/messages/count", true);
xhttp.send();
}
      
function openscratchuser() { window.open("https://scratch.mit.edu/users/" + scratchusername);}
function getActivity() {
	var xhttp = new XMLHttpRequest();
	xhttp.open('GET', 'https://scratch.mit.edu/messages/ajax/user-activity/?user=' + scratchusername + '&max=1000000', true);
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
	xhttp.open('GET', 'https://api.scratch.mit.edu/users/' + scratchusername + "/projects?offset=" + offset, true);
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
				console.log(totalviews);
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
							document.getElementById("browser").innerHTML = "Unknown";
							os = "Unknown";
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
									}
								};
							}
						}
				};
	};
}