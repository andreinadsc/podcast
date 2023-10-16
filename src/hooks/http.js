import { useState, useCallback } from 'react';

const useHttp = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const sendRequest = useCallback(async (url, applyDataFn, jsonResponse = true) => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await fetch(`https://api.allorigins.win/get?url=${encodeURIComponent(url)}`);

            if (!response.ok) throw new Error('Request failed!');

            const data = jsonResponse ? await response.json() : await response.text();
            try {
                let results = JSON.parse(jsonResponse ? data.contents : data);
                if (!jsonResponse) {
                    let finalResult;

                    if (results.contents.includes('data:application/rss+xml')) {
                        finalResult = atob(results.contents.split('base64,')[1]);
                    } else finalResult = results.contents;

                    const podcastDocument = new DOMParser().parseFromString(finalResult, 'text/xml');
                    results = podcastDocument.getElementsByTagName('item');
                }

                applyDataFn(jsonResponse ? results.results : results);
            } catch (error) {
                throw new Error(error)
            }

        } catch (err) {
            setError(err?.message || err || 'Something went wrong!');
        }
        setIsLoading(false);
    }, []);

    return { isLoading, error, sendRequest };
};

export default useHttp;