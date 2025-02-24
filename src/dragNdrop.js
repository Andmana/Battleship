const dragNdropEvents = () => {
    const dragables = document.querySelectorAll(".draggable");
    const containers = document.querySelectorAll(".set-up-board  div");
    dragables.forEach((dragable) => {
        dragable.addEventListener("dragstart", dragStart);
        dragable.addEventListener("dragend", dragEnd);
    });

    containers.forEach((container) => {
        container.addEventListener("dragover", dragOver);
        container.addEventListener("dragenter", dragEnter);
        container.addEventListener("dragleave", dragLeave);
        container.addEventListener("drop", dragDrop);
    });
};

function dragStart() {
    this.classList.add("dragging");
    setTimeout(() => this.classList.add("invisible"), 0);
}

function dragEnd() {
    this.classList.remove("dragging", "invisible");
}

function dragOver(e) {
    e.preventDefault();
}

function dragEnter(e) {
    e.preventDefault();
    this.classList.add("coord-valid");
}

function dragLeave() {
    this.classList.remove("coord-valid");
}

function dragDrop() {
    this.classList.remove("coord-valid");
}

module.exports = { dragNdropEvents };
