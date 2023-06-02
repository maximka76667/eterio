import { useState, useEffect } from 'react';

const useToken = () => {
  const [token, setToken] = useState<string | null>(
    localStorage.getItem('access-token')
  );

  function onTokenChange(newToken: string) {
    localStorage.setItem('access-token', newToken);
    setToken(newToken);
  }

  useEffect(() => {
    // Check token
    const token = localStorage.getItem('access-token');

    if (token === null) {
      return;
    }

    setToken(token);
  }, []);

  return { token, onTokenChange };
};

export default useToken;
