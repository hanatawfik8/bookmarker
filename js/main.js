var addBtn = document.getElementById('addBtn'),
    tableBody = document.getElementById('tableBody'),
    siteName = document.getElementById('siteName'),
    siteUrl = document.getElementById('siteURL'),
    nameAlert = document.getElementById('nameAlert'),
    urlAlert = document.getElementById('urlAlert'),
    bookmarksList = [];

checkLocalStorage();
siteUrl.addEventListener("input", onInputURL);
siteName.addEventListener("input", onInputName)
addBtn.addEventListener("click", addBookmark);

function addBookmark() {
    var bookmark = {
        name: siteName.value.trim(),
        url: siteUrl.value.trim()
    }
    if (isValidName() && isValidUrl()) {
        bookmarksList.push(bookmark);
        displayBookmark();
        addToLocalStorage();
        clearInput();
    }
}

function displayBookmark() {
    var displayedList = ``;
    for (var i = 0; i < bookmarksList.length; i++) {
        displayedList += `
                    <tr>
                        <td scope="row">${i + 1}</td>
                        <td>${bookmarksList[i].name}</td>
                        <td>
                            <a class="btn btn-dark" href="${bookmarksList[i].url}" target="_blank">
                                <i class="fa-solid fa-eye"></i>
                                Visit
                            </a>
                        </td>
                        <td>
                            <button class="btn btn-dark" onclick="deleteBookmark(${i})">
                                <i class="fa-solid fa-trash-can"></i>
                                Delete
                            </button>
                        </td>
                    </tr>
                    `
    }
    tableBody.innerHTML = displayedList;

}

function addToLocalStorage() {
    localStorage.setItem("bookmarksList", JSON.stringify(bookmarksList));
}

function getFromLocalStorage() {
    return JSON.parse(localStorage.getItem("bookmarksList"));
}

function checkLocalStorage() {
    bookmarksList = getFromLocalStorage() || [];
    displayBookmark();
}

function deleteBookmark(clicked) {
    bookmarksList.splice(clicked, 1);
    addToLocalStorage();
    displayBookmark();
}

function clearInput() {
    siteName.classList.remove("is-valid");
    siteName.value = null;
    siteUrl.classList.remove("is-valid");
    siteUrl.value = null;

}

function isValidUrl() {
    var valid;
    var hasWWW = /^(https?:\/\/)?www\./i;
    if (hasWWW.test(siteUrl.value)) {
        valid = /^(https?:\/\/)?www\.[a-z0-9]([a-z0-9]|(\-[a-z])|(\-[0-9]))*(\.[a-z0-9]{2,})+(\/)?$/i;
        return (valid.test(siteUrl.value));
    }
    else {
        valid = /^(https?:\/\/)?[a-z0-9]([a-z0-9]|(\-[a-z])|(\-[0-9]))*(\.[a-z0-9]{2,})+(\/)?$/i;
        return (valid.test(siteUrl.value));
    }
}

function isValidName() {
    var valid = /^[a-z0-9]+$/i;
    return (valid.test(siteName.value));
}

function onInputURL() {
    if (isValidUrl()) {
        siteUrl.classList.remove("is-invalid")
        siteUrl.classList.add("is-valid")
    }
    else {
        siteUrl.classList.remove("is-valid")
        siteUrl.classList.add("is-invalid")
    }
}

function onInputName() {
    if (isValidName()) {
        siteName.classList.remove("is-invalid")
        siteName.classList.add("is-valid")
    }
    else {
        siteName.classList.remove("is-valid")
        siteName.classList.add("is-invalid")
    }
}