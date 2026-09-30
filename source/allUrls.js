// The function that hides a given element
function hideElements(query) {
    let elements = document.querySelectorAll(query);
    for (let i = 0; i < elements.length; i++) {
        console.log("Hiding Element:", elements[i]);
        elements[i].remove();
    }


    // console.log("Hiding Element:", item);
	// item.style.display = "none";
}

chrome.storage.managed.get(['allUrlsQuery'], async (data) => {
    const elementQuery = data.allUrlsQuery;
    
    // Run immediately in case it's already there
    hideElements(elementQuery);
    // let siteElements = document.querySelectorAll(elementQuery);
    // siteElements.forEach(hideElement);

    // Create an observer to watch for page changes
    const observer = new MutationObserver((mutations) => {
        hideElements(elementQuery);
        // let siteElements = document.querySelectorAll(elementQuery);
        // siteElements.forEach(hideElement);
    });

    // Start the observer
    setTimeout(() => {
        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    }, 1000);
});