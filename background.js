let matchesGH = (url) => {
  return url.hostname == "github.com";
};

let matchesAD = (url) => {
  const azureRegex = new RegExp("_git");
  return url.hostname == "dev.azure.com" && azureRegex.test(url.pathname);
};

let redirectGH = (resp) => {
  if (!resp.found) {
    notFound(resp.tab);
    return;
  }
  const url = new URL(resp.tab.url);
  chrome.tabs.update(resp.tab.tabId, {
    url: "https://vscode.dev/github" + url.pathname,
  });
};

let redirectAZ = (resp) => {
  if (!resp.found) {
    notFound(resp.tab);
    return;
  }
  const url = new URL(resp.tab.url);
  chrome.tabs.update(resp.tab.tabId, {
    url: "https://vscode.dev/azurerepos" + url.pathname,
  });
};

let notFound = (tab) => {
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    files: ["alert.js"],
  });
};

chrome.action.onClicked.addListener((tab) => {
  const url = new URL(tab.url);
  console.log(url);

  if (matchesGH(url)) {
    chrome.tabs.sendMessage(tab.id, { tab: tab }, redirectGH);
  } else if (matchesAD(url)) {
    chrome.tabs.sendMessage(tab.id, { tab: tab }, redirectAZ);
  } else {
    notFound(tab);
  }
});
