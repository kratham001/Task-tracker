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

## 🚀 Getting Started Locally

Follow these steps to get a copy of the project running on your local machine.

### 1. Clone the Repository
```bash
git clone [https://github.com/your-username/task-tracker.git](https://github.com/your-username/task-tracker.git)
cd task-tracker
