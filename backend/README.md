# Tab Organizer Backend

This is the backend service for the Tab Organizer Chrome extension.

## Setup

1. Configure environment variables:
   
   ```
   cp .env.example .env
   ```
   
   Edit the `.env` file and add your OpenAI API key.

2. Install dependencies:
   
   ```
   npm install
   ```

3. Start the server:
   
   For production:
   ```
   npm start
   ```
   
   For development (with auto-restart on file changes):
   ```
   npm run dev
   ```

## Environment Variables

- `PORT`: Server port (default: 3000)
- `OPENAI_API_KEY`: Your OpenAI API key
- `DEBUG`: Set to 'true' to enable debug logging (default: false)

## Logging

The application uses a simple logging system with the following levels:

- `info`: General information about operations
- `error`: Errors that occur during execution
- `warn`: Warning messages that don't stop execution
- `debug`: Detailed debug information (only shown when DEBUG=true)

Example log output:

```
[INFO] 2023-04-20T15:30:45.123Z - Server running on port 3000
[DEBUG] 2023-04-20T15:31:22.456Z - Fetching all links { count: 5 }
[ERROR] 2023-04-20T15:32:10.789Z - Error fetching page content from https://example.com Error: Request failed with status code 404
```

To enable debug logs, set `DEBUG=true` in your `.env` file.

## Error Handling

The application uses a centralized error handling system:

- All operational errors return consistent JSON responses
- Error responses include a status code and error message
- Standard error format: `{ error: { code: 'ERROR_CODE', message: 'Error description' } }`

Common error codes:
- `NOT_FOUND`: Resource not found (404)
- `VALIDATION_ERROR`: Invalid input data (400)
- `SERVER_ERROR`: Internal server error (500)

The error handler automatically logs errors with appropriate context. 