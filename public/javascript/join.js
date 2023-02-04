function submitJoin() {
    var user = {
        code: document.getElementsByName("jCode")[0].value,
        name: document.getElementsByName("jName")[0].value,
        home: document.getElementsByName("jHome")[0].value
    };
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            console.log(JSON.parse(this.responseText).r)
        }
    };
    var reg = "createUser(" + user.name + "," + user.home + "," + user.code + ")"
    xhttp.open("GET", reg, true);
    xhttp.send();
}