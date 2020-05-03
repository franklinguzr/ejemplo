
var canvas = document.getElementById("myCanvas");
var context = canvas.getContext("2d");

function getCurrentPos(evt) {
    var rect = canvas.getBoundingClientRect();
    return {
        x: evt.clientX - rect.left,
        y: evt.clientY - rect.top
    };
}

function drawImageText(image) {
    var json = JSON.parse(image);
    context.fillCircle(json.x, json.y, 10, json.color);
}

context.fillCircle = function (x, y, radius, fillColor) {
    this.fillStyle = fillColor;
    this.beginPath();
    this.moveTo(x, y);
    this.arc(x, y, radius, 0, Math.PI * 2, false);
    this.fill();
};

canvas.onmousemove = function (e) {
    if (!canvas.isDrawing)
        return;
    var rect = canvas.getBoundingClientRect();
    var x = e.clientX - rect.left;
    var y = e.clientY - rect.top;
    var color = getColor();
    var json = JSON.stringify({
        "color": color,
        "x": x,
        "y": y
        });
    drawImageText(json);
    sendText(json);
};

canvas.onmousedown = function (e) {
    canvas.isDrawing = true;
};
canvas.onmouseup = function (e) {
    canvas.isDrawing = false;
};

function limpiar() {
    context.clearRect(0, 0, canvas.width, canvas.height);
}

function getColor() {
    for (var i = 0; i < document.inputForm.color.length; i++) {
        if (document.inputForm.color[i].checked) {
            var color = document.inputForm.color.value;
        }
    }
    return color;
}








