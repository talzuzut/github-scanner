# GitHub Scanner

GitHub Scanner is a web application that allows you to search and explore GitHub repositories. It includes a backend API that allows you to scan GitHub repositories, retrieve details about specific repositories, and a frontend application that allows you to search for repositories and view their details.

## Getting Started

To get started with GitHub Scanner, follow these instructions:

### Prerequisites

- Node.js and Yarn installed on your local machine.

### Environment Variables

1. In the root directory of the project, create an `.env` file and add your GitHub API token as follows:

`GIT_HUB_API_TOKEN=your_token_here`


Replace `your-github-api-token` with your personal GitHub API token. Ensure the token has the necessary permissions.

### Backend Deployment

1. Navigate to the `backend` directory:
2. Install dependencies: `yarn install`
3. Start the server: `yarn start`
4. The server should now be running on `http://localhost:3000`
5. You can now make requests to the server.

### Frontend Deployment
1. Navigate to the `frontend` directory:
2. Install dependencies: `yarn install`
3. Start the app: `yarn start`
4. The app should now be running on `http://localhost:3001`


GitHub Repository Scanner API

This API allows you to scan GitHub repositories, retrieve details about specific repositories, and manage concurrent requests effectively.

List of Repositories

    Route: /
    Method: GET
    Description: Fetches a list of repositories from GitHub.
    Usage: You can make a GET request to this route to get a list of GitHub repositories.
    Response: An array of repositories with details such as name, size, and owner.

Retrieve Repository Details

    Route: /:owner/:name
    Method: GET
    Description: Retrieves detailed information about a specific GitHub repository.
    Usage: To fetch details of a particular repository, make a GET request to this route, replacing :owner with the repository owner's username and :name with the repository's name.
    Response: JSON object containing repository details, including name, size, owner, public/private status, number of files, content of one YAML file, and active webhooks.

List Repositories by Owner

    Route: /:owner
    Method: GET
    Description: Fetches a list of repositories owned by a specific GitHub user.
    Usage: To retrieve repositories owned by a particular GitHub user, make a GET request to this route, replacing :owner with the owner's username.
    Response: An array of repositories owned by the specified user.

Rate Limiting

    Middleware: concurrencyMiddleware and decrementConcurrentRequests
    Description: These middlewares manage the number of concurrent requests made to GitHub, ensuring that the application does not exceed rate limits. They control how many requests can be made simultaneously.



