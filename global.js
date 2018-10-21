init();

function init(){
	popularProjects();
	trendingProjects();
	loadcommunity();
	loadwebsite();
	recentProjects();
	getCurator();
}

function openscratchtrending() { window.open("https://scratch.mit.edu/explore/projects/all/popular");}
function openscratchpopular() { window.open("https://scratch.mit.edu/explore/projects/all/trending");}
function loadcommunity(){
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
           var response = xhttp.responseText;
           obj = JSON.parse(response);
          
		  users = obj.USER_COUNT;
		  comments = obj.COMMENT_COUNT;
		  studios = obj.STUDIO_COUNT;
		  projects = obj.PROJECT_COUNT;
          document.getElementById("projects").innerHTML = projects + " projects shared,";
          document.getElementById("studios").innerHTML = studios + " studios created";
          document.getElementById("comments").innerHTML = comments + " comments posted,";
          document.getElementById("users").innerHTML = users + " users registered";
      }
  };
xhttp.open("GET", "https://cors-anywhere.herokuapp.com/https://scratch.mit.edu/statistics/data/daily/", true);
xhttp.send();}
    function loadwebsite() {
    
      var xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
           var response = xhttp.responseText;
           obj = JSON.parse(response);
          pageviews = obj.pageviews;
		  users = obj.users;
		  sessions = obj.sessions;
          document.getElementById("websiteviews").innerHTML = pageviews + " pageviews,";
          document.getElementById("newvisits").innerHTML = users + " unique visitors,";
          document.getElementById("visits").innerHTML = sessions + " visits";
      }
  };
  xhttp.open("GET", "https://cors-anywhere.herokuapp.com/https://scratch.mit.edu/statistics/data/monthly-ga/", true);
  xhttp.send();
    
  }
  
  function popularProjects () {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open('GET', 'https://api.scratch.mit.edu/explore/projects?offset=0&language=en&mode=popular&q=*', true);
    xmlhttp.send();
    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
            var response = xmlhttp.responseText;
            var obj = JSON.parse(response);
            var firstProject = obj[0];
            var secondProject = obj[1];
            var thirdProject = obj[2];
            var fourthProject = obj[3];
			document.getElementById("title1").innerHTML = firstProject.title.substring(0,21);
			document.getElementById("thumb1").src = firstProject.image;
			document.getElementById("title2").innerHTML = secondProject.title.substring(0,21);
			document.getElementById("thumb2").src = secondProject.image;
			document.getElementById("title3").innerHTML = thirdProject.title.substring(0,21);
			document.getElementById("thumb3").src = thirdProject.image;
			document.getElementById("title4").innerHTML = fourthProject.title.substring(0,21);
			document.getElementById("thumb4").src = fourthProject.image;
		}
    };
}

  function trendingProjects () {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open('GET', 'https://api.scratch.mit.edu/explore/projects?offset=0&language=en&mode=trending&q=*', true);
    xmlhttp.send();
    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
            var response = xmlhttp.responseText;
            var obj = JSON.parse(response);
            var firsProject = obj[0];
            var seconProject = obj[1];
            var thirProject = obj[2];
            var fourtProject = obj[3];
			document.getElementById("title11").innerHTML = firsProject.title.substring(0,21);
			document.getElementById("thumb11").src = firsProject.image;
			document.getElementById("title21").innerHTML = seconProject.title.substring(0,21);
			document.getElementById("thumb21").src = seconProject.image;
			document.getElementById("title31").innerHTML = thirProject.title.substring(0,21);
			document.getElementById("thumb31").src = thirProject.image;
			document.getElementById("title41").innerHTML = fourtProject.title.substring(0,21);
			document.getElementById("thumb41").src = fourtProject.image;
		}
    };
}

  function recentProjects () {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open('GET', 'https://api.scratch.mit.edu/explore/projects?offset=0&language=en&mode=recent&q=*', true);
    xmlhttp.send();
    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
            var response = xmlhttp.responseText;
            var obj = JSON.parse(response);
            var firsProject = obj[0];
            var seconProject = obj[1];
            var thirProject = obj[2];
            var fourtProject = obj[3];
		    document.getElementById("title12").innerHTML = firsProject.title.substring(0,21);
			document.getElementById("thumb12").src = firsProject.image;
			document.getElementById("title22").innerHTML = seconProject.title.substring(0,21);
			document.getElementById("thumb22").src = seconProject.image;
			document.getElementById("title32").innerHTML = thirProject.title.substring(0,21);
			document.getElementById("thumb32").src = thirProject.image;
			document.getElementById("title42").innerHTML = fourtProject.title.substring(0,21);
			document.getElementById("thumb42").src = fourtProject.image;
		}
    };
}
  function getCurator () {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open('GET', 'https://api.scratch.mit.edu/proxy/featured', true);
    xmlhttp.send();
    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
            var response = xmlhttp.responseText;
            var obj = JSON.parse(response);
            var curated = obj.curator_top_projects;
			var firsProject = curated[0];
            var seconProject = curated[1];
            var thirProject = curated[2];
            var fourtProject = curated[3];
			var fiftProject = curated[4];
			var firstprojectid = firsProject.id;
			var secondprojectid = seconProject.id;
			var thirdprojectid = thirProject.id;
			var fourtprojectid = fourtProject.id;
			var fifthprojectid = fiftProject.id;
			var curator = firsProject.curator_name;
			document.getElementById("curatorname").innerHTML = "Current Curator: " + curator;
			document.getElementById("title13").innerHTML = firsProject.title.substring(0,25);
			document.getElementById("thumb13").src = 'https://cdn2.scratch.mit.edu/get_image/project/' + firstprojectid + "_480x360.png";
			document.getElementById("title23").innerHTML = seconProject.title.substring(0,25);
			document.getElementById("thumb33").src = 'https://cdn2.scratch.mit.edu/get_image/project/' + thirdprojectid+ "_480x360.png";
			document.getElementById("title33").innerHTML = thirProject.title.substring(0,25);
			document.getElementById("title43").innerHTML = fourtProject.title.substring(0,25);
			document.getElementById("title53").innerHTML = fiftProject.title.substring(0,25);
			document.getElementById("thumb23").src = 'https://cdn2.scratch.mit.edu/get_image/project/' + secondprojectid+ "_480x360.png";
			document.getElementById("thumb43").src = 'https://cdn2.scratch.mit.edu/get_image/project/' + fourtprojectid+ "_480x360.png";
			document.getElementById("thumb53").src = 'https://cdn2.scratch.mit.edu/get_image/project/' + fifthprojectid+ "_480x360.png";
			var featured = obj.community_featured_projects;
			var firsProject = featured[0];
            var seconProject = featured[1];
            var thirProject = featured[2];
            var fourtProject = featured[3];
			var firstprojectid = firsProject.id;
			var secondprojectid = seconProject.id;
			var thirdprojectid = thirProject.id;
			var fourtprojectid = fourtProject.id;
			document.getElementById("title14").innerHTML = firsProject.title.substring(0,25);
			document.getElementById("thumb14").src = 'https://cdn2.scratch.mit.edu/get_image/project/' + firstprojectid + "_480x360.png";
			document.getElementById("title24").innerHTML = seconProject.title.substring(0,25);
			document.getElementById("thumb34").src = 'https://cdn2.scratch.mit.edu/get_image/project/' + thirdprojectid+ "_480x360.png";
			document.getElementById("title34").innerHTML = thirProject.title.substring(0,25);
			document.getElementById("title44").innerHTML = fourtProject.title.substring(0,25);
			document.getElementById("thumb24").src = 'https://cdn2.scratch.mit.edu/get_image/project/' + secondprojectid+ "_480x360.png";
			document.getElementById("thumb44").src = 'https://cdn2.scratch.mit.edu/get_image/project/' + fourtprojectid+ "_480x360.png";
			var toploved = obj.community_most_loved_projects;
			var firsProject = toploved[0];
            var seconProject = toploved[1];
            var thirProject = toploved[2];
            var fourtProject = toploved[3];
			var firstprojectid = firsProject.id;
			var secondprojectid = seconProject.id;
			var thirdprojectid = thirProject.id;
			var fourtprojectid = fourtProject.id;
			document.getElementById("title15").innerHTML = firsProject.title.substring(0,25);
			document.getElementById("thumb15").src = 'https://cdn2.scratch.mit.edu/get_image/project/' + firstprojectid + "_480x360.png";
			document.getElementById("title25").innerHTML = seconProject.title.substring(0,25);
			document.getElementById("thumb35").src = 'https://cdn2.scratch.mit.edu/get_image/project/' + thirdprojectid+ "_480x360.png";
			document.getElementById("title35").innerHTML = thirProject.title.substring(0,25);
			document.getElementById("title45").innerHTML = fourtProject.title.substring(0,25);
			document.getElementById("thumb25").src = 'https://cdn2.scratch.mit.edu/get_image/project/' + secondprojectid+ "_480x360.png";
			document.getElementById("thumb45").src = 'https://cdn2.scratch.mit.edu/get_image/project/' + fourtprojectid+ "_480x360.png";
			var remix = obj.community_most_remixed_projects;
			var firsProject = remix[0];
            var seconProject = remix[1];
            var thirProject = remix[2];
            var fourtProject = remix[3];
			var firstprojectid = firsProject.id;
			var secondprojectid = seconProject.id;
			var thirdprojectid = thirProject.id;
			var fourtprojectid = fourtProject.id;
			document.getElementById("title16").innerHTML = firsProject.title.substring(0,25);
			document.getElementById("thumb16").src = 'https://cdn2.scratch.mit.edu/get_image/project/' + firstprojectid + "_480x360.png";
			document.getElementById("title26").innerHTML = seconProject.title.substring(0,25);
			document.getElementById("thumb36").src = 'https://cdn2.scratch.mit.edu/get_image/project/' + thirdprojectid+ "_480x360.png";
			document.getElementById("title36").innerHTML = thirProject.title.substring(0,25);
			document.getElementById("title46").innerHTML = fourtProject.title.substring(0,25);
			document.getElementById("thumb26").src = 'https://cdn2.scratch.mit.edu/get_image/project/' + secondprojectid+ "_480x360.png";
			document.getElementById("thumb46").src = 'https://cdn2.scratch.mit.edu/get_image/project/' + fourtprojectid+ "_480x360.png";
		}
    };
}
