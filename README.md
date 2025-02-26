# 🤖 WhatsApp Bot - Automacao de Mensagens com TypeScript e YAML

Este projeto permite o envio automatizado de mensagens via WhatsApp utilizando **TypeScript**, **whatsapp-web.js** e **YAML** para configuração das mensagens. Ele funciona através da automação do WhatsApp Web, permitindo enviar mensagens para contatos sem precisar interagir manualmente.

## 📌 Funcionalidades
✅ Leitura de um arquivo `config.yml` para obter os dados da mensagem
✅ Conexão automática ao WhatsApp Web
✅ Envio de mensagens para números específicos
✅ Armazenamento de sessão para evitar login manual toda vez

---

## 📁 Estrutura do Projeto

```
📂 whatsapp-bot/
│── 📂 node_modules/       # Dependências instaladas (após rodar `npm install`)
│── 📂 sessions/           # Sessões salvas do WhatsApp Web (gerado automaticamente)
│── 📜 config.yml          # Arquivo YAML com os dados da mensagem
│── 📜 index.ts            # Código principal em TypeScript
│── 📜 package.json        # Configurações do Node.js e dependências
│── 📜 tsconfig.json       # Configurações do TypeScript
│── 📜 .gitignore          # Para ignorar node_modules e sessions
```

---

## 🛠️ Instalação e Configuração

### 1️⃣ **Clonar o Repositório**
```sh
git clone https://github.com/seu-usuario/whatsapp-bot.git
cd whatsapp-bot
```

### 2️⃣ **Instalar Dependências**
```sh
npm install
```

### 3️⃣ **Configurar o `config.yml`**
Crie ou edite o arquivo `config.yml` para definir os parâmetros da mensagem:

```yml
whatsapp:
  numero: "+5511999999999"   # Número do destinatário (com DDI e DDD)
  mensagem: "Olá! Esta é uma mensagem automatizada."  # Texto da mensagem
  horario: "2025-02-26T14:00:00"  # (Opcional) Horário de envio
```

### 4️⃣ **Rodar o Script**
#### Opção 1: Compilar e executar
```sh
npx tsc  # Compila o TypeScript
node dist/index.js  # Executa o script compilado
```

#### Opção 2: Rodar diretamente com `ts-node`
```sh
npx ts-node index.ts
```

---

## 📜 Código Principal (`index.ts`)

```ts
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
```

---

## 📌 Notas Importantes
- **Este projeto não usa a API oficial do WhatsApp**. Ele automatiza o WhatsApp Web, então pode ser necessário escanear o QR Code na primeira execução.
- O `whatsapp-web.js` cria uma pasta `sessions/` para armazenar a autenticação, evitando que você precise logar toda vez.
- Caso o WhatsApp detecte um uso excessivo, pode ocorrer um bloqueio temporário. Use com moderação.

---

## 📞 Contato
Caso tenha dúvidas ou sugestões, me chama no WhatsApp... brincadeira! 😂 Abra uma issue ou contribua com o projeto no GitHub! 🚀
