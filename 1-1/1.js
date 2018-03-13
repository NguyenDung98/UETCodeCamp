var input = document.getElementsByTagName("input")[0];
var addBtn = document.getElementById("add-btn");
var toDoElement = document.querySelectorAll(".row.mx-0")[0];
var newElement;

main();

function main() {
    // Add add-button listener (Add item to the list)
    addBtn.addEventListener("click", function () {
        if (input.value !== "") {
            newElement = toDoElement.cloneNode(true);
            newElement.classList.remove("d-none");
            newElement.classList.remove("done");
            newElement.children[0].classList.add("d-none");
            newElement.children[1].classList.add("offset-1");
            newElement.children[1].children[0].textContent = input.value;
            toDoElement.parentNode.appendChild(newElement);
            addElementListener(newElement);
            addDeleteBtnListener(newElement.children[2]);
        }
    });
    // add input listener
    input.addEventListener("keyup", function (event) {
        if (event.keyCode === 13) {
            addBtn.click();
        }
    });
}

// add "done" class for new element
function addElementListener(element) {
    element.addEventListener("click", function () {
        this.classList.toggle("done");
        this.children[0].classList.toggle("d-none");
        this.children[1].classList.toggle("offset-1");
    })
}

// add "delete" function for new element
function addDeleteBtnListener(deleteBtn) {
    deleteBtn.addEventListener("click", function () {
        this.parentElement.remove();
    })
}