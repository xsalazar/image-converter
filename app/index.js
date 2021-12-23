const sharp = require("sharp");
const axios = require("axios");

exports.handler = async (event, context) => {
  if (event.imageSource) {
    var response = await axios.get(event.imageSource, {
      responseType: "arraybuffer",
    });

    var file = await sharp(Buffer.from(response.data), {
      density: 100000,
    })
      .png()
      .resize(1024, 1024)
      .toBuffer();
    return file.toString("base64");
  }
};
