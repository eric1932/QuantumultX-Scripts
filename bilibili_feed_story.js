/*
哔哩哔哩 去除小视频流广告

***************************
QuantumultX:

[rewrite_local]
^https?:\/\/app\.bilibili\.com\/x\/v2\/feed\/index\/story url script-response-body https://github.com/eric1932/QuantumultX-Scripts/raw/main/bilibili_feed_story.js

[mitm]
hostname = app.bilibili.com

***************************
Surge4 or Loon:

[Script]
http-response ^https?:\/\/app\.bilibili\.com\/x\/v2\/feed\/index\/story requires-body=1,max-size=0,script-path=https://github.com/eric1932/QuantumultX-Scripts/raw/main/bilibili_feed_story.js

[MITM]
hostname = app.bilibili.com

**************************/

var body = JSON.parse($response.body);
// body: {data: {items: [idx: {ad_info & ad_type}]}}
if (body.data && body.data.items) {
    body.data.items = body.data.items.filter(
        item =>
            item.ad_info === undefined
            && item.ad_type === undefined
    )
}
$done({ body: JSON.stringify(body) }); 
