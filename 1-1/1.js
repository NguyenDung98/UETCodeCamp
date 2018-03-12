var input = document.getElementsByTagName("input")[0];
var addBtn = document.getElementById("add-btn");
var toDoElement = document.getElementsByClassName("done")[0];
var newElement;

main();

function main() {
    // Add add-button listener
    addBtn.addEventListener("click", function () {
        if (input !== "") {
            newElement = toDoElement.cloneNode(true);
            newElement.classList.remove("done");
            newElement.children[0].classList.add("d-none");
            newElement.children[1].classList.add("offset-1");
            newElement.children[1].children[0].textContent = input.value;
            toDoElement.parentNode.appendChild(newElement);
        }
    });
    // add Input listener
    input.addEventListener("keyup", function (event) {
        if (event.keyCode === 13) {
            addBtn.click();
        }
    })
}