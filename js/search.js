function searchKeyword() {
    // Get the search keyword
    let keyword = document.getElementById('search-input').value;
    if (!keyword) {
        alert('Please enter a keyword to search.');
        return;
    }

    // Remove previous highlights
    removeHighlights();

    // Highlight the keyword
    highlightKeyword(keyword);
}

function highlightKeyword(keyword) {
    let bodyText = document.body.innerHTML;
    let regex = new RegExp(`(${keyword})`, 'gi');
    let highlightedText = bodyText.replace(regex, '<span class="highlight">$1</span>');
    document.body.innerHTML = highlightedText;
}

function removeHighlights() {
    let highlightedElements = document.querySelectorAll('.highlight');
    highlightedElements.forEach(element => {
        element.outerHTML = element.innerHTML;
    });
}
