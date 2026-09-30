console.log("background script has started!");

// Function to update scripts based on policy
async function updateScriptsFromPolicy() {
  chrome.storage.managed.get(['urlList','allUrlsQuery'], async (data) => {
    const urls = data.urlList || [];
    const allUrlsQuery = data.allUrlsQuery;

    // Remove old dynamic scripts first
    const existingScripts = await chrome.scripting.getRegisteredContentScripts();
    if (existingScripts.length > 0) {
      console.log("scripts exist. unregistering scripts...");
      await chrome.scripting.unregisterContentScripts();
    }

    var scripts = [];

    // Register <all_urls> script if needed
    if (allUrlsQuery) {
      console.log("query detected for all urls. registering script...");
      
      scripts.push({
        id: "allurls-script",
        js: ["allUrls.js"],
        matches: ["<all_urls>"],
        runAt: "document_idle",
        matchOriginAsFallback: true
      });
    }

    // Register new ones if URLs exist
    if (urls.length > 0) {
      console.log("new scripts detected. registering scripts...");
      
      scripts.push({
        id: "managed-script",
        js: ["content.js"],
        matches: urls,
        runAt: "document_idle"
      });

      console.log("Scripts to add:", scripts);
      chrome.scripting.registerContentScripts(scripts);
    }
  });
}

// Run on startup and when storage changes
chrome.runtime.onInstalled.addListener(updateScriptsFromPolicy);
chrome.storage.onChanged.addListener((changes, areaName) => {
  if (areaName === 'managed') updateScriptsFromPolicy();
});