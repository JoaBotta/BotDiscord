const express = require('express');
const { Client, GatewayIntentBits } = require('discord.js');
const app = express();
const PORT = process.env.PORT || 3000;

// Configuración del bot de Discordss
const TOKEN = 'MTI3MzczODQwNTQ0ODEyMjUxMA.GTosen.SO4h109NXOR6OfR4vL8lLKpHQoEzDulN3Ai_ZY'; // Tu token real
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers] });

// Enlaces únicos asociados a roles
const ROLE_LINKS = {
    'unique-code-1': '1252033921319960588', // ID del Rol 1
    'unique-code-2': '1256337760294273045', // ID del Rol 2
    'unique-code-3': '1256337839512092754', // ID del Rol 3
};

// Login del bot
client.login(TOKEN);

client.once('ready', () => {
    console.log(`Bot conectado como ${client.user.tag}`);
});

// Ruta para manejar los enlaces y asignar roles
app.get('/:code', async (req, res) => {
    const code = req.params.code;
    
    if (ROLE_LINKS[code]) {
        const roleId = ROLE_LINKS[code];
        
        // Reemplaza con el ID de tu servidor (Guild ID)
        const guild = client.guilds.cache.get('TU_GUILD_ID_AQUÍ');

        if (!guild) {
            return res.status(404).send('Servidor no encontrado.');
        }

        // Aquí deberías identificar al usuario que accede al enlace.
        // Este es un ejemplo usando un ID fijo de usuario
        const userId = 'USER_ID_DEL_USUARIO'; // Reemplaza con un ID de usuario válido
        const member = await guild.members.fetch(userId);
        
        if (member) {
            try {
                await member.roles.add(roleId);
                res.send(`El rol con ID ${roleId} ha sido asignado al usuario.`);
            } catch (error) {
                console.error('Error al asignar el rol:', error);
                res.status(500).send('Error al asignar el rol.');
            }
        } else {
            res.status(404).send('Usuario no encontrado.');
        }
    } else {
        res.status(404).send('Enlace no válido.');
    }
});

// Iniciar el servidor Express
app.listen(PORT, () => {
    console.log(`Servidor Express en ejecución en el puerto ${PORT}`);
});
