const { Client, GatewayIntentBits } = require("discord.js");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers
  ]
});

// 🔒 CONFIGURAÇÕES
const DONO_ID = "1434841888539807876"; // seu ID
const CARGO_ID = "1457616573375451260"; // ID do cargo
// 🔒 TOKEN NÃO FICA AQUI
const TOKEN = process.env.TOKEN;

client.once("ready", () => {
  console.log(`Bot ligado como ${client.user.tag}`);
});

client.on("messageCreate", async (msg) => {
  if (msg.author.bot) return;
  if (msg.content !== "-addcargo") return;

  if (msg.author.id !== DONO_ID) {
    return msg.reply("❌ Apenas o dono pode usar esse comando.");
  }

  const member = await msg.guild.members.fetch(msg.author.id);
  const cargo = msg.guild.roles.cache.get(CARGO_ID);

  if (!cargo) return msg.reply("❌ Cargo não encontrado.");

  await member.roles.add(cargo);
  msg.reply("✅ Cargo adicionado com sucesso!");
});

client.login(TOKEN);
