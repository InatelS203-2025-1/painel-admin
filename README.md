<div class="flex" style="justify-content: left; align-items: center; text-align: center; gap: 12px;">

<img src=".github/pokeball.png" width="64" height="64" />

<h1>Pokéadmin</h1>

</div>

**S203 - Arquitetura e Desenho de Software**

## 💻 Sobre o Projeto

Painel administrativo para gerenciamento de coleções de cartas Pokémon, desenvolvido com tecnologias modernas para oferecer uma experiência fluida e responsiva.

### Funcionalidades Principais
- Estatísticas e métricas das APIS utilizadas
- Dashboard possui dados de:
  - Jogadores
  - Cartas dos jogadores
  - Propostas de trocas em aberto
  - Histórico de trocas
  - Cartas disponiveis para troca

## 🚀 Tecnologias

- [Next.js 15](https://nextjs.org/) - Framework React com SSR
- [TypeScript](https://www.typescriptlang.org/) - Superset JavaScript
- [Tailwind CSS](https://tailwindcss.com/) - Framework CSS
- [Zustand](https://zustand-demo.pmnd.rs/) - Gerenciamento de Estado
- [Zod](https://zod.dev/) - Validação de Schemas
- [Lucide Icons](https://lucide.dev/) - Biblioteca de Ícones
- [React Hook Form](https://react-hook-form.com/) - Gerenciamento de Formulários

## 🔧 Instalação

1. Clone o repositório:

```bash
git clone https://github.com/seu-usuario/pokeadmin.git
cd pokeadmin
```

2. Instale as dependências:

```bash
npm install
# ou
yarn
```

3. Criando os arquivos de variáveis de ambiente:

Crie dois arquivos `.env.development` e `.env.production` na raiz do projeto, com base no exemplo abaixo:

```env
# .env.development
NEXT_PUBLIC_API_URL=http://localhost:3001/api
NEXT_PUBLIC_ENABLE_TRADING=true
```

4. Executando em DEV:

```bash
cd /src/
npm run dev

# ou

cd /src/
yarn dev
```

5. Acessando no navegador:

```
http://localhost:3000
```

---

## 📦 Scripts Disponíveis

- `dev`: Inicia o servidor em modo de desenvolvimento.
- `build`: Cria a versão de produção do projeto.
- `start`: Inicia o servidor com o build de produção.
- `lint`: Executa o linter para verificar erros de código.
- `format`: Formata os arquivos com Prettier.

---

## 📁 Estrutura do Projeto

```
pokeadmin/
│
├── app/                  # Estrutura de rotas com App Router do Next.js
│   ├── dashboard/        # Página principal do painel
│   ├── cards/            # Gestão de cartas
│   ├── trades/           # Sistema de trocas
│   └── layout.tsx        # Layout base compartilhado
│
├── components/           # Componentes reutilizáveis
├── hooks/                # Hooks customizados (ex: useUserStore)
├── lib/                  # Funções auxiliares e utilitários
├── schemas/              # Schemas de validação com Zod
├── store/                # Zustand (gerenciamento de estado)
├── styles/               # Estilizações globais
├── types/                # Tipagens globais e interfaces
├── public/               # Arquivos públicos e estáticos
└── .env*                 # Arquivos de variáveis de ambiente
```

---

## 🧠 Padrões e Boas Práticas

- Clean Architecture: Separação clara de responsabilidades.
- S.O.L.I.D: Princípios de design aplicados à estrutura dos componentes e lógica de negócio.
- SPA - Single Page Application: Aplicação de página única para uma experiência de usuário fluida e dinâmica.
- Validação de tipos e dados com `zod`.
- State Management com `zustand`, centralizado e modular.
- Componentização com reusabilidade e acessibilidade.
- Estilização responsiva com `tailwindcss`.

---

## 🧩 Design Patterns Utilizados

O projeto aplica diversos padrões de projeto (Design Patterns) para garantir organização, escalabilidade e manutenibilidade do código:

### Factory Method

Permite criar componentes diferentes de acordo com regras de negócio. Exemplo: cards de Pokémon lendários são renderizados com um componente especial (`CardLendario`), enquanto os demais usam o card padrão.

### Observer

Permite que componentes reajam automaticamente a mudanças de estado. Exemplo: o sistema de notificações (toasts) e a atualização automática da coleção de cartas usam Observer para notificar componentes sobre mudanças.

### Composite

Permite compor interfaces complexas a partir de componentes menores e reutilizáveis. Exemplo: os cards de Pokémon são compostos por header, imagem, selo, botões, etc. Menus, listas e abas também seguem esse padrão.

### Strategy

Permite alternar entre diferentes algoritmos de filtragem e ordenação. Exemplo: filtros de cartas por tipo, favoritos, etc., podem ser implementados como estratégias diferentes.

---

## 👨‍💻 Autores

**João Gabriel Betela da Costa**
193 | GES

**Marco Renzo Rodrigues Di Toro**
150 | GES

**Vitor Torres Gonzaga**
517 | GES

---
