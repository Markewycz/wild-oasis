import { useEffect, useRef } from 'react';

type HandlerType = () => void;

export function useOutsideClick(handler: HandlerType, listenCapturing = true) {
  const ref = useRef<HTMLUListElement | null>(null);

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    function handleClick(e: any) {
      if (ref.current && !ref.current.contains(e.target)) handler();
    }

    document.addEventListener('click', handleClick, listenCapturing);

    return () => {
      document.removeEventListener('click', handleClick, listenCapturing);
    };
  }, [handler]);

  return { ref };
}
