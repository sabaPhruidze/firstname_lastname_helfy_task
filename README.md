# Task Manager App

## Backend Setup

1. cd backend
2. created package.json
3. installed cors, nodemoon (corrected package.json scripts), express.js
4. created server.js which runs on port 4000 . Test can be check after cd /backend , npm run dev and move on here
   http://localhost:4000/check (it must write server runs)
5. wrote _req because when it is not used it is common to write "_" symbol
6. added cors and expres.json middleware
7. added GET method on /api/tasks route .
8. created an array tasks instead of database and added one case to test . it displays succesfully here: http://localhost:4000/api/tasks
9. toISOString() used in order to make date more understandable than Date.now() example:"2026-03-03T07:21:46.886Z"
10. added POST method on /api/tasks
    {
    "title": "testing post method",
    "description": "write title description and priotity to check if it works or not using thunder clients",
    "priority": "mediumfew"
    }
    wrote priority like this and it added low but when I wrote medium it added correctly
11. check of post and get method was done using thundertask
12.

## Frontend Setup

## API Endpoints
