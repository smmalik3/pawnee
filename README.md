# Pawnee Smart Civic Engagement Desk

AWS-native civic engagement platform for the town of Pawnee.

This project includes:

- A React citizen portal (Vite + TypeScript)
- A serverless backend (API Gateway + Lambda + DynamoDB + Cognito)
- A Bedrock-powered chatbot (Claude Sonnet 4.5)
- Terraform for backend infrastructure provisioning
- Amplify deployment support for the frontend

## Product Summary

The app helps citizens and local government teams by providing:

- Citizen loyalty points and tier progression
- Engagement timeline and activity visibility
- Community program discovery and enrollment
- Service feedback capture
- A floating chatbot assistant for Pawnee Q&A and Parks and Rec quotes

## Current Implementation Status

Implemented today:

- Citizen sign-in (demo mode in frontend)
- Dashboard, programs, activity, feedback, profile screens
- Floating chat assistant on all app pages
- Bedrock chat endpoint via backend Lambda
- Terraform backend stack and API routes

Important note:

- Most citizen app screens currently use frontend-local state and demo data.
- Chatbot is backend-driven through API Gateway + Lambda + Bedrock.
- Additional API wiring can be added for full backend-driven citizen flows.

## Architecture

High-level architecture:

1. Frontend: React app hosted on Amplify
2. Auth: Amazon Cognito user pool + app client
3. API: API Gateway HTTP API
4. Compute: Node.js Lambda (`backend/functions/citizen_api`)
5. Data: DynamoDB tables for citizens, programs, events, enrollments, feedback, interactions
6. AI: Amazon Bedrock model invocation for chatbot responses

Visual architecture reference:

- `docs/architecture-diagram-smart-civic-engagement-desk.md`

## Repository Structure

```text
app/                    React frontend
backend/functions/      Lambda handlers
infra/terraform/        Terraform backend IaC
docs/                   PRD, stories, wireframes, decks, diagrams
amplify.yml             Amplify build spec (monorepo app root)
```

## Prerequisites

- Node.js 20+
- npm 10+
- Terraform 1.6+
- AWS account with access to Cognito, API Gateway, Lambda, DynamoDB, IAM, CloudWatch, Bedrock

## Local Frontend Setup

```bash
cd app
npm install
npm run dev
```

Build locally:

```bash
npm run build
```

## Backend Deployment with Terraform

```bash
cd infra/terraform
cp terraform.tfvars.example terraform.tfvars
terraform init
terraform plan
terraform apply
```

Key outputs:

```bash
terraform output api_base_url
terraform output cognito_user_pool_id
terraform output cognito_user_pool_client_id
terraform output amplify_ssm_parameter_names
```

Detailed backend docs:

- `infra/terraform/README.md`

## Frontend Environment Variables

Set these for the frontend deployment (Amplify env vars or SSM path integration):

- `VITE_AWS_REGION`
- `VITE_API_BASE_URL`
- `VITE_COGNITO_USER_POOL_ID`
- `VITE_COGNITO_CLIENT_ID`

## Amplify Deployment

This repository uses a monorepo-aware build file:

- `amplify.yml`

Do not use `cd app && ...` in Amplify build commands when using this config.

If using direct URL routes in SPA (for example `/dashboard`), ensure Amplify rewrite rules route unknown paths to `index.html`.

## Chatbot (Bedrock)

The chatbot is available in-app as a floating button at bottom right.

- Frontend route call: `POST /chat`
- Backend handler: `backend/functions/citizen_api/index.mjs`
- Terraform API route: `POST /chat` in `infra/terraform/api.tf`
- IAM permissions include Bedrock invoke actions in `infra/terraform/iam.tf`

Default Bedrock model:

- `anthropic.claude-sonnet-4-5-20250929-v1:0`

Model is configurable via Terraform variable:

- `bedrock_model_id`

## API Endpoints

Public:

- `GET /health`
- `POST /chat`

JWT-protected:

- `GET /citizen/profile`
- `GET /citizen/dashboard`
- `GET /programs`
- `POST /programs/{program_id}/enroll`
- `GET /activity`
- `GET /interactions`
- `POST /feedback`

## Troubleshooting

### CORS error calling `/chat`

Ensure Terraform `allowed_origins` includes your Amplify domain, for example:

```hcl
allowed_origins = [
  "http://localhost:5173",
  "https://main.d2i5owuyjcuug3.amplifyapp.com"
]
```

Then run `terraform apply`.

### Amplify build error: `cd: app: No such file or directory`

Use the repository `amplify.yml` and remove manual build overrides that run `cd app`.

### SSM secrets warning in Amplify logs

If Amplify reads `/amplify/<app-id>/<branch>/...`, either:

- Configure Amplify environment vars directly, or
- Enable Terraform SSM parameter creation:

```hcl
create_amplify_ssm_parameters = true
amplify_app_id                = "<your-app-id>"
amplify_branch_name           = "main"
```

Also ensure Amplify service role can read SSM parameters.

## Documentation Artifacts

- PRD: `docs/prd-smart-civic-engagement-desk.md`
- User stories (formatted): `docs/user-stories-formatted-smart-civic-engagement-desk.md`
- UI wireframes: `docs/ui-wireframes-smart-civic-engagement-desk.md`
- Process flows: `docs/process-flows-smart-civic-engagement-desk.md`
- Architecture diagrams: `docs/architecture-diagram-smart-civic-engagement-desk.md`
- Business deck: `docs/pawnee-business-case-deck.md`

## License / Usage

Internal project for Pawnee civic engagement solution design and implementation.
