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

## Notes

- `/health` is public.
- Citizen endpoints require a valid Cognito JWT access token.
- Lambda code is located at `backend/functions/citizen_api/index.mjs`.
- This stack intentionally excludes Amplify resources per project direction.
