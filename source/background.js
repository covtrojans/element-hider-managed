console.log("background script has started!");

// Function to update scripts based on policy
async function updateScriptsFromPolicy() {
  chrome.storage.managed.get(['urlList'], async (data) => {
    const urls = data.urlList || [];

    // Remove old dynamic scripts first
    const existingScripts = await chrome.scripting.getRegisteredContentScripts();
    if (existingScripts.length > 0) {
      console.log("scripts exist. unregistering scripts...");
      await chrome.scripting.unregisterContentScripts();
    }

    // Register new ones if URLs exist
    if (urls.length > 0) {
      console.log("new scripts detected. registering scripts...");
      chrome.scripting.registerContentScripts([{
        id: "managed-script",
        js: ["content.js"],
        matches: urls,
        runAt: "document_idle"
      }]);
    }
  });
}

// Run on startup and when storage changes
chrome.runtime.onInstalled.addListener(updateScriptsFromPolicy);
chrome.storage.onChanged.addListener((changes, areaName) => {
  if (areaName === 'managed') updateScriptsFromPolicy();
});