# User Management API
A REST API server for managing users.

## Setup
1. Clone the repo.
```bash
git clone https://github.com/orenji-neko/user-management-api.git
```
2. Create .env and add credentials.
```bash
DB_HOST=your-host
DB_PORT=your-port
DB_USERNAME=your-username
DB_NAME=your-db
```
2. Install dependencies.
```bash
npm install
```
3. Turn on the database first.
4. Run the program.
```bash
npm run dev
```

## Testing
1. Turn on the database first.
2. Run the server.
```bash
npm run dev
```
3. Run this command.
```bash
npm run test
```

## Endpoints
### [GET] /users
Gets all users.
### [GET] /users/:id
Gets a specific user.
### [POST] /users
Creates a new user entry.
```typescript
body: {
  email: string;
  password: string;
  lastName: string;
  firstName: string;
}
```
### [DELETE] /users/:id
Deletes a user entry.