from mcp.server.fastmcp import FastMCP  # type: ignore
import httpx  # type: ignore

mcp = FastMCP("SisteminhaMCP")
client = httpx.Client(timeout=60.0)

@mcp.tool()
def listar_desenvolvedores() -> str:
    """
    Lista todos os desenvolvedores cadastrados no sistema.
    
    Dados disponíveis para cada desenvolvedor:
    - Nome completo (user_first_name + user_last_name)
    - Descrição
    - GitHub (username)
    - Avaliação média (0-5 estrelas)
    - Setores de atuação (lista de setores dos sistemas desenvolvidos)
    - Número de avaliações recebidas
    
    INSTRUÇÕES PARA A LLM:
    1. Analise EXATAMENTE o que o usuário solicitou na interface do Claude Desktop.
    2. Retorne APENAS as informações solicitadas. NÃO adicione informações extras.
    3. Se o usuário pedir "lista todos" ou "mostre os desenvolvedores":
       - Use formato de tabela ou lista compacta
       - Limite a 2 linhas por desenvolvedor
       - Inclua apenas: Nome, GitHub, Avaliação média, Setores principais
    4. Se o usuário pedir informações específicas (ex: "quem tem mais estrelas", "desenvolvedores de Python"):
       - Filtre e retorne apenas os que atendem ao critério
       - Responda em no máximo 4 linhas por desenvolvedor
       - Destaque o critério solicitado
    5. Se o usuário pedir detalhes de um desenvolvedor específico:
       - Retorne apenas os dados desse desenvolvedor
       - Use no máximo 6 linhas
    6. Seja direto, claro e objetivo. Use emojis com moderação (máximo 1-2 por resposta).
    7. NÃO faça sugestões ou recomendações a menos que explicitamente solicitado.
    8. Se não houver desenvolvedores, informe de forma breve e objetiva.
    """
    try:
        response = client.get("http://localhost:8000/sisteminha_api/desenvolvedores/")
        response.encoding = "utf-8"
        response.raise_for_status()
        devs = response.json()

        if not devs:
            return "Nenhum desenvolvedor cadastrado no momento."

        resultado = []
        for dev in devs:
            nome = f"{dev.get('user_first_name', '')} {dev.get('user_last_name', '')}".strip()
            descricao = dev.get("descricao", "Sem descrição")
            github = dev.get("github", "Sem GitHub")
            estrelas = dev.get("avaliacao_media", 0)
            setores = ", ".join(dev.get("setores", [])) or "Nenhum"

            resultado.append(
                f"{nome}\n"
                f"{descricao}\n"
                f"GitHub: {github}\n"
                f"Setores: {setores}\n"
                f"Média: {estrelas}"
            )

        return "\n\n".join(resultado)

    except httpx.HTTPError as e:
        return f"Erro ao conectar com a API: {str(e)}"
    except Exception as e:
        return f"Erro inesperado: {str(e)}"


@mcp.tool()
def listar_sistemas() -> str:
    """
    Lista todos os sistemas cadastrados no sistema.
    
    Dados disponíveis para cada sistema:
    - Nome do sistema
    - Status (concluído ou em andamento)
    - Setor de atuação
    - Descrição
    - Desenvolvedor responsável (nome completo, avaliação média, GitHub)
    - Avaliação média do sistema (0-5 estrelas)
    - Número de avaliações recebidas
    - Categoria
    
    INSTRUÇÕES PARA A LLM:
    1. Analise EXATAMENTE o que o usuário solicitou na interface do Claude Desktop.
    2. Retorne APENAS as informações solicitadas. NÃO adicione informações extras.
    3. Se o usuário pedir "lista todos" ou "mostre os sistemas":
       - Use formato de tabela ou lista compacta
       - Limite a 3 linhas por sistema
       - Inclua apenas: Nome, Status, Setor, Desenvolvedor, Avaliação média
    4. Se o usuário pedir informações específicas (ex: "sistemas concluídos", "sistemas de saúde"):
       - Filtre e retorne apenas os que atendem ao critério
       - Responda em no máximo 4 linhas por sistema
       - Destaque o critério solicitado
    5. Se o usuário pedir detalhes de um sistema específico:
       - Retorne apenas os dados desse sistema
       - Use no máximo 6 linhas
    6. Seja direto, claro e objetivo. Use emojis com moderação (máximo 1-2 por resposta).
    7. NÃO faça sugestões ou recomendações a menos que explicitamente solicitado.
    8. Se não houver sistemas, informe de forma breve e objetiva.
    """
    try:
        response = client.get("http://localhost:8000/sisteminha_api/sistemas/")
        response.encoding = "utf-8"
        response.raise_for_status()
        sistemas = response.json()

        if not sistemas:
            return "Nenhum sistema cadastrado"

        resultado = []
        for sistema in sistemas:
            nome = sistema.get("nome", "Sem nome")
            status = sistema.get("status")
            setor = sistema.get("setor")
            descricao = sistema.get("descricao")
            dev = sistema.get("desenvolvedor")
            if isinstance(dev, dict):
                dev_nome = f"{dev.get('user_first_name', '')} {dev.get('user_last_name', '')}".strip()
                estrelas = dev.get("avaliacao_media", 0)
                github = dev.get("github", "Sem GitHub")
            else:
                dev_nome = "Desenvolvedor não informado"
                estrelas = 0
                github = "Sem GitHub"

            resultado.append(
                f"{nome} ({status})\n"
                f"Dev: {dev_nome} {estrelas}\n"
                f"Setor: {setor} | GitHub: {github}\n"
                f"{descricao}"
            )
        return "\n\n".join(resultado)
    except httpx.HTTPError as e:
        return f"Erro ao conectar com a API: {str(e)}"
    except Exception as e:
        return f"Erro inesperado: {str(e)}"


@mcp.prompt()
def sugerir_devs(requisitos: str = "") -> str:
    """Sugerir um desenvolvedor baseado nos requisitos"""
    prompt_base = (
        "Analise os desenvolvedores cadastrados e sugira EXATAMENTE UM que melhor se adeque aos requisitos. "
        "Critérios de seleção: "
        "- Se requisitos específicos foram fornecidos, busque desenvolvedores que atendam (setor, tecnologias, experiência mencionada). "
        "- Se mais de um atender, escolha o que tiver maior avaliação média. "
        "- Se nenhum atender perfeitamente, escolha o mais próximo possível. "
        "- Se nenhum requisito foi fornecido, priorize desenvolvedores com avaliação média ≥4, dando preferência àqueles com média 5. "
        "- Se houver empate, escolha aleatoriamente. "
        "Formato da resposta: máximo 6 linhas, objetiva e amigável, com uso moderado de emojis (máximo 2). "
        "Inclua: nome do desenvolvedor, por que foi escolhido, principais setores, avaliação média e GitHub. "
        "NÃO adicione informações extras ou sugestões adicionais."
    )

    if requisitos:
        return f"{prompt_base} Requisitos específicos do usuário: {requisitos}"
    return prompt_base

