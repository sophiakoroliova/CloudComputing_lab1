output "frontend_node_port" {
  value       = kubernetes_service.frontend.spec[0].port[0].node_port
  description = "The NodePort of the frontend service"
}
