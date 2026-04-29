locals {
  name_prefix = "${var.project_name}-${var.environment}"

  amplify_ssm_enabled = var.create_amplify_ssm_parameters && trim(var.amplify_app_id) != ""

  amplify_ssm_base_path = local.amplify_ssm_enabled ? "/amplify/${var.amplify_app_id}/${var.amplify_branch_name}" : ""

  amplify_env_values = local.amplify_ssm_enabled ? {
    VITE_AWS_REGION            = var.aws_region
    VITE_API_BASE_URL          = aws_apigatewayv2_stage.default.invoke_url
    VITE_COGNITO_USER_POOL_ID  = aws_cognito_user_pool.citizen_pool.id
    VITE_COGNITO_CLIENT_ID     = aws_cognito_user_pool_client.citizen_app_client.id
  } : {}

  common_tags = merge(
    {
      Project     = var.project_name
      Environment = var.environment
      ManagedBy   = "terraform"
    },
    var.tags,
  )
}
