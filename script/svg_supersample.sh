# usage: svg_supersample input.svg output.png outwidth outheight
#                        $1        $2         $3      $4

# 2-6 Recommended (superSampleSize^2 samples per output pixel)
superSampleSize=4

if [[ -z $1 ]]
then
 echo Did not enter an input file.
 echo usage: svg_supersample input.svg output.png
 exit 1
fi

if [[ -z $2 ]]
then
 echo Did not enter an output file.
 echo usage: svg_supersample input.svg output.png
 exit 1
fi

# calculate percent value of 1 / superSampleSize
# (hacky method since bash only does integer math)
percent=$(echo $(( 100000 * 1 / $superSampleSize )) | sed 's/...$/.&/')

YELLOW='\033[1;33m'
GREEN='\033[0;32m'
NC='\033[0m' # No Color

echo -e -n "${GREEN}STARTED${NC}: Supersampling ${superSampleSize}x $1 to ${2}"

if [[ -z $3 ]]
then
width=$(( $(inkscape $1 -W) * superSampleSize ))
else
width=$(( $3 * superSampleSize ))
fi

if [[ -z $4 ]]
then
height=$(( $(inkscape $1 -H) * superSampleSize ))
else
height=$(( $4 * superSampleSize ))
fi

# render svg to png using Inkscape
inkscape $1 -w $width -h $height -o sstemp_${2} > /dev/null 2>&1

# downsample the rendered png using linear colorspace (LUV)
./magick sstemp_${2} -colorspace LUV -scale ${percent}% -colorspace sRGB $2 > /dev/null 2>&1

# remove temp file
rm sstemp_${2} &

##optimize (reduce size of) the output png using pingo https://css-ig.net/pingo
./pingo.exe -s9 $2 > /dev/null 2>&1
echo -e " ${YELLOW}FINISHED${nc}"