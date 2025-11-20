# backend_adopme# AdoptMe API 🐶🐱

Proyecto final dockerizado con documentación Swagger, tests funcionales y repositorios DAO.

---

## 🚀 Tecnologías
- Node.js
- Express
- MongoDB + Mongoose
- Docker
- Swagger
- Mocha + Chai + Supertest
- Repository Pattern

---

## ⚙️ Instalación

1. Clonar el repositorio:
   ```bash
   git clone <URL-del-repo>
   cd backend_adopme

npm install
 


## El servidor corre en:

1. (http://localhost:3000)

2. npm test

## Endpoints principales

Users
- GET /api/users

- GET /api/users/:uid

- POST /api/users

- PUT /api/users/:uid

- DELETE /api/users/:uid


Pets
- GET /api/pets

- POST /api/pets

- POST /api/pets/withimage

- PUT /api/pets/:pid

- DELETE /api/pets/:pid


Adoptions
- GET /api/adoptions

- GET /api/adoptions/:aid

- POST /api/adoptions/:uid/:pid

- DELETE /api/adoptions/:aid


---


## Servicios
- Backend → http://localhost:3000

- Swagger → http://localhost:3000/api-docs

- MongoDB → mongodb://admin:admin123@localhost:27017/adoptme?authSource=admin