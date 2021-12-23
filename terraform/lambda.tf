resource "aws_lambda_function" "instance" {
  function_name = "image-converter"
  filename      = "${path.module}/dummy-lambda-package/lambda.zip" // Simple hello world application
  role          = aws_iam_role.instance.arn
  handler       = "index.handler"
  runtime       = "nodejs14.x"
}
