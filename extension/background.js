// background.js
chrome.runtime.onInstalled.addListener(() => {
  console.log("Tab Organizer extension installed");
});

// Listen for messages from popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "getData") {
    // Handle request if needed
    sendResponse({ success: true });
  }
  return true;
});
