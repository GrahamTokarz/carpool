function submitJoin() {
    var user = {
        code: document.getElementsByName("jCode")[0].value,
        name: document.getElementsByName("jName")[0].value,
        home: document.getElementsByName("jHome")[0].value
    };
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            showPage(4);
            document.getElementById("userCodeB").innerHTML = JSON.parse(this.responseText).r;
            currentCode = user.code;
            currentUser = JSON.parse(this.responseText).r;
            console.log(JSON.parse(this.responseText).r)
        }
    };
    var reg = "createUser(" + user.name + "~~;23~,n~>><>@<!>!!>#@<!>!ff>@" + user.home + "~~;23~,n~>><>@<!>!!>#@<!>!ff>@" + user.code + ")"
    xhttp.open("GET", reg, true);
    xhttp.send();
}