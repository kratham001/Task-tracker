# 📝 Task Tracker

A full-stack **MERN** application designed to keep your daily tasks organized, prioritized, and on track. This isn't just a todo list; it's a workspace to visualize your workload by **Status** or **Priority**, giving you clarity at a glance.

**[👉 View Live Demo (Frontend)](https://task-tracker-two-hazel.vercel.app/)** *(Backend hosted on Render)*

---

## ✨ Features

* **Create & Manage:** Easily add tasks with titles, descriptions, due dates, and priority levels.
* **Smart Validation:** The "Add Task" button stays disabled until you fill in the required fields, preventing clutter.
* **Dynamic Stacking:**
    * **Stack by Date:** See what's coming up next.
    * **Stack by Status:** Separate "Pending" from "Completed".
    * **Stack by Priority:** Focus on "High" priority items first.
* **Instant Feedback:** Smooth toast notifications (via `react-toastify`) let you know when actions succeed or fail.
* **Responsive Design:** Built with **Tailwind CSS**, so it looks great on your laptop or phone.

---

## 🛠️ Tech Stack

This project uses the **MERN** stack architecture:

* **Frontend:** React.js, Tailwind CSS, React Toastify
* **Backend:** Node.js, Express.js
* **Database:** MongoDB Atlas (Mongoose)
* **Deployment:** Vercel (Client) + Render (Server)

---
## 🌍 Deployment Guide

This project is set up as a **Monorepo** (containing both `client` and `server` folders), but it is deployed as two separate services.

### Part 1: Backend Deployment (Render)
Hosted on [Render.com](https://render.com) as a Web Service.

1.  **Connect Repo:** Link your GitHub repository.
2.  **Service Type:** Select "Web Service".
3.  **Settings:**
    * **Root Directory:** `server` (Critical step!)
    * **Runtime:** `Node`
    * **Build Command:** `npm install`
    * **Start Command:** `node server.js`
4.  **Environment Variables:**
    * Add `MONGO_URI` (Your MongoDB Atlas connection string).

### Part 2: Frontend Deployment (Vercel)
Hosted on [Vercel.com](https://vercel.com).

1.  **Connect Repo:** Import your GitHub repository.
2.  **Framework Preset:** Select "Create React App".
3.  **Root Directory:**
    * Click "Edit" and select the `client` folder.
4.  **Environment Variables:**
    * Add `REACT_APP_API_URL`.
    * **Value:** The URL provided by Render + `/api/tasks` (e.g., `https://my-api.onrender.com/api/tasks`).
5.  **Deploy:** Click "Deploy".

---

**Built by Kartikay Azad**
