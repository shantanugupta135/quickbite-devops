# QuickBite — Online Ordering System (Phase 1 & 2)

A college capstone MVP: Next.js frontend, Spring Boot REST API, MySQL, Git/GitHub workflow, and Jenkins CI.
This repository intentionally stops at Phase 2 (Git + Jenkins). Docker/Kubernetes/Terraform/etc. are future phases.

## Architecture

Browser (Next.js :3000) → Spring Boot REST API (:8080) → MySQL (:3306)
GitHub push → Jenkins → backend tests + frontend lint/build

## Prerequisites
- Git
- Node.js 20+
- Java 17+
- Maven 3.9+ (or use `./mvnw` after adding Maven Wrapper)
- MySQL 8+
- Optional: Docker Desktop

## 1. Configure MySQL
Create a database and user (or use your own local credentials):
```sql
CREATE DATABASE quickbite;
CREATE USER 'quickbite'@'localhost' IDENTIFIED BY 'quickbite123';
GRANT ALL PRIVILEGES ON quickbite.* TO 'quickbite'@'localhost';
FLUSH PRIVILEGES;
```
Update `backend/src/main/resources/application.properties` if your credentials differ.
Spring Boot creates the tables automatically for this demo and seeds sample products on first start.

## 2. Run backend
```bash
cd backend
mvn spring-boot:run
```
API: http://localhost:8080/api/products
Health: http://localhost:8080/actuator/health

## 3. Run frontend (new terminal)
```bash
cd frontend
npm install
# Windows PowerShell:
$env:NEXT_PUBLIC_API_URL="http://localhost:8080"
# macOS/Linux:
# export NEXT_PUBLIC_API_URL=http://localhost:8080
npm run dev
```
Open http://localhost:3000.

## Demo flow
1. Browse menu items.
2. Add products to the cart.
3. Submit an order with customer name and phone.
4. View recent orders in the “Orders” tab.
5. Create/edit/delete menu items using the menu management form.

## API summary
- `GET /api/products` — list products
- `GET /api/products/{id}` — product details
- `POST /api/products` — create product
- `PUT /api/products/{id}` — update product
- `DELETE /api/products/{id}` — delete product
- `POST /api/orders` — place order
- `GET /api/orders` — list orders

Example create product:
```json
{"name":"Paneer Wrap","description":"Spicy paneer wrap","price":149.0,"category":"Wraps","imageUrl":"","available":true}
```
Example place order:
```json
{"customerName":"Demo Student","phone":"9876543210","items":[{"productId":1,"quantity":2}]}
```

## Phase 1: Git/GitHub evidence
```bash
git init
git add .
git commit -m "feat: initial QuickBite online ordering MVP"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/quickbite-devops.git
git push -u origin main
git checkout -b feature/menu-ui
# make a small UI change
git add . && git commit -m "feat: improve menu UI"
git push -u origin feature/menu-ui
```
Open a Pull Request on GitHub and merge it into `main`. For a merge-conflict demo, change the same line in README on two branches, commit both, then merge one branch and resolve the conflict in the other. Do this only on a practice branch.

## Phase 2: Jenkins CI
1. Install Jenkins and ensure Java 17, Maven, Node.js 20 and npm are available to the Jenkins agent.
2. Install suggested plugins: Pipeline, Git, GitHub Integration (optional), NodeJS (optional), JUnit.
3. In Jenkins: **New Item → Pipeline**; select “Pipeline script from SCM”; SCM = Git; enter your repository URL; branch `*/main`; Script Path `Jenkinsfile`.
4. Add a GitHub webhook pointing to `http://YOUR_JENKINS_HOST:8080/github-webhook/` if your Jenkins is reachable by GitHub. For a local laptop, use a tunnel or demonstrate a manual build; GitHub cannot reach `localhost`.
5. In Jenkins job configuration, enable **GitHub hook trigger for GITScm polling** (if available). A push should trigger the job.
6. The Jenkinsfile runs backend Maven tests/package and frontend npm lint/build. Jenkins shows each stage and test results.

### Jenkins agent tools
The Jenkins agent needs Java 17, Maven 3.9+, Node.js 20+, and npm. If Jenkins runs in a container, these tools must exist inside the agent/container; installing them only on the host is not enough.

## Troubleshooting
- Backend cannot connect to MySQL: confirm MySQL is running, DB/user/password match properties, and port 3306 is available.
- Frontend says failed to fetch: start backend and check `NEXT_PUBLIC_API_URL`; CORS is configured for localhost:3000.
- Jenkins fails with `mvn: not found` / `npm: not found`: install those tools on the agent or use a properly configured Jenkins agent image.
- If GitHub cannot call your webhook, use Jenkins “Build Now” for tomorrow's demo and explain the webhook needs a publicly reachable Jenkins URL.
- Demo credentials are not needed in this MVP. Do not present the customer-name order form as production authentication; secure login/authorization is a later hardening task.

## Report checklist
Include screenshots of app menu, successful order, order list, Git commit/branch/PR, Jenkins successful stages, and test results. Do not claim a stage is complete unless you have run and captured it.
#test
