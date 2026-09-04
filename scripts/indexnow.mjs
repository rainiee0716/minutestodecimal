// IndexNow 提交脚本 —— 加速 Bing / Yahoo / DuckDuckGo 收录
//
// 原理：向必应 IndexNow 接口推送 URL，必应收到后立即尝试抓取，无需等爬虫周期。
// 密钥文件已托管在 public/<KEY>.txt，部署后会自动可在
//   https://www.minutestodecimal.org/<KEY>.txt 访问。
//
// 用法：
//   node scripts/indexnow.mjs                 # 提交 sitemap 里的全部 URL
//   node scripts/indexnow.mjs "<URL>"         # 只提交单个 URL（内容更新后调用）
//
// 注意：KEY 必须与 public/ 下托管的那份一致。

const HOST = "www.minutestodecimal.org";
const KEY = "d20652f2-97e3-4028-8023-b54fda52dbdc";
const SITEMAP_URL = `https://${HOST}/sitemap.xml`;
const INDEXNOW_ENDPOINT = "https://www.bing.com/indexnow";

async function getUrlsFromSitemap() {
  const res = await fetch(SITEMAP_URL);
  if (!res.ok) throw new Error(`无法获取 sitemap: HTTP ${res.status}`);
  const xml = await res.text();
  return [...xml.matchAll(/<loc>(.*?)<\/loc>/g)].map((m) => m[1].trim());
}

async function submit(urls) {
  const res = await fetch(INDEXNOW_ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify({
      host: HOST,
      key: KEY,
      keyLocation: `https://${HOST}/${KEY}.txt`,
      urlList: urls,
    }),
  });
  const body = await res.text();
  // 200=已接收；202=已接收但之前提交过；400/403/429=错误
  console.log(`IndexNow 响应: ${res.status} ${res.statusText}`);
  if (body) console.log(body);
  return res.status;
}

const single = process.argv[2];
const urls = single ? [single] : await getUrlsFromSitemap();
console.log(`准备提交 ${urls.length} 个 URL 到 IndexNow...`);
await submit(urls);
