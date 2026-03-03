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
    additionaly "title": "" caused error 400 for basic validation
11. check of post and get method was done using thundertask
12. moved endpoints in routes folder
13. PUT method added as well (in tasks.js added @ts-check also) on dynamic route . checked by thunder client first used post to upload data than check by writing :
    {
    "title": "updated",
    "description": "this is a check for updating method",
    "priority": "high",
    "completed": true
    }
    on put method.
14. REMOVE Method added as well and works correctly
    for example write this and DELET method in thunder client ,after post method : http://localhost:4000/api/tasks/1
15. added PATCH Method and it toggles the completed property/key => if true than it because false and if false it becomes true
16. in order to check patch first add using post method mentioned above than write in thunder clinet http://localhost:4000/api/tasks/3/toggle (instead of 3 write correct number) and then write patch method and send
    it will change completed value
17. Made refactoring so Istead of tasks.js where every method was written there I split into 3 parts (dynamic_routes, static_routes and tasks_store) and checked again each method works tested by above ways
18. added two middleware not_found and error_handler .
    not_found return 404 on uknown routes as for error_handler returns errors with status cvodes
    for exmaple: http://localhost:4000/incorrect_url must return { "message": "route not found" }
    if for example we create new route /something and add throw new Error and runned /something this route than it would give us error message or servers error

## Frontend Setup

1. installed react.js using vite@latest
2. api
   method GET returns data from an array wrote in the backend
   method POST creating tasks
   method PUT update tasks
   method DELETE deletes task
   method PATCH toggles completed property/key
3. retieved data and display . also tried toggle using patch and it displays done correctly as for other cases displays 'pending..' as I wrote
4. added taskFilter which changes button name all completed or pending

## API Endpoints
