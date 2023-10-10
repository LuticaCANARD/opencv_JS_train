const Jimp = require('jimp');
const path = require('path');
async function onRuntimeInitialized(){
  // load local image file with jimp. It supports jpg, png, bmp, tiff and gif:
  var jimpSrc = await Jimp.read(path.join(__dirname,'../../Train/test2.png'));
  // `jimpImage.bitmap` property has the decoded ImageData that we can use to create a cv:Mat
  var src = cv.matFromImageData(jimpSrc.bitmap);
  // following lines is copy&paste of opencv.js dilate tutorial:
  let dst = new cv.Mat();
  let M = cv.Mat.ones(2, 1, cv.CV_8U);
  let anchor = new cv.Point(-1, -1);
  //cv.dilate(src, dst, M, anchor, 1, cv.BORDER_CONSTANT, cv.morphologyDefaultBorderValue());
  cv.filter2D(src, dst, cv.CV_8U, M, anchor, 1, cv.BORDER_DEFAULT);

  // Now that we are finish, we want to write `dst` to file `output.png`. For this we create a `Jimp`
  // image which accepts the image data as a [`Buffer`](https://nodejs.org/docs/latest-v10.x/api/buffer.html).
  // `write('output.png')` will write it to disk and Jimp infers the output format from given file name:
  new Jimp({
    width: dst.cols,
    height: dst.rows,
    data: Buffer.from(dst.data)
  })
  .write('./Output/output.png');
  src.delete();
  dst.delete();
}
// Finally, load the open.js as before. The function `onRuntimeInitialized` contains our program.
Module = {
  onRuntimeInitialized
};
// Load 'opencv.js' assigning the value to the global variable 'cv'
cv = require('../dependency/docs.opencv.org_4.8.0_opencv.js')