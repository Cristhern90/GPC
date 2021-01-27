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
    console.log(e);
    addgamepad(e.gamepad);
}
function addgamepad(gamepad) {
    controllers[gamepad.index] = gamepad;
    var d = document.createElement("div");
    
    d.setAttribute("id", "controller" + gamepad.index);
    var t = document.createElement("h1");


    var id = gamepad.id;
    var gen = -1;
//    try {
        gen = id.indexOf("Generic");
//        console.log(gen);
//    } catch (error) {
//        console.log(error);
//    }
    var xbox = id.indexOf("Xbox");
    var snes = id.indexOf("Gamepad");
    var mando = "";
    var mandoGen = 0;
    if (gen > -1) {
        d.setAttribute("class", "Arcade");
        mando = "Arcade";
        mandoGen = 0;
        t.appendChild(document.createTextNode("Mando: Arcade"));
    } else if (xbox > -1) {
        d.setAttribute("class", "Xbox");
        mando = "Xbox";
        mandoGen = 0;
        t.appendChild(document.createTextNode("Mando: Xbox"));
    } else if (snes > -1) {
        d.setAttribute("class", "Snes");
        t.appendChild(document.createTextNode("Mando: Genérico"));
        mando = "Snes";
        mandoGen = 1;
    } else {
        d.setAttribute("class", "other");
        mando = "other";
        mandoGen = 1;
        t.appendChild(document.createTextNode("Mando: Genérico"));
    }

//    t.appendChild(document.createTextNode("gamepad: " + gamepad.id));
    console.log(gamepad);
//    const name = mando;
//    const nameCapitalized = name.charAt(0).toUpperCase() + name.slice(1)
//    t.appendChild(document.createTextNode(nameCapitalized));
    d.appendChild(t);
    var b = document.createElement("div");
    b.className = "buttons";

    var b = document.createElement("div");
    b.className = "buttons";
    if (mandoGen) {
        var link = document.createElement("a");
        link.appendChild(document.createTextNode(mando));
        link.setAttribute("href", "Snes.html");
        var br = document.createElement("br");
        var link2 = document.createElement("a");
        link2.appendChild(document.createTextNode("Arcade"));
        link2.setAttribute("href", "General/Arcade.html?controller=1");
        b.appendChild(link);
        b.appendChild(br);
        b.appendChild(link2);
    } else {
        var link = document.createElement("a");
        link.appendChild(document.createTextNode(mando));
        link.setAttribute("href", mando + ".html");
        b.appendChild(link);
    }

    d.appendChild(b);

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
//                b.style.backgroundSize = pct + " " + pct;
//                b.className = "button";
//                if (pressed) {
//                    b.className += " pressed";
//                }
//                if (touched) {
//                    b.className += " touched";
//                }
            }
        }

        var axes = d.getElementsByClassName("axis");
        for (var i = 0; i < controller.axes.length; i++) {
            var a = axes[i];
//            a.innerHTML = i + ": " + controller.axes[i].toFixed(4);
//            a.setAttribute("value", controller.axes[i]);
            if (d.className == "Xbox") {
//                var ax0 = document.getElementById("xboxAxis0");
//                var val = ax0.value;
//                if (val <= "-0.35") {
//                    var b = document.getElementById("button10");
//                    b.className += " pressed left";
//                } else if (val >= "0.35") {
//                    var b = document.getElementById("button10");
//                    b.className += " pressed right";
//                }
//
//                var ax1 = document.getElementById("xboxAxis1");
//                var val = ax1.value;
//                if (val <= "-0.35") {
//                    var b = document.getElementById("button10");
//                    b.className += " pressed up";
//                } else if (val >= "0.35") {
//                    var b = document.getElementById("button10");
//                    b.className += " pressed down";
//                }
//
//                var ax2 = document.getElementById("xboxAxis2");
//                var val = ax2.value;
//                if (val <= "-0.35") {
//                    var b = document.getElementById("button11");
//                    b.className += " pressed left";
//                } else if (val >= "0.35") {
//                    var b = document.getElementById("button11");
//                    b.className += " pressed right";
//                }
//
//                var ax3 = document.getElementById("xboxAxis3");
//                var val = ax3.value;
//                if (val <= "-0.35") {
//                    var b = document.getElementById("button11");
//                    b.className += " pressed up";
//                } else if (val >= "0.35") {
//                    var b = document.getElementById("button11");
//                    b.className += " pressed down";
//                }
            }
            if (d.className == "Arcade") {
//                var ax0 = document.getElementById("arcadeAxis0");
//                var val = ax0.value;
//                console.log(val);
//                if (val <= "-0.35") {
//                    var b = document.getElementById("ArcadeButton10");
//                    b.className += " pressed left";
//                } else if (val >= "0.35") {
//                    var b = document.getElementById("ArcadeButton10");
//                    b.className += " pressed right";
//                }
//
//                var ax1 = document.getElementById("arcadeAxis1");
//                var val = ax1.value;
//                if (val <= "-0.35") {
//                    var b = document.getElementById("ArcadeButton10");
//                    b.className += " pressed up";
//                } else if (val >= "0.35") {
//                    var b = document.getElementById("ArcadeButton10");
//                    b.className += " pressed down";
//                }
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
//    console.log(window);
    window.addEventListener("gamepadconnected", connecthandler);
    window.addEventListener("gamepaddisconnected", disconnecthandler);
} else if (haveWebkitEvents) {
    window.addEventListener("webkitgamepadconnected", connecthandler);
    window.addEventListener("webkitgamepaddisconnected", disconnecthandler);
} else {
    setInterval(scangamepads, 500);
}