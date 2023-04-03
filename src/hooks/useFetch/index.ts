import { API_URL } from "data/constants";
import { useState, useCallback } from "react";


interface Error {
    errors: { [key: string]: string[] };
    message: string;
    status: boolean;
}
const useFetch = (url: string, options: any, dataFunc: (f: any) => void) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<Error>();
    const fetchData = useCallback(async () => {
        setLoading(true);
        if (url && options) {

            try {
                const response = await fetch(`${API_URL}${url}`, {
                    method: options.method || "GET",
                    headers: {
                        accept: "application/json",
                        "content-type": "application/json",
                        ...options.headers,
                    },
                    body: JSON.stringify(options.body)
                });
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
