import { useState, useEffect, useMemo } from "react";

export const useQuote = () => {
  const url = useMemo(() => {
    return process.env.REACT_APP_GET_QUOTE_URL;
  }, []);

  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`Response status: ${response.status}`);
        }
        const json = await response.json();
        const fetchedData = {
          content: json.content,
          author: json.author,
        };

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        setData(fetchedData);
      } catch (err) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, [url]);

  return { data, isLoading, error };
};
