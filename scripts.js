/* Add these new classes to your existing styles.css file */

/* Base site-main styles remain the same, but we'll add modifier classes */

/* Wide layout for table-heavy content */
.site-main.wide-layout {
  max-width: 1800px; /* Much wider for tables */
  width: 95%; /* Use more of the viewport */
  transition: max-width 0.3s ease, width 0.3s ease; /* Smooth transition */
}

/* Standard layout for text-heavy content (default) */
.site-main.standard-layout {
  max-width: 1200px; /* Current width for readability */
  width: 90%; /* Current width */
  transition: max-width 0.3s ease, width 0.3s ease; /* Smooth transition */
}

/* Responsive adjustments for wide layout */
@media (max-width: 1400px) {
  .site-main.wide-layout {
    width: 98%; /* Use even more space on smaller screens */
  }
}

@media (max-width: 992px) {
  .site-main.wide-layout {
    width: 95%; /* Match standard layout on tablets */
    max-width: 1200px; /* Revert to standard max-width on tablets */
  }
}

@media (max-width: 768px) {
  .site-main.wide-layout {
    width: 95%; /* Same as standard on mobile */
    max-width: none; /* Remove max-width constraint on mobile */
  }
}

/* Optional: Enhance table responsiveness in wide layout */
.wide-layout .table-responsive-wrapper {
  /* Tables can be even wider in wide layout */
  margin-left: calc(-1 * var(--spacing-unit));
  margin-right: calc(-1 * var(--spacing-unit));
}

.wide-layout .table-responsive-wrapper table {
  min-width: 1000px; /* Slightly wider minimum for tables in wide layout */
}

/* Optional: Adjust tab content padding in wide layout */
.wide-layout .tab-content {
  padding-left: calc(var(--spacing-unit) * 2);
  padding-right: calc(var(--spacing-unit) * 2);
}
