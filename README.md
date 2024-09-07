# Automated TestCase Generator

This project provides a tool to generate detailed testing instructions based on uploaded screenshots and optional context. It uses a multimodal language model to create test cases, which are displayed on the frontend in blocks organized by each screenshot.

## Features

- Upload multiple screenshots and view previews before submission.
- Provide optional context to refine the generated test cases.
- Displays generated test cases for each screenshot in a user-friendly format using Markdown.

<img src="/photos/1.png" width="600px">
<img src="/photos/2.png" width="600px">
<img src="/photos/3.png" width="600px">

## Technologies Used

- **Frontend**: HTML, CSS, JavaScript
- **Backend**: Node.js, Express.js
- **Additional Libraries**:
  - `google\generativeai`: A library to work with google's generative AI models.
  - `marked`: A markdown parser to render the test case descriptions in Markdown format.

## Installation

### Prerequisites
- **Node.js** and **npm** should be installed on your machine.

### Steps

1. **Clone the repository** or download the files.

   ```bash
   git clone <repository_url>
   ```

2. **Navigate to the project directory**:

   ```bash
   cd Automated-TestCase-Generator
   ```

3. **Install dependencies**:

   Run the following command to install the necessary npm packages:

   ```bash
   npm install
   ```

4. **Start the Express server**:

   Start the server by running:

   ```bash
   node server.js
   ```

5. **Access the application**:

   Open your browser and navigate to `http://localhost:3000` to use the tool.

## Usage

1. Upload multiple screenshots.
2. Optionally, provide some context related to the screenshots.
3. Click the **Describe Testing Instructions** button.
4. The generated test cases for each screenshot will be displayed in the output section.

## Dependencies

- **Express**: Backend framework for handling requests and serving the frontend.
- **google/generativeai**: To work with google's generative AI model
- **marked**: To parse and display markdown content in the browser.

Install all dependencies via `npm install`.

## Contributing

Feel free to contribute by forking the repository, making changes, and submitting a pull request. Any feedback or suggestions are welcome!

## License

This project is open-source and available under the [MIT License](LICENSE).
