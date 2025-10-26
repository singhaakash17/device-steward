# 🌐 NRE Device Dashboard – Full Stack Application

This repository contains a *full-stack web application* built with:
- *Frontend:* React (Vite)
- *Backend:* Django (Python)
- *Purpose:* Display and manage mock network devices (Router, Switch, Firewall) and their Up/Down status.

---

## 🧭 Project Overview

| Layer | Stack             | Description                                     |
|--------|-------------------|-------------------------------------------------|
| Frontend | React (Vite)      | UI to view device list and filter by status     |
| Backend | Django            | REST API serving device data                    |
| Communication | HTTP (proxy /api) | Frontend calls /api/devices → proxied to Django |
| Styling | Bootstrap 5       | Clean, responsive dashboard UI                  |

---

## ✅ Quick Combined Setup Summary
git clone https://github.com/singhaakash17/NRE_device_dashboard-main.git
cd NRE_device_dashboard

| Step | Command                                               | Description                                                    |
| ---- | ----------------------------------------------------- | -------------------------------------------------------------- |
| 1    | `cd backend && python -m venv venv`                   | Create a virtual environment for Django backend                |
| 2    | `source venv/bin/activate` <br> *(Windows: `venv\Scripts\activate`)* | Activate the virtual environment                               |
| 3    | `pip install -r requirements.txt`                     | Install backend dependencies                                   |
| 4    | `python manage.py runserver 127.0.0.1:8000`           | Run Django backend                                             |
| 5    | `cd ./frontend/ && npm install`                       | Install frontend dependencies                                  |
| 6    | `npm run dev`                                         | Start React frontend (Vite dev server)                         |
| 7    | Visit [http://localhost:5173](http://localhost:5173)  | Access the full-stack app — React frontend + Django backend 🎉 |

---