if(localStorage.count===undefined){
    localStorage.count = 0
}
let count = Number(localStorage.count)

//book constructor

function Book(name, author, isRead, noOfPages) {
    this.name = name
    this.author = author
    this.isRead = isRead
    this.noOfPages = noOfPages
    this.showInfo = `${name} by ${author} has ${noOfPages} pages, which ${isRead ? "is read." : "is unread."}`
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
    console.log(isRead)
    sendToLocalStorage(name, author, isRead, noOfPages)
}

function appendNewBooks() {
    for(let i=1;i<=count;i++){
        let newElement = $(`
        <div class="card" style="width: 33.33%; height: 150px">
            <div class="card-body">
                <h5 id="bk-${i}" class="card-title">temp_title</h5>
                <h6 id="bk-${i}-author" class="card-subtitle mb-2 text-muted">Author_Name</h6>
                <p id="bk-${i}-info" class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
            </div>
        </div>`)
    $(".insertion").append(newElement)
    }
}
//function to get data from localstorage 
function getFromLocalStore() {
        let values = [],
        newKeys=[],
            keys = Object.keys(localStorage)
            for(let i =0;i<keys.length;i++){
                if (keys[i]==='count') {
                  continue
                }
                newKeys.push(keys[i])
              }
        let i =newKeys.length;
        while (i--) {
            values.push(localStorage.getItem(newKeys[i]));
        }
        let val = values;
        return val
}
let dataArr = []
//getting data back from localStorage

let bookData = getFromLocalStore()


//function who will contruct each book object

function bookGen(bookData){
    for(let i = 0;i<bookData.length;i++){
        let data = JSON.parse(bookData[i])
        let bugFix = data.isRead
        if(bugFix==='true'){
            bugFix=true
        }else bugFix = false
        dataArr.push(new Book(data.name,data.author,bugFix,data.noOfPages))
    }
}
bookGen(bookData)
appendNewBooks()

//displaying function

function display(dataArr){
    for(let i=0;i<dataArr.length;i++){
        document.getElementById(`bk-${i+1}`).innerHTML = dataArr[i].name
        document.getElementById(`bk-${i+1}-author`).innerHTML = dataArr[i].author
        document.getElementById(`bk-${i+1}-info`).innerHTML = dataArr[i].showInfo
    }
}
display(dataArr)