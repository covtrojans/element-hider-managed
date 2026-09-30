// The function that hides a given element
function hideElement(item) {
    console.log("Hiding Element:", item);
	item.style.display = "none";
}

chrome.storage.managed.get(['allUrlsQuery'], async (data) => {
    const elementQuery = data.allUrlsQuery;
    
    // Run immediately in case it's already there
    let siteElements = document.querySelectorAll(elementQuery);
    siteElements.forEach(hideElement);

    // Create an observer to watch for page changes
    const observer = new MutationObserver((mutations) => {
        let siteElements = document.querySelectorAll(elementQuery);
        siteElements.forEach(hideElement);
    });

    // Start the observer
    observer.observe(document.body, {
        childList: true,
        subtree: true
    });
});