var currentCode;
var currentUser;

function showPage(index) {
    var pages = ["welcome","create","createConfirmation","join","joinConfirmation","dashboard"];
    for (let i = 0; i < pages.length; i++) {
        if (i == index) {
            document.getElementsByClassName(pages[i])[0].style.display = "block";
        } else {
            document.getElementsByClassName(pages[i])[0].style.display = "none";
        }
    }
    if (index == 5) {
        showDetails();
    }
}
showPage(0);