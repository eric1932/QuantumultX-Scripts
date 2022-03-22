/*
哔哩哔哩 去除小视频流广告

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

/* {
    "card_type": "cm_v2",
    "card_goto": "ad_web_s",
    "three_point": {
        "dislike_reasons": [{
            "id": 1,
            "name": "不感兴趣",
            "toast": "将减少相似内容推荐"
        }]
    },
    "args": {},
    "idx": num,
    "ad_info": {
        "creative_id": num,
        "creative_type": 2,
        "card_type": 3,
        "creative_content": {
            "title": "华人福利，全球送货，最快3天送到！",
            "description": "国内好货，最快三天达",
            "image_url": "https://i0.hdslb.com/bfs/sycp/creative_img/202110/45b84acfe717da7a20995367122f1f93.jpg",
            "image_md5": "4c71fbb5393ad61d7d6c47ef24e38366",
            "url": "https://apps.apple.com/cn/app/id1576642037",
            "click_url": "https://at.umtrack.com/99jKLz?cid=14895\u0026clickid=pbaes.Oel9t72cHUbEuwdQmYE2e32L7gHudCoP_sR3AVh8yKsy1SWXrygX1lpMB61wnjb6l-cU0dlzGkey3_x2Lb5QiiOWVJAWyCPdGCxa1HhxVcszTkWsnWY8iHoklSGQrd0B_8KPhgCKjczb1ngWgLRIzobaSC0_Ej6-5syG2tcmCwg\u0026idfa=6CA54DFE-EB2D-43A7-8FF2-272D810CF561\u0026ua=Mozilla%2F5.0%20%28iPhone%3B%20CPU%20iPhone%20OS%2015_4%20like%20Mac%20OS%20X%29%20AppleWebKit%2F613.1.17.0.7%20%28KHTML%2C%20like%20Gecko%29%20Mobile%2F19E241\u0026ip=130.126.255.57\u0026mac=__MAC1__\u0026s2s=1\u0026creative=96009041",
            "show_url": "https://gxbr.cnzz.com/app.htm?si=1232997\u0026gid=49164\u0026rpid=211032\u0026cid=14895\u0026ht=appview\u0026clickid=pbaes.Oel9t72cHUbEuwdQmYE2e32L7gHudCoP_sR3AVh8yKsy1SWXrygX1lpMB61wnjb6l-cU0dlzGkey3_x2Lb5QiiOWVJAWyCPdGCxa1HhxVcszTkWsnWY8iHoklSGQrd0B_8KPhgCKjczb1ngWgLRIzobaSC0_Ej6-5syG2tcmCwg\u0026idfa=6CA54DFE-EB2D-43A7-8FF2-272D810CF561\u0026ua=Mozilla%2F5.0%20%28iPhone%3B%20CPU%20iPhone%20OS%2015_4%20like%20Mac%20OS%20X%29%20AppleWebKit%2F613.1.17.0.7%20%28KHTML%2C%20like%20Gecko%29%20Mobile%2F19E241\u0026ip=130.126.255.57\u0026mac=__MAC1__\u0026s2s=1\u0026creative=96009041"
        },
        "ad_cb": "CPy2bxD36ssCGNH24y0gYCgBMKH1HzjoDkIhMTY0Nzk3NzI1MjIxM3ExNzJhMjVhMjQwYTEwMXEzNDI0SPWK5Zj7L1IJ5Y6E5be057qzWg/kvIrliKnor7rkvIrlt55iBue+juWbvWgBcAB4gICAgKALgAEDiAEAkgEOMTMwLjEyNi4yNTUuNTeaAdwgYWxsOmNwY19jcm93ZF90YXJnZXQscHBjdHI6cmVtYWluLGNhc3NpbmlNb2JpbGVEeW5hbWljQ1RSQ1ZSOnJ0LG5vX2FkOnVuZGVmaW5lZCxicnVzaF9kdXA6ZGVmYXVsdCxmZF9lY3BtOmNvbnN0YW50LGNwY19xdW90YTpjb25zdGFudCxmZF90aHJlc2hvbGQ6ZGVmYXVsdCxmZF9wY3RyOmxpdmUsc3RvcnlfY3RyOmJhc2Usc3RvcnlfY3ZyOmJhc2UsZHluX2N0cjpiYXNlLGR5bl9jdnI6cmVtYWluLHVmcmFtZV9jdHI6cmVtYWluLHVmY3ZyOnByb2cyLGN2cl9wOmJpbGlydCxkY3ZyZjplc21tMixjdnJfZjpvbmxpbmVfdGVzdCxjcGE6YmFzZSxjcGFEZWVwOmJhc2Usb2NweFV2Om5vZGlmZixvY3B4UmVjYWxsOnF1aWNrLFVWOnVuZGVmaW5lZCxoYXNoVVY6QyxwdjpBLGZsb3dfcmF0aW86cjMsZG1wX2FnZTphZ2Vfbm4sbkZlZEJhY2s6ZGVmYXVsdCxxaWZlaV9wZXJzb25hbDpiYXNlLHFpZmVpOmJhc2UsZmx5X2N0cl9pbmxpbmVfdGFyZ2V0Om9wZW4sZmx5X2N0cl9pbmxpbmU6bW9kZWwsZmx5X2N0cl9zZDptb2RlbCxpbm5lcl9lbmhhbmNlOmV4cDEsUlM6Y29uc3RhbnQsZmx5X2NvYXJzZTpsZWZ0LGZseV90cnVucGx1czppZGljdCxkcHM6ZGVmYXVsdCxvcGVuZmx5bmV3Om9wZW5fMixmbHlfcGN2cjpjb25zdCxmbHlfZmVlZGJhY2s6c3RvcnksZmx5X3NlbnNpX2ZyZXE6bWlkMTRkLGZseV9jcGFfcHA6cHBfcnRmbHksZmx5X2NwYV9zaWduOmNvbnN0YW50LGZseV9jcGFfc3Q6cnR2dixmbHlfY3BhOnBpZF9jcHAsaDVfdjpjb21wYXJlLHBFTjpQUixzRkJydToyLHRpbWVGcmVxOm5vX2xpbWl0LHV2VGVzdDphMixkQWR4OmRlZmF1bHQsdXNlR3JwYzp0cnVlLGZyZVM6YmFzZSxjb2Fyc2VfdDpkZWZhdWx0LGNvYXJzZTpjb25zdGFudDMsaGRldGFpbHM6YmFzZSxjcm93ZFM6QyxzbWFydGJpZDp1bmRlcmZyYW1lX3YyLGZseV9zbWFydGJpZDpkZWZhdWx0LGZseV9zcGVjaWFsZmVlZF90aHJlZDpjb25zdGFudCxmbHlfYXV0b19naWY6YmFzZSxidXBjcGNfZ3NwOmJhc2UsbGltaXRfYWR4OmRlZmF1bHQsbWV0OjMzNSxwY2htY3RyOnVhLHBjdmlkZW9jdHI6aG91cmx5LHBjaG1jdnI6cGNobV9ubixwY3ZwY3ZyOmFkZF9ydCxjYXNzaW5pQ1RSOmNvbnN0YW50LGNvYXJzZV9wcGN0cjpiYXNlLGNhc3NpbmlGZWVkc0NWUjpuZXdjb252MixjYXNzaW5pUGxheXBhZ2VDVlI6cnQyLGNhc3NpbmlFeHA6c21hbGxfYnVkZ2V0X2Nsb3NlLENyZWF0aXZlUXVhbGl0eTphdXRvLGdpZl9leHA6YmFzZSxwcm9nQ3JlYURpY3RWZXI6ZGVmYXVsdCxwcm9ncmFtQ3JlYXRpdmU6djIscHJvZ0NyZWFSYW5kb206YmFzZUFBLHByb2dDcmVhRmVlZEN0cjpWMyxwcm9nQ3JlYVBQQ3RyOm9wZW52MSxwcm9nQ3JlYVVkZkN2cjpkZWZhdWx0LHByb2dDcmVhUFBDdnI6ZGVmYXVsdCxwcm9nQ3JlYVN0b3J5OmRlZmF1bHQsVXNlQ29udGV4dEluZm9TdG9yeUZsYWc6b3Blbixwcm9nQ3JlYVQ6djAuOSxicmFuZEluZm9FeHA6ZGVmYXVsdCxkcGFIb3RQcm9kdWN0c0V4cEtleTpjbG9zZSxkcGFEZWR1cENsaWNrZWRVbml0OmJhc2VfdjIsZHBhMlJlY2FsbDpiYXNlX3YyLGRwYTI6Y2xvc2VDcm93ZCxyZXNlcnZlX3ByaWNlOmdzcF9hbGwscmlza0NhdGVnb3J5RnJlcUNvbnRyb2xVcGdyYWRlOmRlZmF1bHQscGVyc29uYVRoaXJkU3dpdGNoOmhvdF9lY3BtLHNlYXJjaFF1ZXJ5UnVsZTpjb25zdGFudCxmb3JjZUV4cG9zdXJlLWNhc3Npbmk6Y29uc3RhbnQsdW5kZXJfZnJhbWVfZWNwbV9leHA6YmFzZSxEcGFDcmVhdGl2ZVN0cmF0ZWd5RXhwZXJpbWVudDpkeW5hbWljX3N0cmF0ZWd5LERwYVByb2R1Y3RTb3J0TW9kZWw6Y2xvc2UsRGlzbGlrZVN0b3J5QWRCbGFja01pZDpjbG9zZSxBcHBDb2V4aXN0RmlsdGVyOmNsb3NlLHN3aXRjaEJzUGdSZXFSYXRpbzpvcGVuLHVzZUFzUGc6Y2xvc2UsYnNEdXBBZDpiYXNlLGJlc3RDcmVhdGl2ZTplY3BtMix1bmRlcmZyYW1lX2Rvd25sb2FkX2FkYnV0dG9uOmRlZmF1bHQsaW5saW5lRWNwbTpkZWZhdWx0LERwYVNlcnZlckV4cDphbm5fb3Blbl9zdXBwbHksRHBhQW5uRXhwZXJpbWVudDphbm5fb3Blbl9zdXBwbHksZHluYW1pY1RpbWVvdXRNaW5zOmRlZmF1bHQsc29ydF9kaXZlcnNpdHk6YWNjXzhfYnVkZ2V0XzE1X3doaXRlX3RydWUsQUFfVEVTVDphYV90ZXN0MV9iYXNlLHN0b3J5Q2FyZEluZGV4RXhwOjMsZHBhQ3JlYXRpdmVTZWxlY3RFeHA6ZXhwX3NlbGVjdF9tb2RlbF92MSxub0JpZEZvclNhbWVBY2NvdW50Q29uZjpkZWZhdWx0LGFjY291bnRfZXhwbG9yZV9zaG93X2xpbWl0OmRlZmF1bHQsY29hcnNlQ29udmVyc2lvblR5cGVXaGl0ZUNvbmZFeHA6b3Blbixib29zdFBybzpwaWQsY29hcnNlRXhwbG9yZUZhY3RvckNvbmY6ZGVmYXVsdCxuZXdfYWRfcHJpY2U6YmFzZSxzdG9yeWNvYXJzZTp1c2VyX3J0LGFkX2luaGVyaXQ6ZXhwMSx2aWRlb190ZW1wbGF0ZV9zdXBwb3J0OmV4cDMsY29hcnNlX2ZlZWRzX2x0cjpleHAsY29hcnNlX2xhc3RfYWRfZml4OmJhc2UsZHluYW1pY0NwY0ltYWdlRmFjdG9yOmV4cDIsY3BjMV9leHRlbmRlZDpkZWZhdWx0LGFzSW5saW5lRXhwOm9wZW4sY3Jvd2RfZWNwYzpjb25zdGFudCxkQWR4MTpkZWZhdWx0LHBwUHJvZ2NyZWFHcmFkZUNhcmRFeHA6YmFzZSxkb3dubG9hZF9idXR0b25fZGlzcGxheTpiYXNlLGVuYWJsZV9tdWx0aV9yZXRyaWV2ZV9yZXF1ZXN0OmJhc2Usb3R0X3NwbGFzaF9mcmVxOmJhc2UsdXNlckFkQWN0aW9uc09mZmxpbmVFeHA6YmFzZSx1c2VfbmV3X2ZseV9pY29uOmJhc2UsaWRjVGFnOnNoamQsZmVlZHNfbmV3X2J0bjpiYXNlLGR5bmFtaWNfZmVlZHNfc3R5bGVfZXhwOm5lZ2F0aXZlX2V4cDEsVW5pdERldGFpbEluZm86Y2xvc2Usc2NmOmJhc2UscXVhbGl0eV9nYW1lX2xpbWl0OmJhc2UsRHBhMlhpYW9taUZsb3dFeHBsb3JlOmNsb3NlLGVuYWJsZUNhcmR0eXBlRG93bmxvYWQ6YmFzZSxmYWN0X25lZ2F0aXZlOmJhc2UsZ2RfcGx1c19kYXZpbmNpOmJhc2UsZmVlZF9jYXJkaW5kZXhfZXhwOmJhc2UsUHJlZGljdENvc3RGaWx0ZXI6YmFzZSxkYWlodW9fZXh0ZW5kOmVhY2g1LHByb21vdGlvbl9iaWdfZXhwOm9wZW4sZmxvYXRPcHRpbWl6ZUV4cDpiYXNlLGZseV9saWtlX3RoOmNsb3NlLGNyZWF0aXZlX2NvbWJpbmU6YmFzZSxsb2dnaW5nX2FkaW5mb19saXN0OmJhc2UsRmx5VmlkZW9QbGF5RmlsdGVyRXhwQWx0OjVkNXMsdW5kZXJmcmFtZV9jb3B5cmlnaHQ6YmFzZSxlbmFibGVfYWx0X2RhdmluY2k6d2dxLHVuZGVyZnJhbWVfcHVsbF91cDpleHAsdmxhbmRpbmdwYWdlOmRlZmF1bHQzMSx0YXAzX3VybF9yZXBsYWNlX2V4cDpleHBfbmV3LGZseV9jb2Fyc2VfdnY6YmFzZSxzdG9yeV9zdHlsZV9zZWxlY3Q6dGhvbXBzb24sc3RvcnlRdWFsaXR5SW5mb0V4cDpiYXNlLGJsYWNrX2xpc3Rfc3NwOmJhc2VfYmxhY2tfbGlzdF90dW5uZWwsbkZlZEJhY2sxOmRlZmF1bHQsZ2RfcGx1c19idWRnZXRfYnVja2V0OmV4cDIsZmx5X2NvYXJzZV91cGdyYWRlOmlkaWN0LHNob3dHYW1lQ3VzdG9tVGV4dDpiYXNlLHNlYXJjaF9mcmVxOmV4cCxpZ25vcmVfZ2lmX3Jlc2lzdDpvcGVuLHJlZGlzT3ZlcmxvcmRFeHA6YmFzZSxtaWRfYWE6ZXhwXzEsc3RvcnlfYWR2ZXJfanVtcDpiYXNlXzAzMjIscHZfYWE6ZGVmYXVsdCxzZWFyY2hfYXBwX2ljb246YmFzZSxhbmRyb2lkX2dhbWVfcGFnZTpiYXNlLGlwYWRfZXhwOm9wZW4sZnJlcV90YWc6ZXhwLGNyZWF0aXZlX3NjZW5lX2ZhY3RvcjpiYXNlLG5ld19jcmVhdGl2ZV90YWI6ZXhwNV81MDAsc3RvcnlfYnV0dG9uX2V4cDpleHBfMCxyZXFfbG9nX3JhdGlvOmJhc2UsY2FsbHVwX2pkX2FjY291bnQ6ZXhwLGRwYVVuZGVyZnJhbWVOZXdTdHlsZTpleHAyLGZseV9hdmlkX3N3aXRjaDpleHAsZmx5X2F2aWRfZnJlcV93aGl0ZWxpc3RfZXhwOm9wZW4sdmlkZW8ydGFiMzpiYXNlX25ld18wMzIyLHRpYW5tYV9jb3ZlcjpleHAsc2luZ2xlX3Jvd19lY3BtOmV4cCxzdG9yeV9idG5fZ2FtZV9leHA6ZXhwMSxjcmVhdGl2ZV9hdXRvX2dpZjpiYXNlMCxNb2RlbEZlYXR1cmVzSGl2ZUxvZzpjbG9zZSx1dl9hYTpleHBfMSxpb3NfcHVsbF91cDpleHAsZmx5X2ZlZWRzX2ludG9fc3Rvcnk6ZXhwMSxhZHhQbGF5UGFnZVJhc2lvOmV4cDAsY3JlYXRpdmVfYXZpZF90YWIzOmJhc2UsY29hcnNlc29ydF9jdHJ0X2V4cDphbGxfZXhwLG5ld0JzRmlsdGVyTG9nOmNsb3NlLHBsYXRmb3JtOmRlZmF1bHRfMzAwoAFYqAFpsgEgMii31QrOPpPZFnrLnvZ/OdFDClPLCIekyNHDCzFK7xW6ASpodHRwczovL2FwcHMuYXBwbGUuY29tL2NuL2FwcC9pZDE1NzY2NDIwMzfCAQMzMTfSAQDYAVrgAYCU69wD6AGgjQbwAQD4AU2AAgSIAgCSAvsCNDk3ODk5N18xNjQ3ODk2MzU5LDUzNjU3MjlfMTY0Nzg5NjgxOCw1NDAyMDAwXzE2NDc4OTY5NzQsNTQzOTA3Ml8xNjQ3OTAwMjk5LDU0NTg5MzdfMTY0NzkwMDMxMiw0OTc4ODU4XzE2NDc5MDAzMzgsNTA3NDk1MF8xNjQ3OTAwNDI5LDQ5OTU2NzNfMTY0NzkwMDQzNyw1NDgwODg1XzE2NDc5MjA2MDYsNTQ2NjAyM18xNjQ3OTMxNjU4LDQ0ODgwNjFfMTY0NzkzMjYyNiw1MzYxMTA0XzE2NDc5MzI5MDIsNDM0NjI4NV8xNjQ3OTY4ODU0LDUwMDczMTlfMTY0Nzk2ODg2Nyw0MzQxMzMyXzE2NDc5Njg4NzAsNTQ4MzQ5N18xNjQ3OTY4NjQ3LDU0OTc0MzhfMTY0Nzk2OTUyNyw1NTA0Mzc3XzE2NDc5NzE4MTEsNTQzNjgwMV8xNjQ3OTcyNTM1LDU0OTcwODVfMTY0Nzk3NzIzNJgC+asBoAJ5qAJGsAIAuAIAwALAmgzIAvYE6gIBN/gCul+IAwaSAwCoAwCwAwC4AwDIAxfSA48BeyIxIjoiOTYwMDkwNDEiLCIxMiI6IjE4OTYiLCIxMyI6IjUyNDMyMSIsIjE0IjoiNzEiLCIxNSI6Ijk0IiwiMTYiOiI1MjQzMjFfMTIyMTgiLCIyIjoiNTIyOTEzIiwiMyI6IjQ2NDciLCI0IjoiMjQxIiwiNSI6IjMyNiIsIjYiOiI0NjQ3XzEyMjE4In3gAwLoAwfwAwD6AwVvdGhlcoIECW51bGw6bnVsbIgEWJAEAJgEAaAEAaoEBwjDyPQBEASqBAcIndPTARABuAQKwAQCygQpMjAyMDEyMzBfNWEwMWYxMTdlNzNjYmMyZGQ2Y2RkZGZiOTY2MGMyNTbQBADYBADiBNECeyJwTmFtZSI6ImFsbCIsInBJZCI6NTYsInBzSWQiOjIxNzQsImluZm8iOlsxLDEsMCwwLDAsMSwwLDAsMSwxLDAsMSwxLDEsMSwwLDAsMiwxLDEsMSwxLDEsMSwxLDAsMCwwLDAsMSwxLDEsMCwxLDAsMCwxLDEsMiwxLDAsMSwxLDEsMSwxLDAsMSwyLDAsMCwwLDEsMSwxLDEsMiwxLDAsMCwwLDAsMSwyLDEsMCwxLDAsMCwzLDEsMCwwLDEsMCwxLDEsMSwwLDEsMCwxLDAsMywwLDIsMCwyLDEsMSwxLDAsMCwwLDIsMSwwLDAsMSwwLDAsMCwxLDAsMCwwLDAsMSwwLDEsMSwxLDAsMSwwLDAsMSwwLDAsMCwxLDAsMCwwLDAsMCw1LDEsMSwwLDAsMCwwLDAsMiwxLDAsMSwyLDAsMCwwLDAsMCwwLDBdfegEAPAEAPoET3siYml6X3R5cGUiOjQsImNwYSI6IntcImNwYV9sZXZlbFwiOjEsXCJjcGFfc2V0XCI6MTg4OH0iLCJleHBsb3JlX3JhdGlvIjoiMzAwIn2ABQCQBcACkAXCApAFQ5AFwwKQBYQBkAWFApAFxQKQBYYBkAWIAZAFyAGQBUmQBYkBkAXMApAFjQKQBY4CkAXQAZAF0QGQBZMCkAXTApAF1AGQBdYCkAXXAZAF1wKQBdgBkAWYApAF2AKQBdkCkAWaApAF2gKQBdwCkAWdApAFYpAFKJAFrAGQBe4BkAWxAZAF8QGQBXKQBTOQBbMBkAWzApAFtAE=",
        "resource": 1890,
        "source": 1896,
        "request_id": "id",
        "is_ad": true,
        "cm_mark": 1,
        "index": 6,
        "is_ad_loc": true,
        "card_index": 5,
        "client_ip": "1.1.1.1",
        "extra": {
            "ad_content_type": 0,
            "appstore_priority": 2,
            "appstore_url": "",
            "card": {
                "ad_tag": "",
                "ad_tag_style": {
                    "bg_border_color": "#999999FF",
                    "bg_color": "",
                    "bg_color_night": "",
                    "border_color": "#999999FF",
                    "border_color_night": "#686868",
                    "img_height": 0,
                    "img_url": "",
                    "img_width": 0,
                    "text": "广告",
                    "text_color": "#999999FF",
                    "text_color_night": "#686868",
                    "type": 2
                },
                "adver": {
                    "adver_desc": "推荐了",
                    "adver_id": 0,
                    "adver_logo": "https://i0.hdslb.com/bfs/sycp/creative_img/202110/02235754e603d8bbb4a55c04eb711b5c.jpg_200x200.jpg",
                    "adver_name": "国货严选",
                    "adver_page_url": "https://space.bilibili.com/1191509767",
                    "adver_type": 3
                },
                "adver_account_id": 522913,
                "adver_logo": "https://i0.hdslb.com/bfs/sycp/creative_img/202110/02235754e603d8bbb4a55c04eb711b5c.jpg_200x200.jpg",
                "adver_mid": 0,
                "adver_name": "国货严选",
                "adver_page_url": "https://space.bilibili.com/1191509767",
                "button": {
                    "btn_delay_time": 0,
                    "btn_style": 0,
                    "dlsuc_callup_url": "",
                    "jump_url": "https://apps.apple.com/cn/app/id1576642037",
                    "report_urls": ["https://at.umtrack.com/99jKLz?cid=14895\u0026clickid=pbaes.Oel9t72cHUbEuwdQmYE2e32L7gHudCoP_sR3AVh8yKsy1SWXrygX1lpMB61wnjb6l-cU0dlzGkey3_x2Lb5QiiOWVJAWyCPdGCxa1HhxVcszTkWsnWY8iHoklSGQrd0B_8KPhgCKjczb1ngWgLRIzobaSC0_Ej6-5syG2tcmCwg\u0026idfa=6CA54DFE-EB2D-43A7-8FF2-272D810CF561\u0026ua=Mozilla%2F5.0%20%28iPhone%3B%20CPU%20iPhone%20OS%2015_4%20like%20Mac%20OS%20X%29%20AppleWebKit%2F613.1.17.0.7%20%28KHTML%2C%20like%20Gecko%29%20Mobile%2F19E241\u0026ip=130.126.255.57\u0026mac=__MAC1__\u0026s2s=1\u0026creative=96009041"],
                    "story_arrow": false,
                    "text": "下载",
                    "type": 3
                },
                "callup_url": "",
                "card_type": 3,
                "covers": [{
                    "gif_tag_show": false,
                    "gif_url": "",
                    "image_height": 400,
                    "image_width": 640,
                    "loop": 0,
                    "url": "https://i0.hdslb.com/bfs/sycp/creative_img/202110/45b84acfe717da7a20995367122f1f93.jpg"
                }],
                "desc": "国内好货，最快三天达",
                "duration": "",
                "dynamic_text": "华人福利，全球送货，最快3天送到！",
                "extra_desc": "",
                "extreme_team_icon": "",
                "extreme_team_status": false,
                "feedback_panel": {
                    "close_rec_tips": "操作成功",
                    "feedback_panel_detail": [{
                        "icon_url": "https://i0.hdslb.com/bfs/sycp/mng/201907/a53df8f189bb12666a39d10ad1babcf5.png",
                        "jump_type": 1,
                        "jump_url": "",
                        "module_id": 1,
                        "secondary_panel": [{
                            "reason_id": 1,
                            "text": "不感兴趣"
                        }, {
                            "reason_id": 2,
                            "text": "相似内容过多"
                        }, {
                            "reason_id": 5,
                            "text": "广告质量差"
                        }],
                        "sub_text": "（选择后将优化广告展示）",
                        "text": "屏蔽广告"
                    }, {
                        "icon_url": "https://i0.hdslb.com/bfs/sycp/mng/201907/2bc344ad3510da5cfdc7c7714abaeda4.png",
                        "jump_type": 2,
                        "jump_url": "https://cm.bilibili.com/ldad/light/ad-complain.html?complain_detail=eyJhZF90eXBlIjozLCJleHBfbmFtZSI6ImFsbDpjcGNfY3Jvd2RfdGFyZ2V0LHBwY3RyOnJlbWFpbixjYXNzaW5pTW9iaWxlRHluYW1pY0NUUkNWUjpydCxub19hZDp1bmRlZmluZWQsYnJ1c2hfZHVwOmRlZmF1bHQsZmRfZWNwbTpjb25zdGFudCxjcGNfcXVvdGE6Y29uc3RhbnQsZmRfdGhyZXNob2xkOmRlZmF1bHQsZmRfcGN0cjpsaXZlLHN0b3J5X2N0cjpiYXNlLHN0b3J5X2N2cjpiYXNlLGR5bl9jdHI6YmFzZSxkeW5fY3ZyOnJlbWFpbix1ZnJhbWVfY3RyOnJlbWFpbix1ZmN2cjpwcm9nMixjdnJfcDpiaWxpcnQsZGN2cmY6ZXNtbTIsY3ZyX2Y6b25saW5lX3Rlc3QsY3BhOmJhc2UsY3BhRGVlcDpiYXNlLG9jcHhVdjpub2RpZmYsb2NweFJlY2FsbDpxdWljayxVVjp1bmRlZmluZWQsaGFzaFVWOkMscHY6QSxmbG93X3JhdGlvOnIzLGRtcF9hZ2U6YWdlX25uLG5GZWRCYWNrOmRlZmF1bHQscWlmZWlfcGVyc29uYWw6YmFzZSxxaWZlaTpiYXNlLGZseV9jdHJfaW5saW5lX3RhcmdldDpvcGVuLGZseV9jdHJfaW5saW5lOm1vZGVsLGZseV9jdHJfc2Q6bW9kZWwsaW5uZXJfZW5oYW5jZTpleHAxLFJTOmNvbnN0YW50LGZseV9jb2Fyc2U6bGVmdCxmbHlfdHJ1bnBsdXM6aWRpY3QsZHBzOmRlZmF1bHQsb3BlbmZseW5ldzpvcGVuXzIsZmx5X3BjdnI6Y29uc3QsZmx5X2ZlZWRiYWNrOnN0b3J5LGZseV9zZW5zaV9mcmVxOm1pZDE0ZCxmbHlfY3BhX3BwOnBwX3J0Zmx5LGZseV9jcGFfc2lnbjpjb25zdGFudCxmbHlfY3BhX3N0OnJ0dnYsZmx5X2NwYTpwaWRfY3BwLGg1X3Y6Y29tcGFyZSxwRU46UFIsc0ZCcnU6Mix0aW1lRnJlcTpub19saW1pdCx1dlRlc3Q6YTIsZEFkeDpkZWZhdWx0LHVzZUdycGM6dHJ1ZSxmcmVTOmJhc2UsY29hcnNlX3Q6ZGVmYXVsdCxjb2Fyc2U6Y29uc3RhbnQzLGhkZXRhaWxzOmJhc2UsY3Jvd2RTOkMsc21hcnRiaWQ6dW5kZXJmcmFtZV92MixmbHlfc21hcnRiaWQ6ZGVmYXVsdCxmbHlfc3BlY2lhbGZlZWRfdGhyZWQ6Y29uc3RhbnQsZmx5X2F1dG9fZ2lmOmJhc2UsYnVwY3BjX2dzcDpiYXNlLGxpbWl0X2FkeDpkZWZhdWx0LG1ldDozMzUscGNobWN0cjp1YSxwY3ZpZGVvY3RyOmhvdXJseSxwY2htY3ZyOnBjaG1fbm4scGN2cGN2cjphZGRfcnQsY2Fzc2luaUNUUjpjb25zdGFudCxjb2Fyc2VfcHBjdHI6YmFzZSxjYXNzaW5pRmVlZHNDVlI6bmV3Y29udjIsY2Fzc2luaVBsYXlwYWdlQ1ZSOnJ0MixjYXNzaW5pRXhwOnNtYWxsX2J1ZGdldF9jbG9zZSxDcmVhdGl2ZVF1YWxpdHk6YXV0byxnaWZfZXhwOmJhc2UscHJvZ0NyZWFEaWN0VmVyOmRlZmF1bHQscHJvZ3JhbUNyZWF0aXZlOnYyLHByb2dDcmVhUmFuZG9tOmJhc2VBQSxwcm9nQ3JlYUZlZWRDdHI6VjMscHJvZ0NyZWFQUEN0cjpvcGVudjEscHJvZ0NyZWFVZGZDdnI6ZGVmYXVsdCxwcm9nQ3JlYVBQQ3ZyOmRlZmF1bHQscHJvZ0NyZWFTdG9yeTpkZWZhdWx0LFVzZUNvbnRleHRJbmZvU3RvcnlGbGFnOm9wZW4scHJvZ0NyZWFUOnYwLjksYnJhbmRJbmZvRXhwOmRlZmF1bHQsZHBhSG90UHJvZHVjdHNFeHBLZXk6Y2xvc2UsZHBhRGVkdXBDbGlja2VkVW5pdDpiYXNlX3YyLGRwYTJSZWNhbGw6YmFzZV92MixkcGEyOmNsb3NlQ3Jvd2QscmVzZXJ2ZV9wcmljZTpnc3BfYWxsLHJpc2tDYXRlZ29yeUZyZXFDb250cm9sVXBncmFkZTpkZWZhdWx0LHBlcnNvbmFUaGlyZFN3aXRjaDpob3RfZWNwbSxzZWFyY2hRdWVyeVJ1bGU6Y29uc3RhbnQsZm9yY2VFeHBvc3VyZS1jYXNzaW5pOmNvbnN0YW50LHVuZGVyX2ZyYW1lX2VjcG1fZXhwOmJhc2UsRHBhQ3JlYXRpdmVTdHJhdGVneUV4cGVyaW1lbnQ6ZHluYW1pY19zdHJhdGVneSxEcGFQcm9kdWN0U29ydE1vZGVsOmNsb3NlLERpc2xpa2VTdG9yeUFkQmxhY2tNaWQ6Y2xvc2UsQXBwQ29leGlzdEZpbHRlcjpjbG9zZSxzd2l0Y2hCc1BnUmVxUmF0aW86b3Blbix1c2VBc1BnOmNsb3NlLGJzRHVwQWQ6YmFzZSxiZXN0Q3JlYXRpdmU6ZWNwbTIsdW5kZXJmcmFtZV9kb3dubG9hZF9hZGJ1dHRvbjpkZWZhdWx0LGlubGluZUVjcG06ZGVmYXVsdCxEcGFTZXJ2ZXJFeHA6YW5uX29wZW5fc3VwcGx5LERwYUFubkV4cGVyaW1lbnQ6YW5uX29wZW5fc3VwcGx5LGR5bmFtaWNUaW1lb3V0TWluczpkZWZhdWx0LHNvcnRfZGl2ZXJzaXR5OmFjY184X2J1ZGdldF8xNV93aGl0ZV90cnVlLEFBX1RFU1Q6YWFfdGVzdDFfYmFzZSxzdG9yeUNhcmRJbmRleEV4cDozLGRwYUNyZWF0aXZlU2VsZWN0RXhwOmV4cF9zZWxlY3RfbW9kZWxfdjEsbm9CaWRGb3JTYW1lQWNjb3VudENvbmY6ZGVmYXVsdCxhY2NvdW50X2V4cGxvcmVfc2hvd19saW1pdDpkZWZhdWx0LGNvYXJzZUNvbnZlcnNpb25UeXBlV2hpdGVDb25mRXhwOm9wZW4sYm9vc3RQcm86cGlkLGNvYXJzZUV4cGxvcmVGYWN0b3JDb25mOmRlZmF1bHQsbmV3X2FkX3ByaWNlOmJhc2Usc3Rvcnljb2Fyc2U6dXNlcl9ydCxhZF9pbmhlcml0OmV4cDEsdmlkZW9fdGVtcGxhdGVfc3VwcG9ydDpleHAzLGNvYXJzZV9mZWVkc19sdHI6ZXhwLGNvYXJzZV9sYXN0X2FkX2ZpeDpiYXNlLGR5bmFtaWNDcGNJbWFnZUZhY3RvcjpleHAyLGNwYzFfZXh0ZW5kZWQ6ZGVmYXVsdCxhc0lubGluZUV4cDpvcGVuLGNyb3dkX2VjcGM6Y29uc3RhbnQsZEFkeDE6ZGVmYXVsdCxwcFByb2djcmVhR3JhZGVDYXJkRXhwOmJhc2UsZG93bmxvYWRfYnV0dG9uX2Rpc3BsYXk6YmFzZSxlbmFibGVfbXVsdGlfcmV0cmlldmVfcmVxdWVzdDpiYXNlLG90dF9zcGxhc2hfZnJlcTpiYXNlLHVzZXJBZEFjdGlvbnNPZmZsaW5lRXhwOmJhc2UsdXNlX25ld19mbHlfaWNvbjpiYXNlLGlkY1RhZzpzaGpkLGZlZWRzX25ld19idG46YmFzZSxkeW5hbWljX2ZlZWRzX3N0eWxlX2V4cDpuZWdhdGl2ZV9leHAxLFVuaXREZXRhaWxJbmZvOmNsb3NlLHNjZjpiYXNlLHF1YWxpdHlfZ2FtZV9saW1pdDpiYXNlLERwYTJYaWFvbWlGbG93RXhwbG9yZTpjbG9zZSxlbmFibGVDYXJkdHlwZURvd25sb2FkOmJhc2UsZmFjdF9uZWdhdGl2ZTpiYXNlLGdkX3BsdXNfZGF2aW5jaTpiYXNlLGZlZWRfY2FyZGluZGV4X2V4cDpiYXNlLFByZWRpY3RDb3N0RmlsdGVyOmJhc2UsZGFpaHVvX2V4dGVuZDplYWNoNSxwcm9tb3Rpb25fYmlnX2V4cDpvcGVuLGZsb2F0T3B0aW1pemVFeHA6YmFzZSxmbHlfbGlrZV90aDpjbG9zZSxjcmVhdGl2ZV9jb21iaW5lOmJhc2UsbG9nZ2luZ19hZGluZm9fbGlzdDpiYXNlLEZseVZpZGVvUGxheUZpbHRlckV4cEFsdDo1ZDVzLHVuZGVyZnJhbWVfY29weXJpZ2h0OmJhc2UsZW5hYmxlX2FsdF9kYXZpbmNpOndncSx1bmRlcmZyYW1lX3B1bGxfdXA6ZXhwLHZsYW5kaW5ncGFnZTpkZWZhdWx0MzEsdGFwM191cmxfcmVwbGFjZV9leHA6ZXhwX25ldyxmbHlfY29hcnNlX3Z2OmJhc2Usc3Rvcnlfc3R5bGVfc2VsZWN0OnRob21wc29uLHN0b3J5UXVhbGl0eUluZm9FeHA6YmFzZSxibGFja19saXN0X3NzcDpiYXNlX2JsYWNrX2xpc3RfdHVubmVsLG5GZWRCYWNrMTpkZWZhdWx0LGdkX3BsdXNfYnVkZ2V0X2J1Y2tldDpleHAyLGZseV9jb2Fyc2VfdXBncmFkZTppZGljdCxzaG93R2FtZUN1c3RvbVRleHQ6YmFzZSxzZWFyY2hfZnJlcTpleHAsaWdub3JlX2dpZl9yZXNpc3Q6b3BlbixyZWRpc092ZXJsb3JkRXhwOmJhc2UsbWlkX2FhOmV4cF8xLHN0b3J5X2FkdmVyX2p1bXA6YmFzZV8wMzIyLHB2X2FhOmRlZmF1bHQsc2VhcmNoX2FwcF9pY29uOmJhc2UsYW5kcm9pZF9nYW1lX3BhZ2U6YmFzZSxpcGFkX2V4cDpvcGVuLGZyZXFfdGFnOmV4cCxjcmVhdGl2ZV9zY2VuZV9mYWN0b3I6YmFzZSxuZXdfY3JlYXRpdmVfdGFiOmV4cDVfNTAwLHN0b3J5X2J1dHRvbl9leHA6ZXhwXzAscmVxX2xvZ19yYXRpbzpiYXNlLGNhbGx1cF9qZF9hY2NvdW50OmV4cCxkcGFVbmRlcmZyYW1lTmV3U3R5bGU6ZXhwMixmbHlfYXZpZF9zd2l0Y2g6ZXhwLGZseV9hdmlkX2ZyZXFfd2hpdGVsaXN0X2V4cDpvcGVuLHZpZGVvMnRhYjM6YmFzZV9uZXdfMDMyMix0aWFubWFfY292ZXI6ZXhwLHNpbmdsZV9yb3dfZWNwbTpleHAsc3RvcnlfYnRuX2dhbWVfZXhwOmV4cDEsY3JlYXRpdmVfYXV0b19naWY6YmFzZTAsTW9kZWxGZWF0dXJlc0hpdmVMb2c6Y2xvc2UsdXZfYWE6ZXhwXzEsaW9zX3B1bGxfdXA6ZXhwLGZseV9mZWVkc19pbnRvX3N0b3J5OmV4cDEsYWR4UGxheVBhZ2VSYXNpbzpleHAwLGNyZWF0aXZlX2F2aWRfdGFiMzpiYXNlLGNvYXJzZXNvcnRfY3RydF9leHA6YWxsX2V4cCxuZXdCc0ZpbHRlckxvZzpjbG9zZSxwbGF0Zm9ybTpkZWZhdWx0XzMwMCIsImdyYWRlX2NvbmNyZXRlX2lkX21hcHBpbmciOiJ7XCIxXCI6XCI5NjAwOTA0MVwiLFwiMTJcIjpcIjE4OTZcIixcIjEzXCI6XCI1MjQzMjFcIixcIjE0XCI6XCI3MVwiLFwiMTVcIjpcIjk0XCIsXCIxNlwiOlwiNTI0MzIxXzEyMjE4XCIsXCIyXCI6XCI1MjI5MTNcIixcIjNcIjpcIjQ2NDdcIixcIjRcIjpcIjI0MVwiLFwiNVwiOlwiMzI2XCIsXCI2XCI6XCI0NjQ3XzEyMjE4XCJ9Iiwic3RyYXRlZ3lfaWQiOjIzfQ",
                        "module_id": 2,
                        "sub_text": "",
                        "text": "我要投诉"
                    }, {
                        "icon_url": "https://i0.hdslb.com/bfs/sycp/mng/201907/82480c4ef205c9b715d6e2ea7f5c4041.png",
                        "jump_type": 2,
                        "jump_url": "https://cm.bilibili.com/ldad/light/ad-introduce.html",
                        "module_id": 3,
                        "sub_text": "",
                        "text": "我为什么会看到此广告"
                    }],
                    "open_rec_tips": "将减少展示此类广告",
                    "panel_type_text": "广告",
                    "toast": "将减少相似广告推荐"
                },
                "fold_time": 0,
                "goods_cur_price": "",
                "goods_ori_price": "",
                "grade_denominator": 0,
                "grade_level": 0,
                "imax_landing_page_v2": "",
                "jump_url": "https://apps.apple.com/cn/app/id1576642037",
                "live_booking_population_threshold": 1000000,
                "live_room_area": "",
                "live_room_popularity": 0,
                "live_room_title": "",
                "live_streamer_face": "",
                "live_streamer_name": "",
                "live_tag_show": false,
                "long_desc": "",
                "ori_mark_hidden": 0,
                "price_desc": "",
                "price_symbol": "",
                "star_level": 0,
                "support_transition": false,
                "title": "华人福利，全球送货，最快3天送到！",
                "transition": "",
                "under_player_interaction_style": 0,
                "universal_app": ""
            },
            "click_area": 0,
            "click_urls": ["https://at.umtrack.com/99jKLz?cid=14895\u0026clickid=pbaes.Oel9t72cHUbEuwdQmYE2e32L7gHudCoP_sR3AVh8yKsy1SWXrygX1lpMB61wnjb6l-cU0dlzGkey3_x2Lb5QiiOWVJAWyCPdGCxa1HhxVcszTkWsnWY8iHoklSGQrd0B_8KPhgCKjczb1ngWgLRIzobaSC0_Ej6-5syG2tcmCwg\u0026idfa=6CA54DFE-EB2D-43A7-8FF2-272D810CF561\u0026ua=Mozilla%2F5.0%20%28iPhone%3B%20CPU%20iPhone%20OS%2015_4%20like%20Mac%20OS%20X%29%20AppleWebKit%2F613.1.17.0.7%20%28KHTML%2C%20like%20Gecko%29%20Mobile%2F19E241\u0026ip=130.126.255.57\u0026mac=__MAC1__\u0026s2s=1\u0026creative=96009041"],
            "download_whitelist": [{
                "apk_name": "",
                "auth_name": "",
                "auth_url": "",
                "bili_url": "",
                "dev_name": "",
                "display_name": "国货严选-海外华人留学生的网购神器",
                "icon": "https://i0.hdslb.com/bfs/sycp/app_icon/202109/bbfefcf46ccf3526a24e9fd324b0060e.gif",
                "md5": "",
                "privacy_name": "隐私协议",
                "privacy_url": "",
                "size": 0,
                "update_time": "2021-09-13",
                "url": "https://apps.apple.com/cn/app/id1576642037",
                "version": "1.0.5"
            }],
            "enable_double_jump": false,
            "enable_h5_alert": true,
            "enable_h5_pre_load": 0,
            "enable_store_direct_launch": 0,
            "feedback_panel_style": 0,
            "from_track_id": "all_42.shjd-ai-recsys-03.1647977252239.602",
            "h5_pre_load_url": "",
            "landingpage_download_style": 2,
            "layout": "",
            "macro_replace_priority": 0,
            "open_whitelist": [],
            "preload_landingpage": 0,
            "product_id": 0,
            "report_time": 2000,
            "sales_type": 12,
            "shop_id": 0,
            "show_1s_urls": [],
            "show_urls": ["https://gxbr.cnzz.com/app.htm?si=1232997\u0026gid=49164\u0026rpid=211032\u0026cid=14895\u0026ht=appview\u0026clickid=pbaes.Oel9t72cHUbEuwdQmYE2e32L7gHudCoP_sR3AVh8yKsy1SWXrygX1lpMB61wnjb6l-cU0dlzGkey3_x2Lb5QiiOWVJAWyCPdGCxa1HhxVcszTkWsnWY8iHoklSGQrd0B_8KPhgCKjczb1ngWgLRIzobaSC0_Ej6-5syG2tcmCwg\u0026idfa=6CA54DFE-EB2D-43A7-8FF2-272D810CF561\u0026ua=Mozilla%2F5.0%20%28iPhone%3B%20CPU%20iPhone%20OS%2015_4%20like%20Mac%20OS%20X%29%20AppleWebKit%2F613.1.17.0.7%20%28KHTML%2C%20like%20Gecko%29%20Mobile%2F19E241\u0026ip=130.126.255.57\u0026mac=__MAC1__\u0026s2s=1\u0026creative=96009041"],
            "special_industry": false,
            "special_industry_style": 0,
            "special_industry_tips": "",
            "store_callup_card": false,
            "track_id": "pbaes.Oel9t72cHUbEuwdQmYE2e32L7gHudCoP_sR3AVh8yKsy1SWXrygX1lpMB61wnjb6l-cU0dlzGkey3_x2Lb5QiiOWVJAWyCPdGCxa1HhxVcszTkWsnWY8iHoklSGQrd0B_8KPhgCKjczb1ngWgLRIzobaSC0_Ej6-5syG2tcmCwg",
            "up_mid": 0,
            "upzone_entrance_report_id": 0,
            "upzone_entrance_type": 0,
            "use_ad_web_v2": true
        },
        "creative_style": 1
    },
    "three_point_v2": [{
        "title": "不感兴趣",
        "type": "dislike",
        "id": 1
    }],
    "track_id": "id"
} */
