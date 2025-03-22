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

- Node.js (v16 or higher)
- npm or yarn
- PostgreSQL (for production environment)
- OpenAI account for API key

## Installation

### Backend

1. Configure environment variables:
   
   ```bash
   cd backend
   cp .env.example .env
   ```
   
   Edit the `.env` file and add your OpenAI API key.

2. Install dependencies:
   
   ```bash
   npm install
   ```

3. Start the server:
   
   ```bash
   # Development mode with auto-restart
   npm run dev
   
   # Production mode
   npm start
   ```
   
   The server will be available at `http://localhost:3000`.

For more details about the backend, including logging configuration, see [backend/README.md](backend/README.md).

### Chrome Extension

1. Install dependencies:
   
   ```bash
   cd extension
   npm install
   ```

2. In Chrome, open `chrome://extensions/`
3. Activate "Developer mode"
4. Click on "Load unpacked"
5. Select the `extension` folder of the project
6. The extension should appear in your toolbar

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

### Environment Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/adpablos/tab-organizer.git
   cd tab-organizer
   ```

2. Set up backend and extension as described in the Installation section

3. Code Style and Linting:
   ```bash
   # Backend
   cd backend
   npm run lint      # Check for issues
   npm run lint:fix  # Fix issues automatically
   npm run format    # Format code with Prettier
   
   # Extension
   cd extension
   npm run lint
   npm run lint:fix
   npm run format
   ```

### Workflow

1. Create a branch from the main branch following our naming convention:
   ```bash
   git checkout -b feature/issue-number-short-description
   ```

2. Make your changes and commit following our commit message format:
   ```
   [type]: #issue-number - Short description
   
   - Detailed change 1
   - Detailed change 2
   ```

3. Push your branch and create a Pull Request

For more detailed contribution guidelines, see [CONTRIBUTING.md](CONTRIBUTING.md).

## License

MIT 