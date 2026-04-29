resource "aws_cognito_user_pool" "citizen_pool" {
  name = "${local.name_prefix}-citizens"

  auto_verified_attributes = ["email"]
  username_attributes      = ["email"]

  password_policy {
    minimum_length    = 10
    require_lowercase = true
    require_numbers   = true
    require_symbols   = false
    require_uppercase = true
  }

  schema {
    attribute_data_type = "String"
    name                = "resident_id"
    mutable             = true
    required            = false

    string_attribute_constraints {
      min_length = 4
      max_length = 32
    }
  }

  tags = local.common_tags
}

resource "aws_cognito_user_pool_client" "citizen_app_client" {
  name         = "${local.name_prefix}-app-client"
  user_pool_id = aws_cognito_user_pool.citizen_pool.id

  generate_secret = false

  explicit_auth_flows = [
    "ALLOW_USER_PASSWORD_AUTH",
    "ALLOW_USER_SRP_AUTH",
    "ALLOW_REFRESH_TOKEN_AUTH",
  ]

  prevent_user_existence_errors = "ENABLED"
  supported_identity_providers  = ["COGNITO"]

  access_token_validity  = 1
  id_token_validity      = 1
  refresh_token_validity = 30

  token_validity_units {
    access_token  = "hours"
    id_token      = "hours"
    refresh_token = "days"
  }
}

resource "random_string" "user_pool_domain_suffix" {
  length  = 8
  lower   = true
  upper   = false
  numeric = true
  special = false
}

resource "aws_cognito_user_pool_domain" "citizen_pool_domain" {
  domain       = "${replace(local.name_prefix, "_", "-")}-${random_string.user_pool_domain_suffix.result}"
  user_pool_id = aws_cognito_user_pool.citizen_pool.id
}
