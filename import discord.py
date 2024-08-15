import discord

client = discord.Client()

@client.event
async def on_ready():
    guild = client.get_guild(1252033921319960587)  # Reemplaza con el ID de tu servidor
    role1 = guild.get_role(1252033921319960588)  # Alumno 1
    role2 = guild.get_role(1256337760294273045)  # Alumno 2
    role3 = guild.get_role(1256337839512092754)  # Alumno 3

    invite1 = await guild.create_invite(max_age=86400, max_uses=1, reason="Invitación para Alumno 1", roles=[role1])
    invite2 = await guild.create_invite(max_age=86400, max_uses=1, reason="Invitación para Alumno 2", roles=[role2])
    invite3 = await guild.create_invite(max_age=86400, max_uses=1, reason="Invitación para Alumno 3", roles=[role3])

    print(f"Enlace de invitación para Alumno 1: {invite1.url}")
    print(f"Enlace de invitación para Alumno 2: {invite2.url}")
    print(f"Enlace de invitación para Alumno 3: {invite3.url}")

client.run("MTI3MzczODQwNTQ0ODEyMjUxMA.GTosen.SO4h109NXOR6OfR4vL8lLKpHQoEzDulN3Ai_ZY")  # Reemplaza con el token de tu bot