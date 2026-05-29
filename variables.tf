variable "db_password" {
  type        = string
  description = "Password for the PostgreSQL database"
  sensitive   = true
}

variable "backend_replicas" {
  type        = number
  description = "Number of replicas for the backend deployment"
  default     = 1
}

variable "frontend_replicas" {
  type        = number
  description = "Number of replicas for the frontend deployment"
  default     = 1
}