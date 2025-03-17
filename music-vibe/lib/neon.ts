import { neon, neonConfig } from '@neondatabase/serverless';

// Configure Neon client
neonConfig.fetchConnectionCache = true;

// Create a SQL tagged template function for use with the Neon serverless driver
export const sql = neon(process.env.DATABASE_URL!);

// Export the function to be used in API routes
export default sql;