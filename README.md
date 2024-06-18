# Actuator Spec Generator

`actuator_spec_generator` is a browser extension designed to extract detailed information about robotics actuators from web pages (e.g., Alibaba or MyActuator listings) and format it into a structured infobox. This tool leverages the OpenAI API to generate the infobox based on the text content of the page.

## Features

- Extracts actuator specifications from web pages.
- Generates a structured infobox with key details.
- Supports easy configuration and usage through the browser extension interface.
- Leverages OpenAI API for text processing and data extraction.

## Installation

1. **Clone the Repository**
    ```bash
    git clone https://github.com/vrtnis/actuator_spec_generator.git
    ```

2. **Navigate to the Project Directory**
    ```bash
    cd actuator_spec_generator
    ```

3. **Load the Extension in Chrome**
    - Open Chrome and navigate to `chrome://extensions/`.
    - Enable "Developer mode" by clicking the toggle switch in the top right corner.
    - Click "Load unpacked" and select the directory where you cloned the repository.

## Usage

1. **Set Your OpenAI API Key**
    - Open the extension popup by clicking the extension icon.
    - Enter your OpenAI API key in the provided field and click "Save".

2. **Generate Actuator Specs**
    - Navigate to a web page containing information about a robotics actuator.
    - Click the "Generate Specs" button in the extension popup.
    - The extension will extract the information and display it in an infobox.

## Screenshots


<p align="center">
  <img src="https://github.com/vrtnis/actuator_spec_generator/blob/main/ui_actuator_generator.png" alt="Actuator Information on Alibaba" width="45%"/>
  <img src="https://github.com/vrtnis/actuator_spec_generator/blob/main/myextensions.png" alt="Chrome Extension Interface" width="45%"/>
</p>
