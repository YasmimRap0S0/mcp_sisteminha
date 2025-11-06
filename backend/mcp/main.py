from mcp.server.fastmcp import FastMCP
import httpx
from mcp.types import PromptMessage, TextContent

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
            return "Nenhum sistema cadastrado por aqui ainda 😅"

        resultado = []
        for sistema in sistemas:
            nome = sistema.get("nome", "Sem nome")
            status = sistema.get("status", "em_andamento")
            setor = sistema.get("setor", "Não informado")
            descricao = sistema.get("descricao", "Sem descrição")

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

        return "Aqui estão os sistemas que estão rolando:\n\n" + "\n\n".join(resultado)

    except httpx.HTTPError as e:
        return f"Erro ao conectar com a API 😬: {str(e)}"
    except Exception as e:
        return f"Erro inesperado: {str(e)}"


@mcp.prompt()
def sisteminha_prompt():
    return [
        PromptMessage(
            role="user",
            content=TextContent(
                type="text",
                text="""Você é o assistente do Sisteminha. Não seja prolixo. Seja direto e responda com no máximo 5 linhas. Use emojis com moderação.

Evite repetir o que o usuário já disse. Adapte o tom à informalidade do usuário quando necessário."""
            )
        )
    ]


if __name__ == "__main__":
    mcp.run(initial_messages=sisteminha_prompt())
