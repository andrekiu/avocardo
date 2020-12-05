module Runtime = {
  [@bs.scope "chrome.runtime"] [@bs.val]
  external getURL: string => string = "getURL";
};
