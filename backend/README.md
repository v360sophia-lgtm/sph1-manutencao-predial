# SPH1 - Backend de Manutenção Predial

## 📋 Descrição

Backend em Node.js/Express para gerenciamento de chamados de manutenção predial com categorias de serviço, atribuição de técnicos e geração de relatórios.

## 🚀 Tecnologias

- **Node.js** - Runtime JavaScript
- **Express.js** - Framework web
- **PostgreSQL** - Banco de dados
- **JWT** - Autenticação
- **CORS** - Cross-origin requests

## 📦 Pré-requisitos

- Node.js 16+
- PostgreSQL 12+
- npm ou yarn

## 🔧 Instalação

### 1. Clonar repositório
```bash
git clone https://github.com/v360sophia-lgtm/sph1-manutencao-predial.git
cd sph1-manutencao-predial/backend
```

### 2. Instalar dependências
```bash
npm install
```

### 3. Configurar variáveis de ambiente
Crie arquivo `.env`:
```env
PORT=5000
DB_HOST=localhost
DB_PORT=5432
DB_NAME=sph1_db
DB_USER=postgres
DB_PASSWORD=sua_senha
JWT_SECRET=sua_chave_secreta_super_segura
NODE_ENV=development
```

### 4. Executar migrations do banco de dados
```bash
# Conectar ao PostgreSQL e executar os scripts SQL
psql -U postgres -d sph1_db -f src/database/init.sql
psql -U postgres -d sph1_db -f src/database/categories.sql
```

### 5. Iniciar servidor
```bash
npm run dev
```

✅ Backend rodando em `http://localhost:5000`

## 📚 Documentação de Rotas

### Autenticação
- `POST /api/auth/register` - Registrar novo usuário
- `POST /api/auth/login` - Login

### Categorias de Serviço
- `GET /api/categories` - Listar todas as categorias
- `GET /api/categories/:id` - Detalhes de uma categoria

### Condomínios
- `GET /api/condominiums` - Listar condomínios
- `GET /api/condominiums/:id` - Detalhes do condomínio
- `GET /api/condominiums/:id/blocks/:blockId/apartments` - Apartamentos de um bloco

### Técnicos
- `POST /api/technicians/:id/assign` - Vincular técnico a condomínio
- `GET /api/technicians/:id/assignments` - Obras atribuídas

### Chamados de Serviço
- `GET /api/service-calls` - Listar chamados (com filtros)
- `POST /api/service-calls` - Criar novo chamado
- `PUT /api/service-calls/:id` - Atualizar chamado
- `GET /api/service-calls/:id` - Detalhes do chamado

### Relatórios
- `GET /api/reports/completed` - Chamados finalizados (admin)
- `GET /api/reports/statistics` - Estatísticas por condomínio (admin)
- `POST /api/reports/:callId/completion` - Criar relatório de conclusão

## 🗄️ Estrutura do Banco de Dados

```
users
├── id, email, password, name, role, created_at

service_categories
├── id, name, description, icon_name, color, created_at

condominiums
├── id, name, description, created_at

blocks
├── id, condominium_id, block_name, created_at

apartments
├── id, block_id, floor, apartment_number, resident_name, resident_phone, created_at

service_calls
├── id, condominium_id, apartment_id, category_id, technician_id, title, description, status, priority, created_at, assigned_at, completed_at

technician_assignments
├── id, user_id, condominium_id, is_active, assignment_date

completion_reports
├── id, service_call_id, technician_id, observations, materials_used, signature, created_at

call_evidence
├── id, service_call_id, image_url, description, type, uploaded_at
```

## 🔐 Roles de Usuário

- **admin** - Acesso completo, visualiza relatórios
- **technician** - Recebe chamados, registra conclusão
- **resident** - Cria chamados na sua unidade

## 📋 Dados Iniciais

O banco vem pré-carregado com:
- ✓ 20 blocos (A-T)
- ✓ 400 apartamentos (5 andares × 4 apartamentos por bloco)
- ✓ 15 categorias de serviço
- ✓ Usuários de teste (admin e técnico)

## 🧪 Testando a API

### Com cURL
```bash
# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@sph1.com","password":"123456"}'

# Listar categorias
curl -H "Authorization: Bearer SEU_TOKEN" \
  http://localhost:5000/api/categories
```

### Com Postman
Importe a collection disponível em `backend/postman/SPH1.postman_collection.json`

## 🐛 Troubleshooting

**Erro de conexão com BD:**
```
Verifique se PostgreSQL está rodando e as credenciais estão corretas no .env
```

**Erro JWT:**
```
Certifique-se que JWT_SECRET está configurado e o token está no header:
Authorization: Bearer <token>
```

**Porta já em uso:**
```bash
# Mudar porta no .env ou usar:
lsof -i :5000
kill -9 <PID>
```

## 📝 Scripts NPM

```bash
npm run dev      # Modo desenvolvimento com nodemon
npm start        # Modo produção
npm test         # Rodar testes (quando implementados)
```

## 📞 Suporte

Para dúvidas, abra uma issue no repositório.

## 📄 Licença

MIT
