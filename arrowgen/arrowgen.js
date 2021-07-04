//TODO: margins AKA squeeze
var squeeze = 2 / 5;

var canvasSize = 512;

var insideColor = "#FF0000"; // Default = "#FF0000" OR "#0000FF";
//Does 50/50 chance for red or blue arrow
if (Math.random() > 0.5) {
  insideColor = "#0000FF";
}
var outlineColor = "#FFFFFF"; // Default = "#FFFFFF"

var outlineRatio = 1 / 6; // Default = 1/6
var insidePercent = 2 / 3; // Default = 2/3

var outFileName = "pl0x_default_Arrow.svg";

//args: outFileName CanvasSize OutlineColor(hex) InsideColor(hex) OutlineRatio InsidePercent
if (process.argv.length > 2) {
  var hexCheck = new RegExp("^#(?:[0-9a-fA-F]{3}){1,2}$");

  //File name check
  if (process.argv[2]) {
    var filename = process.argv[2];
    if (filename.includes(".svg")) {
      outFileName = filename;
    } else {
      outFileName = filename + ".svg";
    }
  } else {
    console.log("You must provide a out filename as first argument");
  }

  //Canvas Check
  if (process.argv[3]) {
    var size = parseFloat(process.argv[3]);
    if (size === parseInt(size, 10)) {
      console.log("Canvas Size: " + process.argv[3] + "px");
      canvasSize = size;
    } else {
      console.log("Canvas Size must be a WHOLE NUMBER, using 512px default");
    }
  }

  //Color Check
  if (process.argv[4] && process.argv[5]) {
    if (hexCheck.test(process.argv[4]) && hexCheck.test(process.argv[5])) {
      console.log("Outline Color:", process.argv[4]);
      console.log("Inside Color:", process.argv[5]);

      outlineColor = process.argv[4];
      insideColor = process.argv[5];

      //Check sizing values
      if (process.argv[6] && process.argv[7]) {
        outlineRatio = eval(process.argv[6]);
        insidePercent = eval(process.argv[7]);

        console.log("Outline Ratio:", (outlineRatio * 100).toFixed(2) + "%");
        console.log("Inside Percent:", (insidePercent * 100).toFixed(2) + "%");

        if (insidePercent > 1) {
          console.log("Inside Percent should be less than 1, aka 75% = .75");
        }
      }
    } else {
      console.log('Not Valid Hex Colors! Example: "#FF0000" is RED');
    }
  } else {
    console.log("Not enough colors provided, using default colors.");
  }
} else {
  console.log("Generating Default Arrow");
}

const { Console } = require("console");
var fs = require("fs");
const { nextTick } = require("process");
fs.readFile("arrow", "utf8", function (err, data) {
  var ptDist = outlineRatio * 2 * canvasSize * 0.5;
  var invPtDist = canvasSize - ptDist;

  data = data.replaceAll("%canvas-size%", canvasSize);
  data = data.replaceAll("%out-color%", outlineColor);
  data = data.replaceAll("%in-color%", insideColor);

  data = data.replaceAll("%half%", canvasSize * 0.5);

  data = data.replaceAll("%pt-dist%", ptDist);
  data = data.replaceAll("%inv-pt-dist%", invPtDist);

  data = data.replaceAll("%outStroke%", outlineRatio * 2 * canvasSize);
  data = data.replaceAll(
    "%inStroke%",
    outlineRatio * 2 * canvasSize * insidePercent
  );
  fs.writeFile(outFileName, data, function (err) {
    if (err) {
      console.log(err);
    }
  });
});
