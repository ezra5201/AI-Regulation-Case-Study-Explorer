/**
 * Tab switching functionality
 * Opens the selected tab content and updates active tab styling
 */
function openTab(evt, tabName) {
    var i, tabcontent, tabbuttons;
    
    // Hide all tab content
    tabcontent = document.getElementsByClassName("tab-content");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    
    // Remove "active" class from all tab buttons
    tabbuttons = document.getElementsByClassName("tab-button");
    for (i = 0; i < tabbuttons.length; i++) {
        tabbuttons[i].className = tabbuttons[i].className.replace(" active", "");
    }
    
    // Show the current tab, and add an "active" class to the button that opened the tab
    document.getElementById(tabName).style.display = "block";
    evt.currentTarget.className += " active";
}

/**
 * Case study selector functionality
 * Redirects to the selected case study page
 */
function changeCaseStudy() {
    const selector = document.getElementById('case-study-selector');
    const selectedValue = selector.value;
    if (selectedValue) {
        // This creates an absolute URL based on your site's base path
        window.location.href = selectedValue;
    }
}

/**
 * Document ready handler
 * Sets the correct case study option as selected based on current page
 */
document.addEventListener('DOMContentLoaded', function() {
    const selector = document.getElementById('case-study-selector');
    const currentPath = window.location.pathname;
    
    if (currentPath.includes('index')) {
        selector.value = '/reg-cs-explorer/index.html';
    } else if (currentPath.includes('colorado-aclu')) {
        selector.value = '/reg-cs-explorer/colorado-aclu.html';
    }
});
