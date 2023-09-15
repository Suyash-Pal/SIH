
document.getElementById("translate-button").addEventListener("click", async () => {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  console.log([tab])
  // Get the current page\'s content
  const content = await fetch(tab.url).then(response => response.text());
  console.log(content)
  // Translate the content to Hindi using the Google Cloud Translation API
  const translatedContent = await translateToHindi(content);

  // Replace the page\'s content with the translated content
  await chrome.tabs.executeScript(tab.id, {
    code: `document.documentElement.innerHTML = "${translatedContent}";`
  });
  console.log("Event Heard!")
});

async function translateToHindi(content) {
  // Create a request object for the Google Cloud Translation API
  const request = {
    q: content,
    target: "hi",
  };

  // Make a POST request to the Google Cloud Translation API
  const response = await fetch("http://127.0.0.1:5000", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin" : "*",
    },
    body: JSON.stringify(request),
    },
  );

  // Parse the response from the Google Cloud Translation API
  //const data = await response.json();

  // Return the translated content
  console.log(translatedContent)
}