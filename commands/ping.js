import moment from 'moment-timezone';
import pkg from '@whiskeysockets/baileys';
const { generateWAMessageFromContent, proto } = pkg;
import fetch from 'node-fetch';
import config from '../../config.cjs';

const OthersCmd = async (m, sock) => {
  const prefix = config.PREFIX;
  const mode = config.MODE;
  const pushName = m.pushName || 'User';

  const cmd = m.body.startsWith(prefix)
    ? m.body.slice(prefix.length).split(' ')[0].toLowerCase()
    : '';

    // Random quotes list
  const quotes = [
    "Believe you can and you're halfway there.",
    "Success is not final, failure is not fatal: It is the courage to continue that counts.",
    "The only way to do great work is to love what you do.",
    "Dream big and dare to fail.",
    "Don't watch the clock; do what it does. Keep going.",
    "Act as if what you do makes a difference. It does.",
    "Start where you are. Use what you have. Do what you can.",
    "What lies behind us and what lies before us are tiny matters compared to what lies within us.",
    "You miss 100% of the shots you don't take.",
    "The best time to plant a tree was 20 years ago. The second best time is now."
  ];

  const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
  // Common function to send message with newsletterJid and externalAdReply
  const sendCommandMessage = async (messageContent) => {
    await sock.sendMessage(
      m.from,
      {
        text: messageContent,
        contextInfo: {
          isForwarded: true,
          forwardingScore: 999,
          forwardedNewsletterMessageInfo: {
            newsletterJid: '120363290715861418@newsletter', // Preserved newsletter JID
            newsletterName: "𝐁𝐮𝐦𝐛𝐥𝐞𝐛𝐞𝐞-𝐗𝐌𝐃",
            serverMessageId: -1,
          },
          externalAdReply: {
            title: "😇𝐁𝐮𝐦𝐛𝐥𝐞𝐛𝐞𝐞-𝐗𝐌𝐃😇",
            body: pushName,
            thumbnailUrl: 'https://files.catbox.moe/w5xf3f.jpg', // Thumbnail URL
            sourceUrl: 'https://github.com/Popkiddevs/POPKID-XTECH', // Source URL
            mediaType: 1,
            renderLargerThumbnail: true,
          },
        },
      },
      { quoted: m }
    );
  };
  // Command: ping
if (cmd === "ping") {
    await m.React('⏳'); // React with a loading icon
    const start = new Date().getTime();
    await m.React('⏳'); // React with a loading icon
    const end = new Date().getTime();
    const responseTime = (end - start).toFixed(2);
    
    const responseText = `*_𝐁𝐮𝐦𝐛𝐥𝐞𝐛𝐞𝐞-𝐗𝐌𝐃 Speed is_* ${responseTime} ms`;

    await m.React('✅'); // React with success icon
    await sendCommandMessage(responseText);
}

//alive msg
  if (cmd === "alive") {
    await m.React('⏳'); // React with a loading icon

    const aliveMessage = `╭─────────────────◆
:|🎭𝐁𝐮𝐦𝐛𝐥𝐞𝐛𝐞𝐞-𝐗𝐌𝐃 𝐒𝐓𝐀𝐓𝐔𝐒
│─────────────────◆
│ 𝙼𝚁 ${pushName} 𝙸 𝙰𝙼 𝙰𝙻𝙸𝚅𝙴
│─────────────────◆
│  🤖 *Bot Name:* 𝐁𝐮𝐦𝐛𝐥𝐞𝐛𝐞𝐞-𝐗𝐌𝐃
│─────────────────◆
│  👑 *Owner:* ${config.OWNER_NAME}
│─────────────────◆
│  📞 *Contact:* ${config.OWNER_NUMBER}
│─────────────────◆
│  ⏱️ *Uptime Details:*
│   📅 *Days:* ${days}
│   ⏳ *Hours:* ${hours}
│   ⏲️ *Minutes:* ${minutes}
│   ⌛ *Seconds:* ${seconds}
│─────────────────◆
│  🌟 *𝐓𝐎𝐅𝐀𝐘𝐒 𝐐𝐔𝐎𝐓𝐄*
│─────────────────◆
│   "${randomQuote}"
│─────────────────◆
│ 😇𝐈𝐓𝐒 𝐁𝐮𝐦𝐛𝐥𝐞𝐛𝐞𝐞-𝐗𝐌𝐃😇
╰─────────────────◆`;

await m.React('✅'); // React with success icon
    await sendCommandMessage(aliveMessage);
  }
 
 
  if (cmd === "about") {
    await m.React('⏳'); // React with a loading icon

    const aboutMessage = `╭─────────────◆  
🎭 *😇𝐁𝐮𝐦𝐛𝐥𝐞𝐛𝐞𝐞-𝐗𝐌𝐃😇*  
╰─────────────◆  
╭─────────────◆  
│ 👑 *Hello MR ${pushName}*  
│   😇𝐈𝐓𝐒 𝐁𝐮𝐦𝐛𝐥𝐞𝐛𝐞𝐞-𝐗𝐌𝐃😇.  
│   Always at your service!  
╰─────────────◆  
╭─────────────◆  
│ 🤖 *𝙱𝚘𝚃-𝙽𝚊𝙼𝚎:* 𝐁𝐮𝐦𝐛𝐥𝐞𝐛𝐞𝐞-𝐗𝐌𝐃  
│ 👑 *𝙾𝚠𝚗𝚎𝚛𝙽𝚊𝙼𝚎* ${config.OWNER_NAME}  
│ 📞 *𝙾𝚠𝚗𝚎𝚛𝙽𝚞𝚖* ${config.OWNER_NUMBER}  
│ 🌐 𝙶𝚒𝚃𝙷𝚞𝙱 = https://github.com/Black-Tappy/Bumblebee-XMD
│ 💻 *𝐃𝐄𝐕* https://github.com/Black-Tappy
╰─────────────◆  
╭─────────────◆  
│ 🔥 *𝚃𝙴𝙰𝙼 𝙼𝙴𝙼𝙱𝙴𝚁𝚂:*  
│   🛡️𝐁𝐮𝐦𝐛𝐥𝐞𝐛𝐞𝐞-𝐗𝐌𝐃 (𝙾𝚠𝚗𝚎𝚛 & 𝙲𝚛𝚎𝚊𝚝𝚘𝚛)  
│   ⚡ 𝐁𝐮𝐦𝐛𝐥𝐞𝐛𝐞𝐞-𝐗𝐌𝐃 (𝚃𝚎𝚜𝚝𝚎𝚛 𝙱𝚞𝚐 𝚏𝚒𝚡𝚎𝚛)  
╰─────────────◆
*𝐩𝐨𝐰𝐞𝐫𝐞𝐝 𝐛𝐲 𝐁𝐮𝐦𝐛𝐥𝐞𝐛𝐞𝐞-𝐗𝐌𝐃*
`;
await m.React('✅'); // React with success icon
    await sendCommandMessage(aboutMessage);
  }
  // Vcard 
  
 
//script ya sc 

if (cmd === "script" || cmd === "sc" || cmd === "repo") {
    await m.React('⏳'); // Loading reaction

    const owner = "🅑r̸𝐢𝖌𝖍t̸_×͜×";
    const repo = "https://github.com/Black-Tappy/LEGION-XMD";

    try {
        const response = await fetch(`https://api.github.com/repos/${owner}/${repo}`);
        const data = await response.json();

        if (!data.stargazers_count) throw new Error("Invalid Repo or API Limit!");

        const statsMessage = `📌 *GitHub Repo Stats*  
🌟 *Stars:* ${data.stargazers_count}  
🍴 *Forks:* ${data.forks_count}  
👁️ *Watchers:* ${data.watchers_count}  
🔗 *Repo:* ${data.html_url}`;

        await m.React('✅'); // Success reaction
        await sendCommandMessage(statsMessage);

    } catch (error) {
        await m.React('❌'); // Error reaction
        await sendCommandMessage("❌ *Error fetching GitHub data!*");
    }
}
};

export default OthersCmd;
