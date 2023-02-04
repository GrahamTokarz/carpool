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
            var data = JSON.parse(this.responseText).r;
            console.log(data)
            var amOwner = false;
            for (let i = 0; i < data.cars.length; i++) {
                if (data.cars[i].owner_id == currentUser) {
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

            
            document.getElementById("eventTitle").innerHTML = data.trip.name;
            var hostName;
            for (let i = 0; i < data.people.length; i++) {
                if (data.people[i].user_id == data.trip.owner_id) {
                    hostName = data.people[i].name;
                }
            }
            document.getElementById("host").innerHTML = hostName;
            document.getElementById("eventDescription").innerHTML = data.trip.description;

            var carBase = document.getElementById("cars");
            for (let i = 0; i < data.cars.length; i++) {
                var car = document.createElement("div");
                carBase.appendChild(car);
                car.classList.add("car");

                var driver = document.createElement("h3");
                driver.innerHTML = data.cars[i].model;
                car.appendChild(driver);
                
                var passengers = document.createElement("div");
                passengers.classList.add("passengers");
                car.appendChild(passengers);
                for (let j = 0; j < data.cars[i].people.split(',').length; j++) {
                    var passer = document.createElement("p");
                    passengers.appendChild(passer);
                    for (let k = 0; k < data.cars[i].people.split(',')[j].length; k++) {
                        if (data.people[k].user_id == data.cars[i].people.split(',')[j]) {
                            passer.innerHTML = data.people[k].name;
                        }
                    }
                }
            }
        }
    };
    var reg = "getAll(" + currentCode + ")"
    xhttp.open("GET", reg, true);
    xhttp.send();
}