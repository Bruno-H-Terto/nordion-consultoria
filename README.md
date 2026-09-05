# Nordion

Landing page conceitual de uma consultoria internacional que conecta empresas ao mercado brasileiro. Projeto de portfólio com identidade própria, navegação linear, cenas interativas e conteúdo em português brasileiro, inglês e espanhol.

## Executar

Requer Node.js 22.12+ e npm.

```sh
npm ci
npm run dev
```

```sh
npm run lint     # Falha em erros e avisos
npm run build    # Verificação TypeScript e build de produção
npm run preview # Prévia local do build
```

## Experiência

Nove seções consecutivas: início, Brasil, abordagem, processo, serviços, empresa, equipe, contato e FAQ. Layout responsivo para desktop, tablet e mobile, com rolagem nativa, controles por teclado e respeito à preferência por movimento reduzido.

- Constelação oblíqua com o símbolo Nordion, órbitas de países e interação por ponteiro e teclado.
- Marca animada e cinco mensagens com efeito de digitação.
- Mapa brasileiro e cidade em React Three Fiber, com alternativas estáticas e animação limitada à área visível.
- Mosaico de sete imagens, tooltips, processo interativo e carrosséis com controles manuais.
- Sete perfis conceituais selecionáveis em constelação; não representam funcionários reais.
- FAQ com expansão nativa e seletor de idiomas com bandeiras e preferência persistida.
- Formulário que valida os campos e gera um arquivo de texto para download. Nenhuma mensagem é enviada, nenhum dado do formulário é armazenado ou transmitido.

## Tecnologias e organização

React 19, TypeScript, Vite, Tailwind CSS, React Aria, Embla, Three.js e React Three Fiber. Tipografia Poppins hospedada localmente e lint com Oxlint.

| Diretório | Conteúdo |
| --- | --- |
| `src/components` | Componentes de interface e cenas interativas |
| `src/locales` | Textos e traduções PT-BR, EN e ES |
| `src/data` | Contorno geográfico, cidade e perfis conceituais |
| `src/styles` | Composição visual e adaptações responsivas |
| `src/config` | Configuração opcional de contato |
| `public` | Imagens e símbolo da marca locais |

## Publicação

O comando `npm run build` gera o site estático em `dist`. O repositório inclui configuração para Vercel. Não exige backend, credenciais ou serviços externos para a experiência de portfólio.

Opcionalmente, configure `VITE_WHATSAPP_NUMBER` antes do build para ativar o contato via WhatsApp, conforme `.env.example`. Sem número válido, a interface mantém o formulário local. Não é utilizado um número fictício.

As cenas 3D são carregadas separadamente. O build informa um aviso de tamanho referente ao pacote compartilhado de Three.js; o aviso não impede a compilação.

## Créditos

Nordion é uma marca conceitual neste projeto. Fotos são ilustrativas e não representam clientes, instalações ou funcionários da consultoria. As licenças de fotografias de acervo não equivalem a domínio público.

Consulte [créditos das imagens](docs/image-credits.md) e [direção visual](docs/visual-direction.md). O símbolo da marca e parte das fotografias foram fornecidos para o projeto.
