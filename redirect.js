const readParam = (urlStr, param) => {
    const url = new URL(urlStr);
    return url.searchParams.get(param);
}

const redirects = [
    {
        urls: [
            '*://www.googleadservices.com/pagead/aclk?*'
        ],
        param: 'adurl'
    },
    {
        urls: [
            '*://clickserve.dartsearch.net/link/click?*'
        ],
        param: 'clk'
    }
];

redirects.forEach(redirect => {
    chrome.webRequest.onBeforeRequest.addListener(
        function (details) {
            const redirectUrl = readParam(details.url, redirect.param);
            if (!redirectUrl) return;
            return {redirectUrl};
        },
        {urls: redirect.urls},
        ['blocking']
    );
});
