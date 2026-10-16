# 10-minute college demonstration script

## 0:00–1:00 — Problem and architecture
“QuickBite is a full-stack online food ordering MVP. Next.js provides the responsive UI, Spring Boot exposes REST APIs, and MySQL persists menu items and orders. For this submission I am demonstrating Phase 1 (Git) and Phase 2 (Jenkins CI).”

## 1:00–4:00 — Live application
1. Open the frontend.
2. Show menu items loaded from the backend/database.
3. Add two items, change quantity, place an order.
4. Open My orders and show saved order/total.
5. Open Manage menu; create or edit a menu item, then delete it if safe to do so.
6. Mention the API endpoint `/api/products` and health endpoint `/actuator/health`.

## 4:00–6:00 — Git
1. Show repository tree and commit history.
2. Show `main` and a feature branch.
3. Show a Pull Request and merged commit (if completed).
4. Explain a merge-conflict exercise you actually performed; show the resolution commit.

## 6:00–9:00 — Jenkins CI
1. Open Jenkins job and show the pipeline stages.
2. Trigger Build Now or push a harmless README change.
3. Show backend test/package, frontend install/lint/build.
4. Show JUnit results and a green build if it passed.
5. Explain webhook trigger configuration and why a local-only Jenkins instance needs a tunnel for GitHub webhook delivery.

## 9:00–10:00 — Scope and next phases
“Next I will add Docker image publishing, Kubernetes deployment and rollout/rollback, Ansible, Terraform, Prometheus/Grafana, centralized logs, security scans, and GitOps using Argo CD.”

Only describe results you have actually run. If a stage fails, show the failure and explain the fix rather than claiming it passed.
