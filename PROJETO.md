# Documentação do Projeto SPH1

## 📋 Estrutura Planejada

### Backend (Node.js + Express + PostgreSQL)

**Modelos de Dados:**
- ✅ Condominiums (Condomínios)
- ✅ Blocks (Blocos)
- ✅ Apartments (Apartamentos)
- ✅ Users (Técnicos e Admins)
- ✅ Technician Assignments (Vinculação Técnico-Obra)
- ✅ Service Calls (Chamados)
- ✅ Call Evidence (Fotos/Evidências)
- ✅ Completion Reports (Relatórios)

**Rotas Implementadas:**
- ✅ POST /api/auth/register - Registrar usuário
- ✅ POST /api/auth/login - Login

**Próximas Rotas:**
- [ ] GET /api/condominiums - Listar condomínios
- [ ] GET /api/condominiums/:id - Detalhes do condomínio
- [ ] POST /api/technicians/:id/assign - Vincular técnico a obra
- [ ] GET /api/service-calls - Listar chamados
- [ ] POST /api/service-calls - Criar chamado
- [ ] PUT /api/service-calls/:id - Atualizar chamado
- [ ] GET /api/reports - Gerar relatórios (Admin)

### Frontend Web (React)

**Funcionalidades Admin:**
- [ ] Dashboard com estatísticas
- [ ] Listar técnicos por obra
- [ ] Consultar chamados finalizados
- [ ] Baixar relatórios (PDF)
- [ ] Visualizar fotos/evidências

### Mobile (React Native)

**Funcionalidades Técnico:**
- [ ] Login
- [ ] Cadastro em obra específica
- [ ] Receber chamados
- [ ] Registrar problema com fotos
- [ ] Executar serviço
- [ ] Finalizar com assinatura/confirmação

## 🏢 Estrutura - Parque dos Ipês

**Blocos**: 7C, 7B, 7A, 6C, 6B, 6A, 5C, 5B, 5A, 4C, 4B, 4A, 3B, 3A, 2C, 2B, 2A, 1C, 1B, 1A

**Por Bloco**:
- 5 andares
- 4 apartamentos por andar
- Numeração: 101-104, 201-204, 301-304, 401-404, 501-504

**Total**: 400 apartamentos

## 🔄 Fluxo de Chamado

1. **Residente** faz chamado (mobile/site)
2. **Admin** recebe e designa técnico
3. **Técnico** recebe notificação (mobile)
4. **Técnico** registra problema com fotos
5. **Técnico** executa serviço
6. **Técnico** finaliza com evidências (fotos depois)
7. **Admin** consulta relatório finalizado
8. **Admin** baixa documentação

## 🚀 Próximos Passos

1. ✅ Criar estrutura de pastas
2. ✅ Configurar banco de dados
3. ✅ Implementar autenticação
4. [ ] Criar rotas de condomínios
5. [ ] Criar rotas de técnicos
6. [ ] Criar rotas de chamados
7. [ ] Setup Frontend React
8. [ ] Setup Mobile React Native
