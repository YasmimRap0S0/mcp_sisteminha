from mcp.server.fastmcp import FastMCP  # type: ignore
import httpx  # type: ignore

mcp = FastMCP("SisteminhaMCP")


@mcp.tool()
def listar_desenvolvedores():
    """
    Lista todos os desenvolvedores cadastrados no sistema.
    INSTRUÇÕES PARA A LLM:
    - Responda apenas o que foi perguntado, sem contexto extra.
    - "listar todos" / "mostrar desenvolvedores" → cite somente os nomes, separados por vírgulas.
    - Pergunta com filtro ("quem tem X", "desenvolvedores de Y") → cite apenas os nomes que atendem.
    - "detalhes de [nome]" → apenas esse desenvolvedor, até 2 frases com informações básicas.
    - Texto simples e direto, sem listas, tabelas ou emojis (exceto se solicitado).
    - Não inventar informações, não usar frases de cortesia, não dar contexto extra.
    - Se não houver desenvolvedores: "Nenhum desenvolvedor cadastrado."
    """
    try:
        response = httpx.get("http://localhost:8000/sisteminha_api/desenvolvedores/")
        response.encoding = "utf-8"
        response.raise_for_status()
        devs = response.json()
        if not devs:
            return {"mensagem": "Nenhum desenvolvedor cadastrado no momento."}

        resultado = []
        for dev in devs:
            nome = f"{dev.get('user_first_name', '')} {dev.get('user_last_name', '')}".strip()
            descricao = dev.get("descricao", "Sem descrição")
            github = dev.get("github", "Sem GitHub")
            estrelas = dev.get("avaliacao_media", 0)
            setores = ", ".join(dev.get("setores", [])) or "Nenhum"

            resultado.append({
                "nome": nome,
                "descricao": descricao,
                "github": github,
                "setores": setores,
                "avaliacao_media": estrelas
            })
        return resultado
    except httpx.HTTPError as e:
        return {"erro": f"Erro ao conectar com a API: {str(e)}"}
    except Exception as e:
        return {"erro": f"Erro inesperado: {str(e)}"}

@mcp.tool()
def listar_sistemas():
    """
    Lista todos os sistemas cadastrados no sistema.
    INSTRUÇÕES PARA A LLM:
    - Responda apenas o que foi perguntado, sem contexto extra.
    - "listar todos" / "mostrar sistemas" → cite somente os nomes, separados por vírgulas.
    - Pergunta com filtro ("sistemas concluídos", "sistemas de X") → cite apenas os nomes que atendem.
    - "detalhes de [nome]" → apenas esse sistema, até 2 frases com informações básicas.
    - Texto simples e direto, sem listas, tabelas ou emojis (exceto se solicitado).
    - Não inventar informações, não usar frases de cortesia, não dar contexto extra.
    - Se não houver sistemas: "Nenhum sistema cadastrado."
    """
    try:
        response = httpx.get("http://localhost:8000/sisteminha_api/sistemas/")
        response.encoding = "utf-8"
        response.raise_for_status()
        sistemas = response.json()
        if not sistemas:
            return {"mensagem": "Nenhum sistema cadastrado"}
        resultado = []
        for sistema in sistemas:
            nome = sistema.get("nome", "Sem nome")
            status = sistema.get("status")
            setor = sistema.get("setor")
            media_avaliacao_sistema = sistema.get("avaliacao_media", 0)
            num_avaliacoes = sistema.get("num_avaliacoes", 0)
            descricao = sistema.get("descricao")
            dev = sistema.get("desenvolvedor")
            if isinstance(dev, dict):
                dev_nome = f"{dev.get('user_first_name', '')} {dev.get('user_last_name', '')}".strip()
                github = dev.get("github", "Sem GitHub")
            else:
                dev_nome = "Desenvolvedor não informado"
                github = "Sem GitHub"

            resultado.append({
                "nome": nome, "status": status, "setor": setor, "avaliacao_media": media_avaliacao_sistema,
                "num_avaliacoes": num_avaliacoes,"descricao": descricao, "dev_nome": dev_nome,
                "github": github
            })
        return resultado 
    except httpx.HTTPError as e:
        return {"erro": f"Erro ao conectar com a API: {str(e)}"}
    except Exception as e:
        return {"erro": f"Erro inesperado: {str(e)}"}


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


if __name__ == "__main__":
    mcp.run()