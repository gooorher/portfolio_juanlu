# Personal Portfolio

This is the repository for Juanlu's personal portfolio. A website designed to showcase my projects, work experience, education, and skills.

## Project Overview

This portfolio is a web application built with React and TypeScript, using Vite as the build tool. It is designed to be a professional and attractive presentation of my career path and capabilities as a software developer. The site is fully responsive and accessible, ensuring a good user experience on different devices.

## Structure and Organization

The project structure follows a logical organization to facilitate development and maintenance:

-   `public/`: Contains static assets such as images and the favicon. `screenshot.png` is located here.
-   `src/`: Contains the application's source code.
    -   `components/`: Reusable user interface components.
    -   `contexts/`: React contexts for managing global states like theme and language.
    -   `hooks/`: Custom React hooks.
    -   `sections/`: Components representing the different sections of the page (Hero, About, Experience, Education, Projects, Contact).
    -   `styles/`: Global style files and themes using Styled Components.
    -   `data/`: Data files (although in this project most data is in the language context for translation).
    -   `App.tsx`: Main application component.
    -   `main.tsx`: Application entry point.
-   `package.json`: Defines project dependencies and build/run scripts.
-   `tsconfig.json`: TypeScript configuration.
-   `vite.config.ts`: Vite configuration.

## Key Features

-   **Responsive Design:** Adaptable to different screen sizes (desktop, tablet, mobile).
-   **Light/Dark Mode:** Allows users to switch between a light and dark color theme for a better visual experience based on their preferences or environment.
-   **Language Toggle:** Support for multiple languages (currently Spanish and English), allowing users to change the language of the site content.
-   **Animations:** Use of `framer-motion` to add fluid and attractive animations.
-   **Reusable Components:** Component-based structure for modular and efficient development.

## Preview

You can see a screenshot of the portfolio here:

![Portfolio Screenshot](public/screenshot.png)

## Installation and Local Execution

To clone and run this project locally, you will need to have Node.js and npm (or yarn) installed on your machine.

1.  Clone the repository:
    ```bash
    git clone [Repository URL]
    ```
2.  Navegate to the project directory:
    ```bash
    cd portfolio
    ```
3.  Install dependencies:
    ```bash
    npm install
    # or if you use yarn
    # yarn install
    ```
4.  Start the development server:
    ```bash
    npm run dev
    # or if you use yarn
    # yarn dev
    ```

The application will run on `http://localhost:5173` (or a similar port).

## Contact

If you have any questions or want to get in touch, you can find my contact information in the Contact section of the portfolio or through the links in the footer.
