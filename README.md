# 🧠 FanProfile Frontend

Este projeto é o frontend de um sistema de cadastro e validação de fãs, focado no universo dos e-sports. Ele permite que usuários cadastrem seus dados, validem documentos com OCR e vinculem redes sociais, jogos e produtos preferidos.

---

## 📚 Tecnologias Utilizadas

- **[Next.js 14+](https://nextjs.org/)** — Framework React moderno com suporte a SSR e rotas otimizadas.
- **[React 18+](https://reactjs.org/)** — Biblioteca para construção de interfaces interativas.
- **[Tailwind CSS](https://tailwindcss.com/)** — Framework CSS utilitário para criação rápida de interfaces responsivas (mobile-first).
- **[Context API](https://reactjs.org/docs/context.html)** — Gerência de estado global para persistir os dados do formulário.
- **[Tesseract.js](https://github.com/naptha/tesseract.js)** — Biblioteca de OCR em JavaScript usada para leitura de texto de imagens (documentos como CPF).
- **TypeScript** — Tipagem estática para maior segurança e autocompletar eficiente.

---

## 📂 Estrutura de Pastas

/
├── public/ # Arquivos estáticos (imagens, favicon, etc)
├── src/
│ ├── app/ # Rotas e páginas
│ │ └── pages/ # Etapas do formulário (register, verify-id, etc)
│ ├── components/ # Componentes reutilizáveis
│ ├── context/ # Contexto global (FanContext)
│ ├── services/ # Comunicação com a API (ex: enviarFanData)
│ └── styles/ # Configurações do Tailwind (se customizadas)
├── .env.local # Variáveis de ambiente (criado a partir do .env.example)
├── tailwind.config.ts # Configurações do Tailwind CSS
├── next.config.js # Configurações do Next.js
└── tsconfig.json # Configuração do TypeScript


---

## ⚙️ Como rodar o projeto localmente

### 1. Clone o repositório

```bash
git clone https://github.com/seu-usuario/fanprofile-frontend.git
cd fanprofile-frontend
```

### 2. Instale as dependencias

```
npm install
# ou
yarn install
```


### 3. Configure o arquivo .env.local
```
Crie um arquivo .env.local com base no .env.example:

bash
cp .env.example .env.local
```
### 4. Abra o .env.local e configure a URL da API:

```
ini
NEXT_PUBLIC_API_URL=http://localhost:3001

Obs.: A porta pode mudar conforme o backend.
```

### 5. 🚀 Executar o projeto
 ```
bash
Copiar
Editar
npm run dev
# ou
yarn dev
```
### 📡 Comunicação com o Backend
```
Todos os dados do fã são enviados para a API via serviço localizado em src/services/fansService.ts. A URL base da API é lida da variável de ambiente NEXT_PUBLIC_API_URL.
```
### 💡 Funcionalidades
```
Cadastro de fã com nome, CPF, e-mail e endereço

Validação de CPF via OCR (documento de identidade)

Vinculação de redes sociais e perfis de jogos

Resumo e submissão para API com feedback visual

Interface responsiva e acessível (mobile-first)
```
### 🛠️ Scripts úteis
Comando	Descrição
npm run dev	Inicia servidor de desenvolvimento
npm run build	Compila o projeto para produção
npm run start	Inicia servidor de produção
npm run lint	Executa verificação de lint

### 🧪 Testes (caso adicione futuramente)
```
Você pode adicionar suporte a testes com:

Jest

React Testing Library
```

👤 Autor
Desenvolvido por Lorenzo de Quadros Gonçalves
