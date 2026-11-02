import { users } from "../data/mockData";

const CACHE_TTL = 30 * 1000;

const cache = new Map();

// Abort-aware mock API
const simulateApi = (data, signal) => {
  return new Promise((resolve, reject) => {
    if (signal?.aborted) {
      reject(new DOMException("Request aborted", "AbortError"));
      return;
    }

    const timer = setTimeout(() => {
      cleanup();
      resolve(data);
    }, 300);

    const onAbort = () => {
      clearTimeout(timer);
      cleanup();

      reject(new DOMException("Request aborted", "AbortError"));
    };

    const cleanup = () => {
      signal?.removeEventListener("abort", onAbort);
    };

    signal?.addEventListener("abort", onAbort, { once: true });
  });
};

// Cache helpers
const getCachedData = (key) => {
  const entry = cache.get(key);

  if (!entry) return null;

  if (Date.now() > entry.expiry) {
    cache.delete(key);
    return null;
  }

  return entry.data;
};

const setCachedData = (key, data) => {
  cache.set(key, {
    data,
    expiry: Date.now() + CACHE_TTL
  });
};

// API 1: Paginated users
export const fetchUsers = async ({
  offset,
  limit,
  search,
  sortBy,
  sortOrder,
  signal
}) => {
  const cacheKey = JSON.stringify({
    offset,
    limit,
    search,
    sortBy,
    sortOrder
  });

  const cached = getCachedData(cacheKey);

  if (cached) {
    if (signal?.aborted) {
      throw new DOMException("Request aborted", "AbortError");
    }

    return cached;
  }

  let result = [...users];

  // Search
  if (search) {
    const keyword = search.toLowerCase();

    result = result.filter((user) =>
      [
        user.name,
        user.email,
        user.department
      ].some((value) => value.toLowerCase().includes(keyword))
    );
  }

  // Sorting
  result.sort((a, b) => {
    const valueA = a[sortBy];
    const valueB = b[sortBy];

    const comparison =
      typeof valueA === "number"
        ? valueA - valueB
        : String(valueA).localeCompare(String(valueB));

    return sortOrder === "asc" ? comparison : -comparison;
  });

  const total = result.length;

  // Offset pagination
  const data = result.slice(offset, offset + limit);

  const response = {
    data,
    total,
    offset,
    limit
  };

  const apiResponse = await simulateApi(response, signal);

  if (!signal?.aborted) {
    setCachedData(cacheKey, apiResponse);
  }

  return apiResponse;
};

// API 2: Dashboard statistics
export const fetchDashboardStats = async ({ signal } = {}) => {
  const cacheKey = "dashboard-stats";

  const cached = getCachedData(cacheKey);

  if (cached) {
    if (signal?.aborted) {
      throw new DOMException("Request aborted", "AbortError");
    }

    return cached;
  }

  const response = {
    totalUsers: users.length,

    activeUsers: users.filter(
      (user) => user.status === "Active"
    ).length,

    inactiveUsers: users.filter(
      (user) => user.status === "Inactive"
    ).length,

    pendingUsers: users.filter(
      (user) => user.status === "Pending"
    ).length
  };

  const apiResponse = await simulateApi(response, signal);

  if (!signal?.aborted) {
    setCachedData(cacheKey, apiResponse);
  }

  return apiResponse;
};

// Cache invalidation
export const clearDashboardCache = () => {
  cache.clear();
};