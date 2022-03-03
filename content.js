// Listen for messages
chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  // Check if on correct page
  switch (msg.page) {
    case "github":
      let repoElement = document.getElementById("repo-content-pjax-container");
      if (repoElement) {
        sendResponse({ tab: msg.tab, found: true });
      }
      break;

    case "devops":
      let repoLink = document.getElementsByClassName(
        "repos-file-explorer-header-repo-link text-ellipsis"
      )[0];
      if (!repoLink) {
        sendResponse({ tab: msg.tab, found: false });
      }
      let version = new URL(repoLink.href).searchParams.get("version");
      sendResponse({ tab: msg.tab, found: true, version: version });
      break;
  }

  sendResponse({ tab: msg.tab, found: false });
  return true;
});
