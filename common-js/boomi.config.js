export default {
  enableAi: true,
  theme: {
    allowThemes: true,
    defaultTheme: 'dark',
  },
  components: {
    integrationsDashboard: {
      integrations: {
        showHeader: false,
        defaultView: 'table',
        integration: {
          showControls: false,
        },
      },
    },
    integrationsPage: {
      integrations: {
        showHeader: true,
        defaultView: 'grid',
        header: {
          showTitle: false,
          showDescription: false,
        },
      },
      mapping: {
        useTreeMode: true,
      },
    },
  },
  // Per-theme overrides
  cssVarsByTheme: {
    /* ---------- Custom: Oem Theme (Dark-aligned) ---------- */
    oem: {
      /* Font */
      "--boomi-font":
        'ui-sans-serif, system-ui, -apple-system, "Segoe UI", Inter, Roboto, "Helvetica Neue", Arial, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
      "--default-font-family": "var(--boomi-font)",

      /* Root / Page (dark tokens) */
      "--boomi-root-bg-color": "#0b1220",
      "--boomi-root-fg-color": "#e5e7eb",
      "--boomi-page-bg-color": "#0b1220",
      "--boomi-page-fg-color": "#e5e7eb",

      /* Header (subtle glass) */
      "--boomi-header-bg-color": "rgba(15, 23, 42, 0.8)",
      "--boomi-header-fg-color": "#e5e7eb",
      "--boomi-header-fg-hover": "#ffffff",
      "--boomi-header-border-color": "#1f2937",
      "--boomi-header-shadow": "0 12px 30px rgba(0,0,0,0.35)",

      /* Buttons */
      "--boomi-btn-primary-bg": "#2563eb",
      "--boomi-btn-primary-fg": "#ffffff",
      "--boomi-btn-primary-border": "#1f2937",
      "--boomi-btn-primary-shadow": "0 10px 18px rgba(37,99,235,0.35)",
      "--boomi-btn-primary-bg-hover": "#1d4ed8",
      "--boomi-btn-primary-bg-active": "#1a43bd",

      "--boomi-btn-secondary-bg": "#1f2937",
      "--boomi-btn-secondary-fg": "#e5e7eb",
      "--boomi-btn-secondary-border": "#374151",
      "--boomi-btn-secondary-shadow": "0 10px 18px rgba(2,6,23,0.35)",
      "--boomi-btn-secondary-bg-hover": "#27364a",
      "--boomi-btn-secondary-bg-active": "#223042",

      /* Inputs (set 1) */
      "--boomi-input-bg": "#0b1220",
      "--boomi-input-fg": "#e5e7eb",
      "--boomi-input-placeholder": "#9aa4b2",
      "--boomi-input-border": "#1f2937",
      "--boomi-input-shadow": "0 0 0 0 rgba(0,0,0,0)",
      "--boomi-input-border-focus": "#2563eb",
      "--boomi-input-shadow-focus": "0 0 0 4px rgba(37,99,235,0.12)",
      "--boomi-input-outline-focus": "transparent",

      /* Tables */
      "--boomi-table-header-bg": "#0f172a",
      "--boomi-table-header-fg": "#e5e7eb",
      "--boomi-table-header-border": "#1f2937",
      "--boomi-table-row-odd-bg": "#0b1220",
      "--boomi-table-row-even-bg": "#0f172a",
      "--boomi-table-row-hover-shadow": "0 8px 20px rgba(0,0,0,0.25)",

      /* Cards */
      "--boomi-card-border": "#1f2937",
      "--boomi-card-bg": "#0f172a",
      "--boomi-card-shadow": "0 12px 30px rgba(0,0,0,0.35)",
      "--boomi-card-hover-shadow": "0 18px 40px rgba(0,0,0,0.45)",
      "--boomi-card-hover-scale": "scale(1.02)",

      /* Menus */
      "--boomi-menu-bg": "#0f172a",
      "--boomi-menu-fg": "#e5e7eb",
      "--boomi-menu-border": "#1f2937",
      "--boomi-menu-shadow": "0 12px 30px rgba(0,0,0,0.35)",
      "--boomi-menu-item-bg": "transparent",
      "--boomi-menu-item-bg-hover": "rgba(37,99,235,0.12)",
      "--boomi-menu-item-fg": "#e5e7eb",
      "--boomi-menu-item-fg-hover": "#ffffff",
      "--boomi-menu-divider": "#1f2937",
      "--boomi-menu-danger-fg": "#fca5a5",
      "--boomi-menu-danger-fg-hover": "#f87171",
      "--boomi-menu-danger-bg-hover": "rgba(239,68,68,0.12)",

      /* Modal */
      "--boomi-modal-overlay-bg": "rgba(0, 0, 0, 0.6)",
      "--boomi-modal-bg": "#0f172a",
      "--boomi-modal-fg": "#e5e7eb",
      "--boomi-modal-border": "1px solid #1f2937",
      "--boomi-modal-shadow": "0 24px 48px rgba(0,0,0,0.6)",
      "--boomi-modal-close-fg": "#9aa4b2",
      "--boomi-modal-close-hover-fg": "#e5e7eb",

      /* Input (set 2) */
      "--boomi-input-border": "#1f2937",
      "--boomi-input-bg-disabled": "#111827",
      "--boomi-input-fg-disabled": "#6b7280",
      "--boomi-input-border-disabled": "#283445",
      "--boomi-input-border-invalid": "#ef4444",
      "--boomi-input-outline-invalid": "#fca5a5",

      /* Form text */
      "--boomi-form-label-fg": "#9aa4b2",
      "--boomi-form-helper-fg": "#9aa4b2",
      "--boomi-form-error-fg": "#f87171",
      "--boomi-form-required-fg": "#93c5fd",

      /* Select */
      "--boomi-select-bg": "#0f172a",
      "--boomi-select-fg": "#e5e7eb",
      "--boomi-select-border": "#1f2937",
      "--boomi-select-shadow": "0 0 0 0 rgba(0,0,0,0)",
      "--boomi-select-border-focus": "#2563eb",
      "--boomi-select-shadow-focus": "0 0 0 4px rgba(37,99,235,0.12)",
      "--boomi-select-icon": "#9aa4b2",
      "--boomi-options-bg": "#0b1220",
      "--boomi-options-fg": "#e5e7eb",
      "--boomi-options-border": "#1f2937",
      "--boomi-options-shadow": "0 12px 30px rgba(0,0,0,0.35)",
      "--boomi-options-search-bg": "#0f172a",
      "--boomi-option-bg-active": "rgba(37,99,235,0.12)",
      "--boomi-option-fg-selected": "#ffffff",

      /* Ajax Loader */
      "--boomi-loader-dot-bg": "#2563eb",
      "--boomi-loader-dot-size": "0.9rem",
      "--boomi-loader-dot1-opacity": "1",
      "--boomi-loader-dot2-opacity": "1",
      "--boomi-loader-dot3-opacity": "1",
      "--boomi-loader-msg-fg": "#e5e7eb",

      /* Spinner */
      "--boomi-spinner-overlay-bg": "rgba(0, 0, 0, 0.6)",
      "--boomi-spinner-ring-color": "#2563eb",
      "--boomi-spinner-ping-color": "#8b5cf6",
      "--boomi-spinner-message-fg": "#e5e7eb",
      "--boomi-spinner-size": "4.5rem",
      "--boomi-spinner-border-width": "5px",

      /* Wizard */
      "--boomi-wizard-step-dot-bg": "#1f2937",
      "--boomi-wizard-step-dot-fg": "#e5e7eb",
      "--boomi-wizard-step-dot-border": "#1f2937",
      "--boomi-wizard-step-dot-shadow": "0 0 0 0 rgba(0,0,0,0)",
      "--boomi-wizard-step-dot-bg-active": "#2563eb",
      "--boomi-wizard-step-dot-fg-active": "#ffffff",
      "--boomi-wizard-step-dot-border-active": "#2563eb",
      "--boomi-wizard-step-dot-shadow-active": "0 0 0 4px rgba(37,99,235,0.2)",
      "--boomi-wizard-step-dot-bg-completed": "#10b981",
      "--boomi-wizard-step-dot-fg-completed": "#0b1220",
      "--boomi-wizard-step-dot-border-completed": "#10b981",
      "--boomi-wizard-step-dot-shadow-completed": "0 0 0 4px rgba(16,185,129,0.2)",
      "--boomi-wizard-connector-bg": "#1f2937",
      "--boomi-wizard-label-fg": "#9aa4b2",
      "--boomi-wizard-card-bg": "#0b1220",
      "--boomi-wizard-card-fg": "#e5e7eb",
      "--boomi-wizard-card-border": "#1f2937",
      "--boomi-wizard-card-shadow": "0 12px 30px rgba(0,0,0,0.35)",
      "--boomi-wizard-link-fg": "#93c5fd",
      "--boomi-wizard-link-fg-hover": "#bfdbfe",
      "--boomi-wizard-link-strong-fg": "#e5e7eb",

      /* Notifications */
      "--boomi-notice-warning-bg": "#0f172a",
      "--boomi-notice-warning-fg": "#e5e7eb",
      "--boomi-notice-warning-border": "#f59e0b",
      "--boomi-notice-success-bg": "#0f172a",
      "--boomi-notice-success-fg": "#e5e7eb",
      "--boomi-notice-success-border": "#10b981",
      "--boomi-notice-error-bg": "#0f172a",
      "--boomi-notice-error-fg": "#e5e7eb",
      "--boomi-notice-error-border": "#ef4444",
      "--boomi-notice-shadow": "0 12px 30px rgba(0,0,0,0.35)",
      "--boomi-notice-radius": ".75rem",

      /* Update panel */
      "--boomi-update-bg": "#0f172a",
      "--boomi-update-fg": "#e5e7eb",
      "--boomi-update-border": "#1f2937",
      "--boomi-update-shadow": "0 12px 30px rgba(0,0,0,0.35)",
      "--boomi-update-title-fg": "#e5e7eb",
      "--boomi-update-desc-fg": "#9aa4b2",
      "--boomi-update-radius": ".75rem",
      "--boomi-update-content": "#e5e7eb",

      /* Tabs */
      "--boomi-tablist-border": "#1f2937",
      "--boomi-tab-bg": "#0f172a",
      "--boomi-tab-fg": "#e5e7eb",
      "--boomi-tab-border": "#1f2937",
      "--boomi-tab-bg-hover": "rgba(255,255,255,0.04)",
      "--boomi-tab-bg-active": "#2563eb",
      "--boomi-tab-fg-active": "#ffffff",
      "--boomi-tab-border-active": "#2563eb",

      /* Maps */
      "--boomi-accent": "#2563eb",
      "--boomi-muted": "#9aa4b2",
      "--boomi-map-line": "#334155",
      "--boomi-map-line-width": "2px",
      "--boomi-map-line-filter": "drop-shadow(0 2px 6px rgba(0,0,0,0.4))",
      "--boomi-map-heading-fg": "#e5e7eb",
      "--boomi-map-card-bg": "#0f172a",
      "--boomi-map-card-border": "#1f2937",
      "--boomi-map-card-shadow": "0 12px 30px rgba(0,0,0,0.35)",
      "--boomi-map-card-shadow-hover": "0 18px 40px rgba(0,0,0,0.45)",
      "--boomi-map-card-transform-hover": "translateY(-2px)",
      "--boomi-map-source-bg-mapped": "rgba(37,99,235,0.10)",
      "--boomi-map-source-border-mapped": "#2563eb",
      "--boomi-map-source-outline": "#2563eb",
      "--boomi-map-target-bg-mapped": "rgba(16,185,129,0.10)",
      "--boomi-map-target-border-mapped": "#10b981",
      "--boomi-map-target-outline": "#10b981",
      "--boomi-map-func-bg": "#0b1220",
      "--boomi-map-func-fg": "#e5e7eb",
      "--boomi-map-func-title-fg": "#93c5fd",
      "--boomi-map-pin-source-bg": "#2563eb",
      "--boomi-map-pin-target-bg": "#10b981",
      "--boomi-map-pin-input-bg": "#f59e0b",
      "--boomi-map-pin-output-bg": "#8b5cf6",
      "--boomi-map-pin-badge-bg": "#ef4444",
      "--boomi-map-pin-badge-fg": "#ffffff",
      "--boomi-map-pin-danger-bg": "#ef4444",
      "--boomi-map-pulse-color": "rgba(37,99,235,0.25)",
      "--boomi-map-pin-pulse": "boomi-map-pulse 1.1s ease-in-out infinite",
      "--boomi-map-add-bg": "#2563eb",
      "--boomi-map-add-fg": "#ffffff",
      "--boomi-map-add-border": "#2563eb",
      "--boomi-map-add-shadow": "0 10px 18px rgba(37,99,235,0.35)",
      "--boomi-map-add-bg-hover": "#1d4ed8",

      /* ---------- Schedule (dark) ---------- */
      "--boomi-sched-card-bg": "#0f172a",
      "--boomi-sched-card-fg": "#e5e7eb",
      "--boomi-sched-card-border": "#1f2937",
      "--boomi-sched-card-shadow": "0 12px 30px rgba(0,0,0,0.35)",
      "--boomi-sched-card-shadow-hover": "0 18px 40px rgba(0,0,0,0.45)",
      "--boomi-sched-card-radius": ".75rem",

      "--boomi-sched-header-bg": "#111827",
      "--boomi-sched-header-fg": "#e5e7eb",
      "--boomi-sched-header-border": "#1f2937",
      "--boomi-sched-header-shadow": "0 12px 30px rgba(0,0,0,0.35)",
      "--boomi-sched-toggle-fg": "#9aa4b2",
      "--boomi-sched-toggle-fg-hover": "#e5e7eb",

      "--boomi-sched-row-bg": "#0b1220",
      "--boomi-sched-row-border": "#1f2937",
      "--boomi-sched-row-shadow": "0 8px 20px rgba(0,0,0,0.25)",
      "--boomi-sched-row-hover-shadow": "0 12px 30px rgba(0,0,0,0.35)",

      "--boomi-sched-label-fg": "#9aa4b2",
      "--boomi-sched-helper-fg": "#9aa4b2",
      "--boomi-sched-error-fg": "#f87171",

      "--boomi-sched-select-bg": "#0f172a",
      "--boomi-sched-select-fg": "#e5e7eb",
      "--boomi-sched-select-border": "#1f2937",
      "--boomi-sched-select-shadow": "0 0 0 0 rgba(0,0,0,0)",
      "--boomi-sched-select-border-focus": "#2563eb",
      "--boomi-sched-select-shadow-focus": "0 0 0 4px rgba(37,99,235,0.12)",

      "--boomi-sched-input-bg": "#0b1220",
      "--boomi-sched-input-fg": "#e5e7eb",
      "--boomi-sched-input-border": "#1f2937",
      "--boomi-sched-input-shadow": "0 0 0 0 rgba(0,0,0,0)",
      "--boomi-sched-input-border-focus": "#2563eb",
      "--boomi-sched-input-shadow-focus": "0 0 0 4px rgba(37,99,235,0.12)",

      "--boomi-sched-checkbox-border": "#1f2937",
      "--boomi-sched-checkbox-bg": "#0f172a",
      "--boomi-sched-checkbox-bg-checked": "#2563eb",
      "--boomi-sched-checkbox-symbol": "#ffffff",

      "--boomi-sched-action-bg": "#2563eb",
      "--boomi-sched-action-fg": "#ffffff",
      "--boomi-sched-action-border": "#2563eb",
      "--boomi-sched-action-shadow": "0 10px 18px rgba(37,99,235,0.35)",
      "--boomi-sched-action-bg-hover": "#1d4ed8",

      /* ---------- Connector (dark) ---------- */
      "--boomi-conn-bg": "#0f172a",
      "--boomi-conn-border": "#1f2937",
      "--boomi-conn-card-shadow": "0 12px 30px rgba(0,0,0,0.35)",
      "--boomi-conn-heading-fg": "#e5e7eb",

      "--boomi-conn-field-bg": "#0b1220",
      "--boomi-conn-field-border": "#1f2937",
      "--boomi-conn-field-label-fg": "#e5e7eb",
      "--boomi-conn-field-error-fg": "#f87171",

      "--boomi-conn-btn-save-bg": "#10b981",
      "--boomi-conn-btn-save-fg": "#0b1220",
      "--boomi-conn-btn-auth-bg": "#2563eb",
      "--boomi-conn-btn-auth-fg": "#ffffff",
      "--boomi-conn-btn-disabled-bg": "#1f2937",
      "--boomi-conn-btn-disabled-fg": "#6b7280",

      /* ---------- SweetAlert (dark) ---------- */
      "--boomi-swal-bg": "#0f172a",
      "--boomi-swal-fg": "#e5e7eb",
      "--boomi-swal-border": "1px solid #1f2937",
      "--boomi-swal-shadow": "0 24px 48px rgba(0,0,0,0.6)",
      "--boomi-swal-title-fg": "#e5e7eb",
      "--boomi-swal-desc-fg": "#9aa4b2",
      "--boomi-swal-icon-success": "#10b981",
      "--boomi-swal-icon-warning": "#f59e0b",
      "--boomi-swal-icon-error": "#ef4444",
      "--boomi-swal-overlay-bg": "rgba(0, 0, 0, 0.5)",
    },
  },
};
