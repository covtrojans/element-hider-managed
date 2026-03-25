# element-hider
This is a chromium extension used to block specific elements on specific websites. It is an updated version that allows adding/removing settings through the policy option in Google Workspace.

## How It Works
This extension looks for a urlList and elementQueries array in the policy settings in Google Workspace. These settings are written in JSON. If the current URL matches something in the urlList array, a content script is ran. This script uses the document.querySelectorAll function to pull every HTML element that matches the corrisponding item in the elementQueries array. It may be good to read up on CSS selectors to understand what to search for: https://www.w3schools.com/cssref/css_selectors.php

## Examples
Here are some example policy settings.

### Hide In-Game Chat on Chess.com
This will hide the in-game chat box on Chess.com.
{
	"urlList": {
		"Value": [
			"https://www.chess.com/*"
		]
	},
	"elementQueries": {
		"Value": [
			"div[class='resizable-chat-area-content']"
		]
	}
}

### Hide AI Overview on Google Search Results
As of posting this, this hides the Google AI Overview on search results. 
{
	"urlList": {
		"Value": [
			"https://www.google.com/search*"
		]
	},
	"elementQueries": {
		"Value": [
			"div[id='Odp5De']"
		]
	}
}

### Multiple Queries
There are times where you will want to hide many elements using multiple queries. I figured I should give an example to show how that's possible. This hides any div element that has the id or class containing the word 'chat'.
{
	"urlList": {
		"Value": [
			"https://www.chess.com/*"
		]
	},
	"elementQueries": {
		"Value": [
			"div[class*='chat'], div[id*='chat']"
		]
	}
}

Note: Keep in mind the elementQueries array still only has one string.

### Putting It All Together
Here is what it would look like combine the last two examples. Be sure the arrays are organized correctly so the script knows what URL corrisponds to each query. 
{
	"urlList": {
		"Value": [
			"https://www.google.com/search*",
			"https://www.chess.com/*"
		]
	},
	"elementQueries": {
		"Value": [
			"div[id='Odp5De']",
			"div[class*='chat'], div[id*='chat']"
		]
	}
}

## Update Log

- 1.0: First release! Yay!