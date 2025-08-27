### Senior Full Stack Developer Challenge

## Background

Build a small task management platform for a team. The app should allow users to manage and track tasks across various stages. The application will be used internally, so performance and usability are key, but we also want to keep the code clean, maintainable, and scalable. You will be building both the backend API and frontend interface using NestJS, Next.js, and PostgreSQL.

What You Need to Do:

1. Backend (NestJS & PostgreSQL)
    Task API Design:
    ● Build a NestJS API with the following features:
        ○ A Task entity with:
            ■ id (UUID, primary key)
            ■ title (string, required, max length: 255)
            ■ description (string, optional)
            ■ status (enum: ["pending", "in-progress", "completed"])
            ■ createdAt and updatedAt timestamps
        ○ Implement CRUD operations for managing tasks (create, read, update, delete).
        ○ Use TypeORM or Prisma to interface with PostgreSQL.

        
    Advanced Requirement:
    
    ● Implement soft deletion: A task should be deleted without removing it from the database (e.g., a deletedAt timestamp).

    ● Implement task history tracking: Every time a task’s status is updated, store the
    previous status in a related TaskHistory table with a timestamp and status change
    reason.

    ● Implement API pagination and sorting on the GET /tasks endpoint. Use query
    parameters like page, limit, and sortBy (e.g., createdAt, title).

2. Frontend (Next.js)
    Task Management UI:
    ● Build a Next.js app that interacts with your NestJS backend. The UI should allow users
    to:
        ○ Add a new task by providing a title and description.
        ○ Edit the title, description, and status of an existing task.
        ○ Delete tasks (with a confirmation).
        ○ Show a list of task statuses with a filter option to show tasks by each status.

    Advanced Requirement:
        ● Provide a task history modal: When a user clicks on a task, show a modal with the task’s history (show previous statuses, dates, and change reasons).
        ● Ensure that your frontend is responsive and works on both mobile and desktop.
        ● View a paginated list of tasks with the ability to filter by status (e.g., pending, completed).

3. Bonus Challenges (Optional, but adds extra points)
    ● Authentication: Add user authentication (use JWT or session cookies). Only
    authenticated users should be able to perform CRUD operations.
    ● Task Search/Filter: Add a search bar that allows filtering tasks by title or description.
    ● UI/UX Enhancements: Use CSS frameworks like Tailwind CSS, or CSS-in-JS for styling, and add some animations to improve the user experience.
    ● Error Handling: Handle errors gracefully both on the backend (API error responses) and frontend (display user-friendly messages).


## Deliverables
1.  GitHub Repository: Upload all your code here.
2.  README File: Document how to set up and run the project, along with any assumptions
you’ve made.
3.  Demo Video (Optional): If possible, record a short demo video (2-3 minutes) showing
your app in action.

## Evaluation Criteria
● Code Quality & Organization: How clean, modular, and readable is the code? Are there clear and meaningful comments?
● Functionality: Does the app function as expected? Are the requirements met?
● Frontend UX/UI: Is the app user-friendly? Is the design responsive and intuitive?
● Database Design & Performance: How efficient is your database schema? Are you using optimized queries?
● Problem Solving: Did you handle edge cases and advanced features in a meaningful
way (e.g., pagination, history tracking, soft deletion)?
● Testing: Did you write tests for key parts of your application (backend, frontend, or
both)?