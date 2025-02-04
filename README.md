### 🚀 Microservices with Deno & Hexagonal Architecture  

## 📌 Introduction  
This project implements a **modular, independent, and scalable microservices architecture** based on **Hexagonal Architecture (Ports & Adapters)**. The goal is to separate **business logic** from infrastructure dependencies, making the system more flexible, testable, and maintainable.  

## 🛠️ Technologies Used  
✅ **Deno** – A fast, secure runtime for JavaScript and TypeScript  
✅ **Oak** – A web framework for Deno, similar to Express.js  
✅ **Deno KV** or **MySQL** – For data storage  
✅ **RabbitMQ** or **NATS** – For inter-service communication  
✅ **Deno Deploy** or **Docker** – For deployment  

## 🏗️ Project Architecture  
This project follows **Hexagonal Architecture**, which includes:  
1. **Core (Business Logic)** – Contains the core domain logic without dependencies on frameworks or databases  
2. **Ports** – Interfaces for interacting with external services  
3. **Adapters** – Implementations of ports that connect to databases and messaging systems  

## 📂 Folder Structure  
```
📦 src  
 ┣ 📂 core         # Business logic and domain models  
 ┣ 📂 ports        # Input and output interfaces  
 ┣ 📂 adapters     # Adapters for database and external services  
 ┣ 📂 services     # Independent microservices  
 ┣ 📂 infra        # Infrastructure settings like messaging and database  
 ┣ 📂 api          # API controllers for service communication  
 ┗ 📜 main.ts      # Application entry point  
```

## ⚙️ Installation & Running  
### 1️⃣ Install **Deno**  
[Install Deno](https://deno.land/) and verify the installation:  
```sh
deno --version
```

### 2️⃣ Run the Project  
```sh
deno run -A src/main.ts
```

### 3️⃣ Run with Docker  
```sh
docker build -t my-microservice .
docker run -p 3000:3000 my-microservice
```

## 📡 Inter-Service Communication  
Microservices communicate via **RabbitMQ** or **NATS**. To run **RabbitMQ** with Docker:  
```sh
docker run -d --name rabbitmq -p 5672:5672 -p 15672:15672 rabbitmq:management
```

## 🚀 Deployment  
To deploy on **Deno Deploy**:  
```sh
deno deploy
```

Or using **Docker Compose**:  
```yaml
version: '3'
services:
  app:
    build: .
    ports:
      - "3000:3000"
    depends_on:
      - database
  database:
    image: mysql
    environment:
      MYSQL_ROOT_PASSWORD: root
      MYSQL_DATABASE: mydb
```
Run with:  
```sh
docker-compose up -d
```

## 📖 Conclusion  
This project demonstrates a **modern and scalable microservices architecture** using **Deno** and **Hexagonal Architecture**. The design ensures **independent services, high testability, easy scalability, and flexible deployment**. 🚀
