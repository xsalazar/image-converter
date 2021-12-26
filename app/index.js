const sharp = require("sharp");
const axios = require("axios");

exports.handler = async (event, context) => {
  console.log(JSON.stringify(event));
  if (event.queryStringParameters) {
    if (
      !event.queryStringParameters.imageSource ||
      !event.queryStringParameters.imageFormat ||
      !event.queryStringParameters.width ||
      !event.queryStringParameters.height
    ) {
      return {
        cookies: [],
        isBase64Encoded: false,
        statusCode: 400,
        headers: {},
        body: "",
      };
    }

    var imageSource = event.queryStringParameters.imageSource;
    var imageFormat = event.queryStringParameters.imageFormat;
    var width = parseInt(event.queryStringParameters.width);
    var height = parseInt(event.queryStringParameters.height);

    // Get image from internet
    var response = await axios.get(imageSource, {
      responseType: "arraybuffer",
    });

    var file = sharp(Buffer.from(response.data), {
      density: 7000,
    });

    var contentType;
    if (imageFormat === "png") {
      file = file.png();
      contentType = "image/png";
    } else if (imageFormat === "jpeg") {
      file = file.jpeg();
      contentType = "image/jpeg";
    } else {
      file = file.png();
      contentType = "image/png";
    }

    file = (
      await file.resize(width, height, { fit: "fill" }).toBuffer()
    ).toString("base64");

    return {
      cookies: [],
      isBase64Encoded: true,
      statusCode: 200,
      headers: { "content-type": contentType },
      body: file,
    };
  }
};
