# share-on-bluesky

Easy share the current page on BlueSky which heavy inspiried by [chrome-share-on-twitter](https://github.com/robertoentringer/chrome-share-on-twitter)

## How it works?

Cause [BlueSky](https://bsky.app) already supported [Action Intent Links](https://docs.bsky.app/docs/advanced-guides/intent-links), so we can easily share a post with the action URL as following:

> https://bsky.app/intent/compose?text=I%27m%20reading%20through%20the%20Bluesky%20API%20docs%21%20%F0%9F%A6%8B%0Ahttps%3A//docs.bsky.app

So this extension just combine the chrome extension basic contextMenus/Tabs and BlueSky action intent links to make the post share.

*And this extension were powered by [extension.js](https://github.com/cezaraugusto/extension.js), an amazing tool which help making browser extension easily.