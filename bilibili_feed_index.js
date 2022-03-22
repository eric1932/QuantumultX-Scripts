/*
哔哩哔哩 去除主页广告 & 关键字屏蔽

***************************
QuantumultX:

[rewrite_local]
^https?:\/\/app\.bilibili\.com\/x\/v2\/feed\/index url script-response-body https://github.com/eric1932/QuantumultX-Scripts/raw/main/bilibili_feed_index.js

[mitm]
hostname = app.bilibili.com

***************************
Surge4 or Loon:

[Script]
http-response ^https?:\/\/app\.bilibili\.com\/x\/v2\/feed\/index requires-body=1,max-size=0,script-path=https://github.com/eric1932/QuantumultX-Scripts/raw/main/bilibili_feed_index.js

[MITM]
hostname = app.bilibili.com

**************************/

var body = JSON.parse($response.body);
// body: {data: {items: [{..., ad_info: {...}}]}}
if (body.data && body.data.items) {
    body.data.items = body.data.items.filter(
        item => item.ad_info === undefined
    )
}
$done({ body: JSON.stringify(body) });
