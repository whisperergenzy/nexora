# ✦ NEXORA

[![JavaScript](https://img.shields.io/badge/JavaScript-primary-f7df1e)](https://github.com/whisperergenzy/nexora)
[![Public](https://img.shields.io/badge/repository-public-brightgreen)](https://github.com/whisperergenzy/nexora)

NEXORA is a modular WhatsApp bot built with Node.js and the Baileys ecosystem. It uses dynamic command loading, event handlers, plugins, localization, moderation tools, media utilities, and persistent JSON-based runtime data.

The project is actively maintained. The default branch is `main`, and the repository was last updated on **2026-11-24**.

## Current status

- **Repository:** [whisperergenzy/nexora](https://github.com/whisperergenzy/nexora)
- **Visibility:** Public
- **Primary language:** JavaScript
- **Default branch:** `main`
- **Open issues:** 0
- **Stars:** 2
- **License file:** Not present in the repository
- **Activity:** Active development
- **Platform:** Node.js / WhatsApp
- **Localization:** English and French

Recent development has focused on reconnection behavior, Telegram sticker forwarding, and Lottie/media rendering diagnostics.

## Language composition

| Language | Repository size (bytes) |
|----------|------------------------:|
| JavaScript | 644,650 |
| Python | 17,912 |
| C++ | 4,936 |
| Shell | 3,504 |

Python and C++ support supplementary Telegram/media functionality; JavaScript is the main application language.

## Features

- Dynamic command and plugin loading
- Event-driven WhatsApp message handling
- Group moderation and permission checks
- Public and private operating modes
- Per-command cooldowns and interactive sessions
- AFK, activity, seen, and read-status utilities
- Anti-link, anti-spam, mute, and warning tools
- English and French localization
- WhatsApp and optional Telegram integration
- Media downloading and image, sticker, and Lottie processing
- JSON-based runtime configuration and storage

## Requirements

- Node.js 20 or newer
- npm
- A WhatsApp account
- Internet access
- Git (recommended)

Optional integrations may require API credentials or additional system dependencies.

## Installation

```bash
git clone https://github.com/whisperergenzy/nexora.git
cd nexora
npm install
npm run check
npm start
```

The main entry point is `index.js`.

## First-time setup

Create the setup data used for pairing:

```json
{
  "phone": "2376XXXXXXXX"
}
```

Store this value in `database/setup.json`, then run:

```bash
npm start
```

Use the international format for the WhatsApp number you intend to pair. Follow the pairing instructions printed by the application.

## Configuration

Core settings are defined in `config.js`:

- `BOT_NAME`
- `PREFIX`
- `CREATOR`
- `TIMEZONE`

The default command prefix is `.`:

```text
.menu
.help
.command=argument
```

For environment-based integrations, copy or create `.env` and keep credentials private.

Example variable names:

```text
NEWS_API_KEY=your_key_here
TMDB_API_KEY=your_key_here
GROO_API_KEY=your_key_here
```

Do not commit real API keys or authentication credentials.

## Project structure

```text
nexora/
├── assets/             Static assets and bot resources
├── commands/           Dynamically loaded commands
├── core/               Core bot functionality
├── events/             WhatsApp event modules
├── language/           English and French resources
├── lib/                Reusable helpers and settings
├── media/              Media-related resources
├── plugins/            Optional extensions
├── scripts/            Setup and maintenance scripts
├── tools/              Build and development utilities
├── config.js           Core configuration
├── eventHandler.js     Event loading and dispatch
├── handler.js          Command loading and execution
├── index.js            Main application entry point
├── package.json        Dependencies and npm scripts
├── start.sh            Startup helper
├── telegram_config.py  Telegram API configuration template
└── requirements.txt    Python dependencies
```

## Command system

Commands live under `commands/` and are loaded dynamically. Command files may declare:

- `name` and aliases
- Description and category
- Required permission level
- Usage and minimum arguments
- Cooldown
- An `execute()` function

Commands are organized by category, including admin, fun, general, group, info, owner, and tools modules.

## Permission hierarchy

```text
Creator
  ↓
Owner
  ↓
Sudo
  ↓
Admin
  ↓
Public
```

The required level is defined by each command. Public and private bot modes can further restrict command access.

## Localization

Language resources are maintained under `language/`. Regenerate generated language files after changing translations:

```bash
npm run translate
```

The `npm run build` command executes the same language build process.

## npm scripts

| Command | Purpose |
|---------|---------|
| `npm start` | Start NEXORA |
| `npm run setup` | Run the setup script |
| `npm run check` | Check project dependencies |
| `npm run translate` | Build or regenerate language files |
| `npm run build` | Run the language build process |

## Main dependencies

- **Baileys** — WhatsApp multi-device communication
- **Axios** — HTTP requests
- **dotenv** — environment configuration
- **OpenAI** — optional AI functionality
- **Google Translate** — translation functionality
- **Sharp and Jimp** — image processing
- **node-edge-tts** — text-to-speech
- **youtube-dl-exec** — media downloading
- **QRCode** — QR utilities
- **Pino** — logging
- **BTCH Downloader / TTDL** — media utilities

See `package.json` for the exact dependency list.

## Security

Keep the following private:

- `session/` and WhatsApp authentication state
- `.env` and API credentials
- Telegram API credentials
- Runtime database values
- Private owner, sudo, mute, and activity data

Never commit authentication files or secrets. Review changes before publishing:

```bash
git status
git diff
```

If a secret was committed, deleting it from the latest revision does not remove it from Git history.

## Development

Add commands in `commands/<category>/<command>.js` and event modules in `events/`. Use the existing module conventions and avoid manually registering dynamically loaded commands.

For JavaScript syntax checks:

```bash
npm run check
node --check index.js
```

Runtime JSON files under `database/` may change while the bot is running. Do not commit them unless the changes are intentional.

## Troubleshooting

### The bot does not start

```bash
npm install
npm run check
npm start
```

For a specific syntax error:

```bash
node --check index.js
```

### No pairing code appears

Verify `database/setup.json`, make sure the phone number uses international format, and restart with `npm start`.

### The bot logs out

WhatsApp authentication may need to be restored. Re-pairing may require removing or replacing the existing session state. Back up and protect that state before making changes.

### Translation changes do not appear

```bash
npm run translate
```

Then restart the bot and verify the generated language files.

## Contributing

1. Fork the repository.
2. Create a focused feature or fix branch.
3. Test the affected functionality.
4. Run syntax and dependency checks.
5. Keep secrets and runtime data out of commits.
6. Update this README when behavior or setup instructions change.
7. Submit a clear pull request.

## Updates

Official NEXORA WhatsApp channel:

https://whatsapp.com/channel/0029VbCmque7Noa0J2BLR82e

## Author

The repository is owned by [whisperergenzy](https://github.com/whisperergenzy).

GitHub account: [sneakyuser5-netizen](https://github.com/sneakyuser5-netizen)

## License

No license file is currently included in this repository. Its license and reuse terms are therefore not yet defined here.

---

✦ NEXORA — Modular. Extensible. Built for WhatsApp.
