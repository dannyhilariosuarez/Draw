//''''''''''''''''''''''''' 
//'                       '
//'<Danny Hilario Suarez/>'
//'                       '
//'''''''''''''''''''''''''


var Movements = new Array();  // Variables to contain the successive points (x, y) that go
var Pulsed;                  // passing the mouse, and its status (pressed / not pressed)
var CanvaColor = '#009688';

document.onselectstart = function () {
    return false;
}

function initCanvas() {
    var canvasDiv = document.getElementById('div_canvas');
    canvas = document.createElement('canvas');
    canvas.setAttribute('width', document.getElementById('div_canvas').clientWidth);
    canvas.setAttribute('height', document.getElementById('div_canvas').clientHeight);
    canvas.setAttribute('id', 'canvas');
    canvasDiv.appendChild(canvas);

    $('#canva').css({ cursor: "url('images/pencil.png'), auto" });

    if (typeof G_vmlCanvasManager != 'undefined') {
        canvas = G_vmlCanvasManager.initElement(canvas);
    }

    context = canvas.getContext("2d");

    $('#canvas').mousedown(function (e) {
        Pulsed = true;
        Movements.push(
            [(e.clientX + 2) - this.offsetLeft,
            (e.clientY + 20) - this.offsetTop,
            false, CanvaColor]); 
        draw();
    });

    $('#canvas').mousemove(function (e) {
        if (Pulsed) {
            Movements.push(
                [(e.clientX + 2) - this.offsetLeft,
                (e.clientY + 20) - this.offsetTop,
                true, CanvaColor]);  
            draw();
        }
    });

    $('#canvas').mouseup(function (e) {
        Pulsed = false;
    });

    $('body').mouseup(function (e) {
        Pulsed = false;
    });

    $('#canvas').mouseleave(function (e) {
        //Pulsed = false; 
    });
    draw();
}


function draw() {
    // function to draw on the canvas the movements of the mouse that we have collected in the variable "movements" 

    canvas.width = canvas.width; // Clear the canvas 
    context.lineJoin = "round";
    context.lineWidth = 1; //Font wight

    for (var i = 0; i < Movements.length; i++) {
        context.beginPath();

        if (Movements[i][2]) {
            context.moveTo(Movements[i - 1][0], Movements[i - 1][1]); 
        } else {
            context.moveTo(Movements[i][0], Movements[i][1]); 
        }
        context.strokeStyle = Movements[i][3];
        //context.arc(Movements[i][0], Movements[i][1], 20, 0, 12 * Math.PI)
        context.arc(Movements[i][0], Movements[i][1], 0, 0, 0)//Pencil 
        context.closePath();
        context.stroke();
    }
}

function respondCanvas() {
    canvas.setAttribute('width', $('#main').width()); //max width
    canvas.setAttribute('height', $('#main').height()); //max height 
    draw(); //Call a function to draw()
}
 
