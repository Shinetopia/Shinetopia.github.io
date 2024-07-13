const track = document.getElementById('image-track');
let isDragging = false;
// event mouse down
window.onmousedown = e => {
    track.dataset.mouseDownAt = e.clientX;
    isDragging = false;
}
// event mouse up
window.onmouseup = e => {
    if (isDragging) {
        track.dataset.prevPercentage = track.dataset.percentage;
    }
    track.dataset.mouseDownAt = "0";
    isDragging = false; 
}
// event mouse move
window.onmousemove = e => {
    // if mouse up
    if (track.dataset.mouseDownAt == "0") return;

    // click + move = dragging
    isDragging = true;
    const mouseDelta = parseFloat(track.dataset.mouseDownAt) - e.clientX;
    const maxDelta = window.innerWidth / 2;

    const percentage = (mouseDelta / maxDelta) * -100;
    const nextPerUniconstrained = parseFloat(
        track.dataset.prevPercentage
    ) + percentage;
    const nextPercentage = Math.max(
        Math.min(nextPerUniconstrained, 0), -100
    );

    track.dataset.percentage = nextPercentage;

    track.animate({
        transform: `translate(${nextPercentage}%, -50%)`
    },{ duration: 1200, fill: "forwards" });

    const listImage = track.getElementsByClassName("image");
    for (const image of listImage) {
        image.animate({
            objectPosition: `${100+nextPercentage}% center`
        }, {duration: 1200, fill: "forwards"});
    }
}