# 🎓 EduCore – Learning Management System

## 📌 Project Overview
EduCore is a full-stack Learning Management System (LMS) inspired by platforms like Udemy and Coursera. It enables instructors to create and manage courses, while students can browse, enroll, and track their learning progress through an interactive dashboard.

This project is built as a capstone project to demonstrate full-stack development skills, including frontend, backend, database design, and system architecture.

## 👨‍💻 Developer Track
**Full Stack Developer Intern**

## 🛠️ Tech Stack

### Frontend
- React (Vite)
- Tailwind CSS

### Backend
- Node.js
- Express.js

### Database
- MongoDB (Mongoose)

### Authentication
- JSON Web Tokens (JWT)

### Other Tools
- Cloudinary (for video/image upload)
- Axios (API requests)

## 🎯 Core Features

### 👨‍🎓 Student Features
- User Registration & Login
- Browse available courses
- Enroll in courses
- Watch video lessons
- Track course progress

### 👨‍🏫 Instructor Features
- Create new courses
- Upload lessons (video + title)
- Edit/Delete courses
- Manage course content

### ⚙️ Admin Features
- Manage users
- Delete inappropriate courses

## 🧩 System Modules

1. Authentication System
2. Course Management System
3. Video Lesson Player
4. Enrollment & Progress Tracking
5. User Dashboard

## 🖥️ UI Screens (Figma Design)

The following screens are designed in Figma:

- Login / Signup Page
- Student Dashboard (Course Listing)
- Course Player Page (Video + Lessons)

🔗 Figma Link: *https://demo*

## 🗄️ Database Schema (ERD)

### Collections:

#### 1. Users
- _id
- name
- email
- password
- role (student / instructor)

#### 2. Courses
- _id
- title
- description
- instructorId

#### 3. Lessons
- _id
- courseId
- title
- videoUrl

#### 4. Enrollments
- _id
- userId
- courseId
- progress

📌 ERD Diagram:
*demo Image*

## 🔄 Application Flow

1. User registers/logs in
2. Student browses courses
3. Student enrolls in a course
4. Student watches lessons
5. Progress is tracked and saved

Instructor Flow:
1. Instructor logs in
2. Creates course
3. Uploads lessons
4. Publishes course

## 📱 Responsiveness
The application will be fully responsive and optimized for:
- Desktop
- Tablet
- Mobile devices

## 🚀 Future Enhancements
- Payment Integration (Stripe/Razorpay)
- Course Reviews & Ratings
- AI-based course recommendations
- Certificate generation

## ⚠️ Scope Limitation
To avoid scope creep, this project focuses on core LMS functionality such as course management, enrollment, and progress tracking. Advanced features will be considered in future iterations.

## 📌 Submission Details
- GitHub Repository: **
- Figma Design: **
- Demo Video: **

## 🎯 Conclusion
EduCore demonstrates the ability to design and plan a scalable full-stack application, including UI/UX design, backend architecture, and database structuring. It reflects real-world application development practices.
