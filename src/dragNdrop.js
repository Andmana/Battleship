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
    const rowStart = parseInt(this.dataset.row);
    const colStart = parseInt(this.dataset.col);

    const dragging = document.querySelector(".dragging");
    if (dragging == null) return;
    const len = dragging.dataset.length;
    for (let i = 0; i < len; i++) {
        const row = rowStart;
        const col = colStart + i;
        if (col < 10 && row < 10)
            document
                .querySelector(
                    `.set-up-board > div[data-row="${row}"][data-col="${col}"]`
                )
                .classList.add("coord-valid");
    }
}

function dragLeave() {
    const rowStart = parseInt(this.dataset.row);
    const colStart = parseInt(this.dataset.col);

    const dragging = document.querySelector(".dragging");
    if (dragging == null) return;
    const len = dragging.dataset.length;
    for (let i = 0; i < len; i++) {
        const row = rowStart;
        const col = colStart + i;
        if (col < 10 && row < 10)
            document
                .querySelector(
                    `.set-up-board > div[data-row="${row}"][data-col="${col}"]`
                )
                .classList.remove("coord-valid");
    }
}

function dragDrop() {
    const rowStart = parseInt(this.dataset.row);
    const colStart = parseInt(this.dataset.col);

    const dragging = document.querySelector(".dragging");
    if (dragging == null) return;
    const len = dragging.dataset.length;
    for (let i = 0; i < len; i++) {
        const row = rowStart;
        const col = colStart + i;
        if (col < 10 && row < 10)
            document
                .querySelector(
                    `.set-up-board > div[data-row="${row}"][data-col="${col}"]`
                )
                .classList.remove("coord-valid");
    }
}

module.exports = { dragNdropEvents };
