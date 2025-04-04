﻿# PDF_to_XML_Convertor

Website URL: https://pdf-to-xml-convertor-dath.vercel.app/

This project is a Full Stack Developer Intern Coding Challenge focused on building a PDF-to-XML converter web application that maintains document structure and formatting. The application includes:

User authentication (Login/Registration)

File upload and conversion functionality

Result management (view, copy, and download converted XML)

User-friendly UI with history tracking

Tech Stack

Frontend: Reactjs

Backend: NodeJS, Express

Database: MongoDB

Authentication: JWT-based authentication

Storage & Deployment: Vercel for frontend, Backend hosted separately

Additional Tools & Libraries: Various libraries for PDF parsing and XML generation

Implementation Level

✔️ User authentication (JWT-based login/registration)✔️ PDF file upload functionality✔️ Improved PDF-to-XML conversion (preserves structure: paragraphs, headers)✔️ Multi-page display of the converted document✔️ Sidebar navigation for previous conversions✔️ Preview of original PDF and converted XML✔️ Basic error handling and validation✔️ User profile management

Features

🔹 Secure Authentication: Users can register, log in, and manage their profile securely.🔹 PDF Upload & Conversion: Convert uploaded PDFs into structured XML format.🔹 Preview Mode: View both the original PDF and its converted XML side by side.🔹 Conversion History: Access and manage previously converted files.🔹 Download & Copy Options: Download XML files or copy content directly.🔹 Responsive UI: Works seamlessly across devices.

How to Run the Project

1. Clone the Repository

git clone https://github.com/your-username/PDF_to_XML_Convertor.git
cd PDF_to_XML_Convertor

2. Install Dependencies

# Install frontend dependencies
cd frontend
npm install

# Install backend dependencies
cd ../backend
npm install

3. Set Up Environment Variables

Create a .env file in both the frontend and backend directories with the necessary environment variables (e.g., database connection, JWT secret, API keys, etc.).

4. Start the Application

# Run frontend
cd frontend
npm run start

# Run backend
cd ../backend
npm run dev

5. Access the Application

Open http://localhost:3000 in your browser.
