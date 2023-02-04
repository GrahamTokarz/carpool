
const express = require('express');
const path = require('path');
const app = express();
const dotenv = require('dotenv');
const { Pool } = require('pg');
const idChars = ['1', 'Z', '5', 'T', 'S', 'W', '4', 'E', '7', 'Y', 'M', '3', 'H', 'U', 'X', 'A', 'D', 'Q', 'F', '8', 'N', '9', 'P', 'B', 'K', 'V', 'C', 'G', 'J', '6', 'R',]

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
// })

//INSERT INTO trip (trip_id, cars, date, name, description, owner_id) VALUES ('123', 'cars', '7/5/23', 'trip', 'I like trip', 'james_bobbo')
//INSERT INTO cars (trip_id, model, capacity, people, meeting, location, notes, car_id, owner_id) VALUES ('123', 'cars', 3, 'trip', True, 'yourface', 'I like trip', 'car_bobbo', 'james_bobbo')
//INSERT INTO people (trip_id, address, name, user_id) VALUES ('123', 'Home', 'boobo', 'james_bobbo')

function deleteEvent(eventID) {
    pool.query("DELETE FROM trip WHERE trip_id = '" + eventID + "'", (e, r) => {
        pool.query("DELETE FROM cars WHERE trip_id = '" + eventID + "'", (e, r) => {
            pool.query("DELETE FROM people WHERE trip_id = '" + eventID + "'", (e, r) => {
                console.log("Event Deleted.");
            })
        })
    })
}

function tripData(eventID) {
    pool.query("SELECT * FROM trip WHERE trip_id = '" + eventID + "'", (e, r) => {
        return r;
    })
}

function carData(eventID, carID) {
    pool.query("SELECT * FROM cars WHERE trip_id = '" + eventID + "' and car_id = '" + carID + "'", (e, r) => {
        return r;
    })
}

function personData(eventID, userID) {
    pool.query("SELECT * FROM people WHERE trip_id = '" + eventID + "' and user_id = '" + userID + "'", (e, r) => {
        return r;
    })
}

async function newUserID(eventID) {
    success = false;
    idT = ""
    for (i = 0; i < 10; i++){
        idT += idChars[Math.ceil(Math.random()*idChars.length) - 1]
    }
    out = null
    await pool.query("SELECT * FROM people WHERE trip_id = '" + eventID + "' and user_id = '" + idT + "';").then((r) => {
        if (r.rows.length == 0) {
            out = idT
        } else {
            out = newUserID(eventID)
        }
    });
    return out
}

async function newEventID() {
    success = false;
    idT = ""
    for (i = 0; i < 10; i++){
        idT += idChars[Math.ceil(Math.random()*idChars.length) - 1]
    }
    out = null
    await pool.query("SELECT * FROM people WHERE trip_id = '" + idT + "';").then((r) => {
        if (r.rows.length == 0) {
            out = idT
        } else {
            out = newEventID()
        }
    });
    return out
}

async function createEvent(name, date, description, usName, usAdr) {
    tripID = await newEventID()
    ownerID = await newUserID(tripID)
    out = [tripID, ownerID]
    await pool.query("INSERT INTO trip (trip_id, cars, date, name, description, owner_id) VALUES ('" + tripID + "', '[]', '" + date + "', '" + name + "', '" + description + "', '" + ownerID + "')").then((r) => {
        pool.query("INSERT INTO people (trip_id, address, name, user_id) VALUES ('" + tripID + "', '" + usAdr + "', '" + usName + "', '" + ownerID + "')").then((r) => {
            out = "Success";
        });
    });
    return out
}

async function editEvent(name, date, description, tripID) {
    out = null
    await pool.query("UPDATE trip set name = '" + name + "', date = '" + date + "', description = '" + description + "' WHERE trip_id = '" + tripID + "'").then((r) => {
        out = "Success";
    });
    return out
}

async function createUser(name, adr, tripID) {
    ownerID = await newUserID(tripID)
    out = ownerID
    await pool.query("INSERT INTO people (trip_id, address, name, user_id) VALUES ('" + tripID + "', '" + adr + "', '" + name + "', '" + ownerID + "')");
    return out
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

app.get('/javascript/main.js', (req, res) => {
    res.sendFile('main.js', {root: path.join(__dirname, 'public/javascript')});
});

app.get('/images/smileyboy.svg', (req, res) => {
    res.sendFile('smileyboy.svg', {root: path.join(__dirname, 'public/images')});
});

app.get('/*', (req, res) => {
    console.log(req.url)
    while (req.url.includes("'")) {
        req.url = req.url.replace("'", "`")
    }
    while (req.url.includes("%20")) {
        req.url = req.url.replace("%20", " ")
    }
    if (req.url.startsWith("/createEvent(")) {
        cear = req.url.split(")")[0].substring(13).split(",");
        createEvent(cear[0], cear[2], cear[1], cear[3], cear[4]).then((out) => {
            console.log(out)
            res.send({r: out})
        });
    } else if (req.url.startsWith("/createUser(")){
        cuar = req.url.split(")")[0].substring(12).split(",");
        createUser(cuar[0], cuar[1], cuar[2]).then((out) => {
            console.log(out)
            res.send({r: out})
        })
    }
})

module.exports = app