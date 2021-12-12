import { useEffect, useRef } from "react";

export default (callback: () => void, delay: number) => {
    const savedCallback = useRef<() => void>();

    // Remember the latest callback.
    useEffect(() => {
        savedCallback.current = callback;
    }, [callback]);

    // Set up the interval.
    useEffect(() => {
        if (delay) {
            // the lambda is needed to respect the latest version of savedcallback
            const interval = setInterval(() => savedCallback.current(), delay);
            return () => clearInterval(interval);
        }
    }, [delay]);
}