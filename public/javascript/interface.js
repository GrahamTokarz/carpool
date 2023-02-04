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
    showDetails();
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
    showDetails();
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
    showDetails();
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
    showDetails();
}
function login() {
    currentCode = document.getElementsByName("lEventCode")[0].value;
    currentUser = document.getElementsByName("lUserCode")[0].value;

    // TEMPORARY
    if (true) {
        currentCode = "PEBUXD";
        currentUser = "BWKFKH";
    }
    // TEMPORARY

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
    while (document.getElementById("cars").firstChild) {
        document.getElementById("cars").removeChild(document.getElementById("cars").firstChild);
    }
    document.getElementsByClassName("login")[0].style.display = "none";
    document.getElementsByClassName("details")[0].style.display = "block";
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var data = JSON.parse(this.responseText).r;
            console.log(data)
            var amOwner = false;
            var ownIndex;
            for (let i = 0; i < data.cars.length; i++) {
                if (data.cars[i].owner_id == currentUser) {
                    ownIndex = i;
                    amOwner = true;
                }
            }
            
            function getUser(code) {
                for (let i = 0; i < data.people.length; i++) {
                    if (data.people[i].user_id == code) {
                        return data.people[i];
                    }
                }
            }

            var usedPeople = [];
            for (let i = 0; i < data.cars.length; i++) {
                usedPeople.push(data.cars[i].owner_id);
                for (let j = 0; j < data.cars[i].people.split(', ').length; j++) {
                    usedPeople.push(data.cars[i].people.split(', ')[j]);
                }
            }
            console.log(usedPeople);
            for (let i = 0; i < data.people.length; i++) {
                var perp = document.createElement("p");
                if (data.people[i].user_id == currentUser) {
                    perp.classList.add("driverUser");
                }
                if (usedPeople.includes(data.people[i].user_id)) {
                    perp.classList.add("inCar");
                }
                perp.innerHTML = data.people[i].name;
                document.getElementById("nameList").appendChild(perp);
            }

            document.getElementsByName("jName")[1].value = getUser(currentUser).name;
            document.getElementsByName("jHome")[1].value = getUser(currentUser).address;
            if (amOwner) {
                document.getElementsByClassName("carAdd")[0].style.display = "none";
                document.getElementsByClassName("carEdit")[0].style.display = "block";

                document.getElementsByName("vCapacity")[1].value = data.cars[ownIndex].capacity;
                document.getElementsByName("vDescription")[1].value = data.cars[ownIndex].description;
                document.getElementsByName("vMeeting")[1].value = data.cars[ownIndex].location;
                document.getElementsByName("vNotes")[1].value = data.cars[ownIndex].notes;
            } else {
                document.getElementsByClassName("carAdd")[0].style.display = "block";
                document.getElementsByClassName("carEdit")[0].style.display = "none";
            }
            if (JSON.parse(this.responseText).r.trip.owner_id == currentUser) {
                document.getElementsByClassName("eventEdit")[0].style.display = "block";

                document.getElementsByName("cEventName")[1].value = data.trip.name;
                document.getElementsByName("cEventDescription")[1].value = data.trip.description;
                document.getElementsByName("cEventTime")[1].value = data.trip.date;
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
            document.getElementById("date").innerHTML = data.trip.date;

            var carBase = document.getElementById("cars");
            for (let i = 0; i < data.cars.length; i++) {
                var car = document.createElement("div");
                carBase.appendChild(car);
                car.classList.add("car");

                var driver = document.createElement("h3");
                driver.innerHTML = getUser(data.cars[i].owner_id).name + "'s";
                car.appendChild(driver);

                var model = document.createElement("h3");
                model.innerHTML = data.cars[i].model;
                car.appendChild(model);

                var popup = document.createElement("p");
                popup.classList.add("moreDetails");
                popup.innerHTML = "+ More Details";
                car.appendChild(popup);
                const carsum = document.createElement("div");
                carsum.style.display = "none";
                popup.onclick = function() {
                    if (carsum.style.display == "none") {
                        carsum.style.display = "block";
                    } else {
                        carsum.style.display = "none";
                    }
                }
                car.appendChild(carsum);
                var notes = document.createElement("p");
                notes.innerHTML = data.cars[i].notes;
                carsum.appendChild(notes);
                var mloc = document.createElement("p");
                if (data.cars[i].location == "") {
                    mloc.innerHTML = "Pickup";
                } else {
                    mloc.innerHTML = data.cars[i].location;
                }
                carsum.appendChild(mloc);

                car.appendChild(document.createElement("hr"));
                
                var passengers = document.createElement("div");
                passengers.classList.add("passengers");
                car.appendChild(passengers);
                for (let j = 0; j <= data.cars[i].capacity; j++) {
                    var passport = document.createElement("div");
                    passport.classList.add("passport");
                    passengers.appendChild(passport);
                    if (j == 0) {
                        passport.innerHTML = getUser(data.cars[i].owner_id).name;
                        passport.classList.add("full");
                        if (data.cars[i].owner_id == currentUser) {
                            passport.classList.add("driverUser");
                        }
                    } else {
                        if (data.cars[i].people.split(', ').length > j - 1) {
                            if (data.cars[i].people.split(', ')[j - 1] != "") {
                                console.log(data.cars[i].people.split(', '))
                                passport.innerHTML = getUser(data.cars[i].people.split(', ')[j - 1]).name;
                                passport.classList.add("full");
                                if (data.cars[i].people.split(', ')[j - 1] == currentUser) {
                                    passport.classList.add("user");
                                    const leave = i;
                                    passport.onclick = function() {
                                        var xhttp = new XMLHttpRequest();
                                        xhttp.onreadystatechange = function() {
                                            if (this.readyState == 4 && this.status == 200) {
                                                console.log(JSON.parse(this.responseText).r)
                                            }
                                        };
                                        var reg = "leaveCar(" + currentCode + delimiter + data.cars[leave].people + delimiter + currentUser + delimiter + data.cars[leave].owner_id + ")"
                                        xhttp.open("GET", reg, true);
                                        xhttp.send();
                                    }
                                }
                            }
                        }
                    }
                    if (!passport.classList.contains("full") && usedPeople.indexOf(currentUser) == -1) {
                        const join = i;
                        passport.onclick = function() {
                            var xhttp = new XMLHttpRequest();
                            xhttp.onreadystatechange = function() {
                                if (this.readyState == 4 && this.status == 200) {
                                    console.log(JSON.parse(this.responseText).r)
                                }
                            };
                            var reg = "addToCar(" + currentCode + delimiter + data.cars[join].people + delimiter + currentUser + delimiter + data.cars[join].owner_id + ")"
                            xhttp.open("GET", reg, true);
                            xhttp.send();
                            
                        }
                        passport.classList.add("empty");
                        passport.innerHTML = "Join";
                    } else if (!passport.classList.contains("full") && usedPeople.indexOf(currentUser) != -1) {
                        passport.classList.add("empty");
                        passport.innerHTML = "Empty Slot";
                    }
                }
            }
        }
    };
    var reg = "getAll(" + currentCode + ")"
    xhttp.open("GET", reg, true);
    xhttp.send();
}