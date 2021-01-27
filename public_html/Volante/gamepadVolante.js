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
    var id = gamepad.id;
    var xbox = id.indexOf("Xbox");
    console.log(gamepad.index + " - " + id + " - " + xbox);
    if (xbox > -1) {
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
        if (xbox > -1) {
            d.setAttribute("class", "Xbox");
        } else {
            d.setAttribute("class", "other");
        }
        var b = document.createElement("div");
        b.className = "buttons";
        var img = document.createElement("img");
        img.setAttribute("src", "../imagenes/Volante/mando1.png");
        img.setAttribute("class", "relative");
        b.appendChild(img);

        for (var i = 0; i < gamepad.buttons.length; i++) {
            var img = document.createElement("img");
            img.setAttribute("id", "button" + i);
            if (i == 7) {
                img.setAttribute("src", "../imagenes/Volante/freno0.png");
            } else if (i == 6) {
                img.setAttribute("src", "../imagenes/Volante/freno0.png");
            } else {
                img.setAttribute("src", "../imagenes/Volante/button" + i + ".png");
            }
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

            if (xbox > -1) {
                e.setAttribute("id", "xboxAxis" + i);
            }
            e.innerHTML = i;
            a.appendChild(e);
        }
        d.appendChild(a);
        document.getElementById("start").style.display = "none";
        document.body.appendChild(d);
        rAF(updateStatus);
    }
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
                var percent = Math.round(val * 100);

                if (i == 7) {
                    var img = document.getElementById("button7");
                    if (percent == 0) {
                        img.setAttribute("src", "../imagenes/Volante/freno0.png");
                    } else if (percent > 0 && percent <= 10) {
                        img.setAttribute("src", "../imagenes/Volante/freno1.png");
                    } else if (percent > 10 && percent <= 20) {
                        img.setAttribute("src", "../imagenes/Volante/freno2.png");
                    } else if (percent > 20 && percent <= 30) {
                        img.setAttribute("src", "../imagenes/Volante/freno3.png");
                    } else if (percent > 30 && percent <= 40) {
                        img.setAttribute("src", "../imagenes/Volante/freno4.png");
                    } else if (percent > 40 && percent <= 50) {
                        img.setAttribute("src", "../imagenes/Volante/freno5.png");
                    } else if (percent > 50 && percent <= 60) {
                        img.setAttribute("src", "../imagenes/Volante/freno6.png");
                    } else if (percent > 60 && percent <= 70) {
                        img.setAttribute("src", "../imagenes/Volante/freno7.png");
                    } else if (percent > 70 && percent <= 80) {
                        img.setAttribute("src", "../imagenes/Volante/freno8.png");
                    } else if (percent > 80 && percent <= 90) {
                        img.setAttribute("src", "../imagenes/Volante/freno9.png");
                    } else if (percent > 90) {
                        img.setAttribute("src", "../imagenes/Volante/freno100.png");
                    }
                } else if (i == 6) {
                    var img = document.getElementById("button6");
                    if (percent == 0) {
                        img.setAttribute("src", "../imagenes/Volante/freno0.png");
                    } else if (percent > 0 && percent <= 10) {
                        img.setAttribute("src", "../imagenes/Volante/freno1.png");
                    } else if (percent > 10 && percent <= 20) {
                        img.setAttribute("src", "../imagenes/Volante/freno2.png");
                    } else if (percent > 20 && percent <= 30) {
                        img.setAttribute("src", "../imagenes/Volante/freno3.png");
                    } else if (percent > 30 && percent <= 40) {
                        img.setAttribute("src", "../imagenes/Volante/freno4.png");
                    } else if (percent > 40 && percent <= 50) {
                        img.setAttribute("src", "../imagenes/Volante/freno5.png");
                    } else if (percent > 50 && percent <= 60) {
                        img.setAttribute("src", "../imagenes/Volante/freno6.png");
                    } else if (percent > 60 && percent <= 70) {
                        img.setAttribute("src", "../imagenes/Volante/freno7.png");
                    } else if (percent > 70 && percent <= 80) {
                        img.setAttribute("src", "../imagenes/Volante/freno8.png");
                    } else if (percent > 80 && percent <= 90) {
                        img.setAttribute("src", "../imagenes/Volante/freno9.png");
                    } else if (percent > 90) {
                        img.setAttribute("src", "../imagenes/Volante/freno100.png");
                    }
                } else {
//                    b.style.opacity = pct;
                }
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
            if (d.className == "Xbox") {
                var ax0 = document.getElementById("xboxAxis0");
                var val = ax0.value;

                var style = "opacity:1; ";
                var desp = val * 10;

                if (val <= "-0.15") {
                    var b = document.getElementById("button10");
                    b.className += " pressed";
                    style += "left: " + (24 + desp) + "px;";
                } else if (val >= "0.15") {
                    var b = document.getElementById("button10");
                    b.className += " pressed";
                    style += "left: " + (24 + desp) + "px;";
                }

                var ax1 = document.getElementById("xboxAxis1");
                var val = ax1.value;
                var desp2 = val * 10;
                if (val <= "-0.15") {
                    var b = document.getElementById("button10");
                    b.className += " pressed";
                    style += "top: " + (20 + desp2) + "px;";
                } else if (val >= "0.15") {
                    var b = document.getElementById("button10");
                    b.className += " pressed";
                    style += "top: " + (20 + desp2) + "px;";
                }
                b.style = style;

                var ax2 = document.getElementById("xboxAxis2");
                var val = ax2.value;
                var style2 = "opacity:1; ";
                var desp = val * 10;
                var b2 = document.getElementById("button11");
                if (val <= "-0.15") {
                    var b = document.getElementById("button11");
                    b.className += " pressed";
                    style2 += "left: " + (24 + desp) + "px;";
                } else if (val >= "0.15") {
                    var b = document.getElementById("button11");
                    b.className += " pressed";
                    style2 += "left: " + (24 + desp) + "px;";
                }

                var ax3 = document.getElementById("xboxAxis3");
                var val = ax3.value;
                var desp2 = val * 10;

                if (val <= "-0.15") {
                    var b = document.getElementById("button11");
                    b.className += " pressed";
                    style2 += "top: " + (20 + desp2) + "px;";
                } else if (val >= "0.15") {
                    var b = document.getElementById("button11");
                    b.className += " pressed";
                    style2 += "top: " + (20 + desp2) + "px;";
                }
                b2.style = style2;
            }
            if (d.className == "Arcade") {
                var ax0 = document.getElementById("arcadeAxis0");
                var val = ax0.value;
//                console.log(val);
                if (val <= "-0.35") {
                    var b = document.getElementById("ArcadeButton10");
                    b.className += " pressed left";
                } else if (val >= "0.35") {
                    var b = document.getElementById("ArcadeButton10");
                    b.className += " pressed right";
                }

                var ax1 = document.getElementById("arcadeAxis1");
                var val = ax1.value;
                if (val <= "-0.35") {
                    var b = document.getElementById("ArcadeButton10");
                    b.className += " pressed up";
                } else if (val >= "0.35") {
                    var b = document.getElementById("ArcadeButton10");
                    b.className += " pressed down";
                }
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