function submitEvent() {
    var event = {
        name: document.getElementsByName("cEventName")[0].value,
        description: document.getElementsByName("cEventDescription")[0].value,
        time: document.getElementsByName("cEventTime")[0].value
    };
    var user = {
        name: document.getElementsByName("cEventUserName")[0].value,
        home: document.getElementsByName("cEventUserHome")[0].value
    };
    console.log(event);
    console.log(user);
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            showPage(2);
            document.getElementById("eventCodeA").innerHTML = JSON.parse(this.responseText).r[0];
            document.getElementById("userCodeA").innerHTML = JSON.parse(this.responseText).r[1];
            console.log(JSON.parse(this.responseText).r)
        }
    };
    var reg = "createEvent(" + event.name + "3!k4?6o6" + event.description + "3!k4?6o6" + event.time + "3!k4?6o6" + user.name + "3!k4?6o6" + user.home + ")"
    xhttp.open("GET", reg, true);
    xhttp.send();
}