resource "aws_iam_role" "citizen_api_lambda_role" {
  name = "${local.name_prefix}-citizen-api-role"

  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Action = "sts:AssumeRole"
        Effect = "Allow"
        Principal = {
          Service = "lambda.amazonaws.com"
        }
      }
    ]
  })

  tags = local.common_tags
}

resource "aws_iam_role_policy_attachment" "citizen_api_lambda_basic" {
  role       = aws_iam_role.citizen_api_lambda_role.name
  policy_arn = "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole"
}

resource "aws_iam_role_policy" "citizen_api_ddb_access" {
  name = "${local.name_prefix}-citizen-api-ddb-access"
  role = aws_iam_role.citizen_api_lambda_role.id

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Sid    = "DynamoDbCrud"
        Effect = "Allow"
        Action = [
          "dynamodb:GetItem",
          "dynamodb:PutItem",
          "dynamodb:UpdateItem",
          "dynamodb:DeleteItem",
          "dynamodb:Query",
          "dynamodb:Scan",
        ]
        Resource = [
          aws_dynamodb_table.citizens.arn,
          aws_dynamodb_table.programs.arn,
          aws_dynamodb_table.engagement_events.arn,
          aws_dynamodb_table.enrollments.arn,
          aws_dynamodb_table.feedback.arn,
          aws_dynamodb_table.interactions.arn,
        ]
      }
    ]
  })
}

resource "aws_iam_role_policy" "citizen_api_bedrock_access" {
  name = "${local.name_prefix}-citizen-api-bedrock-access"
  role = aws_iam_role.citizen_api_lambda_role.id

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Sid    = "BedrockInvokeModel"
        Effect = "Allow"
        Action = [
          "bedrock:InvokeModel",
          "bedrock:InvokeModelWithResponseStream",
        ]
        Resource = "*"
      }
    ]
  })
}
