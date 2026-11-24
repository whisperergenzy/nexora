const settings = require("../../lib/settings");
const { t } = require("../../lib/lang");

module.exports = {

    name: "language",

    aliases: ["lang"],

    description: "Change bot language",

    category: "owner",

    permission: "owner",

    usage: ".language en/fr/es",

    execute: async (sock, msg, args) => {

        const jid = msg.key.remoteJid;

        const lang = args[0]?.toLowerCase();

        if (!["en", "fr", "es"].includes(lang)) {

            return sock.sendMessage(jid, {
                text: t("owner.language_usage")
            });

        }

        settings.set(
            "global",
            "language",
            lang
        );

        await sock.sendMessage(jid, {
            text: lang === "fr" ? "🇫🇷 Langue du bot changée en Français." : lang === "es" ? "🇪🇸 Idioma del bot cambiado a Español." : "🇬🇧 Bot language changed to English."
        });

    }

};
