project_name = "pawnee-civic-engagement"
environment  = "dev"
aws_region   = "us-east-1"

allowed_origins = [
  "http://localhost:5173",
  "https://main.d2i5owuyjcuug3.amplifyapp.com"
]

log_retention_days = 14
bedrock_model_id   = "amazon.nova-lite-v1:0"

# Optional: write frontend env vars to Amplify SSM path
create_amplify_ssm_parameters = false
amplify_app_id                = "d2i5owuyjcuug3"
amplify_branch_name           = "main"

tags = {
  Owner = "Pawnee-IT"
}
