function getWindowURL() {
  return window.URL || window.webkitURL;
}

export default async function prefetchVideo(
  url: string,
  onFetched: (resourceUrl: string, blobUrl: string) => void,
  onError: (err: any) => void
) {
  //   const xhr = new XMLHttpRequest();
  //   xhr.open("GET", url, true);
  //   xhr.responseType = "blob";
  try {
    console.log("Started downloading video", url);
    const response = await fetch(url);
    const blob = await response.blob();
    const objectUrl = getWindowURL().createObjectURL(blob);
    onFetched(url, objectUrl);
  } catch (err) {
    onError(err);
  }
}
