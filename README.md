# Task Management Platform

This is a full-stack web application for managing tasks. By allowing users to create, read, update, and delete tasks, the application allows users to manage and track tasks across various stages.

Backend includes the following:

- Backend REST API built with NestJS & PostgreSQL.
- Routes for create, read, update and delete tasks
- Soft deletion
- Task history tracking
- API pagination, sorting and filtering

Frontend includes the following:

- Nextjs UI frontend to create, update, delete and view tasks
- Add a new task by providing a title and description.
- Edit the title, description, and status of an existing task.
- Delete tasks (with a confirmation).
- Show a list of task statuses with a filter option to show tasks by each status.
- Task history UI modal
- Responsive UI
- Paginated list of tasks with the ability to filter by status

Bonus:

- Authentication (Cookies with JWT)
- Task Search/Filter
- Tailwind css for styling
- Toastify notifications to display user-friendly messages

### Install Dependencies (navigate to the backend & frontend folders and run the commands)

```
# backend
npm install

# frontend
npm install
```

### Run backend & frontend

```
# Run backend
npm run start:dev

# Run frontend
npm run dev
```

## Demo

- `You can view` - [Demo](https://)
