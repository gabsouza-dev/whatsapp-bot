import fs from "fs";
import yaml from "yaml";
import { Client, LocalAuth } from "whatsapp-web.js";

const configFile = fs.readFileSync("config.yml", "utf8");
const config = yaml.parse(configFile);
const client = new Client({ authStrategy: new LocalAuth() });

client.on("ready", async () => {
    console.log("WhatsApp conectado!");

    const numero = config.whatsapp.numero.replace(/\D/g, "") + "@c.us";
    const mensagem = config.whatsapp.mensagem;

    await client.sendMessage(numero, mensagem);
    
    console.log(`Mensagem enviada para ${config.whatsapp.numero}`);
});

client.initialize();