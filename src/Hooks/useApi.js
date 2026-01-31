// src/hooks/useApi.js
import { useState, useEffect, useRef } from "react";
import { api, api$ } from "../APIs/apiService";
import { useSnackbar } from "../Context/SnackbarContext";

/**
 * Hook for Promise-based API calls (GET, POST, etc.)
 * Automatically handles loading and errors
 */
export function useApiPromise() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { setSnackbar } = useSnackbar();


  /**
   * @param {Function} fn - async function returning a Promise (e.g., () => api.get('/endpoint'))
   */

  const run = async (fn,successMessage = "") => {
    setLoading(true);

    setError(null);
    try {
      const result = await fn();
      if (result?.status === false) {
       
        const errorMessage = result.message || "Something went wrong";
        setSnackbar({ open: true, message: errorMessage, type: "error" });
        throw new Error(errorMessage);
      }
      if (successMessage) {
        setSnackbar({ open: true, message: successMessage, type: "success" });
      }

      return result;
    } catch (err) {
      const errorMessage =
        err.response?.data?.message || err.message || "Something went wrong";
      setSnackbar({ open: true, message: errorMessage, type: "error" });
      setError(errorMessage);

      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, run };
}

export function useApiObservable(observableFactory, deps = []) {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const subRef = useRef(null);

  useEffect(() => {
    setLoading(true);
    setError(null);

    const obs = observableFactory();
    subRef.current = obs.subscribe({
      next: (v) => {
        setData(v);
        setLoading(false);
      },
      error: (e) => {
        setError(e);
        setLoading(false);
      },
    });

    return () => {
      subRef.current?.unsubscribe?.();
      subRef.current?.cancel?.();
    };
  }, deps);

  return { data, error, loading };
}

export function useApiGet(url, config = {}, deps = []) {
  return useApiObservable(() => api$.get(url, config), deps);
}

export function useApiPost(url, payload = {}, config = {}, deps = []) {
  return useApiObservable(() => api$.post(url, payload, config), deps);
}
