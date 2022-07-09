let count = Number(localStorage.count)
//book constructor
function Book(name, author, isRead, noOfPages) {
    this.name = name
    this.author = author
    this.isRead = isRead
    this.noOfPages = noOfPages
    this.showInfo = `${name} by ${author} has ${noOfPages} pages
    which ${isRead ? "is read." : "is unread."}
    `
}

const book1 = new Book("mario", "alex", false, 25)

document.getElementById("book1").innerHTML = book1.name
document.getElementById("book1-author").innerHTML = book1.author
document.getElementById("book1-info").innerHTML = book1.showInfo
function sendToLocalStorage(name, author, isRead, noOfPages) {
    let bookObj = {
        "name": name,
        "author": author,
        "isRead": isRead,
        "noOfPages": noOfPages
    }
    localStorage.setItem(`book-${count + 1}`, JSON.stringify(bookObj))
    count += 1
    localStorage.setItem('count', count)
}
function userInputs() {
    let name = document.getElementById('bookName').value;
    let author = document.getElementById('bookAuthor').value;
    let isRead = $('input[type=radio][name=btnradio]:checked').attr('for');
    let noOfPages = document.getElementById('bookNoOfPages').value
    sendToLocalStorage(name, author, isRead, noOfPages)
}

function appendNewBooks() {
    let newElement = $(`
        <div class="card" style="width: 33.33%; height: 150px">
            <div class="card-body">
                <h5 id="id" class="card-title">temp_title</h5>
                <h6 id="id-author" class="card-subtitle mb-2 text-muted">Author_Name</h6>
                <p id="book1-info" class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
            </div>
        </div>`)
    $(".insertion").append(newElement)
}

//function to get data from localstorage 
function getFromLocalStore() {
    function allStorage() {

        var values = [],
            keys = Object.keys(localStorage),
            i = keys.length;

        while (i--) {
            values.push(localStorage.getItem(keys[i]));
        }

        let val = JSON.parse(values);
        console.log(val)
    }
    allStorage()
}