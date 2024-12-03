var addBtn = document.getElementById('addBtn'),
    bookmarksList = [];

function addBookmark() {
    var siteName = document.getElementById('siteName'),
        siteUrl = document.getElementById('siteURL'),
        bookmark = {
            name: siteName.value.trim(),
            url: siteUrl.value.trim()
        }
    bookmarksList.push(bookmark);
}

addBtn.addEventListener("click", addBookmark)