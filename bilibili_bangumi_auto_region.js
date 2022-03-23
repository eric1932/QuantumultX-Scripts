/**
 * 点击番剧/番剧页面切换 x 策略组到 y 代理
 * 首页刷新/小视频刷新/普通视频点击切换 x 策略组到 DIRECT
 * (判断是否为普通视频的依据是up主推荐栏 /x/v2/view/material)
 * 
 * 番剧 url
 * https://api.biliapi.net/pgc/page/module/mine?page=bangumi-tab
 * https://api.biliapi.net/pgc/view/v2/app/season
 * 
 * 其它 url
 * https://app.biliapi.net/x/v2/feed/index
 * https://app.bilibili.com/x/v2/feed/index/story
 * https://app.biliapi.net/x/v2/view/material
 * 
 * [rewrite_local]
 * ^https:\/\/ap(p|i)\.bili(bili|api)\.(com|net)\/(pgc\/(page\/module\/mine|view\/v2\/app\/season)|x\/v2\/(feed\/index(\/story)?|view\/material))\?access_key url script-request-header https://github.com/eric1932/QuantumultX-Scripts/raw/main/bilibili_bangumi_auto_region.js
 * 
 * [mitm]
 * hostname = ap?.biliapi.net, ap?.bilibili.com
 */

// var body = JSON.parse($response.body);
// // body: {data: {items: [idx: {ad_info & ad_type}]}}
// if (body.data && body.data.items) {
//     body.data.items = body.data.items.filter(
//         item =>
//             item.ad_info === undefined
//             && item.ad_type === undefined
//     )
// }
// $done({ body: JSON.stringify(body) });

// Change these
const ruleSet = 'StreamingSE';
const notify = false;



// CONSTANTS
const bangumiPathList = [
    '/pgc/page/module/mine',
    '/pgc/view/v2/app/season',
];
const regularPathList = [
    '/x/v2/feed/index',
    '/x/v2/feed/index/story',
    '/x/v2/view/material',
];

let url = new URL($request.url);
let pathName = url.pathname;
let searchParams = url.searchParams;

let targetArea;
if (bangumiPathList.includes(pathName)) {
    targetArea = 'PROXY';
} else if (regularPathList.includes(pathName)) {
    targetArea = 'DIRECT';
}

if (targetArea === undefined) {
    $done({})
} else {
    setPolicy(targetArea).then((change) => {
        let message = SwitchStatus(change, targetArea);
        if (notify) {
            $notify('哔哩哔哩番剧切换', '', message);
        } else {
            console.log('哔哩哔哩番剧切换', message)
        }
    }).finally(() => $done({}))
}

// --- func def ---
async function setPolicy(policy) {
    return new Promise((resolve) => {
        $configuration.sendMessage({
            action: "set_policy_state",
            content: {
                [ruleSet]: policy,
            }
        }).then((b) => resolve(!b.error || 0), () => resolve());
    })
}

function SwitchStatus(status, newPolicy) {
    if (status) {
        return `=> ${newPolicy} => 🟢`;
    } else if (status === 0) {
        return `切换失败, 子策略名未填写或填写有误 ⚠️`
    } else {
        return `策略切换失败, 未知错误 ⚠️`
    }
}
