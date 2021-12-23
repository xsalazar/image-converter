const sharp = require("sharp");
const axios = require("axios");

exports.handler = async (event, context) => {
  var body = JSON.parse(event.body);
  if (body.imageSource) {
    var response = await axios.get(body.imageSource, {
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
