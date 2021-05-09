module Runtime = {
  @scope("chrome.runtime") @val
  external getURL: string => string = "getURL"
}
