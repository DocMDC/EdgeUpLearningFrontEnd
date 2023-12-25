import { useEffect } from 'react';

function useClickOutside(ref, callback) {
  useEffect(() => {
    function handleClickOutside(event) {
      console.log(ref.current)
      if (ref.current && !ref.current.contains(event.target)) {
        callback();
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, [ref, callback]);
}

export default useClickOutside;
