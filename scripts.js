/**
 * Tab switching functionality
 * Opens the selected tab content and updates active tab styling
 */
function openTab(evt, tabName) {
    // Hide all tab content
    const tabcontent = document.getElementsByClassName("tab-content");
    for (let i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
        tabcontent[i].setAttribute("aria-hidden", "true");
    }
    
    // Remove "active" class from all tab buttons and update aria-selected
    const tabbuttons = document.getElementsByClassName("tab-button");
    for (let i = 0; i < tabbuttons.length; i++) {
        tabbuttons[i].className = tabbuttons[i].className.replace(" active", "");
        tabbuttons[i].setAttribute("aria-selected", "false");
    }
    
    // Show the current tab and add an "active" class to the button that opened the tab
    document.getElementById(tabName).style.display = "block";
    document.getElementById(tabName).setAttribute("aria-hidden", "false");
    evt.currentTarget.className += " active";
    evt.currentTarget.setAttribute("aria-selected", "true");
}

/**
 * Document ready handler
 * Sets up tab event listeners and initializes the page
 */
document.addEventListener('DOMContentLoaded', function() {
    // Set up tab switching event listeners
    const tabButtons = document.querySelectorAll('.tab-button');
    tabButtons.forEach(button => {
        button.addEventListener('click', function(event) {
            const tabName = this.getAttribute('aria-controls');
            openTab(event, tabName);
        });
    });
    
    // Initialize the first tab as active by default (if none is already active)
    if (!document.querySelector('.tab-button.active')) {
        const firstTab = document.querySelector('.tab-button');
        if (firstTab) {
            const firstTabName = firstTab.getAttribute('aria-controls');
            // Simulate a click on the first tab
            firstTab.className += " active";
            firstTab.setAttribute("aria-selected", "true");
            const firstTabContent = document.getElementById(firstTabName);
            if (firstTabContent) {
                firstTabContent.style.display = "block";
                firstTabContent.setAttribute("aria-hidden", "false");
            }
        }
    }
});
