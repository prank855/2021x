pl0x Arrow Generator
command-line program using nodejs to generate a svg of the pl0x arrow in different colors/size ratios

install nodejs here: https://nodejs.org/en/

Usage:

node arrowgen.js outputFilename canvasSize outlineColor insideColor outlineRatio InsidePercentage

outputFilename can be: filename or filename.svg

canvasSize must be a whole/integer number like: 128/200/500/3333

outlineColor and insideColor must be typed as hex values such as : "FF00FF", "ABCDEF", etc. (MUST HAVE QUOTATION MARKS)
(Use Google's Color Picker https://www.google.com/search?q=hex+color)

outlineRatio preferably should be 1/5 or lower (default is 1/6), please note that this variable is poorly names and should be experimented by you to see its function.

insidePercentage is the relationship between the outline and inside color size.

outlineRatio and insidePercentage should be represented as a decimal number or a fraction less than 1. Example: .65, .01, 1/4, 5/6.

Example:
node arrowgen.js arrow.svg 512 "#FFFFFF" "#0000FF" 1/6 2/3
