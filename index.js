let count = Number(localStorage.count)
//book constructor
function Book(name, author, isRead, noOfPages) {
    this.name = name
    this.author = author
    this.isRead = isRead
    this.noOfPages = noOfPages
    this.showInfo = `${name} by ${author} has ${noOfPages} pages
    which ${isRead ? "is read." : "is unread." }
    `
  }

const book1 = new Book("mario", "alex",false, 25)

document.getElementById("book1").innerHTML = book1.name
document.getElementById("book1-author").innerHTML = book1.author
document.getElementById("book1-info").innerHTML = book1.showInfo
function sendToLocalStorage(name,author,isRead,noOfPages){
    let bookObj = {
        "name": name,
        "author":author,
        "isRead":isRead,
        "noOfPages":noOfPages
    }
    localStorage.setItem(`book-${count+1}`,JSON.stringify(bookObj))
    count+=1
    localStorage.setItem('count',count)
}
function userInputs(){
    let name = document.getElementById('bookName').value;
    let author = document.getElementById('bookAuthor').value;
    let isRead = $('input[type=radio][name=btnradio]:checked').attr('for');
    let noOfPages = document.getElementById('bookNoOfPages').value
    sendToLocalStorage(name,author,isRead,noOfPages)
}

function appendNewBooks(){
    let newElement = $(`<div class="container d-flex mb-4"><div class="card" style="width: 33.33%;"></div></div>`)
}