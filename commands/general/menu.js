const path = require("path");
const fs = require("fs");

module.exports = {
    name: "menu",
    category: "general",
    description: "✦ NEXORA • Command Center ✦",
    permission: "public",

    execute: async (sock, msg, args = []) => {
        const { t } = require("../../lib/lang");
        const { commands } = require("../../handler");
        const settings = require("../../lib/settings");

const dictionary = require("../../language/source/dictionary");
const commandFr = require("../../language/source/command-fr");
const commandEs = require("../../language/source/command-es");
        const jid = msg.key.remoteJid;
        const page = (args[0] || "").toLowerCase().trim();

        const config = settings.get("global");
        const { version } = require("../../package.json");

        const botName = config.bot_name || "NEXORA";
        const prefix = ".";
        const userName = msg.pushName || "User";

const language =
    config.language === "fr"
        ? "Français 🇫🇷"
        : config.language === "es"
        ? "Español 🇪🇸"
        : "English 🇬🇧";
        // MENU IMAGE
        const menuImage = path.join(
            __dirname,
            "../../assets/menu.png"
        );

        const hasMenuImage = fs.existsSync(menuImage);

        // DATE
        const now = new Date();

        const day = now.toLocaleDateString(
config.language === "fr" ? "fr-FR" : config.language === "es" ? "es-ES" : "en-US",
            { weekday: "long" }
        );

        const date = now.toLocaleDateString(
            config.language === "fr" ? "fr-FR" : config.language === "es" ? "es-ES" : "en-US",
            {
                day: "numeric",
                month: "numeric",
                year: "numeric"
            }
        );

        // UPTIME
        const totalSeconds = Math.floor(
            (Date.now() - (global.START_TIME || Date.now())) / 1000
        );

        const days = Math.floor(totalSeconds / 86400);
        const hours = Math.floor(
            (totalSeconds % 86400) / 3600
        );
        const minutes = Math.floor(
            (totalSeconds % 3600) / 60
        );
        const seconds = totalSeconds % 60;

        let uptime;

        if (days > 0) {
            uptime = `${days}d ${hours}h ${minutes}m`;
        } else if (hours > 0) {
            uptime = `${hours}h ${minutes}m ${seconds}s`;
        } else if (minutes > 0) {
            uptime = `${minutes}m ${seconds}s`;
        } else {
            uptime = `${seconds}s`;
        }

        // MEMORY
        const ram = (
            process.memoryUsage().rss /
            1024 /
            1024
        ).toFixed(1);

        // CATEGORY ICONS
        const icons = {
            admin: "🛡️",
            group: "👥",
            owner: "👑",
            fun: "🎮",
            general: "📖",
            info: "💡",
            tools: "🛠️",
            media: "🎬",
            download: "📥",
            utility: "⚙️",
            search: "🔎",
            other: "📦"
        };

        // CATEGORY NAMES
        const categoryNames = {
            admin: "ADMIN",
            group: "GROUP",
            owner: "OWNER",
            fun: "FUN & GAMES",
            general: "GENERAL",
            info: "INFORMATION",
            tools: "TOOLS",
            media: "MEDIA",
            download: "DOWNLOADER",
            utility: "UTILITY",
            search: "SEARCH",
            other: "OTHER"
        };

        const categoryNamesFr = {
            admin: "ADMINISTRATION",
            group: "GROUPE",
            owner: "PROPRIÉTAIRE",
            fun: "JEUX & DIVERTISSEMENT",
            general: "GÉNÉRAL",
            info: "INFORMATIONS",
            tools: "OUTILS",
            media: "MÉDIA",
            download: "TÉLÉCHARGEMENT",
            utility: "UTILITAIRES",
            search: "RECHERCHE",
            other: "AUTRES"
        };
        const categoryNamesEs = {
            admin: "ADMINISTRACIÓN",
            group: "GRUPO",
            owner: "PROPIETARIO",
            fun: "JUEGOS",
            general: "GENERAL",
            info: "INFORMACIÓN",
            tools: "HERRAMIENTAS",
            media: "MULTIMEDIA",
            download: "DESCARGAS",
            utility: "UTILIDADES",
            search: "BÚSQUEDA",
            other: "OTROS"
        };

        // CATEGORY ORDER
        const preferredOrder = [
            "owner",
            "admin",
            "group",
            "general",
            "tools",
            "media",
            "download",
            "fun",
            "info",
            "utility",
            "search",
            "other"
        ];

        // ORGANIZE COMMANDS
        const categories = {};

        for (const [name, command] of commands.entries()) {
            if (name !== command.name) continue;

            const category =
                typeof command.category === "string"
                    ? command.category.toLowerCase()
                    : "other";

            if (!categories[category]) {
                categories[category] = [];
            }

            categories[category].push(command);
        }

        // SORT CATEGORIES
        const sortedCategories = Object.keys(categories).sort(
            (a, b) => {
                const ai = preferredOrder.indexOf(a);
                const bi = preferredOrder.indexOf(b);

                if (ai === -1 && bi === -1) {
                    return a.localeCompare(b);
                }

                if (ai === -1) return 1;
                if (bi === -1) return -1;

                return ai - bi;
            }
        );

        const totalCommands = Object.values(categories)
            .reduce(
                (total, list) => total + list.length,
                0
            );

        const totalCategories = sortedCategories.length;

        // DESCRIPTION FORMAT
        const formatDescription = (description) => {
            if (!description) {
                return config.language === "fr"
                    ? "✦ *Aucune description disponible*"
                    : config.language === "es"
                    ? "✦ *Sin descripción disponible*"
                    : "✦ *No description available*";
            }

            return `✦ *${String(description)
                .replace(/\\r?\\n/g, " ")
                .replace(/\\s+/g, " ")
                .trim()}*`;
        };

        // CATEGORY DISPLAY
        const getCategoryName = (category) => {
            if (config.language === "es") { return categoryNamesEs[category] || category; }
            if (config.language === "fr") {
                return (
                    categoryNamesFr[category] ||
                    category.charAt(0).toUpperCase() +
                    category.slice(1)
                );
            }

            return (
                categoryNames[category] ||
                category.charAt(0).toUpperCase() +
                category.slice(1)
            );
        };

        // SEND MENU
        const sendMenu = async (caption) => {
            if (hasMenuImage) {
                return await sock.sendMessage(jid, {
                    image: {
                        url: menuImage
                    },
                    caption
                });
            }

            return await sock.sendMessage(jid, {
                text: caption
            });
        };

        // UNKNOWN CATEGORY
        if (page && !categories[page]) {
            let available = "";

            for (const category of sortedCategories) {
                const icon = icons[category] || "📦";

                available +=
                    `│ ${icon} ${getCategoryName(category)}  ›  ` +
                    `${categories[category].length}\n`;
            }

            const unknown =
                config.language === "fr"
                    ? "❌ _Cette catégorie n'existe pas._"
                    : config.language === "es"
                    ? "❌ _Esta categoría no existe._"
                    : "❌ _This category does not exist._";

            const availableTitle =
                config.language === "fr"
                    ? "📂 CATÉGORIES DISPONIBLES"
                    : config.language === "es"
                    ? "📂 CATEGORÍAS DISPONIBLES"
                    : "📂 AVAILABLE CATEGORIES";

            const example =
                config.language === "fr"
                    ? "Exemple :"
                    : config.language === "es"
                    ? "Ejemplo:"
                    : "Example:";

            return await sendMenu(
`╭─────────────────╮
   ✦ *${botName}* ✦
╰─────────────────╯

╭──[ ❌ ${config.language === "fr"
    ? "PAGE INTROUVABLE"
    : config.language === "es"
    ? "PÁGINA NO ENCONTRADA"
    : "PAGE NOT FOUND"} ]────╮
│
│ ${unknown}
│
╰────────────────────────╯

╭──[ ${availableTitle} ]────╮
│
${available}╰────────────────────────╯

💡 ${example}
│ ⇛ ${prefix}menu tools

> ✦ ${botName} • v${version}`
            );
        }

        // HEADER
        let menu =
`╭─────────────────╮
   ✦ *${botName}* ✦
╰─────────────────╯
╭─────────────────╮
│ ${config.language === "fr"
    ? "Préfixe"
    : config.language === "es"
    ? "Prefijo"
    : "Prefix"} : ${prefix}
│ ${config.language === "fr"
    ? "Bonjour"
    : config.language === "es"
    ? "Hola"
    : "Hello"} : ${userName}
│ ${config.language === "fr"
    ? "Jour"
    : config.language === "es"
    ? "Día"
    : "Day"} : ${day}
│ ${config.language === "fr"
    ? "Date"
    : config.language === "es"
    ? "Fecha"
    : "Date"} : ${date}
│ ${config.language === "fr"
    ? "Version"
    : config.language === "es"
    ? "Versión"
    : "Version"} : ${version}
│ ${config.language === "fr"
    ? "Commandes"
    : config.language === "es"
    ? "Comandos"
    : "Commands"} : ${totalCommands}
│ ${config.language === "fr"
    ? "Catégories"
    : config.language === "es"
    ? "Categorías"
    : "Categories"} : ${totalCategories}
│ ${config.language === "fr"
    ? "Type"
    : config.language === "es"
    ? "Tipo"
    : "Type"} : WhatsApp Bot
╰─────────────────╯`;

        // MAIN MENU
        if (!page) {
            for (const category of sortedCategories) {
                const icon = icons[category] || "📦";
                const name = getCategoryName(category);
                const categoryCommands = categories[category];

                menu += `

╭──[ ${icon} ${name} ${icon} ]──────╮
│`;

                for (const command of categoryCommands) {
                    let description;

                    if (config.language === "fr") {
                        description =
                            commandFr[command.name] ||
                            dictionary[command.name] ||
                            command.description;
                    } else if (config.language === "es") {
                        description =
                            commandEs[command.name] ||
                            dictionary[command.name] ||
                            command.description;
                    } else {
                        description =
                            dictionary[command.name] ||
                            command.description;
                    }

menu += `│ ⇛ \`${prefix}${command.name}\`
│   ${formatDescription(description)}\n`;                }

                menu += `
╰─────────────────╯`;
            }

            menu += `

> ✦ *Powered By ${botName}* ✦`;

            return await sendMenu(menu);
        }

        // CATEGORY PAGE
        const icon = icons[page] || "📦";
        const categoryName = getCategoryName(page);
        const categoryCommands = categories[page];

        menu += `

╭──[ ${icon} ${categoryName} ${icon} ]──────╮
│`;

        for (const command of categoryCommands) {
            let description;

            if (config.language === "fr") {
                description =
                    commandFr[command.name] ||
                    dictionary[command.name] ||
                    command.description;
            } else if (config.language === "es") {
                description =
                    commandEs[command.name] ||
                    dictionary[command.name] ||
                    command.description;
            } else {
                description =
                    dictionary[command.name] ||
                    command.description;
            }

menu += `│ ⇛ \`${prefix}${command.name}\`
│   ${formatDescription(description)}\n`;
        }

        menu += `
╰─────────────────╯

> ✦ ${botName} • v${version}
> ${config.language === "fr"
    ? "Tapez .menu pour revenir au menu principal."
    : config.language === "es"
    ? "Escribe .menu para volver al menú principal."
    : "Type .menu to return to the main menu."}`;

        return await sendMenu(menu);
    }
};
