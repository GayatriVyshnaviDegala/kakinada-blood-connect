# Kakinada Blood Link — Spring Boot + MySQL Backend

A fully functional REST backend for the Kakinada Blood Donor Management System.
All donor registrations, blood requests, hospital details and user logins are
persisted in MySQL — no dummy or in-memory data.

## Stack
- Java 17
- Spring Boot 3.3
- Spring Web, Spring Data JPA, Spring Security (BCrypt), Validation
- MySQL 8
- Maven

## Setup

1. Install MySQL 8 and Java 17+.
2. Create the database and load schema + seed data:

   ```bash
   mysql -u root -p < sql/01_schema.sql
   mysql -u root -p < sql/02_seed.sql
   ```

3. Configure DB credentials in `src/main/resources/application.properties`
   (or via env vars `DB_URL`, `DB_USER`, `DB_PASS`).

4. Build and run:

   ```bash
   cd backend
   mvn spring-boot:run
   ```

   API runs at `http://localhost:8081/api`.

## REST API (base path `/api`)

### Donors
- `POST   /donors/register`            — register a new donor
- `POST   /donors/login`               — donor login (email + password)
- `GET    /donors`                     — list all donors
- `GET    /donors/{id}`                — get donor by id
- `GET    /donors/search?bloodGroup=&area=&availableOnly=` — filter
- `PUT    /donors/{id}`                — update donor
- `PUT    /donors/{id}/availability`   — toggle availability
- `DELETE /donors/{id}`                — delete donor

### Recipients
- `POST   /recipients/register`
- `POST   /recipients/login`
- `GET    /recipients`
- `GET    /recipients/{id}`
- `PUT    /recipients/{id}`
- `DELETE /recipients/{id}`

### Blood Requests (Emergency)
- `POST   /requests`                   — raise a request
- `GET    /requests`                   — list all active requests
- `GET    /requests/{id}`
- `PUT    /requests/{id}/status`       — update status (OPEN/FULFILLED/CLOSED)
- `DELETE /requests/{id}`

### Hospitals
- `POST   /hospitals`
- `GET    /hospitals`
- `GET    /hospitals/{id}`
- `PUT    /hospitals/{id}`
- `DELETE /hospitals/{id}`
- `PUT    /hospitals/{id}/stock`       — update blood stock

### Admin / Dashboard
- `GET /admin/stats`                   — totals, availability, group distribution
- `POST /admin/login`                  — admin login

## CORS
CORS is open to `http://localhost:5173` and the Lovable preview by default;
adjust `WebConfig` for production.
