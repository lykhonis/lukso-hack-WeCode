import { useEffect, useState } from 'react';

export default function useAddress() {
  const [data, setData] = useState(null);

  useEffect(() => {
    setData(localStorage.getItem('address'));
  }, []);

  return {
    address: data,
    setAddress: (newAddress) => {
      if (newAddress) {
        localStorage.setItem('address', newAddress);
      } else {
        localStorage.removeItem('address');
      }
      setData(newAddress);
    },
  };
}
