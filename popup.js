document.addEventListener('DOMContentLoaded', () => {
  chrome.storage.sync.get("apiKey", (data) => {
    if (data.apiKey) {
      document.getElementById('apiKey').style.display = 'none';
      document.getElementById('saveButton').style.display = 'none';
      document.getElementById('generateButton').style.display = 'block';
    } else {
      document.getElementById('saveButton').style.display = 'block';
    }
  });

  document.getElementById('saveButton').addEventListener('click', () => {
    const apiKey = document.getElementById('apiKey').value;
    chrome.storage.sync.set({ apiKey: apiKey }, () => {
      document.getElementById('apiKey').style.display = 'none';
      document.getElementById('saveButton').style.display = 'none';
      document.getElementById('generateButton').style.display = 'block';
    });
  });

  document.getElementById('generateButton').addEventListener('click', () => {
    document.getElementById('output').innerHTML = 'Generating...';
    document.getElementById('output').style.display = 'block';
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const url = new URL(tabs[0].url);
      const baseUrl = url.origin + url.pathname;
      chrome.tabs.sendMessage(tabs[0].id, { action: "extractActuatorInfo" }, (response) => {
        if (response && response.pageText) {
          chrome.storage.sync.get("apiKey", (data) => {
            const apiKey = data.apiKey;
            if (apiKey) {
              generateInfobox(response.pageText, apiKey, baseUrl);
            } else {
              alert('API Key not found. Please set it in the extension popup.');
            }
          });
        }
      });
    });
  });
});

async function generateInfobox(pageText, apiKey, purchaseLink) {
  const prompt = `
    Extract information about an actuator from the following text and create an infobox table in this format. Provide only the infobox table and nothing else.:
    {{infobox actuator
    | name = Name
    | manufacturer = Manufacturer
    | cost = USD 1
    | purchase_link = ${purchaseLink}
    | nominal_torque = 1 Nm
    | peak_torque = 1 Nm
    | weight = 1 kg
    | dimensions = 10cm radius
    | gear_ratio = 1:8
    | voltage = 48V
    | cad_link = https://example.com/model.step
    | interface = CAN
    | gear_type = Planetary
    }}

    Text:
    ${pageText}
  `;

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${apiKey}`
    },
    body: JSON.stringify({
      model: "gpt-4o",
      messages: [
        {"role": "system", "content": "You are an expert in extracting technical specifications and formatting them into structured data."},
        {"role": "user", "content": prompt}
      ]
    })
  });

  const data = await response.json();

  if (data.choices && data.choices.length > 0) {
    const infobox = data.choices[0].message.content.trim();
    document.getElementById('output').innerHTML = infobox;
  } else {
    document.getElementById('output').innerHTML = 'Error generating infobox.';
    console.error('Error generating infobox:', data);
  }
}
