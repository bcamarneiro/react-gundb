import { useContext } from 'react';
import GunContext from '../Context';

const useGun = () => {
  const gun = useContext(GunContext);
  if (!gun) {
    throw new Error('useGun must be used within a GunProvider');
  }

  return gun;
};

export default useGun;
