/*
哔哩哔哩 去除主页广告 & 关键字屏蔽

***************************
QuantumultX:

[rewrite_local]
^https?:\/\/ap(p|i)\.bili(bili|api)\.(com|net)\/x\/v2\/feed\/index url script-response-body https://github.com/eric1932/QuantumultX-Scripts/raw/main/bilibili_feed_index.js

[mitm]
hostname = ap?.biliapi.net, ap?.bilibili.com

***************************
Surge4 or Loon:

[Script]
http-response ^https?:\/\/ap(p|i)\.bili(bili|api)\.(com|net)\/x\/v2\/feed\/index requires-body=1,max-size=0,script-path=https://github.com/eric1932/QuantumultX-Scripts/raw/main/bilibili_feed_index.js

[MITM]
hostname = ap?.biliapi.net, ap?.bilibili.com

**************************/

/* refs
https://stackoverflow.com/a/5582621/8448191
*/

const author = [
    '共青团',
];
const authorReg = new RegExp(author.join('|'));

var body = JSON.parse($response.body);
// body: {data: {items: [{..., ad_info: {...}}]}}
if (body.data && body.data.items) {
    body.data.items = body.data.items.filter(
        item =>
            item.ad_info === undefined  // ad_info not exist -> not an ad
            && (!item.args  // if item.args defined, go next; else pass (keep)
                || !item.args.up_name  // if item.args.up_name defined, go next; else pass (keep)
                || !authorReg.test(item.args.up_name))  // filter by author blacklist; if match, filter out
    )
};
$done({ body: JSON.stringify(body) });
