# Information

PDF/TXT Resume Parser

Parses through text or PDF files to obtain first and last name, as well as various keywords mentioned inside the resume. The file is then stored locally on the server
And the keywords are uploaded to a MongoDB database. This allows for easy retrieval and querying of large number of resume files to find a suitable resume.



# How to Run:

- Download Files
- Edit all cases of <username>, <password> in server->server.js with the MongoDB login information
- Navigate to the server folder in one terminal and run node server.js
- Navigate to the src folder in the other terminal and run npm start
- This will open localhost:3000, and then you can upload text file resumes to be parsed
- Resumes will be uploaded to server/uploads/
- Website will display parsed names as well as E-Mail addresses. Keywords will not be displayed, but will be displayed both server side and can be found on the MongoDB database
