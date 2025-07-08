📘 ENTNT Dental Center - React Dashboard

A fully responsive dental clinic management dashboard built with React.js, Tailwind CSS, and localStorage (no backend). This project is a technical assignment for ENTNT, simulating real-world workflows of a dental center for Admins (Dentists) and Patients.

🔧 Tech Stack
Frontend: React.js, React Router, Context API

Styling: Tailwind CSS

State Management: Context API

Data Storage: localStorage (no backend or API)

Routing: Role-based protected routes using react-router-dom

🚀 Features
✅ Authentication
Hardcoded demo accounts:

Admin: admin@entnt.in / admin123

Patient: john@entnt.in / patient123

Role-based routing: Admin vs Patient dashboards

Session stored in localStorage

🦷 Admin Dashboard
View KPIs: Appointments, Revenue, Patients

Manage Patients:

Add/Edit/Delete patient info

Collect DOB, Gender, Contact, Health Info

Appointment Management:

Add/Edit/Delete appointment details

Upload reports (PDFs/images)

Schedule next visit

Track cost, status (Pending/Completed), and treatment

Calendar View for scheduling

🙋‍♂️ Patient Portal
View appointment history

Submit new appointment requests

Cancel future appointments

Get notified if the appointment time is changed by Admin

Track cost, treatment, status, and attachments

Responsive design for mobile/desktop

📁 File Upload Support
Store files (PDF, image) as base64 or blob URLs in localStorage

📁 Folder Structure
bash
Copy
Edit
src/
├── components/         # Reusable UI components
├── context/            # AuthContext
├── layouts/            # DashboardLayout for Admin/Patient
├── pages/              # Page-level components (Login, Dashboard, Patients, Incidents, etc.)
├── utils/              # LocalStorage helpers
├── App.js              # Main app with route definitions
├── index.js            # App entry point
├── index.css           # TailwindCSS


📦 Installation
1. Clone the repository
git clone https://github.com/Sameer4ever/ENTNT_Assignment.git
cd entnt-dental-dashboard

2. Install dependencies
npm install

3. Start development server
npm start