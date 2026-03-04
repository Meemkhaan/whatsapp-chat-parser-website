# WhatsApp Chat Parser Website

> Example application of the npm package [whatsapp-chat-parser](https://github.com/Pustur/whatsapp-chat-parser)

This website allows you to upload a WhatsApp chat log and view its contents.
You can upload a `txt` directly or a `zip` file containing the exported chat.  
In case you export a `zip` file with the option **Attach Media**, you will be able to see images, videos and audio files directly in the website. Try it out by downloading the [example chat](https://github.com/Meemkhaan/whatsapp-chat-parser-website/blob/master/src/assets/whatsapp-chat-parser-example.zip)!

The app runs locally and **no logs are sent or stored anywhere**.

## Features

- **Search Messages** – Search by author or text; **Jump to date** with a calendar to view a specific day (WhatsApp-style).
- **Who are you?** – Select your name so your messages appear on the right; choice is remembered.
- **Media viewer** – Click images or videos to open in a full-screen lightbox.
- **Export** – Download the visible (filtered) messages as `.txt`.
- **Filters** – Filter by message range or date; clear all with one click.
- **Virtual list** – Smooth scrolling for long chats.
- **Accessibility** – Skip link, keyboard support, focus trap in sidebar.

The website is available at [whatsapp-chat-parser.netlify.app](https://whatsapp-chat-parser.netlify.app/). This fork can be deployed to [Vercel](https://vercel.com) using the included `vercel.json`.

## How to run locally

1. Clone the git repo
2. Install [Node.js](https://nodejs.org/en/) if you don't have it already
3. Open a terminal in the root of the project and run `npm install` to install the dependencies (optionally with the `--production` flag to avoid installing development dependencies)
4. Run `npm start` to start a development server (while in this mode you can change the code and see the results immediately)
5. Run `npm run build` to build the compiled bundle that you'll find in the `build/` folder

Any local server will do to run the built files.  
It's also possible to download them directly from the [releases page](https://github.com/Meemkhaan/whatsapp-chat-parser-website/releases).

## How to export WhatsApp chats

- [Android](https://faq.whatsapp.com/android/chats/how-to-save-your-chat-history)
- [iPhone](https://faq.whatsapp.com/iphone/chats/how-to-back-up-to-icloud/)

## Technologies used

- Language: [TypeScript](https://www.typescriptlang.org/)
- Libraries:
  - [React](https://reactjs.org/) (with [Jotai](https://jotai.org/))
  - [JSZip](https://stuk.github.io/jszip/)
  - [react-virtuoso](https://virtuoso.dev/react-virtuoso/) (virtual list for long chats)
  - [whatsapp-chat-parser](https://github.com/Pustur/whatsapp-chat-parser)
- CSS: [Styled Components](https://www.styled-components.com/)
- Code formatting: [Prettier](https://prettier.io/)
- Linting: [ESLint](https://eslint.org/) (with [Airbnb rules](https://www.npmjs.com/package/eslint-config-airbnb))
- Bundler: [Vite](https://vitejs.dev/)

## Changelog

[CHANGELOG](CHANGELOG.md)

## License

[MIT](LICENSE)
