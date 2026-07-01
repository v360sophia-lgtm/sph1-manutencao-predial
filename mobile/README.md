# SPH1 - App Técnico Mobile

## 📱 Descrição

Aplicativo mobile para técnicos de manutenção predial com funcionalidades de:
- Recebimento de chamados
- Captura de fotos e evidências
- Finalização com assinatura digital
- Geração de relatórios no local

## 🚀 Tecnologias

- **React Native** - Framework mobile
- **Expo** - Desenvolvimento simplificado
- **React Navigation** - Navegação
- **Axios** - HTTP client
- **Zustand** - State management
- **Expo Camera & Image Picker** - Captura de mídia

## 📦 Instalação

```bash
cd mobile
npm install
```

## 🏃 Executar

### Android
```bash
npm run android
```

### iOS
```bash
npm run ios
```

### Web
```bash
npm run web
```

## 📝 Credenciais de Teste

```
Email: tecnico1@sph1.com
Senha: 123456
```

## 📂 Estrutura

```
mobile/
├── src/
│   ├── screens/
│   │   ├── auth/          # Login e Registro
│   │   └── technician/    # Chamados, Detalhes, Conclusão
│   ├── services/          # API calls
│   ├── store/             # Zustand stores
│   └── App.js             # Navegação
├── app.json               # Config Expo
└── index.js               # Entry point
```

## 👨‍💼 Funcionalidades

✅ Login/Registro  
✅ Lista de chamados com filtros  
✅ Detalhes do chamado  
✅ Iniciar trabalho  
✅ Captura de fotos  
✅ Finalização com observações  
✅ Perfil do técnico  
✅ Logout  

## 🏗️ Build para APK

```bash
npm run build:android
```

## 📞 Suporte

Para questões, abra uma issue no repositório.
