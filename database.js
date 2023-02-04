const express = require('express');
const path = require('path');
const app = express();
const dotenv = require('dotenv');
const { Pool } = require('pg');
const token = require('./toxen.json');

const idChars = ['1', 'Z', '5', 'T', 'S', 'W', '4', 'E', '7', 'Y', 'M', '3', 'H', 'U', 'X', 'A', 'D', 'Q', 'F', '8', 'N', '9', 'P', 'B', 'K', 'V', 'C', 'G', 'J', '6', 'R',]

const pool = new Pool({
    user: 'UGAHAX2023SBG',
    host: 'db.bit.io',
    database: 'UGAHAX2023SBG/carpool',
    password: token.token,
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

async function createEvent(name, date, description, ownerID) {
    tripID = await newEventID()
    console.log(tripID)
    await newEventID().then((tripID) => {
        console.log(tripID)
        pool.query("INSERT INTO trip (trip_id, cars, date, name, description, owner_id) VALUES ('" + tripID + "', '[]', '" + date + "', '" + name + "', '" + description + "', '" + ownerID + "')").then((r) => {
            return "Success";
        });
    })
}

async function editEvent(name, date, description, tripID) {
    await pool.query("UPDATE trip set name = '" + name + "', date = '" + date + "', description = '" + description + "' WHERE trip_id = '" + tripID + "'").then((r) => {
        return "Success";
    });
}