
const express = require('express');
const path = require('path');
const app = express();
const dotenv = require('dotenv');
const { Pool } = require('pg');
const idChars = ['1', 'Z', '5', 'T', 'S', 'W', '4', 'E', '7', 'Y', 'M', '3', 'H', 'U', 'X', 'A', 'D', 'Q', 'F', '8', 'N', '9', 'P', 'B', 'K', 'V', 'C', 'G', 'J', '6', 'R'];

const pool = new Pool({
    user: 'UGAHAX2023SBG',
    host: 'db.bit.io',
    database: 'UGAHAX2023SBG/carpool',
    password: process.env.token,
    port: 5432,
    ssl: true,
});

// pool.query("SELECT * FROM trip", (e, r) => {
//     console.log(r.rows[0]);
// });

//INSERT INTO trip (trip_id, cars, date, name, description, owner_id) VALUES ('123', 'cars', '7/5/23', 'trip', 'I like trip', 'james_bobbo')
//INSERT INTO cars (trip_id, model, capacity, people, meeting, location, notes, car_id, owner_id) VALUES ('123', 'cars', 3, 'trip', True, 'yourface', 'I like trip', 'car_bobbo', 'james_bobbo')
//INSERT INTO people (trip_id, address, name, user_id) VALUES ('123', 'Home', 'boobo', 'james_bobbo')

var delimiter = "puu6p77d3h";

function deleteEvent(eventID) {
    pool.query("DELETE FROM trip WHERE trip_id = '" + eventID + "'", (e, r) => {
        pool.query("DELETE FROM cars WHERE trip_id = '" + eventID + "'", (e, r) => {
            pool.query("DELETE FROM people WHERE trip_id = '" + eventID + "'", (e, r) => {
                console.log("Event Deleted.");
            });
        });
    });
}

async function tripData(eventID) {
    out = null;
    await pool.query("SELECT * FROM trip WHERE trip_id = '" + eventID + "'").then((r) => {
        out = r;
    });
    return out;
}

async function carData(eventID) {
    out = null;
    await pool.query("SELECT * FROM cars WHERE trip_id = '" + eventID + "'").then((r) => {
        out = r;
    });
    return out;
}

async function personData(eventID) {
    out = null
    await pool.query("SELECT * FROM people WHERE trip_id = '" + eventID + "'").then((r) => {
        out = r;
    });
    return out;
}

async function newUserID(eventID) {
    idT = "";
    for (i = 0; i < 6; i++){
        idT += idChars[Math.ceil(Math.random()*idChars.length) - 1];
    }
    out = null
    await pool.query("SELECT * FROM people WHERE trip_id = '" + eventID + "' and user_id = '" + idT + "';").then((r) => {
        if (r.rows.length == 0) {
            out = idT;
        } else {
            out = newUserID(eventID);
        }
    });
    return out;
}

async function newEventID() {
    success = false;
    idT = "";
    for (i = 0; i < 6; i++){
        idT += idChars[Math.ceil(Math.random()*idChars.length) - 1];
    }
    out = null;
    await pool.query("SELECT * FROM people WHERE trip_id = '" + idT + "';").then((r) => {
        if (r.rows.length == 0) {
            out = idT;
        } else {
            out = newEventID();
        }
    });
    return out;
}

async function createEvent(name, date, description, usName, usAdr) {
    tripID = await newEventID();
    ownerID = await newUserID(tripID);
    out = [tripID, ownerID];
    await pool.query("INSERT INTO trip (trip_id, date, name, description, owner_id) VALUES ('" + tripID + "', '" + date + "', '" + name + "', '" + description + "', '" + ownerID + "')").then((r) => {
        pool.query("INSERT INTO people (trip_id, address, name, user_id) VALUES ('" + tripID + "', '" + usAdr + "', '" + usName + "', '" + ownerID + "')").then((r) => {
            out = "Success";
        });
    });
    return out;
}

async function editEvent(name, date, description, tripID) {
    out = null;
    await pool.query("UPDATE trip set name = '" + name + "', date = '" + date + "', description = '" + description + "' WHERE trip_id = '" + tripID + "'").then((r) => {
        out = "Success";
    });
    return out;
}

async function editPerson(tripID, name, home, userID) {
    out = null;
    await pool.query("UPDATE people set name = '" + name +  "', address = '" + home + "' WHERE trip_id = '" + tripID + "' and user_id = '" + userID + "'").then((r) => {
        out = "Success";
    });
    return out;
}

async function createUser(name, adr, tripID) {
    ownerID = await newUserID(tripID);
    out = ownerID;
    await pool.query("SELECT * FROM trip WHERE trip_id = '" + tripID + "'").then((r) => {
        if (r.rows.length == 0 ){
            out = 404;
        } else {
            pool.query("INSERT INTO people (trip_id, address, name, user_id) VALUES ('" + tripID + "', '" + adr + "', '" + name + "', '" + ownerID + "')");
        }
    });
    return out;
}

async function createCar(tripID, capacity, description, meeting, notes, ownerID) {
    out = null;
    await pool.query("INSERT INTO cars (trip_id, model, capacity, people, location, notes, owner_id) VALUES ('" + tripID + "', '" + description + "', '" + parseInt(capacity) + "', '', '" + meeting + "', '" + notes + "', '" + ownerID + "')").then((r) => {
        out = "Success";
    });
    return out;
}

async function editCar(tripID, capacity, description, meeting, notes, ownerID) {
    out = null;
    await pool.query("UPDATE cars set capacity = '" + parseInt(capacity) +  "', location = '" + meeting + "', model = '" + description + "', notes = '" + notes + "' WHERE trip_id = '" + tripID + "' and owner_id = '" + ownerID + "'").then((r) => {
        out = "Success";
    });
    return out;
}

async function removeFromCar(tripID, people, userID, ownerID) {
    people = people.split(", ");
    idx = people.indexOf(userID);
    console.log(people, userID);
    people.splice(idx, 1);
    out = null;
    await pool.query("UPDATE cars set people = '" + people.toString() +  "' WHERE trip_id = '" + tripID + "' and owner_id = '" + ownerID + "'").then((r) => {
        out = "Success";
    });
    return out;
}

async function addToCar(tripID, people, userID, ownerID) {
    people = people.split(", ");
    if (people = [""]) {
        people = [userID];
    } else {
        people.push(userID);
    }
    out = null;
    await pool.query("UPDATE cars set people = '" + people.toString() +  "' WHERE trip_id = '" + tripID + "' and owner_id = '" + ownerID + "'").then((r) => {
        out = "Success";
    });
    return out;
}

async function loginCheck(tripID, userID) {
    out = null;
    await pool.query("SELECT * from people WHERE trip_id = '" + tripID + "' and user_id = '" + userID + "'").then((r) => {
        out = r.rows.length > 0;
    });
    return out;
}

const PORT = process.env.PORT || 8080

const server = app.listen(PORT, () => {
    console.log('Express running -> Port ${server.adress().port}')
});

let options = {
    dotfiles: "ignore",
    etag: true,
    extensions: ["htm", "html"],
    index: false,
    maxAge: 0,
    redirect: false
}

//app.use(express.static('public', options));

app.get('/', (req, res) => {
   res.sendFile('index.html', {root: path.join(__dirname, 'public')});
});

app.get('/css/style.css', (req, res) => {
    res.sendFile('style.css', {root: path.join(__dirname, 'public/css')});
});

app.get('/javascript/create.js', (req, res) => {
    res.sendFile('create.js', {root: path.join(__dirname, 'public/javascript')});
});

app.get('/javascript/join.js', (req, res) => {
    res.sendFile('join.js', {root: path.join(__dirname, 'public/javascript')});
});

app.get('/javascript/interface.js', (req, res) => {
    res.sendFile('interface.js', {root: path.join(__dirname, 'public/javascript')});
});

app.get('/javascript/main.js', (req, res) => {
    res.sendFile('main.js', {root: path.join(__dirname, 'public/javascript')});
});

app.get('/images/smileyboy.svg', (req, res) => {
    res.sendFile('smileyboy.svg', {root: path.join(__dirname, 'public/images')});
});

app.get('/*', (req, res) => {
    console.log(req.url);
    while (req.url.includes("'")) {
        req.url = req.url.replace("'", "`");
    }
    while (req.url.includes("%20")) {
        req.url = req.url.replace("%20", " ");
    }
    if (req.url.startsWith("/createEvent(")) {
        cear = req.url.split(")")[0].substring(13).split(delimiter);
        createEvent(cear[0], cear[2], cear[1], cear[3], cear[4]).then((out) => {
            console.log(out);
            res.send({r: out});
        });
    } else if (req.url.startsWith("/createUser(")) {
        cuar = req.url.split(")")[0].substring(12).split(delimiter);
        createUser(cuar[0], cuar[1], cuar[2]).then((out) => {
            console.log(out);
            res.send({r: out});
        });
    } else if (req.url.startsWith("/getAll(")) {
        caar = req.url.split(")")[0].substring(8).split(delimiter);
        e = {};
        tripData(caar[0]).then((t) => {
            e["trip"] = t.rows[0];
            carData(caar[0]).then((c) => {
                e["cars"] = c.rows;
                personData(caar[0]).then((p) => {
                    e["people"] = p.rows;
                    console.log(e);
                    res.send({r: e});
                });
            });
        });
    } else if (req.url.startsWith("/editEvent(")) {
        eear = req.url.split(")")[0].substring(11).split(delimiter);
        editEvent(eear[0], eear[2], eear[1], eear[3]).then((out) => {
            console.log(out);
            res.send({r: out});
        });
    } else if (req.url.startsWith("/editPerson(")) {
        epar = req.url.split(")")[0].substring(12).split(delimiter);
        editPerson(epar[0], epar[1], epar[2], epar[3]).then((out) => {
            console.log(out);
            res.send({r: out});
        });
    } else if (req.url.startsWith("/createCar(")) {
        ccar = req.url.split(")")[0].substring(11).split(delimiter);
        createCar(ccar[0], ccar[1], ccar[2], ccar[3], ccar[4], ccar[5]).then((out) => {
            console.log(out);
            res.send({r: out});
        });
    } else if (req.url.startsWith("/editCar(")) {
        ecar = req.url.split(")")[0].substring(9).split(delimiter);
        editCar(ecar[0], ecar[1], ecar[2], ecar[3], ecar[4], ecar[5]).then((out) => {
            console.log(out);
            res.send({r: out});
        });
    } else if (req.url.startsWith("/login(")) {
        lgar = req.url.split(")")[0].substring(7).split(delimiter);
        loginCheck(lgar[0], lgar[1]).then((out) => {
            res.send({r: out});
        });
    } else if (req.url.startsWith("/addToCar(")) {
        acar = req.url.split(")")[0].substring(10).split(delimiter);
        addToCar(acar[0], acar[1], acar[2], acar[3]).then((out) => {
            res.send({r: out});
        });
    } else if (req.url.startsWith("/leaveCar(")) {
        lcar = req.url.split(")")[0].substring(10).split(delimiter);
        removeFromCar(lcar[0], lcar[1], lcar[2], lcar[3]).then((out) => {
            res.send({r: out});
        });
    }
});

module.exports = app