# Tab Organizer

A Chrome extension to organize and manage your tabs with AI assistance.

## Project Structure

```
tab-organizer/
├── extension/                   # Chrome extension
│   ├── manifest.json            # Extension configuration
│   ├── popup/                   # Main user interface
│   │   ├── popup.html           # Popup HTML interface
│   │   ├── popup.js             # Interface logic
│   │   └── popup.css            # Styles
│   ├── background.js            # Event handling and API communication
│   └── icons/                   # Extension icons
│
├── backend/                     # Backend server
│   ├── server.js                # Server entry point
│   ├── routes/                  # API routes
│   │   └── links.js             # Endpoints for link management
│   ├── services/                # Business services
│   │   ├── linkService.js       # Link operations
│   │   └── aiService.js         # AI integration
│   └── models/                  # Data models
│       └── Link.js              # Link structure
```

## Requirements

- Node.js (v14 or higher)
- npm or yarn
- OpenAI account for API key

## Installation

### Backend

1. Configure environment variables:
   
   ```
   cd backend
   cp .env.example .env
   ```
   
   Edit the `.env` file and add your OpenAI API key.

2. Install dependencies:
   
   ```
   npm install
   ```

3. Start the server:
   
   ```
   node server.js
   ```
   
   The server will be available at `http://localhost:3000`.

For more details about the backend, including logging configuration, see [backend/README.md](backend/README.md).

### Chrome Extension

1. In Chrome, open `chrome://extensions/`
2. Activate "Developer mode"
3. Click on "Load unpacked"
4. Select the `extension` folder of the project
5. The extension should appear in your toolbar

## Usage

1. Navigate to the page you want to save
2. Click on the Tab Organizer icon
3. Click on "Save Current Tab"
4. The page will be saved and automatically processed

## Features

- Save tabs with their URLs and titles
- Automatically generate summaries and tags using AI
- Search and filter your saved links
- Mark links as read, unread or favorite

## Development

To contribute to the project:

1. Clone the repository
2. Make your changes
3. Open a Pull Request

## License

MIT 