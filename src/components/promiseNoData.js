function promiseNoData(promise, data = null, error = null) {
    if (!promise) {
        return <span>no data</span>;
    }
    if (Array.isArray(data) && data.length === 0) {
        return <span>no results</span>;
    }
    if (!data && !error) {
        return (
            <img
                src="http://www.csc.kth.se/~cristi/loading.gif"
                alt="Loading data..."
            />
        );
    }
    if (error) {
        return <span>{error}</span>;
    }
    return false;
}

export default promiseNoData;