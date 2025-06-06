// Tab functionality for the Regulatory Case Study Explorer
document.addEventListener('DOMContentLoaded', function() {
  
  // Get all tab buttons and content sections
  const tabButtons = document.querySelectorAll('.tab-button');
  const tabContents = document.querySelectorAll('.tab-content');
  const siteMain = document.querySelector('.site-main');

  // Tabs that should use wide layout (for tables)
  const wideLayoutTabs = ['service-blueprint', 'compliance-heatmap', 'developers', 'deployer'];

function showTab(targetTabId) {
  // Hide all tab contents
  tabContents.forEach(content => {
    content.style.display = 'none';
    content.setAttribute('aria-hidden', 'true');
  });

  // Deactivate all tab buttons
  tabButtons.forEach(button => {
    button.classList.remove('active');
    button.setAttribute('aria-selected', 'false');
  });

  // Show the target tab content
  const targetContent = document.getElementById(targetTabId);
  if (targetContent) {
    targetContent.style.display = 'block';
    targetContent.setAttribute('aria-hidden', 'false');
  }

  // Activate the corresponding button
  const targetButton = document.getElementById(`tab-${targetTabId}`);
  if (targetButton) {
    targetButton.classList.add('active');
    targetButton.setAttribute('aria-selected', 'true');
  }

  // Apply appropriate layout class based on tab type
  if (siteMain) {
    if (wideLayoutTabs.includes(targetTabId)) {
      siteMain.classList.remove('standard-layout');
      siteMain.classList.add('wide-layout');
    } else {
      siteMain.classList.remove('wide-layout');
      siteMain.classList.add('standard-layout');
    }
  }

  // Smooth scroll to top of tab container when switching tabs
  const tabContainer = document.querySelector('.tab-container');
  if (tabContainer) {
    tabContainer.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  }

  // Focus the tab content for accessibility (after scroll animation)
  if (targetContent) {
    setTimeout(() => {
      targetContent.focus();
    }, 300); // Delay to allow smooth scroll to complete
  }
}

  // Add click event listeners to all tab buttons
  tabButtons.forEach(button => {
    button.addEventListener('click', function(e) {
      e.preventDefault();
      
      // Get the target tab ID from the button's controls attribute
      const targetTabId = this.getAttribute('aria-controls');
      if (targetTabId) {
        showTab(targetTabId);
      }
    });

    // Add keyboard navigation support
    button.addEventListener('keydown', function(e) {
      let targetButton = null;
      
      switch(e.key) {
        case 'ArrowRight':
        case 'ArrowDown':
          // Move to next tab
          const nextButton = this.nextElementSibling || tabButtons[0];
          targetButton = nextButton;
          break;
          
        case 'ArrowLeft':
        case 'ArrowUp':
          // Move to previous tab
          const prevButton = this.previousElementSibling || tabButtons[tabButtons.length - 1];
          targetButton = prevButton;
          break;
          
        case 'Home':
          // Move to first tab
          targetButton = tabButtons[0];
          break;
          
        case 'End':
          // Move to last tab
          targetButton = tabButtons[tabButtons.length - 1];
          break;
          
        default:
          return; // Don't prevent default for other keys
      }
      
      if (targetButton) {
        e.preventDefault();
        targetButton.focus();
        targetButton.click();
      }
    });
  });

  // Initialize the first tab as active on page load
  if (tabButtons.length > 0) {
    const firstTabId = tabButtons[0].getAttribute('aria-controls');
    if (firstTabId) {
      showTab(firstTabId);
    }
  }

  // Handle direct linking to tabs via hash in URL
  function handleHashChange() {
    const hash = window.location.hash.substring(1); // Remove the #
    if (hash && document.getElementById(hash)) {
      showTab(hash);
    }
  }

  // Listen for hash changes (for direct linking support)
  window.addEventListener('hashchange', handleHashChange);
  
  // Check if there's a hash on initial load
  if (window.location.hash) {
    handleHashChange();
  }

  // Optional: Update URL hash when tab changes (for bookmarking)
  tabButtons.forEach(button => {
    button.addEventListener('click', function() {
      const targetTabId = this.getAttribute('aria-controls');
      if (targetTabId && window.history && window.history.pushState) {
        // Update URL without triggering a page reload
        window.history.pushState(null, null, `#${targetTabId}`);
      }
    });
  });

  // Smooth scrolling for internal links (if any)
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href').substring(1);
      const targetElement = document.getElementById(targetId);
      
      if (targetElement) {
        e.preventDefault();
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });

  // Table responsive enhancements
  function enhanceTableAccessibility() {
    const tables = document.querySelectorAll('table');
    
    tables.forEach(table => {
      // Add role if not present
      if (!table.getAttribute('role')) {
        table.setAttribute('role', 'table');
      }
      
      // Ensure table headers have proper scope
      const headers = table.querySelectorAll('th');
      headers.forEach(header => {
        if (!header.getAttribute('scope')) {
          // Determine if it's a column or row header based on position
          const isFirstColumn = header.cellIndex === 0;
          header.setAttribute('scope', isFirstColumn ? 'row' : 'col');
        }
      });
    });
  }

  // Run table enhancements
  enhanceTableAccessibility();

  // Re-run table enhancements when tab content changes (in case tables are loaded dynamically)
  const observer = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
      if (mutation.type === 'childList') {
        enhanceTableAccessibility();
      }
    });
  });

  // Observe changes to tab content areas
  tabContents.forEach(content => {
    observer.observe(content, { childList: true, subtree: true });
  });

});

// End of the main DOMContentLoaded event listner

// Glossary functionality
const glossaryToggle = document.getElementById('glossary-toggle');
const glossaryClose = document.getElementById('glossary-close');
const glossaryPanel = document.getElementById('glossary-panel');
const glossaryOverlay = document.getElementById('glossary-overlay');

function openGlossary() {
  glossaryPanel.classList.add('open');
  glossaryPanel.setAttribute('aria-hidden', 'false');
  glossaryOverlay.classList.add('open');
  glossaryOverlay.setAttribute('aria-hidden', 'false');
  
  // Focus management for accessibility
  glossaryClose.focus();
  
  // Prevent body scroll when glossary is open
  document.body.style.overflow = 'hidden';
}

function closeGlossary() {
  glossaryPanel.classList.remove('open');
  glossaryPanel.setAttribute('aria-hidden', 'true');
  glossaryOverlay.classList.remove('open');
  glossaryOverlay.setAttribute('aria-hidden', 'true');
  
  // Restore body scroll
  document.body.style.overflow = '';
  
  // Return focus to toggle button
  glossaryToggle.focus();
}

// Event listeners
if (glossaryToggle && glossaryClose && glossaryPanel && glossaryOverlay) {
  glossaryToggle.addEventListener('click', openGlossary);
  glossaryClose.addEventListener('click', closeGlossary);
  glossaryOverlay.addEventListener('click', closeGlossary);
  
  // Close on Escape key
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && glossaryPanel.classList.contains('open')) {
      closeGlossary();
    }
  });
}

// Utility function to programmatically switch to a specific tab (can be called from console or other scripts)
function switchToTab(tabId) {
  const event = new CustomEvent('click');
  const button = document.getElementById(`tab-${tabId}`);
  if (button) {
    button.dispatchEvent(event);
  }
}

// Export for potential use in other scripts
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { switchToTab };
}
