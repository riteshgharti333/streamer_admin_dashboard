# 🎬 Streamer - Full-Stack Movie Streaming Platform

**Streamer** is a modern, production-grade movie streaming platform built using the **MERN stack**, **Redux Toolkit**, **Firebase**, and **Material UI (MUI)** — engineered to manage over 1,000+ dynamic content entries with real-time updates, secure subscription billing, and full role-based admin control.

> 📁 This is the **[Frontend / Backend / Admin]** repository.  
> The project is split into three separate codebases for clear separation of concerns.

---

## 📌 Overview

Streamer provides an intuitive Netflix-style experience for users while offering a powerful admin dashboard to manage media content, users, subscriptions, and analytics. With Stripe-based billing, Firebase CDN integration, Chart.js analytics, and responsive Material UI design, it’s tailored for performance, security, and scalability.

---

## ⚙️ Tech Stack

- **Frontend**: React.js, Redux Toolkit, MUI (Material UI), Firebase Auth, Firebase Storage
- **Backend**: Node.js, Express.js, MongoDB, Mongoose, Stripe API, JWT Auth
- **Admin Panel**: React.js + MUI + Redux Toolkit + RBAC logic
- **Utilities**: Chart.js, Cloudinary/Firebase CDN, Skeleton Loaders, Lazy Loading
- **Deployment**: CI/CD with Vercel (frontend/admin) & Render (backend)

---

## ✨ Key Features

- 🎞️ **Movie & Media Management**  
  Admins can create, update, delete, and categorize 1,000+ dynamic movie entries — with real-time syncing.

- 👮‍♂️ **Role-Based Access Control (RBAC)**  
  Admin-only panels, restricted actions, and secure routing ensure that only authorized roles can access sensitive operations.

- 💳 **Stripe Subscription Billing**  
  Integrated with tier-based access, automated billing cycles, secure payments, and role toggling on payment success.

- 📊 **Real-Time Analytics**  
  Admin dashboard includes Chart.js-powered insights like revenue, content views, engagement stats, and user growth.

- 🔐 **JWT + Firebase Auth**  
  Full auth flow: Signup, Login, Forgot Password, Profile Updates — all secured with token-based authentication and Firebase sessions.

- 🚀 **Global State Management**  
  Redux Toolkit handles everything from auth to UI, including modals, themes, toasts, session status, and CRUD state.

- 🔍 **Advanced Search & Filters**  
  Filter movies by genre, category, tags, or search keywords with instant client-side filtering logic.

- ☁️ **Firebase Media Storage**  
  Upload and stream videos or images securely using Firebase CDN with real-time updates and dynamic preview links.

- 🦴 **Skeleton Loaders + Lazy Loading**  
  Improve perceived performance and reduce initial load by 30% with advanced MUI skeletons and component-level lazy imports.

- 📱 **Responsive & Premium UI**  
  Built with MUI v5 and mobile-first design principles, both frontend and admin offer seamless experience on any device.

- 🛠 **CI/CD + Zero Downtime Deployments**  
  Automated deployment with Vercel (frontend/admin) & Render (backend) ensures stable, fast production workflows.

---

## 🔗 Live Projects

| Module       | Link                                |
|--------------|-------------------------------------|
| Frontend     | [Visit Frontend](https://streamer-frontend.vercel.app) |
| Admin Panel  | [Visit Admin Panel](https://streamer-admin-dashboard.vercel.app) |

---

## 📁 Repository Links

| Repo        | Description                        |
|-------------|------------------------------------|
| [Frontend](https://github.com/riteshgharti333/streamer_frontend) | User movie browsing and streaming interface |
| [Backend](https://github.com/riteshgharti333/streamer_backend)     | Auth, API, billing logic, media control     |
| [Admin](https://github.com/riteshgharti333/streamer_admin_dashboard)     | Admin dashboard with full RBAC, analytics   |

---

## 👨‍💻 Author

**Ritesh Gharti**  
Full-Stack Developer | MERN   
[LinkedIn](https://www.linkedin.com/in/riteshgharti333) | [GitHub](https://github.com/riteshgharti333)


