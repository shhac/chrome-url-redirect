const readParam = (urlStr, param) => {
    if (!urlStr) return null;
    const url = new URL(urlStr);
    return url.searchParams.get(param) || null;
}

const redirects = [
    {
        urls: [
            '*://www.googleadservices.com/pagead/aclk?*'
        ],
        params: [
            ['adurl']
        ]
    },
    {
        urls: [
            '*://clickserve.dartsearch.net/link/click?*'
        ],
        params: [
            ['clk'],
            ['h'],
            ['ds_dest_url']
        ]
    }
];

const handler = redirect => {
    const attempt = (list, url) => list.reduce(readParam, url);

    return function (details) {
        const redirectUrl = redirect.params
            .map(list => attempt(list, details.url))
            .find(item => item !== null);

        if (!redirectUrl) return;

        return {redirectUrl};
    }
};

redirects.forEach(redirect => {
    chrome.webRequest.onBeforeRequest.addListener(
        handler(redirect),
        {urls: redirect.urls},
        ['blocking']
    );
});
