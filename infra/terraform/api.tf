resource "aws_apigatewayv2_api" "backend" {
  name          = "${local.name_prefix}-http-api"
  protocol_type = "HTTP"

  cors_configuration {
    allow_origins = var.allowed_origins
    allow_methods = ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"]
    allow_headers = ["Authorization", "Content-Type"]
    max_age       = 300
  }

  tags = local.common_tags
}

resource "aws_apigatewayv2_authorizer" "jwt" {
  api_id           = aws_apigatewayv2_api.backend.id
  authorizer_type  = "JWT"
  identity_sources = ["$request.header.Authorization"]
  name             = "${local.name_prefix}-jwt"

  jwt_configuration {
    audience = [aws_cognito_user_pool_client.citizen_app_client.id]
    issuer   = "https://cognito-idp.${var.aws_region}.amazonaws.com/${aws_cognito_user_pool.citizen_pool.id}"
  }
}

resource "aws_apigatewayv2_integration" "citizen_api" {
  api_id                 = aws_apigatewayv2_api.backend.id
  integration_type       = "AWS_PROXY"
  integration_uri        = aws_lambda_function.citizen_api.invoke_arn
  payload_format_version = "2.0"
  timeout_milliseconds   = 15000
}

resource "aws_apigatewayv2_route" "health" {
  api_id    = aws_apigatewayv2_api.backend.id
  route_key = "GET /health"
  target    = "integrations/${aws_apigatewayv2_integration.citizen_api.id}"
}

resource "aws_apigatewayv2_route" "citizen_profile" {
  api_id             = aws_apigatewayv2_api.backend.id
  route_key          = "GET /citizen/profile"
  target             = "integrations/${aws_apigatewayv2_integration.citizen_api.id}"
  authorization_type = "JWT"
  authorizer_id      = aws_apigatewayv2_authorizer.jwt.id
}

resource "aws_apigatewayv2_route" "citizen_dashboard" {
  api_id             = aws_apigatewayv2_api.backend.id
  route_key          = "GET /citizen/dashboard"
  target             = "integrations/${aws_apigatewayv2_integration.citizen_api.id}"
  authorization_type = "JWT"
  authorizer_id      = aws_apigatewayv2_authorizer.jwt.id
}

resource "aws_apigatewayv2_route" "programs_list" {
  api_id             = aws_apigatewayv2_api.backend.id
  route_key          = "GET /programs"
  target             = "integrations/${aws_apigatewayv2_integration.citizen_api.id}"
  authorization_type = "JWT"
  authorizer_id      = aws_apigatewayv2_authorizer.jwt.id
}

resource "aws_apigatewayv2_route" "programs_enroll" {
  api_id             = aws_apigatewayv2_api.backend.id
  route_key          = "POST /programs/{program_id}/enroll"
  target             = "integrations/${aws_apigatewayv2_integration.citizen_api.id}"
  authorization_type = "JWT"
  authorizer_id      = aws_apigatewayv2_authorizer.jwt.id
}

resource "aws_apigatewayv2_route" "activity" {
  api_id             = aws_apigatewayv2_api.backend.id
  route_key          = "GET /activity"
  target             = "integrations/${aws_apigatewayv2_integration.citizen_api.id}"
  authorization_type = "JWT"
  authorizer_id      = aws_apigatewayv2_authorizer.jwt.id
}

resource "aws_apigatewayv2_route" "interactions" {
  api_id             = aws_apigatewayv2_api.backend.id
  route_key          = "GET /interactions"
  target             = "integrations/${aws_apigatewayv2_integration.citizen_api.id}"
  authorization_type = "JWT"
  authorizer_id      = aws_apigatewayv2_authorizer.jwt.id
}

resource "aws_apigatewayv2_route" "feedback_submit" {
  api_id             = aws_apigatewayv2_api.backend.id
  route_key          = "POST /feedback"
  target             = "integrations/${aws_apigatewayv2_integration.citizen_api.id}"
  authorization_type = "JWT"
  authorizer_id      = aws_apigatewayv2_authorizer.jwt.id
}

resource "aws_apigatewayv2_route" "chat" {
  api_id    = aws_apigatewayv2_api.backend.id
  route_key = "POST /chat"
  target    = "integrations/${aws_apigatewayv2_integration.citizen_api.id}"
}

resource "aws_apigatewayv2_stage" "default" {
  api_id      = aws_apigatewayv2_api.backend.id
  name        = "$default"
  auto_deploy = true

  default_route_settings {
    detailed_metrics_enabled = true
    throttling_burst_limit   = 200
    throttling_rate_limit    = 100
  }

  tags = local.common_tags
}

resource "aws_lambda_permission" "api_gateway_invoke" {
  statement_id  = "AllowExecutionFromApiGateway"
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.citizen_api.function_name
  principal     = "apigateway.amazonaws.com"
  source_arn    = "${aws_apigatewayv2_api.backend.execution_arn}/*/*"
}
