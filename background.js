let visitedSites = {};
let totalLinks = 0;

function logLinksOnCompleted(details) {
    chrome.scripting.executeScript({
        target: { tabId: details.tabId },
        files: ['content.js']
    });
}

chrome.runtime.onInstalled.addListener(() => {
    chrome.webNavigation.onCompleted.addListener(logLinksOnCompleted, {
        url: [{ urlMatches: 'http://*/*' }, { urlMatches: 'https://*/*' }]
    });
});

chrome.runtime.onStartup.addListener(() => {
    chrome.webNavigation.onCompleted.addListener(logLinksOnCompleted, {
        url: [{ urlMatches: 'http://*/*' }, { urlMatches: 'https://*/*' }]
    });
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === 'LOG_LINKS') {
        const { url, links } = message;
        if (!visitedSites[url]) {
            visitedSites[url] = { count: 0, links: [] };
        }
        visitedSites[url].count++;
        visitedSites[url].links.push(...links);
        totalLinks += links.length;
        chrome.storage.local.set({ visitedSites, totalLinks });
    }
});