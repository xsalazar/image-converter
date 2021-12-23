const sharp = require("sharp");
const axios = require("axios");

exports.handler = async (event, context) => {
  if (event.imageSource) {
    var response = await axios.get(event.imageSource, {
      responseType: "arraybuffer",
    });
    var file = sharp(Buffer.from(response.data), {
      density: 100000,
    })
      .resize(1024, 1024)
      .png()
      .toBuffer()
    return Buffer.from(response.data, "binary").toString("base64");
  }
};
