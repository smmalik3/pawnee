data "archive_file" "citizen_api_zip" {
  type        = "zip"
  source_dir  = "${path.module}/../../backend/functions/citizen_api"
  output_path = "${path.module}/citizen_api.zip"
}

resource "aws_lambda_function" "citizen_api" {
  function_name = "${local.name_prefix}-citizen-api"
  role          = aws_iam_role.citizen_api_lambda_role.arn
  runtime       = "nodejs20.x"
  handler       = "index.handler"

  filename         = data.archive_file.citizen_api_zip.output_path
  source_code_hash = data.archive_file.citizen_api_zip.output_base64sha256

  timeout     = 15
  memory_size = 256

  environment {
    variables = {
      CITIZENS_TABLE          = aws_dynamodb_table.citizens.name
      PROGRAMS_TABLE          = aws_dynamodb_table.programs.name
      ENGAGEMENT_EVENTS_TABLE = aws_dynamodb_table.engagement_events.name
      ENROLLMENTS_TABLE       = aws_dynamodb_table.enrollments.name
      FEEDBACK_TABLE          = aws_dynamodb_table.feedback.name
      INTERACTIONS_TABLE      = aws_dynamodb_table.interactions.name
      OPENAI_MODEL            = var.openai_model
      OPENAI_API_KEY          = var.openai_api_key
    }
  }

  tags = local.common_tags
}

resource "aws_cloudwatch_log_group" "citizen_api" {
  name              = "/aws/lambda/${aws_lambda_function.citizen_api.function_name}"
  retention_in_days = var.log_retention_days
  tags              = local.common_tags
}
