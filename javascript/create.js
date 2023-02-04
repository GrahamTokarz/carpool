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
}