
<p align="center">
  <img src="https://github.com/user-attachments/assets/28626387-5ee1-4033-9815-9dd8caab7459" alt="logo">
</p>


> Sisteminha planeja facilitar a busca de desenvolvedores para microempreendedores que almejam adquirir sistemas para seus negócios.

# 👩‍💻 Equipe e Formas de Contato
1. Anna Julia - WhatsApp: (84)99684-7803
2. Fabiana Campos - WhatsApp: (84)99988-0706
3. Larissa Samara - WhatsApp: (84)8896-2442 
4. Rick Hill - WhatsApp: (84)8602-0813
5. Yasmim Raposo - WhatsApp: (84)99990-1490
---

## 📑 Documentação

- [Documentos do projeto](doc/documentacao.md)  
---

# 🚀 Guia de Instalação e Execução do MCP com o Sisteminha

Este guia mostra resumidamente como preparar o ambiente, rodar o servidor MCP e integrar com o Claude Desktop.

## 🔧 Requisitos

1. Claude Desktop instalado  
2. Editor de código (ex.: VS Code)   

## 📂 1. Clonar o projeto

```bash
git clone https://github.com/seu-usuario/mcp_sisteminha.git
cd mcp_sisteminha
```

## 📂 2. Instalar dependências do projeto Django

```bash
cd backend
pip install -r requirements.txt
```

## 🗄️ 3. Rodar o servidor Django

```bash
python manage.py runserver
```

> Obs: já existem dados previamente colocados no banco de dados PostgreSQL. 

## ⚡ 4. Configurar e rodar o MCP

Crie e ative um ambiente virtual:

```bash
cd mcp
uv venv
source venv/bin/activate   # Linux/Mac
.venv\Scripts\activate      # Windows
```

Instale o MCP:

```bash
pip install mcp mcp[cli]
```

Instale o servidor MCP no Claude Desktop:

```bash
mcp install main.py
```

👉 Isso atualiza automaticamente o arquivo `claude_desktop_config.json`.

Rodar manualmente:

```bash
mcp run main.py
```


## 🖥️ 5. Testar no Claude Desktop

Abra o Claude Desktop e faça perguntas como:

- "Liste desenvolvedores"  
- "Quais devs trabalham com o backend"  

👉 Compare as respostas com o conteúdo do banco de dados para validar a integração. Você pode acessar facilmente o conteúdo por:
1. Após rodar o servidor Django, acesse http://127.0.0.1:8000/sisteminha_api/
2. Arquivo populate_mcp.py em backend\sisteminha\management\commands\populate_mcp.py


## ✅ Resultado esperado

- MCP rodando e integrado ao Claude Desktop.  
- Claude respondendo corretamente às consultas com base nos dados do Sisteminha.  

---
