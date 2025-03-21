/**
 * Client-side API service layer
 * These services handle communication between frontend components and the backend API routes
 */
export * from './auth';
export * from './artists';
export * from './songs';
export * from './vibes';

export const resetDatabase = async () => {
  const response = await fetch("/api/reset", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Failed to reset database");
  }

  return await response.json();
};
