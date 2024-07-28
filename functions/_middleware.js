const handleReverseProxy = async (context) => {
  const originalUrl = context.request.url;
  const url = new URL(originalUrl);
  // /yyyy/内でなければ処理を中断
  if (url.pathname.indexOf("/resume-generator/") !== 0) {
    return await context.next();
  }
  // /yyyy/内であればhttps://yyyy.pages.devよりコンテンツを取得
  const newUrl = new URL(
    `https://5461eb79.resume-generator-a21.pages.dev${url.pathname.replace("/resume-generator/", "/")}${url.search}`
  );
  const response = await fetch(new Request(newUrl), {
    headers: new Headers(context.request.headers),
  });
  // 取得したコンテンツをレスポンスとして返す
  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers: new Headers(response.headers),
  });
};

export const onRequest = [handleReverseProxy];