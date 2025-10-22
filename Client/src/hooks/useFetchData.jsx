import { useEffect, useState } from "react";
// sessions use cookies; include credentials on fetch

export default function useFetchData(url) {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const res = await fetch(url, {
                    credentials: 'include',
                });

                const result = await res.json();

                if (!res.ok) {
                    throw new Error(result.message + "🤢");
                }

                setData(result.data);
                setLoading(false);
            } catch (error) {
                setLoading(false);
                setError(error.message);
            }
        };
        fetchData();
    }, [url]);
    return { data, loading, error };
};




