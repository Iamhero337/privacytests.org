// postResults(results) learns the sessionId for this page load,
// and sends the results to results.privacytests.org/post under
// that sessionId.
const postData = async (results, category) => {
  const urlParams = new URLSearchParams(window.location.search);
  if (!urlParams.has("sessionId")) {
    return;
  }
  const sessionId = urlParams.get("sessionId");
  console.log("posting", {sessionId, results});
  let response = await fetch("https://results.privacytests.org/post", {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({sessionId, url: window.location.href, "data": results, category })
  });
  return await response.json();
};

const postDataAndCarryOn = async (results, category) => {
  const response = await postData(results, category);
  document.body.innerHTML += "<br>response: " + JSON.stringify(response);
  if (!response) {
    return;
  }
  const { newTabUrl, navigateUrl } = response;
  if (newTabUrl) {
    window.open(newTabUrl, "_blank");
  }
  if (navigateUrl) {
    window.location.href = navigateUrl;
  }
};
