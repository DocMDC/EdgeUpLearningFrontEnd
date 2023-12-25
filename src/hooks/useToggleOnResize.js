import { useState, useEffect } from 'react';

function useToggleOnResize(componentState, setComponentState) {

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 768) {
                setComponentState(false);
            }
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return componentState;
}

export default useToggleOnResize
