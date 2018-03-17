var input = document.getElementsByTagName("input")[0];
var addBtn = document.getElementById("add-btn");
var patternElement = document.querySelectorAll(".row.mx-0")[0];
var newElement;
var oldItems = []; // items from previous time user loaded page
var newItems = []; // include items added from this session and old items

var elementCounter = 0;

main();

function main() {
    // Add add-button listener (Add item to the list)
    addBtn.addEventListener("click", function () {
        if (input.value !== "") {
            newElement = patternElement.cloneNode(true);
            newElement.classList.remove("d-none");
            newElement.classList.remove("done");
            newElement.children[0].classList.add("d-none");
            newElement.children[1].classList.add("offset-1");
            newElement.children[1].children[0].textContent = input.value;
            addToStorage(newElement);
            patternElement.parentNode.appendChild(newElement);
            addElementListener(newElement, elementCounter);
            addDeleteBtnListener(newElement.children[2], elementCounter++);
            input.value = "";
        }
    });
    // add input listener
    input.addEventListener("keyup", function (event) {
        if (event.keyCode === 13) {
            addBtn.click();
        }
    });

    // events are added above - main execution is below

    // load old items
    loadOldItems();
}

// add "done" class for new element
function addElementListener(element, index) {
    element.addEventListener("click", function () {
        // update data to UI
        this.classList.toggle("done");
        this.children[0].classList.toggle("d-none");
        this.children[1].classList.toggle("offset-1");
        // update data to storage
        newItems[index].isDone = !newItems[index].isDone;
        localStorage.setItem("OldItems", JSON.stringify(newItems));
    })
}

// add "delete" function for new element
// index in html DOES change, but in newItems it DOESN'T, UNTIL LOGIC AFFECTS IT
function addDeleteBtnListener(deleteBtn, index) {
    deleteBtn.addEventListener("click", function () {
        // update data to storage
        newItems[index].name = "";
        localStorage.setItem("OldItems", JSON.stringify(newItems));
        // remove item from UI
        this.parentElement.remove();
    });
}

// add to storage
function addToStorage(element) {
    var item = {
        name: input.value,
        isDone: !element.children[0].classList.contains("d-none")
    };
    newItems.push(item);
    localStorage.setItem("OldItems", JSON.stringify(newItems));
}

// load old items and delete old items those are empty data-""
function loadOldItems() {
    var itemsFromStorage = localStorage.getItem("OldItems");
    oldItems = JSON.parse(itemsFromStorage);
    for (var i = 0; i < oldItems.length; i++) {
        if (oldItems[i].name !== "") {
            input.value = oldItems[i].name;
            addBtn.click();
            if (oldItems[i].isDone) patternElement.parentElement.children[i + 1].click();
        } else {
            oldItems.splice(i, 1);
            i--;
        }
    }
}