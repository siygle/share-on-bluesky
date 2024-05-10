chrome.runtime.onInstalled.addListener(function () {
  chrome.contextMenus.removeAll();
  let contexts = [
    'page',
    'selection',
    'link',
  ];
  for (let i = 0; i < contexts.length; i++) {
    let context = contexts[i];
    let title = `Share ${context} on BlueSky`;
    chrome.contextMenus.create({
      title: title,
      contexts: [context],
      id: context
    });
  }
});

// Move the context menu listener to the root level to avoid the terminated issue
// src: https://stackoverflow.com/a/69012673
chrome.contextMenus.onClicked.addListener(genericOnClick);

function genericOnClick(data, tab) {
  if ('page' === data.menuItemId) skeet(data.pageUrl, tab.title);
  if ('link' === data.menuItemId) skeet(data.linkUrl);
  if ('selection' === data.menuItemId) skeet(tab.url, data.selectionText);
}

const skeet = async (url, title = '') => {
  const resource = new URL("https://bsky.app");
  const compose = new URL("intent/compose", resource);
  compose.searchParams.append("text", `${title} \n${url}`);
  chrome.tabs.create({ url: compose.href });
}