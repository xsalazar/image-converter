const sharp = require("sharp");
const axios = require("axios");

exports.handler = async (event, context) => {
  console.log(JSON.stringify(event));
  if (event.body) {
    var body = JSON.parse(event.body);
    var response = await axios.get(body.imageSource, {
      responseType: "arraybuffer",
    });

    var file = await sharp(Buffer.from(response.data), {
      density: 5000,
    })
      .resize(body.width, body.height)
      .png()
      .toBuffer();

    return {
      cookies: [],
      isBase64Encoded: true,
      statusCode: 200,
      headers: { "content-type": "image/png" },
      body: file.toString("base64"),
    };
  }
};
