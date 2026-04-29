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

variable "tags" {
  description = "Optional extra tags to apply to resources."
  type        = map(string)
  default     = {}
}
