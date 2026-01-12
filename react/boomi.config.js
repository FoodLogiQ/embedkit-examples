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
};
