# Dilemas Éticos e Sociais ⚖️🚗

![Moral Machine Concept](https://picsum.photos/seed/ethics/1200/400)

Uma plataforma sofisticada de coleta de dados éticos e sociais, inspirada no experimento **Moral Machine**. O objetivo é mapear a perspectiva humana sobre decisões críticas tomadas por inteligências artificiais em situações de dilema moral, especificamente em veículos autônomos.

---

## 👨‍💻 Autor
**Diego Marques de Carvalho**  
Engenheiro de Software & Pesquisador de Ética Computacional.

---

## 🎯 Sobre o Projeto
Este sistema foi projetado sob os princípios de **Baixo Acoplamento** e **Alta Coesão**, utilizando uma arquitetura em camadas para garantir escalabilidade e manutenibilidade. A aplicação permite que administradores cadastrem cenários éticos complexos (Dilemas) e usuários participem de sessões de "julgamento", onde cada decisão alimenta um motor de análise estatística.

### 🏗️ Organização do Projeto
O projeto segue uma estrutura baseada em camadas (Layered Architecture):
- **Camada de Domínio (`/src/types.ts`):** Define os modelos de dados centrais (Dilemas, Cenários, Votos).
- **Camada de Aplicação (`/src/services`):** Contém a lógica de negócios e orquestração de dados.
- **Camada de Infraestrutura (`/src/lib`):** Gerencia a integração com serviços externos (Firebase Firestore e Authentication).
- **Camada de Interface (`/src/pages` & `/src/components`):** UI moderna com design "Neo-Brutalista" focado em usabilidade e contraste.

---

## ✨ Funcionalidades Principais

### 🔧 Área Administrativa (Admin Panel)
- **Gestão de Dilemas:** Interface completa para cadastro, listagem e exclusão de cenários.
- **Upload Inteligente:** Suporte a descrições textuais e imagens (processadas em Base64 para máxima compatibilidade e rapidez).
- **Controle de Acesso:** Proteção via Firebase Auth, permitindo apenas administradores autenticados gerenciarem o acervo.

### 🏛️ Sessão de Julgamento (Judge Mode)
- **Experiência Imersiva:** UI focada na comparação visual de duas opções mutually exclusivas.
- **Resiliência:** Carregamento otimizado de dilemas do banco de dados com sistema de shuffle aleatório.
- **Acessibilidade:** Design focado em legibilidade e interações claras.

---

## 🚀 Tecnologias e Bibliotecas

| Categoria | Tecnologia |
| :--- | :--- |
| **Frontend** | [React 19](https://react.dev/) + [Vite](https://vitejs.dev/) |
| **Linguagem** | [TypeScript](https://www.typescriptlang.org/) |
| **Estilização** | [Tailwind CSS 4](https://tailwindcss.com/) |
| **Backend** | [Firebase](https://firebase.google.com/) (Firestore & Auth) |
| **Animações** | [Motion](https://motion.dev/) (Framer Motion) |
| **Ícones** | [Lucide React](https://lucide.dev/) |

---

## 🛠️ Como Usar o Repositório

### Pré-requisitos
- Node.js (v18+)
- Conta no Firebase com Firestore e Auth configurados.

### Instalação
1. Clone o repositório:
   ```bash
   git clone https://github.com/seu-usuario/dilemas-eticos.git
   ```
2. Instale as dependências:
   ```bash
   npm install
   ```
3. Configure as variáveis de ambiente:
   Crie um arquivo `firebase-applet-config.json` na raiz com suas credenciais do Firebase.

### Execução
- Inicie o servidor de desenvolvimento:
  ```bash
  npm run dev
  ```
- O projeto estará disponível em `http://localhost:3000`.

---

## 📜 Licença e Ética
Este projeto é destinado a fins educacionais e de pesquisa. O autor defende o uso ético de todos os dados coletados para promover uma IA mais humana e justa.

---
*Organizado, projetado e desenvolvido com foco em excelência técnica.*
