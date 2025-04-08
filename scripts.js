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
 * Redirects to the selected case study page immediately when selection changes
 */
function changeCaseStudy() {
    const selector = document.getElementById('case-study-selector');
    const selectedValue = selector.value;
    if (selectedValue) {
        // Navigate to the selected page immediately
        window.location.href = selectedValue;
    }
}

/**
 * Document ready handler
 * Sets the correct case study option as selected based on current page
 */
document.addEventListener('DOMContentLoaded', function() {
    const selector = document.getElementById('case-study-selector');
    if (!selector) return; // Exit if selector doesn't exist
    
    const currentPath = window.location.pathname;
    
    // Set the correct option based on the current page
    if (currentPath.includes('index.html') || currentPath.endsWith('/')) {
        selector.value = 'index.html';
    } else if (currentPath.includes('colorado-aclu')) {
        selector.value = 'colorado-aclu.html';
    }
    
    // Ensure tab switching works
    const tabButtons = document.getElementsByClassName('tab-button');
    for (let i = 0; i < tabButtons.length; i++) {
        tabButtons[i].addEventListener('click', function(event) {
            const tabName = this.getAttribute('onclick').split("'")[1];
            openTab(event, tabName);
        });
    }
});
