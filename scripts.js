/**
 * Manages tab switching functionality, including ARIA attributes and keyboard navigation.
 */
function setupTabs() {
    const tabContainers = document.querySelectorAll('.tab-container');

    tabContainers.forEach(tabContainer => {
        const tablist = tabContainer.querySelector('.tab-buttons[role="tablist"]');
        if (!tablist) return;

        const tabs = Array.from(tablist.querySelectorAll('.tab-button[role="tab"]'));
        const tabPanels = Array.from(tabContainer.querySelectorAll('.tab-content[role="tabpanel"]'));
        let currentTabIndex = tabs.findIndex(tab => tab.classList.contains('active'));

        if (currentTabIndex === -1 && tabs.length > 0) {
            // If no tab is active, activate the first one
            activateTab(tabs[0], false);
            currentTabIndex = 0;
        } else if (currentTabIndex !== -1 && tabs.length > 0) {
            // Ensure initially active tab is correctly set up
            activateTab(tabs[currentTabIndex], false);
        }

        function activateTab(selectedTab, setFocus = true) {
            // Deactivate all other tabs
            tabs.forEach((tab, index) => {
                const panel = tabContainer.querySelector(`#${tab.getAttribute('aria-controls')}`);
                if (tab === selectedTab) {
                    tab.classList.add('active');
                    tab.setAttribute('aria-selected', 'true');
                    tab.setAttribute('tabindex', '0');
                    if (panel) {
                        panel.classList.add('active');
                        panel.style.display = 'block';
                        panel.setAttribute('aria-hidden', 'false');
                    }
                    currentTabIndex = index;
                    if (setFocus) {
                        tab.focus();
                    }
                } else {
                    tab.classList.remove('active');
                    tab.setAttribute('aria-selected', 'false');
                    tab.setAttribute('tabindex', '-1');
                    if (panel) {
                        panel.classList.remove('active');
                        panel.style.display = 'none';
                        panel.setAttribute('aria-hidden', 'true');
                    }
                }
            });
        }

        tabs.forEach(tab => {
            tab.addEventListener('click', (event) => {
                activateTab(event.currentTarget);
            });

            tab.addEventListener('keydown', (event) => {
                let newTabIndex = currentTabIndex;
                let RLT = false; // Right-to-left language check, default false

                // Basic key navigation (ArrowLeft, ArrowRight, Home, End)
                if (event.key === (RLT ? 'ArrowRight' : 'ArrowLeft')) {
                    newTabIndex = (currentTabIndex - 1 + tabs.length) % tabs.length;
                } else if (event.key === (RLT ? 'ArrowLeft' : 'ArrowRight')) {
                    newTabIndex = (currentTabIndex + 1) % tabs.length;
                } else if (event.key === 'Home') {
                    newTabIndex = 0;
                } else if (event.key === 'End') {
                    newTabIndex = tabs.length - 1;
                } else {
                    return; // Not a relevant key for tab navigation
                }

                event.preventDefault();
                activateTab(tabs[newTabIndex]);
            });
        });

        // Initialize the first tab if no active tab is found
        const activeTabButton = tablist.querySelector('.tab-button.active');
        if (activeTabButton) {
            const panelId = activeTabButton.getAttribute('aria-controls');
            const activePanel = tabContainer.querySelector(`#${panelId}`);
            if (activePanel) {
                activePanel.style.display = 'block';
                activePanel.setAttribute('aria-hidden', 'false');
            }
            // Set tabindex for initially active and inactive tabs
            tabs.forEach(tab => {
                if (tab === activeTabButton) {
                    tab.setAttribute('tabindex', '0');
                } else {
                    tab.setAttribute('tabindex', '-1');
                }
            });
        } else if (tabs.length > 0) {
            // If no tab was marked active in HTML, activate the first one by default
            activateTab(tabs[0], false);
        }
    });
}

document.addEventListener('DOMContentLoaded', function() {
    setupTabs();
});
