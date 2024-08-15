import { Client, GatewayIntentBits } from 'discord.js';

const TOKEN = process.env.DISCORD_BOT_TOKEN;
const GUILD_ID = process.env.DISCORD_GUILD_ID;
const ROLE_LINKS = {
    'unique-code-1': '1252033921319960588',
    'unique-code-2': '1256337760294273045', 
    'unique-code-3': '1256337839512092754'
};

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers] });

client.login(TOKEN);

export default async function handler(req, res) {
    const { code, userId } = req.query;

    if (!ROLE_LINKS[code]) {
        return res.status(404).send('Enlace no válido.');
    }

    const roleId = ROLE_LINKS[code];
    const guild = client.guilds.cache.get(GUILD_ID);

    if (!guild) {
        return res.status(404).send('Servidor no encontrado.');
    }

    try {
        const member = await guild.members.fetch(userId);

        await member.roles.add(roleId);
        res.send(`Rol asignado: ${roleId} a ${userId}`);
    } catch (error) {
        console.error('Error al asignar el rol:', error);
        res.status(500).send('Error al asignar el rol.');
    }
}
