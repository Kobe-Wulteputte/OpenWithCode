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
  chrome.tabs.create({
    url: "https://vscode.dev/github" + url.pathname,
  });
};

let redirectAZ = (resp) => {
  if (!resp.found) {
    notFound(resp.tab);
    return;
  }
  const url = new URL(resp.tab.url);
  const search = url.searchParams;
  if (!search.get("version")) {
    search.set("version", resp.version)
  }
  chrome.tabs.create({
    url:
      "https://vscode.dev/azurerepos" + url.pathname + "?" + search.toString(),
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
    chrome.tabs.sendMessage(tab.id, { tab: tab, page: "github" }, redirectGH);
  } else if (matchesAD(url)) {
    chrome.tabs.sendMessage(tab.id, { tab: tab, page: "devops" }, redirectAZ);
  } else {
    notFound(tab);
  }
});
