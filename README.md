# ISC System Web

## Prerequisites

- **Node.js 20.x.x**: You can download it from the [Node.js Official Website](https://nodejs.org/).
- **Docker**: You can download it from the [Docker Official Website](https://www.docker.com/).

---

## 📦 How to Run the Project

### 1. Clone the repository

Open **Git Bash** and run:

```bash
git clone https://github.com/PaulLandaeta/isc-system-web.git
cd isc-system-web
```

### 2. Run the project in development

Inside the project directory, run:

```bash
./start-dev.sh
```

This script will start the development server, usually accessible at `http://localhost:5173`.

> If you get a permission error, run:
>
> ```bash
> chmod +x start-dev.sh
> ```

---

## 🐳 Running with Docker

If you prefer not to install anything and want to use containers, you can also run this project using **Docker**.

### Step 1: Build the Docker image

```bash
docker build -t react-app .
```

### Step 2: Run the container

```bash
docker run -p 80:80 react-app
```

The app will be available for production at `http://localhost`.
