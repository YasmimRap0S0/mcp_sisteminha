from mcp.server.fastmcp import FastMCP
import httpx


mcp = FastMCP("SisteminhaMCP")


@mcp.tool()
def somar(a: int, b: int) -> int:
    return a + b


@mcp.tool()
def listar_desenvolvedores() -> str:
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
    try:
        response = httpx.get("http://localhost:8000/sisteminha_api/sistemas/")
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
                f"💡 {nome} ({status})\n"
                f"Dev: {dev_nome} ⭐ {estrelas}\n"
                f"Setor: {setor} | GitHub: {github}\n"
                f"{descricao}"
            )

        return "\n\n".join(resultado)

    except httpx.HTTPError as e:
        return f"Erro ao conectar com a API: {str(e)}"
    except Exception as e:
        return f"Erro inesperado: {str(e)}"


@mcp.prompt()
def cumprimentar_usuario(nome: str, estilo: str = "amigável") -> str:
    """Gerar um prompt de saudação"""
    estilos = {
        "amigável": "Por favor, escreva uma saudação calorosa e amigável em no máximo 5 linhas",
        "formal": "Por favor, escreva uma saudação formal e profissional em no máximo 5 linhas",
        "casual": "Por favor, escreva uma saudação casual e descontraídaem no máximo 5 linhas",
    }

    return f"{estilos.get(estilo, estilos['amigável'])} para alguém chamado {nome}."

@mcp.prompt()
def sugerir_dev_backend(requisitos: str = "") -> str:
    """Sugerir um desenvolvedor backend baseado em requisitos"""
    prompt_base = (
        "Com base nos desenvolvedores cadastrados, sugira um desenvolvedor backend "
        "de forma simples e amigável. Explique brevemente por que ele seria uma boa escolha."
    )
    
    if requisitos:
        return f"{prompt_base} Requisitos específicos: {requisitos}"
    return prompt_base



if __name__ == "__main__":
    mcp.run()
