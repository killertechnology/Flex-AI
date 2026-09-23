function handler(event) {
  var request = event.request;
  var uri = request.uri;
  var match = uri.match(/^\/(concept-[abcd])(?:\/.*)?$/);

  if (match) {
    var lastSegment = uri.split("/").pop();
    if (uri.endsWith("/") || lastSegment.indexOf(".") === -1) {
      request.uri = "/" + match[1] + "/index.html";
    }
  }

  return request;
}
