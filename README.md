# SerCloud | Secure File Management System

SerCloud is a premium, secure file management and collaboration platform designed for enterprises. It features a robust setup wizard, role-based access control, and a modern, high-performance UI.

![SerCloud Setup](sercloud_setup_screenshot.png)

## Features

- **Setup Wizard**: Easy 3-step installation process to configure your specific environment.
- **Secure Authentication**: Role-based access control (Admin/User).
- **Admin Dashboard**: Comprehensive management of users, storage limits, and system settings.
- **Modern UI**: Built with Next.js, Tailwind CSS, and Framer Motion for a premium user experience.
- **Docker Ready**: Easy deployment using Docker and Docker Compose.

## 🚀 Quick Start with Docker

The easiest way to get SerCloud running is using Docker.

### Prerequisites

- Docker and Docker Compose installed on your machine.

### Installation

1.  **Clone the repository**:
    ```bash
    git clone https://github.com/YOUR_ORG/ser-cloud.git
    cd ser-cloud
    ```

2.  **Start the application**:
    ```bash
    docker-compose up -d --build
    ```

3.  **Access the Setup Wizard**:
    Open your browser and navigate to `http://localhost:3000/setup`.

4.  **Complete Installation**:
    Follow the on-screen wizard to create your Admin account and configure your organization details.

## 🛠 Manual Installation

If you prefer to run the application without Docker:

1.  **Install Dependencies**:
    ```bash
    npm install
    ```

2.  **Run Development Server**:
    ```bash
    npm run dev
    ```

3.  **Build for Production**:
    ```bash
    npm run build
    npm start
    ```

## Project Structure

- `/app`: Next.js App Router pages and layouts.
- `/components`: Reusable UI components.
- `/lib`: Core logic, authentication, and user management.
- `/public`: Static assets.

## License

This project is licensed under the MIT License.
