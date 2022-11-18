/*
淘宝去除浏览器唤起客户端

***************************
QuantumultX:

[rewrite_local]
^https://ugcdn.taobao.com/app/starlink/core/index.js url script-response-body https://github.com/eric1932/QuantumultX-Scripts/raw/main/taobao_web_fk.js

[mitm]
hostname = ugcdn.taobao.com

**************************/

// $response.body;: js text
let body = $response.body;
body = body.replace(/"?protocol"?:\s?"tbopen",?/g, "");
body = body.replace(/"?path"?:\s?"m.taobao.com\/tbopen\/index.html",?/g, "");

// validate
let x = body.search("tbopen");
if (x != -1) {
    console.error("淘宝替换失败")
    console.error(body.substring(x, x + 50));
}

$done({
    body: body,
}); 
