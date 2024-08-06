# 🎓 Plan-Day

**Plan-Day** is a student-centric application built using **Node.js** and **Express.js**. It helps students manage their school information and personal tasks efficiently, providing features to manage user accounts, subject grades, daily tasks, and school work history.

## ✨ Features

- 👤 **User Management**
- 📝 **Subject Grade Management**
- 📅 **Daily Task Management**
- 📚 **School Work History Management**

## 🚀 Installation

1. Clone the repository:

   ```sh
   git clone https://github.com/AkshandraSingh/Plan-Day
   ```

2. Navigate to the project directory:

   ```sh
   cd plan-day
   ```

3. Install dependencies:

   ```sh
   npm install
   ```

4. Start the server:

   ```sh
   npm start
   ```

## 📋 Routes

### 🧑‍💼 Users Routes

- `POST /registerUser` - Create a new account
- `POST /loginUser` - Login to account
- `POST /setNewPassword/:userId` - Set a new password for account
- `POST /resetPassword/:userId/:accessToken` - Reset the password after forgetting it
- `GET /forgetPassword` - Send a password reset email

### 📊 Subject Grade Routes

- `POST /addGrade/:userId` - Add a new grade for a user
- `PATCH /updateGrade/:gradeId` - Update an existing grade
- `DELETE /deleteGrade/:gradeId` - Delete a grade
- `GET /viewExamNames/:userId` - View exam names for a user
- `GET /searchByExamName/:userId/:examName` - Search grades by exam name
- `GET /searchBySubjectName/:userId/:subjectName` - Search grades by subject name
- `GET /viewGrade/:userId` - View grades for a user

### 📅 Daily Task Routes

- `POST /createTask/:userId` - Create a new task for a user
- `PATCH /updateTask/:taskId` - Update an existing task
- `DELETE /deleteTask/:taskId` - Delete a task
- `GET /viewAllTasks/:userId` - View all tasks for a user
- `GET /viewTask/:taskId` - View a specific task
- `GET /todayTask/:userId` - View today's tasks for a user
- `GET /searchTaskByData/:userId` - Search tasks by data
- `GET /searchTaskByLetter/:userId/:letter` - Search tasks by letter

### 📖 School Work History Routes

- `POST /addSchoolWorkHistory/:userId` - Add new school work history for a user
- `PATCH /updateSchoolWorkHistory/:workId` - Update an existing school work history
- `DELETE /deleteSchoolWorkHistory/:workId` - Delete school work history
- `GET /viewFullSchoolWorkHistory/:userId` - View full school work history for a user
- `GET /viewSchoolWork/:workId` - View a specific school work
- `GET /searchSchoolWorkBySubjectName/:userId/:subjectName` - Search school work by subject name
- `GET /searchSchoolWorkByWorkName/:userId/:workName` - Search school work by work name
- `POST /searchWorkByDate/:userId` - Search school work by date

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License.
