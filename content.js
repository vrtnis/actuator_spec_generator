chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "extractActuatorInfo") {
    const pageText = document.body.innerText;
    sendResponse({ pageText: pageText });
  }
});
