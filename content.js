// Listen for messages
chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  // Check if on correct page
  var doc = document.getElementById("repo-content-pjax-container");
  console.log()
  if (doc) {
    sendResponse({ tab: msg.tab, found: true });
  } else {
    sendResponse({ tab: msg.tab, found: false });
  }
});
