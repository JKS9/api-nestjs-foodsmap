/**
 * Export a function that returns a configuration object.
 */
export const config = () => ({
  /**
   * Configuration for the 'app' section.
   */
  app: {
    /**
     * Retrieve the port value from the environment variables.
     * This will be used as the port for the application.
     */
    port: process.env.PORT,
  },
});
