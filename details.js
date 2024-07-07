document.addEventListener('DOMContentLoaded', () => {
    chrome.storage.local.get(['visitedSites'], (data) => {
        const table = document.getElementById('detailsTable');
        const visitedSites = data.visitedSites || {};

        for (const [site, info] of Object.entries(visitedSites)) {
            for (const link of info.links) {
                const row = document.createElement('tr');
                const siteCell = document.createElement('td');
                const linkCell = document.createElement('td');
                const countCell = document.createElement('td');

                siteCell.textContent = site;
                linkCell.textContent = link;
                countCell.textContent = info.count;

                row.appendChild(siteCell);
                row.appendChild(linkCell);
                row.appendChild(countCell);
                table.appendChild(row);
            }
        }
    });
});