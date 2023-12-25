import { useEffect } from 'react';

function useClickOutNav(navRef, buttonRef, callback) {
  useEffect(() => {
    function handleClickOutside(event) {
        if (buttonRef.current && buttonRef.current.contains(event.target)) {
            return
        }

        if (navRef.current && !navRef.current.contains(event.target)) {
            callback();
        }
    }

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, [navRef, buttonRef, callback]);
}

export default useClickOutNav;
