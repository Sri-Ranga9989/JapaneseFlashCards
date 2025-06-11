# Japanese Vocabulary Flashcards

A web application for learning Japanese vocabulary using flashcards. Cards are organized by category, week, and difficulty (box). Images are fetched from Unsplash, and you can filter cards by difficulty.

![Home Screen](public/home%20screen.png)
![Preview](public/back%20side.png)

## Features

- Flashcard-based learning for Japanese vocabulary
- Filter cards by difficulty (box)
- Progress tracking
- Images for each word (from Unsplash)
- Responsive design

## Getting Started

### Prerequisites

- Node.js (v16+ recommended)
- npm

### Installation

1. **Clone the repository:**
    ```sh
    git clone https://github.com/Sri-Ranga9989/JapaneseFlashCards.git
    cd JapaneseFlashCards
    ```

2. **Install dependencies:**
    ```sh
    npm install
    ```

3. **Set up environment variables:**

    - Create a `.env` file in the root directory with the following content:
      ```
      applicationId=YOUR_UNSPLASH_APPLICATION_ID
      accessKey=YOUR_UNSPLASH_ACCESS_KEY
      secreteKey=YOUR_UNSPLASH_SECRET_KEY
      ```
    - **Do not commit your `.env` or `keys` files to the repository.**  
      Make sure your `.gitignore` contains:
      ```
      .env
      keys
      ```



### Running the App

```sh
npm start
```

The app will be available at [http://localhost:3000](http://localhost:3000).

## Folder Structure

```
japanese_git/
├── .env                # Environment variables (NOT committed)
├── .gitignore
├── README.md
├── index.js
├── newData.json
├── package.json
├── public/
│   ├── images/
│   │   └── app-screenshot.png
│   ├── back side.png
│   ├── box 2.png
│   └── home screen.png
├── views/
│   └── index.ejs
```

## Security

- **Never commit your `.env` or `keys` files.**
- All API keys and secrets must be kept private.

## License

MIT