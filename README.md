
## Recipe App
A full-stack application for managing and exploring recipes. The app allows users to view, add, delete favorite recipes. It's built using React for the frontend and Node.js with Express and MongoDB for the backend.T
his application is designed to provide a simple and intuitive way to manage recipes. Users can browse through existing recipes. The app is built with accessibility and security in mind, ensuring a safe and user-friendly experience.


## How to Access

Frontend:

Open a web browser and navigate to http://localhost:3000.

Backend API:

The API is accessible at http://localhost:3000.

You can use tools like Postman or curl to interact with the API endpoints.


## Getting Started

1. Clone the repository:
         `git clone `

2. Install dependencies:
         `npm install`

3. Start the backend server:
         `npm run server`
         `node server.js`

4. Start the frontend:
         ` npm start`



##  Accessibility and SEO

I used semantic HTML elements such as `<main>`, `<nav>`, and `<header>` throughout my frontend to improve accessibility. I provided descriptive alt text for all images and ensured that the application can be navigated using only the keyboard.  I also included ARIA attributes where necessary to support users who rely on screen readers.
To optimize performance, I used Google Lighthouse to analyze the frontend. 


##  Tracking-privacy

I implemented simple pageview tracking using Google Analytics because it respects user privacy .To protect privacy, I have enabled IP anonymization and do not collect personal data.Users are informed about tracking in the privacy policy.This helps me understand how users interact with the application while remaining compliant with GDPR. All analytics is anonymous.

##  Security

My project could be vulnerable to Cross-Site Scripting (XSS) and NoSQL Injection. To mitigate XSS, I rely on React’s default escaping and avoid using dangerouslySetInnerHTML. All user input is validated and sanitized before rendering. For NoSQL Injection, I check that all MongoDB IDs are valid using mongoose.Types.ObjectId.isValid() before querying, and I use strict Mongoose schemas to enforce data types. I also set CORS headers to restrict API access and regularly check dependencies with npm audit to address known vulnerabilities. If I add authentication, I will use HTTP-only cookies for sensitive tokens.
