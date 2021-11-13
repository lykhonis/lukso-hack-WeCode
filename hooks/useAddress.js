import { useEffect, useState } from 'react';

export default function useAddress() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const location = new URL(window.location.href);
    const address = location.searchParams.get('address');
    if (address) {
      localStorage.setItem('address', address);
    }

    setData(localStorage.getItem('address'));
  }, []);

  return {
    address: data,
    setAddress: (newAddress) => {
      localStorage.setItem('address', newAddress);
      setData(newAddress);
    },
  };
}
