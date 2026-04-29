# Terraform Backend: Pawnee Smart Civic Engagement Desk

This Terraform stack provisions the entire AWS backend for the citizen app, excluding Amplify hosting.

## What It Creates

- Cognito User Pool + App Client + Hosted Domain
- API Gateway HTTP API with JWT authorization
- Lambda API service (Node.js)
- DynamoDB domain tables:
  - citizens
  - programs
  - engagement-events
  - enrollments
  - feedback
  - interactions
- Seeded program records for initial recommendations
- CloudWatch logs + IAM roles/policies

## Prerequisites

- Terraform >= 1.6
- AWS credentials configured for your target account
- Permissions to create Cognito, Lambda, API Gateway, DynamoDB, IAM, and CloudWatch resources

## Deploy

```bash
cd infra/terraform
cp terraform.tfvars.example terraform.tfvars
terraform init
terraform plan
terraform apply
```

## Useful Outputs

```bash
terraform output api_base_url
terraform output cognito_user_pool_id
terraform output cognito_user_pool_client_id
```

## Frontend Integration (Amplify App)

Use these environment values in your frontend app:

- `VITE_AWS_REGION`
- `VITE_API_BASE_URL` from `api_base_url`
- `VITE_COGNITO_USER_POOL_ID` from `cognito_user_pool_id`
- `VITE_COGNITO_CLIENT_ID` from `cognito_user_pool_client_id`

### Optional: Manage Amplify Environment Variables via Terraform + SSM

If your Amplify logs show warnings around `process.env.secrets` and SSM path retrieval, you can have Terraform write the expected values to the same path Amplify checks.

1. Set these in `terraform.tfvars`:

```hcl
create_amplify_ssm_parameters = true
amplify_app_id                = "<your-amplify-app-id>"
amplify_branch_name           = "main"
```

2. Apply Terraform.
3. Confirm parameters exist under:
  - `/amplify/<app-id>/<branch>/VITE_AWS_REGION`
  - `/amplify/<app-id>/<branch>/VITE_API_BASE_URL`
  - `/amplify/<app-id>/<branch>/VITE_COGNITO_USER_POOL_ID`
  - `/amplify/<app-id>/<branch>/VITE_COGNITO_CLIENT_ID`

Notes:
- These are created as SSM `String` parameters.
- Amplify service role must have SSM read permissions (`ssm:GetParametersByPath`, `ssm:GetParameter`) for this path.
- If your Amplify app uses a custom service role with restricted policies, grant SSM read access explicitly.

## Notes

- `/health` is public.
- Citizen endpoints require a valid Cognito JWT access token.
- Lambda code is located at `backend/functions/citizen_api/index.mjs`.
- This stack intentionally excludes Amplify resources per project direction.
