// canvas
var canvas;
const SCALE = 1.6;
const VARIABLE_SCALING = false;
// const WIDTH = window.innerWidth, HEIGHT = window.innerHeight;
const WIDTH = 1920, HEIGHT = 1005;

function limit (value, min, max) { return Math.min(Math.max(value, min), max); }

window.addEventListener("resize", function (ignored) {

  if (VARIABLE_SCALING) { resizeCanvas(Math.floor(limit(window.innerWidth / SCALE, 1000, 1200)), Math.floor(limit(window.innerWidth / SCALE, 580, 610))); }

}, true);

// site
var title = "rube goldberg";
var version = "version 0.0.1";

window.onload = function () { document.title = title; /* document.getElementById("title").innerHTML = title + "  <span style=\"font-size: 30px;\"> " + version + "<\span>"; */ }

function createInputAndButton (buttonMessage, createMessage) {

  var input = document.createElement("input");
  input.type = "text";
  input.id = "inputField";
  input.className = "field";

  document.getElementById("main").appendChild(input);

  var button = document.createElement("button");
  button.className = "field_button";
  button.id = "inputButton";
  button.textContent = buttonMessage;

  document.getElementById("main").appendChild(button);

  document.getElementById(button.id).addEventListener("click", function () { inputButtonClicked(); });

  if (createMessage) {

    var message = document.createElement("p");
    message.id = "result";
    message.className = "message";
    message.innerHTML = createMessage;

    document.getElementById("main").appendChild(message);

  }

  return [input, button];

}

function createCornerButton (buttonText) {

  var button = document.createElement("button");
  button.className = "corner_button";
  button.id = "cornerButton";
  button.textContent = buttonText;

  document.getElementById("main").appendChild(button);

  document.getElementById(button.id).addEventListener("click", function () { cornerButtonClicked(); });

  return button;

}

function inputButtonClicked () {

  var input = document.getElementById("inputField").value;
  var message = document.getElementById("result");

  // start here...

}

function cornerButtonClicked () {

  // start here...

}

// colors
const BACKGROUND_COLOR = getComputedStyle(document.querySelector(":root")).getPropertyValue("--background-color");
const ACCENT_1 = getComputedStyle(document.querySelector(":root")).getPropertyValue("--accent-1");
const ACCENT_2 = getComputedStyle(document.querySelector(":root")).getPropertyValue("--accent-2");

// matter.js
var Engine = Matter.Engine,
    Render = Matter.Render,
    Runner = Matter.Runner,
    Bodies = Matter.Bodies,
    Body = Matter.Body,
    Composite = Matter.Composite,
    Composites = Matter.Composites,
    Constraint = Matter.Constraint,
    MouseConstraint = Matter.MouseConstraint,
    Mouse = Matter.Mouse,
    World = Matter.World,
    Events = Matter.Events;

var engine = Engine.create(), cam, dX = 0, dY = 0, dZ = 0, tracking = false;
var DEBUG = true, CAM_SPEED = 100, CAM_SCALE = 1.5;
var item, fin = false, huh = false;

var allBodies = [], dominos = [], portals = [], balls = [], blocks = [], boxes = [];

var NORMAL_PROPS = {

  restitution: 0.5,

  render: {

    fillStyle: "#d9d9d9",
    strokeStyle: "#d9d9d9",
    lineWidth: 3

  }

}

var STATIC_PROPS = {

  isStatic: true,
  friction: 0,

  render: {

    fillStyle: "#363636",
    strokeStyle: "#363636",
    lineWidth: 3

  }

}