import rules from './rules.js';
import handler from './handler.js';

rules.forEach(redirect => {
    chrome.webRequest.onBeforeRequest.addListener(
        handler(redirect),
        {urls: redirect.urls},
        ['blocking']
    );
});
