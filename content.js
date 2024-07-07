const logLinks = () => {
    const links = Array.from(document.getElementsByTagName('a')).map(link => link.href);
    chrome.runtime.sendMessage({ type: 'LOG_LINKS', url: window.location.href, links });
};

logLinks();

const observer = new MutationObserver(logLinks);
observer.observe(document.body, { childList: true, subtree: true });