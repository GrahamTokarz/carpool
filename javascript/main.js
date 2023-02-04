function showPage(index) {
    var pages = ["welcome","create","event","join","dashboard"];
    for (let i = 0; i < pages.length; i++) {
        if (i == index) {
            document.getElementsByClassName(pages[i])[0].style.display = "block";
        } else {
            document.getElementsByClassName(pages[i])[0].style.display = "none";
        }
    }
}
showPage(0);