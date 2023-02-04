function editEvent() {
    var event = {
        name: document.getElementsByName("cEventName")[1].value,
        description: document.getElementsByName("cEventDescription")[1].value,
        time: document.getElementsByName("cEventTime")[1].value
    };
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            console.log(JSON.parse(this.responseText).r)
        }
    };
    var reg = "editEvent(" + event.name + "~~;23~,n~>><>@<!>!!>#@<!>!ff>@" + event.description + "~~;23~,n~>><>@<!>!!>#@<!>!ff>@" + event.time + "~~;23~,n~>><>@<!>!!>#@<!>!ff>@" + currentCode + ")"
    xhttp.open("GET", reg, true);
    xhttp.send();
}
function editJoin() {
    var user = {
        name: document.getElementsByName("jName")[1].value,
        home: document.getElementsByName("jHome")[1].value
    };
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            console.log(JSON.parse(this.responseText).r)
        }
    };
    var reg = "editPerson(" + currentCode + "~~;23~,n~>><>@<!>!!>#@<!>!ff>@" + user.name + "~~;23~,n~>><>@<!>!!>#@<!>!ff>@" + user.home + "~~;23~,n~>><>@<!>!!>#@<!>!ff>@" + currentUser + ")"
    xhttp.open("GET", reg, true);
    xhttp.send();
}
function submitCar() {
    var car = {
        capacity: document.getElementsByName("vCapacity")[0].value,
        model: document.getElementsByName("vDescription")[0].value,
        location: document.getElementsByName("vMeeting")[0].value,
        notes: document.getElementsByName("vNotes")[0].value
    };
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            console.log(JSON.parse(this.responseText).r)
        }
    };
    var reg = "createCar(" + currentCode + "~~;23~,n~>><>@<!>!!>#@<!>!ff>@" + car.capacity + "~~;23~,n~>><>@<!>!!>#@<!>!ff>@" + car.model + "~~;23~,n~>><>@<!>!!>#@<!>!ff>@" + car.location + "~~;23~,n~>><>@<!>!!>#@<!>!ff>@" + car.notes + "~~;23~,n~>><>@<!>!!>#@<!>!ff>@" + currentUser + ")"
    xhttp.open("GET", reg, true);
    xhttp.send();
}
function editCar() {
    var car = {
        capacity: document.getElementsByName("vCapacity")[1].value,
        model: document.getElementsByName("vDescription")[1].value,
        location: document.getElementsByName("vMeeting")[1].value,
        notes: document.getElementsByName("vNotes")[1].value
    };
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            console.log(JSON.parse(this.responseText).r)
        }
    };
    var reg = "editCar(" + currentCode + "~~;23~,n~>><>@<!>!!>#@<!>!ff>@" + car.capacity + "~~;23~,n~>><>@<!>!!>#@<!>!ff>@" + car.model + "~~;23~,n~>><>@<!>!!>#@<!>!ff>@" + car.location + "~~;23~,n~>><>@<!>!!>#@<!>!ff>@" + car.notes + "~~;23~,n~>><>@<!>!!>#@<!>!ff>@" + currentUser + ")"
    xhttp.open("GET", reg, true);
    xhttp.send();
}