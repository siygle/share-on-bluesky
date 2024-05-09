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
  // Intentionally create an invalid item, to show off error checking in the
  // create callback.
  chrome.contextMenus.create(
    { title: 'Oops', parentId: 999, id: 'errorItem' },
    function () {
      if (chrome.runtime.lastError) {
        console.log('Got expected error: ' + chrome.runtime.lastError.message);
      }
    }
  );
  chrome.contextMenus.onClicked.addListener(genericOnClick);
});

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