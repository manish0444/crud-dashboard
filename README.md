# Live Demo
Preview <https://crud-dashboard-eta.vercel.app/>

# CRUD Dashboard

This is a **CRUD Dashboard** project built with **Next.js** and **Material UI**. It allows users to perform various CRUD operations on posts using the JSONPlaceholder API.

## Description

The project provides a user-friendly interface for viewing, creating, editing, and deleting posts. It is designed to be responsive and sleek, ensuring a good user experience across devices.

## Features
- View all posts in a table or card format based on device size.
- Create new posts with a form dialog.
- Edit existing posts with a form dialog.
- View post details in a separate dialog.
- Delete posts with confirmation.
- Responsive design for mobile and desktop.

## Technologies Used
- **Next.js**: A React framework for server-side rendering and static site generation.
- **Material UI**: A popular React UI framework for building responsive and modern user interfaces.
- **Axios**: For making HTTP requests to the JSONPlaceholder API.
- **TypeScript**: For type safety and better development experience.

## Installation and Setup
1. Clone the repository:
   ```bash
   git clone https://github.com/manish0444/crud-dashboard.git
   cd crud-dashboard
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the development server:
   ```bash
   npm run dev
   ```
4. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Usage
- To create a new post, click on the "Create Post" button and fill out the form.
- To edit a post, click the "Edit" button next to the post in the table.
- To delete a post, click the "Delete" button next to the post and confirm the action.

## Project Structure
```
crud-dashboard/
├── app/
│   ├── components/        # Contains UI components
│   ├── services/          # API service layer
│   ├── types/             # TypeScript interfaces
│   ├── layout.tsx         # Layout component
│   ├── page.tsx           # Main page component
│   ├── theme.ts           # Material UI theme configuration
│   └── theme-registry.tsx  # Theme registry for emotion
├── package.json            # Project dependencies and scripts
└── README.md               # Project documentation
```

## Contributing
Contributions are welcome! Please feel free to submit a pull request or open an issue.

