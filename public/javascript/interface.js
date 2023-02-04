function editEvent() {
    var event = {
        name: document.getElementsByName("cEventName")[1].value,
        description: document.getElementsByName("cEventDescription")[1].value,
        time: document.getElementsByName("cEventTime")[1].value
    };
}
function editJoin() {
    var user = {
        code: document.getElementsByName("jCode")[1].value,
        name: document.getElementsByName("jName")[1].value,
        home: document.getElementsByName("jHome")[1].value
    };
}
function submitCar() {
    var car = {
        capacity: document.getElementsByName("vCapacity")[0].value,
        model: document.getElementsByName("vDescription")[0].value,
        location: document.getElementsByName("vMeeting")[0].value,
        notes: document.getElementsByName("vNotes")[0].value
    };
}
function editCar() {
    var car = {
        capacity: document.getElementsByName("vCapacity")[1].value,
        model: document.getElementsByName("vDescription")[1].value,
        location: document.getElementsByName("vMeeting")[1].value,
        notes: document.getElementsByName("vNotes")[1].value
    };
}