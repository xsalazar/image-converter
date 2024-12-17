terraform {
  required_version = "~> 1.10.2"
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.81.0"
    }
  }
  backend "s3" {
    bucket = "xsalazar-terraform-state"
    key    = "image-converter/terraform.tfstate"
    region = "us-west-2"
  }
}

provider "aws" {
  region = "us-west-2"
  default_tags {
    tags = {
      CreatedBy = "terraform"
    }
  }
}

output "api_endpoint" {
  value = aws_apigatewayv2_api.instance.api_endpoint
}

output "lambda_function" {
  value = aws_lambda_function.instance.function_name
}
