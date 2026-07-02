# SPH1 - Sistema de Manutenção Predial

> Solução completa e moderna para gerenciamento de chamados de manutenção em condomínios

![Status](https://img.shields.io/badge/status-production--ready-brightgreen)
![License](https://img.shields.io/badge/license-MIT-blue)
![Version](https://img.shields.io/badge/version-1.0.0-blue)

## 📋 Sumário Executivo

**SPH1** é um sistema integrado que conecta administradores de condomínios, técnicos de manutenção e residentes em uma plataforma única para gerenciamento eficiente de chamados.

- 🎯 **Backend**: Node.js + Express + PostgreSQL
- 💻 **Web**: React 18 + Vite + Tailwind CSS
- 📱 **Mobile**: React Native + Expo
- 🐳 **Deploy**: Docker Compose + Nginx
- 🔒 **Segurança**: JWT + Validações robustas

## 🚀 Começar Rápido

### Pré-requisitos
- Docker & Docker Compose
- Git

### Instalação (3 passos)

```bash
# 1. Clone o repositório
git clone https://github.com/v360sophia-lgtm/sph1-manutencao-predial.git
cd sph1-manutencao-predial

# 2. Configure variáveis de ambiente
cp .env.example .env
cp web/.env.example web/.env

# 3. Inicie os containers
docker compose up -d --build
```

**Sistema rodando em:** http://localhost 🎉

## 🎯 Funcionalidades

### 👨‍💼 Admin - Painel Web
- ✅ Dashboard com estatísticas em tempo real
- ✅ Gerenciamento de técnicos
- ✅ Visualização de todos os chamados
- ✅ Atribuição de chamados a técnicos
- ✅ Geração de relatórios e análises
- ✅ Consulta de chamados finalizados

### 🔧 Técnico - App Mobile
- ✅ Recebimento de chamados
- ✅ Filtro por status (Pendente, Em Progresso, Concluído)
- ✅ Detalhes completos do chamado
- ✅ Iniciar/Pausar trabalho
- ✅ Captura de fotos (câmera ou galeria)
- ✅ Registro de observações
- ✅ Relatório de materiais utilizados
- ✅ Finalização com assinatura

### 👨‍🏠 Residente - App Mobile (Future)
- 📋 Criar novos chamados
- 👁️ Acompanhar status
- 📝 Descrever problema
- 🏠 Selecionar apartamento

## 📁 Estrutura do Projeto

```
sph1-manutencao-predial/
├── backend/                    # Node.js Express API
│   ├── src/
│   │   ├── database/          # Migrations SQL
│   │   ├── routes/            # Rotas API
│   │   ├── middleware/        # JWT auth, validações
│   │   └── index.js           # Entry point
│   ├── Dockerfile             # Container backend
│   ├── package.json
│   └── README.md
├── web/                        # React Admin Dashboard
│   ├── src/
│   │   ├── pages/             # Dashboard, Login, etc
│   │   ├── components/        # Header, Tabelas
│   │   ├── services/          # API calls
│   │   ├── store/             # Zustand state
│   │   └── App.jsx            # Roteamento
│   ├── Dockerfile             # Container web
│   ├── vite.config.js
│   ├── tailwind.config.js
│   └── README.md
├── mobile/                     # React Native Tecnico App
│   ├── src/
│   │   ├── screens/           # Login, Chamados, Conclusão
│   │   ├── services/          # API calls
│   │   ├── store/             # Zustand state
│   │   └── App.js             # Navegação
│   ├── app.json               # Expo config
│   ├── package.json
│   └── README.md
├── docker-compose.yml         # Orquestração containers
├── nginx.conf                 # Reverse proxy
├── .env.example               # Variáveis exemplo
├── INSTALL.md                 # Guia instalação
├── DEPLOY.md                  # Guia deployment
├── GUIA_ADMIN.md              # Manual admin web
├── GUIA_TECNICO.md            # Manual técnico mobile
├── FAQ.md                     # Dúvidas comuns
└── README.md                  # Este arquivo
```

## 🔐 Credenciais Padrão

### Admin Web
```
Email: admin@sph1.com
Senha: 123456
Acesso: http://localhost
```

### Técnico Mobile
```
Email: tecnico1@sph1.com
Senha: 123456
```

> ⚠️ **IMPORTANTE**: Altere as senhas em produção!

## 🛠️ Tecnologias

| Layer | Tecnologia | Versão |
|-------|-----------|--------|
| Backend | Node.js | 18+ |
| API | Express | 4.18 |
| Database | PostgreSQL | 15 |
| Frontend Web | React | 18.2 |
| Build Web | Vite | 4.5 |
| Mobile | React Native | 0.72 |
| Deploy | Docker | 24+ |
| Proxy | Nginx | Alpine |

## 📊 Banco de Dados

### Tabelas principais
```
users              (admin, técnico, residente)
service_categories (15 tipos de serviço com ícones)
condominiums       (dados de condomínios)
blocks            (20 blocos: A-T)
apartments        (400 apartamentos pré-carregados)
service_calls     (chamados de manutenção)
technician_assignments (atribuição de técnicos)
completion_reports (relatórios de conclusão)
call_evidence     (fotos e evidências)
```

## 🚀 Deployment

### Docker (Recomendado)

```bash
# Build e inicie
docker compose up -d --build

# Verifique status
docker compose ps

# Visualize logs
docker compose logs -f backend

# Parar
docker compose down
```

### Variáveis de Ambiente em Produção

```env
NODE_ENV=production
JWT_SECRET=gere_uma_chave_forte_aqui
DB_PASSWORD=senha_segura_aqui
DB_USER=postgres_user_customizado
VITE_API_URL=https://seu-dominio.com/api
```

## 📱 Instalação Mobile (Desenvolvimento)

```bash
cd mobile
npm install

# Android
npm run android

# iOS
npm run ios

# Web
npm run web
```

## 🧪 API Endpoints

### Autenticação
- `POST /api/auth/login` - Login
- `POST /api/auth/register` - Registrar

### Categorias
- `GET /api/categories` - Listar categorias

### Chamados
- `GET /api/service-calls` - Listar (com filtros)
- `POST /api/service-calls` - Criar novo
- `GET /api/service-calls/:id` - Detalhes
- `PUT /api/service-calls/:id` - Atualizar status

### Técnicos
- `GET /api/technicians/:id/assignments` - Obras atribuídas
- `POST /api/technicians/:id/assign` - Atribuir condomínio

### Relatórios
- `GET /api/reports/completed` - Chamados finalizados
- `GET /api/reports/statistics` - Estatísticas por condomínio
- `POST /api/reports/:callId/completion` - Registrar conclusão

## 📚 Documentação Completa

- [INSTALL.md](./INSTALL.md) - Instalação local e produção
- [DEPLOY.md](./DEPLOY.md) - Deployment com Docker
- [GUIA_ADMIN.md](./GUIA_ADMIN.md) - Manual do painel admin
- [GUIA_TECNICO.md](./GUIA_TECNICO.md) - Manual do app técnico
- [FAQ.md](./FAQ.md) - Dúvidas frequentes

## 🐛 Troubleshooting

### Erro de conexão com banco de dados
```bash
# Reinicie o PostgreSQL
docker compose restart postgres

# Verifique credenciais em .env
cat .env | grep DB_
```

### Frontend não carrega
```bash
# Limpe cache e reinicie
docker compose down
docker volume rm sph1-manutencao-predial_postgres_data  # Cuidado!
docker compose up -d --build
```

### API retorna 401 (Não autorizado)
- Verifique se está logado
- Confirme JWT_SECRET em .env
- Limpe localStorage do navegador

## 📞 Suporte

- 📧 Email: support@sph1.com
- 🐛 Issues: [GitHub Issues](https://github.com/v360sophia-lgtm/sph1-manutencao-predial/issues)
- 📖 Documentação: [Docs](./GUIA_ADMIN.md)

## 📄 Licença

MIT - Veja [LICENSE](./LICENSE) para detalhes

## 👥 Contribuindo

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 🎉 Changelog

### v1.0.0 - 2024-07-01
- ✅ Sistema completo em produção
- ✅ Backend com 15 categorias de serviço
- ✅ Admin Web Dashboard
- ✅ Técnico Mobile App
- ✅ Docker deployment ready
- ✅ Documentação completa

---

**Desenvolvido com ❤️ por SPH1**
