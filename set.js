

const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiUUtRRktXTktaMlM3VFRWSk1UYVVJNjJ2VyszcDZId0ROYVdsZ2FsYXhXdz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiYnMySVBXdmJTdXVsUTVhTjFJQWEwMmsxT0RpdzRpaXFZWWtpNVFYQUEyVT0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiI2Q0lzNUVvQkd5ZGtxM1VMTSs5NjZURStzSlRtd0JaUDY0UTNwT2pYaUZVPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJiVkFrSzV2UVRzclpPU0lCaU56MlMrTUFoaWo2em1LeTFRT0VLbWpFR3k0PSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IndDM0MycXR4T2Y4bEpKVHAwemNxZms1OU95ZU5BMmZuYVM0M0JxdENnSHc9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Ik03RXNBL1Y0TmdMZjk5VzJVUUFFRDJaQWNEVU81UDJyOW1wSWFkbnA1WHc9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoieUlDdUwwRFFXZ3k1cUk2VDdMcWtZZzB3MU9QSXdjRlQ3VVB3L1Q0NnFGOD0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoicVEzaU5VWEw5TW9zaUM5ZzVqdjdyKzR5K000UlNtZUU0ckxWbGJ5RzJoVT0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkkvQVo5Z0tYcW9sTXc3WTRYVHp1MFpWdFMrSml2SmhUT3p2VTVEZi9EQkw3bGlSd0JPc0UzVmFSVmxTRC84RVBCN29zVDd4bkFCYnVDdDBHUHlGQ0FRPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6NTgsImFkdlNlY3JldEtleSI6InM3ZUdVLyt4eHBNZ2FWWDFrTW5qR1ByVVdSdWFVajZOU3NsekR4MTMrV289IiwicHJvY2Vzc2VkSGlzdG9yeU1lc3NhZ2VzIjpbXSwibmV4dFByZUtleUlkIjozMSwiZmlyc3RVbnVwbG9hZGVkUHJlS2V5SWQiOjMxLCJhY2NvdW50U3luY0NvdW50ZXIiOjAsImFjY291bnRTZXR0aW5ncyI6eyJ1bmFyY2hpdmVDaGF0cyI6ZmFsc2V9LCJkZXZpY2VJZCI6IktQQl91V2xVVEZHUEVvUjRXOHprZlEiLCJwaG9uZUlkIjoiMTZlNzE5MTMtMzg2My00Y2M0LTk4MmItN2VhMzBhZGI2YjVkIiwiaWRlbnRpdHlJZCI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InVRbklGYzBiRHN2OHpueWNpaEVMV1RnelRsOD0ifSwicmVnaXN0ZXJlZCI6dHJ1ZSwiYmFja3VwVG9rZW4iOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJwVVNyRXZTN0xidUFNNnFCVkZHWDhoNUlsK3M9In0sInJlZ2lzdHJhdGlvbiI6e30sInBhaXJpbmdDb2RlIjoiU0ZNMzRCTk4iLCJtZSI6eyJpZCI6IjI1NDExMTkxODY1Nzo2OEBzLndoYXRzYXBwLm5ldCIsIm5hbWUiOiJUb25ueSJ9LCJhY2NvdW50Ijp7ImRldGFpbHMiOiJDTmY5bmNrSEVNZUQzYjRHR0JNZ0FDZ0EiLCJhY2NvdW50U2lnbmF0dXJlS2V5IjoiSHZIdmsrY3VyRnFmOFpRa0tncFBpbHJESmg4ZldzNVpBMlFkV05MR1BGMD0iLCJhY2NvdW50U2lnbmF0dXJlIjoiNWd0RENIRGlDckExdHJhSWNvSHJFY1hod25tc3d3em5BcTc1eStpbWU0YjEvaVdnVy9SeGdGSm9XNnZkZm5RNEl2VTV6MEN1QnBTYmo2SWpLdDMrQ0E9PSIsImRldmljZVNpZ25hdHVyZSI6IjF1M0NIQ0xncnk4Z3Fnd01FTHlWVUxkemNaT3dXK0p2dFJFVjRLT2lFWEVldzdJMW5NbllvTHBRb0RSejNrakdBeHh4TmU0aWNrRWcxRm9Bd2tnNEFnPT0ifSwic2lnbmFsSWRlbnRpdGllcyI6W3siaWRlbnRpZmllciI6eyJuYW1lIjoiMjU0MTExOTE4NjU3OjY4QHMud2hhdHNhcHAubmV0IiwiZGV2aWNlSWQiOjB9LCJpZGVudGlmaWVyS2V5Ijp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQlI3eDc1UG5McXhhbi9HVUpDb0tUNHBhd3lZZkgxck9XUU5rSFZqU3hqeGQifX1dLCJwbGF0Zm9ybSI6InNtYmEiLCJsYXN0QWNjb3VudFN5bmNUaW1lc3RhbXAiOjE3NDIxNjAzNDF9',
    PREFIXE: process.env.PREFIX || ".",
    OWNER_NAME: process.env.OWNER_NAME || "🅑r̸𝐢𝖌𝖍t̸_×͜×",
    CAPTION : process.env.CAPTION || "𝘽𝙪𝙢𝙗𝙡𝙚𝙗𝙚𝙚--𝙓𝙈𝘿",
    NUMERO_OWNER : process.env.NUMERO_OWNER || "🅑r̸𝐢𝖌𝖍t̸_×͜×",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "yes",
    AUTO_REACT : process.env.AUTO_REACT || 'yes',
    ANTICALL: process.env.ANTICALL || 'yes',
    GURL: process.env.GURL  || "https://whatsapp.com/channel/0029VasHgfG4tRrwjAUyTs10",
    WEBSITE :process.env.GURL || "https://whatsapp.com/channel/0029VasHgfG4tRrwjAUyTs10",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'no',
    BOT : process.env.BOT_NAME || '𝘽𝙪𝙢𝙗𝙡𝙚𝙗𝙚𝙚-𝙓𝙈𝘿',
    URL : process.env.BOT_MENU_LINKS || 'https://i.imgur.com/hk3vZ9W.jpeg',
    URL: process.env.URL || "https://files.catbox.moe/yedfbr.jpg",
    MODE: process.env.PUBLIC_MODE || "yes",
    PM_PERMIT: process.env.PM_PERMIT || 'yes',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '',
    CHATBOT : process.env.PM_CHATBOT || 'no',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    AUTOREAD_MESSAGE : process.env.AUTO_READ || "yes",
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    TECH : process.env.AUTO_REACT_STATUS || 'yes',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway" : "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway",
   
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
