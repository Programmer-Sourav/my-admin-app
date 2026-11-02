const API_BASE_URL = "http://localhost:3001";

async function fetchJson(endpoint, signal) {
  const response = await fetch(`${API_BASE_URL}/${endpoint}`, {
    method: "GET",
    headers: {
      Accept: "application/json"
    },
    signal
  });

  if (!response.ok) {
    throw new Error(
      `Failed to fetch ${endpoint}: ${response.status} ${response.statusText}`
    );
  }

  return response.json();
}

export async function fetchAnalyticsData(signal) {
  const [
    registrationData,
    departmentData,
    userStatusData,
    revenueData
  ] = await Promise.all([
    fetchJson("registrationData", signal),
    fetchJson("departmentData", signal),
    fetchJson("userStatusData", signal),
    fetchJson("revenueData", signal)
  ]);

  return {
    registrationData,
    departmentData,
    userStatusData,
    revenueData
  };
}