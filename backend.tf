resource "kubernetes_deployment" "backend" {
  metadata {
    name      = "todo-backend"
    namespace = kubernetes_namespace.todo.metadata[0].name
  }

  spec {
    replicas = var.backend_replicas

    selector {
      match_labels = {
        app = "backend"
      }
    }

    template {
      metadata {
        labels = {
          app = "backend"
        }
      }

      spec {
        container {
          name              = "todo-backend"
          image             = "todo-backend"
          image_pull_policy = "Never"

          env {
            name = "DB_PASSWORD"
            value_from {
              secret_key_ref {
                name = kubernetes_secret.postgres_secret.metadata[0].name
                key  = "POSTGRES_PASSWORD"
              }
            }
          }

          env {
            name  = "DATABASE_URL"
            value = "postgresql://user:$(DB_PASSWORD)@postgres-service:5432/todo_db"
          }

          port {
            container_port = 8080
          }
        }
      }
    }
  }
}

resource "kubernetes_service" "backend" {
  metadata {
    name      = "backend-service"
    namespace = kubernetes_namespace.todo.metadata[0].name
  }

  spec {
    selector = {
      app = "backend"
    }

    port {
      port        = 8080
      target_port = 8080
    }

    type = "ClusterIP"
  }
}