/*
 * Gamepad API Test
 * Written in 2013 by Ted Mielczarek <ted@mielczarek.org>
 *
 * To the extent possible under law, the author(s) have dedicated all copyright and related and neighboring rights to this software to the public domain worldwide. This software is distributed without any warranty.
 *
 * You should have received a copy of the CC0 Public Domain Dedication along with this software. If not, see <http://creativecommons.org/publicdomain/zero/1.0/>.
 */
var haveEvents = 'GamepadEvent' in window;
var haveWebkitEvents = 'WebKitGamepadEvent' in window;
var controllers = {};
var rAF = window.mozRequestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.requestAnimationFrame;

function connecthandler(e) {
    addgamepad(e.gamepad);
}
function addgamepad(gamepad) {
    controllers[gamepad.index] = gamepad;
    var d = document.createElement("div");
    d.setAttribute("id", "controller" + gamepad.index);
    var t = document.createElement("h1");
//    t.appendChild(document.createTextNode("gamepad: " + gamepad.id));
    d.appendChild(t);
    var b = document.createElement("div");
    b.className = "buttons";
    var id = gamepad.id;
    var gen = id.indexOf("Generic");
    var xbox = id.indexOf("Xbox");
    var snes = id.indexOf("Gamepad");
    d.setAttribute("class", "snes");
    var b = document.createElement("div");
    b.className = "buttons";
    var img = document.createElement("img");
    img.setAttribute("src", "../imagenes/snes/mando1.png");
    img.setAttribute("class", "relative");
    b.appendChild(img);

    for (var i = 0; i < gamepad.buttons.length; i++) {
        var img = document.createElement("img");
        img.setAttribute("src", "../imagenes/snes/button" + i + ".png");
        img.setAttribute("id", "button" + i);
        img.className = "button";
        b.appendChild(img);
    }
    d.appendChild(b);
    var a = document.createElement("div");
    a.className = "axes";
    for (i = 0; i < gamepad.axes.length; i++) {
        e = document.createElement("meter");
        e.className = "axis";
        //e.id = "a" + i;
        e.setAttribute("min", "-1");
        e.setAttribute("max", "1");
        e.setAttribute("value", "0");

//        if (snes > -1) {
//            e.setAttribute("id", "xboxAxis" + i);
//        }
        e.innerHTML = i;
        a.appendChild(e);
    }
    d.appendChild(a);
    document.getElementById("start").style.display = "none";
    document.body.appendChild(d);
    rAF(updateStatus);
}

function disconnecthandler(e) {
    removegamepad(e.gamepad);
}

function removegamepad(gamepad) {
    var d = document.getElementById("controller" + gamepad.index);
    document.body.removeChild(d);
    delete controllers[gamepad.index];
}

function updateStatus() {
    scangamepads();
    for (j in controllers) {
        var controller = controllers[j];
        var d = document.getElementById("controller" + j);
        if (d.getClass == "snes") {
            console.log("snes");
        } else {
            var buttons = d.getElementsByClassName("button");
            for (var i = 0; i < controller.buttons.length; i++) {
                var b = buttons[i];
                var val = controller.buttons[i];
                var pressed = val == 1.0;
                var touched = false;
                if (typeof (val) == "object") {
                    pressed = val.pressed;
                    if ('touched' in val) {
                        touched = val.touched;
                    }
                    val = val.value;
                }
                var pct = Math.round(val * 100) + "%";
                b.style.backgroundSize = pct + " " + pct;
                b.className = "button";
                if (pressed) {
                    b.className += " pressed";
                }
                if (touched) {
                    b.className += " touched";
                }
            }
        }

        var axes = d.getElementsByClassName("axis");
//        for (var i = 0; i < controller.axes.length; i++) {
//            var a = axes[i];
//            a.innerHTML = i + ": " + controller.axes[i].toFixed(4);
//            a.setAttribute("value", controller.axes[i]);
//            var ax0 = document.getElementById("xboxAxis0");
//            var val = ax0.value;
//            if (val <= "-0.35") {
//                var b = document.getElementById("button10");
//                b.className += " pressed left";
//            } else if (val >= "0.35") {
//                var b = document.getElementById("button10");
//                b.className += " pressed right";
//            }
//
//            var ax1 = document.getElementById("xboxAxis1");
//            var val = ax1.value;
//            if (val <= "-0.35") {
//                var b = document.getElementById("button10");
//                b.className += " pressed up";
//            } else if (val >= "0.35") {
//                var b = document.getElementById("button10");
//                b.className += " pressed down";
//            }
//
//            var ax2 = document.getElementById("xboxAxis2");
//            var val = ax2.value;
//            if (val <= "-0.35") {
//                var b = document.getElementById("button11");
//                b.className += " pressed left";
//            } else if (val >= "0.35") {
//                var b = document.getElementById("button11");
//                b.className += " pressed right";
//            }
//
//            var ax3 = document.getElementById("xboxAxis3");
//            var val = ax3.value;
//            if (val <= "-0.35") {
//                var b = document.getElementById("button11");
//                b.className += " pressed up";
//            } else if (val >= "0.35") {
//                var b = document.getElementById("button11");
//                b.className += " pressed down";
//            }
//        }
    }
    rAF(updateStatus);
}

function scangamepads() {
    var gamepads = navigator.getGamepads ? navigator.getGamepads() : (navigator.webkitGetGamepads ? navigator.webkitGetGamepads() : []);
    for (var i = 0; i < gamepads.length; i++) {
        if (gamepads[i] && (gamepads[i].index in controllers)) {
            controllers[gamepads[i].index] = gamepads[i];
        }
    }
}

if (haveEvents) {
    window.addEventListener("gamepadconnected", connecthandler);
    window.addEventListener("gamepaddisconnected", disconnecthandler);
} else if (haveWebkitEvents) {
    window.addEventListener("webkitgamepadconnected", connecthandler);
    window.addEventListener("webkitgamepaddisconnected", disconnecthandler);
} else {
    setInterval(scangamepads, 500);
}