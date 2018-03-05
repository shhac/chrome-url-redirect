const rules = [
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

export default rules;
