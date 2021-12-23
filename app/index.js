const sharp = require("sharp");
const axios = require("axios");

exports.handler = async (event, context) => {
  console.log(JSON.stringify(event));
  if (event.body) {
    var response = await axios.get(event.body.imageSource, {
      responseType: "arraybuffer",
    });

    var file = await sharp(Buffer.from(response.data), {
      density: 5000,
    })
      .resize(1024, 1024)
      .png()
      .toBuffer();
    return file.toString("base64");
  }
};
