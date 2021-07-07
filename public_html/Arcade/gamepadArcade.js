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
    d.setAttribute("class", "Arcade");

    var b = document.createElement("div");
    b.className = "buttons";
    var f = document.createElement("div");
    f.className = "fondo";
    var img = document.createElement("img");
    img.setAttribute("src", "../imagenes/Arcade/mando2.png");
    img.setAttribute("class", "relative");
    b.appendChild(f);
    b.appendChild(img);

    for (var i = 0; i < gamepad.buttons.length; i++) {
        var img = document.createElement("img");
        img.setAttribute("src", "../imagenes/arcade/button" + i + ".png");
        img.setAttribute("id", "ArcadeButton" + i);
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

        e.setAttribute("id", "arcadeAxis" + i);
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
        if (d.getClass == "Xbox") {

        } else {
            var buttons = d.getElementsByClassName("button");
            for (var i = 0; i < controller.buttons.length; i++) {
                console.log(i);
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
        for (var i = 0; i < controller.axes.length; i++) {
            var a = axes[i];
            a.innerHTML = i + ": " + controller.axes[i].toFixed(4);
            a.setAttribute("value", controller.axes[i]);
            if (d.className == "Arcade") {
                var ax0 = document.getElementById("arcadeAxis0");
                var val = ax0.value;
//                console.log(val);
                var style = "";
                var desp = val * 25;
                if (val <= "-0.15") {
                    var b = document.getElementById("ArcadeButton10");
                    b.className += " pressed ";
                    style += "left: " + (24 + desp) + "px;";
                } else if (val >= "0.15") {
                    var b = document.getElementById("ArcadeButton10");
                    b.className += " pressed ";
                    style += "left: " + (24 + desp) + "px;";
                } else {
                    style += "left: 24px;";
                }

                var ax1 = document.getElementById("arcadeAxis1");
                var val = ax1.value;
                var desp2 = val * 25;
                if (val <= "-0.15") {
                    var b = document.getElementById("ArcadeButton10");
                    b.className += " pressed";
                    style += "top: " + (20 + desp2) + "px;";
                } else if (val >= "0.15") {
                    var b = document.getElementById("ArcadeButton10");
                    b.className += " pressed";
                    style += "top: " + (20 + desp2) + "px;";
                }
                
                b.style = style;
            }
        }
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