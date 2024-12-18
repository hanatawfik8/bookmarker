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
document.body.addEventListener("keypress", function (e) {
    if (e.key == "Enter") {
        addBookmark();
    }
})

function addBookmark() {
    var bookmark = {
        name: siteName.value.trim(),
        url: siteUrl.value.trim()
    },
        repeatedName = isRepeatedName(bookmark.name),
        repeatedUrl = isRepeatedUrl(bookmark.url);
    if (repeatedName || repeatedUrl) {
        return;
    }
    if (isValidName() && isValidUrl()) {
        bookmarksList.push(bookmark);
        displayBookmark();
        addToLocalStorage();
        clearInput();
    }
    isEmptyInput(bookmark.name, bookmark.url);
}

function displayBookmark() {
    var displayedList = ``;
    var displayedUrl;
    for (var i = 0; i < bookmarksList.length; i++) {
        displayedUrl = adjustUrl(bookmarksList[i].url);
        displayedList += `
                    <tr>
                        <td scope="row">${i + 1}</td>
                        <td>${bookmarksList[i].name}</td>
                        <td>
                            <a class="btn" id="visitBtn" href="${displayedUrl}" target="_blank">
                                <i class="fa-solid fa-eye"></i>
                                Visit
                            </a>
                        </td>
                        <td>
                            <button class="btn btn-danger" onclick="deleteBookmark(${i})">
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
    var valid = /^[a-z0-9][a-z0-9_\-]{0,10}[a-z0-9_]?$/i;
    return (valid.test(siteName.value));
}

function onInputURL() {
    if (isValidUrl()) {
        siteUrl.classList.remove("is-invalid")
        siteUrl.classList.add("is-valid")
        urlAlert.classList.replace('d-block', 'd-none')
    }
    else {
        siteUrl.classList.remove("is-valid")
        siteUrl.classList.add("is-invalid")
        urlAlert.innerHTML = `Error: The URL cannot be empty, and the domain extension (e.g., '.com', '.org')
         must be present and at least 2 characters long.`
        urlAlert.classList.replace('d-none', 'd-block')
    }
}

function onInputName() {
    if (isValidName()) {
        siteName.classList.remove("is-invalid");
        siteName.classList.add("is-valid");
        nameAlert.classList.replace('d-block', 'd-none')
    }
    else {
        siteName.classList.remove("is-valid");
        siteName.classList.add("is-invalid");
        nameAlert.innerHTML = `Error: The name cannot be empty, should not exceed 12 characters, must start with a letter or number, 
                            can only include letters, numbers, underscores (_), and hyphens (-), 
                            and must end with a letter, number, or underscore (_).`
        nameAlert.classList.replace('d-none', 'd-block')
    }
}

function isEmptyInput(name, url) {
    if (!name) {
        siteName.classList.remove("is-valid");
        siteName.classList.add("is-invalid");
        nameAlert.innerHTML = `Error: Bookmark Name cannot be empty`
        nameAlert.classList.replace('d-none', 'd-block')
    }
    if (!url) {
        siteUrl.classList.remove("is-valid");
        siteUrl.classList.add("is-invalid");
        urlAlert.innerHTML = `Error: Website URL cannot be empty`
        urlAlert.classList.replace('d-none', 'd-block')
    }
}

function isRepeatedName(name) {
    for (var i = 0; i < bookmarksList.length; i++) {
        if (name == bookmarksList[i].name) {
            siteName.classList.remove("is-valid");
            siteName.classList.add("is-invalid");
            nameAlert.innerHTML = `Error: Bookmark name cannot be repeated (Name is repeated at Bookmark ID = ${i + 1})`
            nameAlert.classList.replace('d-none', 'd-block')
            return true;
        }
    }
    return false;
}

function isRepeatedUrl(url) {
    for (var i = 0; i < bookmarksList.length; i++) {
        if (url == bookmarksList[i].url) {
            siteUrl.classList.remove("is-valid")
            siteUrl.classList.add("is-invalid")
            urlAlert.innerHTML = `Error: Website URL cannot be repeated (URL is repeated at Bookmark ID = ${i + 1})`
            urlAlert.classList.replace('d-none', 'd-block')
            return true;
        }
    }
    return false;
}

function adjustUrl(inputUrl) {
    var displayedUrl = inputUrl;
    if (!(inputUrl.startsWith("http://")) && !(inputUrl.startsWith("https://"))) {
        displayedUrl = "https://" + inputUrl;
    }
    return displayedUrl;
}