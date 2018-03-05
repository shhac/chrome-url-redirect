const readParam = (urlStr, param) => {
    if (!urlStr) return null;
    const url = new URL(urlStr);
    return url.searchParams.get(param) || null;
}

const attempt = url => list => list.reduce(readParam, url);

const handler = redirect => {
    return function (details) {
        const redirectUrl = redirect.params
            .map(attempt(details.url))
            .find(item => item !== null);

        if (!redirectUrl) return;

        return {redirectUrl};
    }
};

export default handler;
