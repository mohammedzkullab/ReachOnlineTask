import { useState, useCallback } from "react";

// interface FetchProps {
//     url: string;
//     options: any;
//     dataFunc: (f: any) => void
// }


const BASE_URL = "https://kayanpay.pro/api/v1"
const useFetch = (url: string, options: any, dataFunc: (f: any) => void) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const fetchData = useCallback(async () => {
        setLoading(true);
        if (url && options) {
            try {
                const response = await fetch(`${BASE_URL}${url}`, options);
                const recivedData = await response.json();
                if (response.ok) {
                    dataFunc(recivedData);
                } else if (response.status === 400) {
                    setError(recivedData);
                } else {
                    setError(recivedData);
                }
            } catch (e: any) {
                setError(e);
            } finally {
                setLoading(false);
            }
        }
    }, [dataFunc, options, url]);
    return { loading, error, fetchData };
};

export default useFetch;
