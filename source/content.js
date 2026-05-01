// The function that hides a given element
function hideElement(item) {
	item.style.display = "none";
}

// The function that searches for the elements
function elementSearch(index) {
	chrome.storage.managed.get(["elementQueries"], async (data) => {
		const elementQueries = data.elementQueries || [];
		
		// Run immediately in case it's already there
		let siteElements = document.querySelectorAll(elementQueries[index]);
		
		// List hidden elements in the console
		console.log("Elements to hide: ");
		console.log(siteElements);

		siteElements.forEach(hideElement);

		// Create an observer to watch for page changes
		const observer = new MutationObserver((mutations) => {
			let siteElements = document.querySelectorAll(elementQueries[index]);
			siteElements.forEach(hideElement);
		});

		// Start the observer
		observer.observe(document.body, {
			childList: true,
			subtree: true
		});
	});
}


// Pull the URL List
chrome.storage.managed.get(["urlList"], async (data) => {
	console.log("Getting URL List!");
    const urlList = data.urlList || [];
	
    // Get the Current URL
	let currentURL = window.location.href;
	
	// Check if the Current URL includes something in the URL List
	for (let i = 0; i < urlList.length; i++) {
		if (currentURL.match(urlList[i])) {
			console.log("Current URL matches this item in the URL list: " + urlList[i]);
			elementSearch(i);
		}
		else if (urlList[i] === "<all_urls>") {
			console.log("Hiding <all_urls> elements");
			elementSearch(i);
		}
	}
  });