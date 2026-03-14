function checkFit() {
    const roomWidth = parseFloat(document.getElementById("roomWidth").value);
    const roomLength = parseFloat(document.getElementById("roomLength").value);
    const furnWidth = parseFloat(document.getElementById("furnWidth").value);
    const furnLength = parseFloat(document.getElementById("furnLength").value);
    const name = document.getElementById("furnitureName").value || "Furniture";

    const roomBox = document.getElementById("roomBox");
    const furnitureBox = document.getElementById("furnitureBox");
    const label = document.getElementById("furnitureLabel");
    const fitResult = document.getElementById("fitResult");

    // Show measurement labels
    document.getElementById("roomWidthLabel").innerText = roomWidth + " cm";
    document.getElementById("roomLengthLabel").innerText = roomLength + " cm";

    // Show room box
    roomBox.style.display = "block";

    // Set furniture label
    label.innerText = name;

    // Auto scale room
    const scale = 400 / Math.max(roomWidth, roomLength);
    roomBox.style.width = (roomWidth * scale) + "px";
    roomBox.style.height = (roomLength * scale) + "px";
    furnitureBox.style.width = (furnWidth * scale) + "px";
    furnitureBox.style.height = (furnLength * scale) + "px";
    furnitureBox.style.left = "0px";
    furnitureBox.style.top = "0px";

    // --- Add this block here for rotation-aware fit check ---
    let furnWidthEffective = furnWidth;
    let furnLengthEffective = furnLength;

    // Swap width/length if rotated 90° or 270°
    if(rotation % 180 !== 0){
        [furnWidthEffective, furnLengthEffective] = [furnLength, furnWidth];
    }

    // Use furnWidthEffective and furnLengthEffective for the fit check
    if(furnWidthEffective <= roomWidth && furnLengthEffective <= roomLength){
        fitResult.innerText = "✅ Furniture fits in the room";
        fitResult.style.color = "green";
    } else {
        fitResult.innerText = "❌ Furniture does NOT fit";
        fitResult.style.color = "red";
    }
}

/* DRAGGING SYSTEM */

const furniture = document.getElementById("furnitureBox");
const room = document.getElementById("roomBox");

let isDragging = false;
let offsetX;
let offsetY;

furniture.addEventListener("mousedown", function(e){

isDragging = true;

offsetX = e.clientX - furniture.offsetLeft;
offsetY = e.clientY - furniture.offsetTop;

});

document.addEventListener("mousemove", function(e){

if(!isDragging) return;

let newX = e.clientX - offsetX;
let newY = e.clientY - offsetY;

/* boundaries */

const maxX = room.clientWidth - furniture.clientWidth;
const maxY = room.clientHeight - furniture.clientHeight;

if(newX < 0) newX = 0;
if(newY < 0) newY = 0;

if(newX > maxX) newX = maxX;
if(newY > maxY) newY = maxY;

furniture.style.left = newX + "px";
furniture.style.top = newY + "px";

});

document.addEventListener("mouseup", function(){

isDragging = false;

});
let rotation = 0; // keep track of rotation angle

function rotateFurniture() {
    const furnitureBox = document.getElementById("furnitureBox");
    
    // Increase rotation by 90 degrees
    rotation += 90;
    
    // Keep it between 0-270 for neatness
    if(rotation >= 360) rotation = 0;
    
    // Apply CSS rotation
    furnitureBox.style.transform = `rotate(${rotation}deg)`;
}
function resetRoom() {

    const furnitureBox = document.getElementById("furnitureBox");
    const fitResult = document.getElementById("fitResult");

    // hide furniture
    furnitureBox.style.width = "0px";
    furnitureBox.style.height = "0px";

    // clear result text
    fitResult.innerText = "";
    document.getElementById("furnitureLabel").innerText = "";

}
