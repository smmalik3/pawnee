variable "project_name" {
  description = "Project name used as a resource name prefix."
  type        = string
  default     = "pawnee-civic-engagement"
}

variable "environment" {
  description = "Deployment environment name."
  type        = string
  default     = "dev"
}

variable "aws_region" {
  description = "AWS region where backend resources are deployed."
  type        = string
  default     = "us-east-1"
}

variable "allowed_origins" {
  description = "Allowed CORS origins for API Gateway HTTP API."
  type        = list(string)
  default     = ["http://localhost:5173"]
}

variable "log_retention_days" {
  description = "CloudWatch log retention period for Lambda logs."
  type        = number
  default     = 14
}

variable "openai_model" {
  description = "OpenAI model name for chatbot generation."
  type        = string
  default     = "gpt-4o-mini"
}

variable "openai_api_key" {
  description = "OpenAI API key for chatbot requests."
  type        = string
  sensitive   = true
  default     = ""
}

variable "create_amplify_ssm_parameters" {
  description = "Whether to create SSM parameters under /amplify/<app_id>/<branch>/ for frontend environment variables."
  type        = bool
  default     = false
}

variable "amplify_app_id" {
  description = "Amplify app ID used in SSM parameter path, for example d2i5owuyjcuug3."
  type        = string
  default     = ""
}

variable "amplify_branch_name" {
  description = "Amplify branch name used in SSM parameter path."
  type        = string
  default     = "main"
}

variable "tags" {
  description = "Optional extra tags to apply to resources."
  type        = map(string)
  default     = {}
}
