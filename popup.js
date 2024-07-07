document.addEventListener('DOMContentLoaded', () => {
    chrome.storage.local.get(['visitedSites', 'totalLinks'], (data) => {
        document.getElementById('totalSites').textContent = Object.keys(data.visitedSites || {}).length;
        document.getElementById('totalLinks').textContent = data.totalLinks || 0;
    });

    document.getElementById('showDetails').addEventListener('click', () => {
        chrome.tabs.create({ url: 'details.html' });
    });
});