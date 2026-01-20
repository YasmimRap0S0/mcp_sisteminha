from mcp.server.fastmcp import FastMCP  # type: ignore
import httpx  # type: ignore


mcp = FastMCP("SisteminhaMCP")

@mcp.tool()
def listar_desenvolvedores() -> str:
    """
    Lista todos os desenvolvedores cadastrados no sistema.
    INSTRUÇÕES PARA A LLM:
    - Responda apenas o que foi perguntado, sem contexto extra.
    - "listar todos" / "mostrar desenvolvedores" → cite somente os nomes, separados por vírgulas.
    - Pergunta com filtro:
      * "desenvolvedores de X", "quem tem Y" → cite apenas os nomes que atendem
      * "menos de N" → campo_numerico < N (ex: "menos de 4" = 0, 1, 2 ou 3)
      * "até N" ou "no máximo N" → campo_numerico <= N (ex: "até 4" = 0, 1, 2, 3 ou 4)
      * "mais de N" → campo_numerico > N (ex: "mais de 4" = 5, 6, 7...)
      * "pelo menos N" ou "no mínimo N" → campo_numerico >= N (ex: "pelo menos 4" = 4, 5, 6...)
      * "exatamente N" → campo_numerico == N
    - "detalhes de [nome]" → apenas esse dev, até 2 frases com informações básicas.
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
    INSTRUÇÕES PARA A LLM:
    - Responda apenas o que foi perguntado, sem contexto extra.
    - "listar todos" / "mostrar sistemas" → cite somente os nomes, separados por vírgulas.
    - Pergunta com filtro:
      * "sistemas concluídos", "sistemas de X" → cite apenas os nomes que atendem
      * "menos de N" → num_avaliacoes < N (ex: "menos de 3" = 0, 1 ou 2)
      * "até N" ou "no máximo N" → num_avaliacoes <= N (ex: "até 3" = 0, 1, 2 ou 3)
      * "mais de N" → num_avaliacoes > N (ex: "mais de 3" = 4, 5, 6...)
      * "pelo menos N" ou "no mínimo N" → num_avaliacoes >= N (ex: "pelo menos 3" = 3, 4, 5...)
      * "exatamente N" → num_avaliacoes == N
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
            return "Nenhum sistema cadastrado."
        resultado = []
        for sistema in sistemas:
            nome = sistema.get("nome", "Sem nome")
            status = sistema.get("status", "Sem status")
            setor = sistema.get("setor", "Sem setor")
            media = sistema.get("avaliacao_media", 0)
            num_avaliacoes = sistema.get("num_avaliacoes", 0)
            descricao = sistema.get("descricao", "Sem descrição")

            dev = sistema.get("desenvolvedor")
            if isinstance(dev, dict):
                dev_nome = f"{dev.get('user_first_name', '')} {dev.get('user_last_name', '')}".strip()
                github = dev.get("github", "Sem GitHub")
            else:
                dev_nome = "Desenvolvedor não informado"
                github = "Sem GitHub"

            resultado.append(
                f"{nome}\n{descricao}\nStatus: {status}\nSetor: {setor}\n"
                f"Avaliação média: {media}\nNúmero de avaliações: {num_avaliacoes}\n"
                f"Desenvolvedor: {dev_nome}\nGitHub: {github}"
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

if __name__ == "__main__":
    mcp.run()