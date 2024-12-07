var addBtn = document.getElementById('addBtn'),
    tableBody = document.getElementById('tableBody'),
    siteName = document.getElementById('siteName'),
    siteUrl = document.getElementById('siteURL'),
    bookmarksList = [];

checkLocalStorage();

addBtn.addEventListener("click", addBookmark);

function addBookmark() {
    var bookmark = {
        name: siteName.value.trim(),
        url: siteUrl.value.trim()
    }
    bookmarksList.push(bookmark);
    displayBookmark();
    addToLocalStorage();
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