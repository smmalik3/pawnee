output "api_base_url" {
  description = "HTTP API base URL for the citizen backend."
  value       = aws_apigatewayv2_stage.default.invoke_url
}

output "cognito_user_pool_id" {
  description = "Cognito user pool ID for citizen authentication."
  value       = aws_cognito_user_pool.citizen_pool.id
}

output "cognito_user_pool_client_id" {
  description = "Cognito app client ID used for frontend authentication."
  value       = aws_cognito_user_pool_client.citizen_app_client.id
}

output "cognito_domain" {
  description = "Cognito hosted UI domain prefix."
  value       = aws_cognito_user_pool_domain.citizen_pool_domain.domain
}

output "backend_tables" {
  description = "DynamoDB table names created for backend domain data."
  value = {
    citizens          = aws_dynamodb_table.citizens.name
    programs          = aws_dynamodb_table.programs.name
    engagement_events = aws_dynamodb_table.engagement_events.name
    enrollments       = aws_dynamodb_table.enrollments.name
    feedback          = aws_dynamodb_table.feedback.name
    interactions      = aws_dynamodb_table.interactions.name
  }
}
