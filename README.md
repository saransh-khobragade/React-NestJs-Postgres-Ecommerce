# 🛍️ Full-Stack E-Commerce Platform

A modern, full-stack e-commerce application built with **React** (frontend), **NestJS** (backend), and **PostgreSQL** (database). Features real-time chat, social features, and comprehensive e-commerce functionality.

## ✨ Features

### 🛒 E-Commerce
- **Product Management**: Browse, search, and manage products
- **Shopping Cart**: Add/remove items, quantity management
- **Order Processing**: Complete checkout flow with order confirmation
- **User Profiles**: Personal account management

### 💬 Social & Communication
- **Real-time Chat**: WebSocket-based messaging system
- **Social Feed**: Post sharing and interaction
- **Blog System**: Content creation and management
- **Like System**: Social interactions on posts

### 🔐 Authentication & Security
- **JWT Authentication**: Secure user sessions
- **User Registration/Login**: Complete auth flow
- **Role-based Access**: User permissions management

### 📊 Monitoring & Observability
- **Metrics Collection**: Performance monitoring
- **OpenTelemetry Integration**: Distributed tracing
- **Health Checks**: System status monitoring

## 🏗️ Tech Stack

### Frontend
- **React 19** with TypeScript
- **Vite** for fast development
- **Tailwind CSS** for styling
- **Radix UI** components
- **Socket.io Client** for real-time features
- **React Hook Form** with Zod validation

### Backend
- **NestJS** framework
- **TypeORM** for database operations
- **PostgreSQL** database
- **JWT** authentication
- **Socket.io** for real-time communication
- **OpenTelemetry** for observability
- **Swagger** API documentation

### Infrastructure
- **Docker** containerization
- **Docker Compose** for orchestration
- **pgAdmin** for database management

## 🚀 Quick Start

### Prerequisites
- Docker and Docker Compose
- Node.js 18+ (for local development)
- Yarn package manager

### Using Docker (Recommended)

```bash
# Clone the repository
git clone <repository-url>
cd React-NestJs-Postgres-EcommerceApp

# Build and start all services
./scripts/build.sh all

# Or start specific services
./scripts/build.sh frontend backend postgres pgadmin
```

### Access Points
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:8080
- **API Documentation**: http://localhost:8080/api
- **pgAdmin**: http://localhost:5050 (admin@admin.com / admin)

## 🔄 Development Workflow

### Rebuild Services

```bash
# Soft rebuild (for config/env changes)
./scripts/rebuild.sh <service|all> soft

# Hard rebuild (for code/Dockerfile changes)
./scripts/rebuild.sh <service|all> hard
```

**Examples:**
```bash
# After backend code changes
./scripts/rebuild.sh backend hard

# After frontend environment changes
./scripts/rebuild.sh frontend soft
```

**Supported services**: `frontend`, `backend`, `postgres`, `pgadmin`. Use `all` for everything.

## 🧑‍💻 Local Development

### Frontend Development
```bash
cd frontend
yarn install
yarn dev   # http://localhost:3000
```

### Backend Development
```bash
cd backend
yarn install
yarn start:dev   # http://localhost:8080
```

## 📁 Project Structure

```
├── frontend/                 # React application
│   ├── src/
│   │   ├── components/      # Reusable UI components
│   │   ├── pages/          # Page components
│   │   ├── services/       # API service layer
│   │   └── contexts/       # React contexts
│   └── public/             # Static assets
├── backend/                 # NestJS application
│   ├── src/
│   │   ├── auth/           # Authentication module
│   │   ├── users/          # User management
│   │   ├── products/       # Product management
│   │   ├── cart/           # Shopping cart
│   │   ├── orders/         # Order processing
│   │   ├── posts/          # Social posts
│   │   ├── blogs/          # Blog system
│   │   ├── chat/           # Real-time chat
│   │   ├── metrics/        # Monitoring
│   │   └── tracing/        # OpenTelemetry
│   └── uploads/            # File uploads
├── database/               # Database initialization
└── scripts/               # Build and utility scripts
```

## 🔧 Useful Commands

```bash
# View service logs
docker compose logs -f backend
docker compose logs -f frontend

# Run API tests
./scripts/test-api.sh.sh

# Health check
curl -s http://localhost:8080/api | jq .

# Stop all services
docker compose down

# Clean up volumes
docker compose down -v
```

## 🗄️ Database

### Connection Details
- **Host**: `postgres` (Docker) or `localhost` (local)
- **Port**: `5432`
- **Database**: `test_db`
- **Username**: `postgres`
- **Password**: `password`

### Management
- **pgAdmin**: http://localhost:5050
  - Email: `admin@admin.com`
  - Password: `admin`

## 🔐 Environment Variables

### Backend (.env)
```env
NODE_ENV=development
DATABASE_HOST=postgres
DATABASE_PORT=5432
DATABASE_NAME=test_db
DATABASE_USER=postgres
DATABASE_PASSWORD=password
JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN=1d
```

### Frontend (.env)
```env
VITE_API_URL=http://localhost:8080
FRONTEND_PORT=3000
```

## 📚 API Documentation

Once the backend is running, visit http://localhost:8080/api for interactive API documentation powered by Swagger.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For issues and questions:
1. Check the existing issues
2. Create a new issue with detailed information
3. Include logs and error messages

---

**Happy coding! 🚀**