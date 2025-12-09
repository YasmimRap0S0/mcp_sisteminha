from mcp.server.fastmcp import FastMCP  # type: ignore
import httpx  # type: ignore

mcp = FastMCP("SisteminhaMCP")
client = httpx.Client(timeout=60.0)

@mcp.tool()
def listar_desenvolvedores() -> str:
    """
    Retorne de forma objetiva os dados solicitados
    - Para listagens, utilize tabela ou lista, limitando cada dev a no máximo 2 linhas.
    - Para consultas específicas, responda em até 4 linhas.
    - Responda apenas ao que foi solicitado, de forma clara, amigável e com uso moderado de emojis.
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
    Retorna informações dos sistemas de forma objetiva.
    - Para listagens, use tabela ou lista, com até 3 linhas por sistema.
    - Para consultas específicas, responda em no máximo 4 linhas.
    - Responda apenas o que foi solicitado, de forma clara, amigável e com uso moderado de emojis.
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
        "Com base nos desenvolvedores cadastrados, sugira UM que se adeque aos requisitos do usuário. "
        "Se os requisitos estiverem vazios, use como critério a avaliação média: recomende quem tiver nota ≥4, "
        "priorizando o desenvolvedor com média 5. "
        "Se mais de um atender aos requisitos, escolha aleatoriamente apenas um. "
        "Se nenhum atender, recomende alguém mesmo assim. "
        "A resposta deve ser simples e amigável, com uso moderado de emojis, e conter no máximo 6 linhas explicando por que ele seria uma boa escolha."
    )

    if requisitos:
        return f"{prompt_base} Requisitos específicos: {requisitos}"
    return prompt_base
