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
    var reg = "editEvent(" + event.name + delimiter + event.description + delimiter + event.time + delimiter + currentCode + ")"
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
    var reg = "editPerson(" + currentCode + delimiter + user.name + delimiter + user.home + delimiter + currentUser + ")"
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
    var reg = "createCar(" + currentCode + delimiter + car.capacity + delimiter + car.model + delimiter + car.location + delimiter + car.notes + delimiter + currentUser + ")"
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
    var reg = "editCar(" + currentCode + delimiter + car.capacity + delimiter + car.model + delimiter + car.location + delimiter + car.notes + delimiter + currentUser + ")"
    xhttp.open("GET", reg, true);
    xhttp.send();
}
function login() {
    currentCode = document.getElementsByName("lEventCode")[0].value;
    currentUser = document.getElementsByName("lUserCode")[0].value;
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            if (JSON.parse(this.responseText).r) {
                showDetails();
            } else {
                alert("Invalid code");
            }
        }
    };
    var reg = "login(" + currentCode + delimiter + currentUser + ")"
    xhttp.open("GET", reg, true);
    xhttp.send();
    
}
function showDetails() {
    document.getElementsByClassName("login")[0].style.display = "none";
    document.getElementsByClassName("details")[0].style.display = "block";
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            console.log(JSON.parse(this.responseText).r)
            var amOwner = false;
            for (let i = 0; i < JSON.parse(this.responseText).r.cars.length; i++) {
                if (JSON.parse(this.responseText).r.cars[i].owner_id == currentUser) {
                    amOwner = true;
                }
            }
            if (amOwner) {
                document.getElementsByClassName("carAdd")[0].style.display = "none";
                document.getElementsByClassName("carEdit")[0].style.display = "block";
            } else {
                document.getElementsByClassName("carAdd")[0].style.display = "block";
                document.getElementsByClassName("carEdit")[0].style.display = "none";
            }
            if (JSON.parse(this.responseText).r.trip.owner_id == currentUser) {
                document.getElementsByClassName("eventEdit")[0].style.display = "block";
            } else {
                document.getElementsByClassName("eventEdit")[0].style.display = "none";
            }
        }
    };
    var reg = "getAll(" + currentCode + ")"
    xhttp.open("GET", reg, true);
    xhttp.send();
}