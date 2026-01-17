#!/usr/bin/env python3
"""
Calcula tokens médios por interação (usuário + LLM) em um chat JSON.

Uso:
  python claude_token.py chat.json --preco-entrada 0.0030 --preco-saida 0.150

Formato do chat.json:
[
  {"role": "usuario", "content": "Pergunta..."},
  {"role": "LLM", "content": "Resposta..."},

]
"""

import argparse
import json
import sys

try:
    import tiktoken
except Exception:
    print("Erro: instale a biblioteca tiktoken com 'pip install tiktoken'")
    sys.exit(2)


def contar_tokens(enc, texto: str) -> int:
    """Conta quantos tokens existem em um texto usando o encoding cl100k_base."""
    return len(enc.encode(texto))


def main():
    parser = argparse.ArgumentParser(description="Conta tokens médios por interação")
    parser.add_argument("chat_json", help="Arquivo JSON com mensagens (role+content)")
    parser.add_argument("--preco-entrada", type=float, default=0.0, help="Preço por 1k tokens de entrada")
    parser.add_argument("--preco-saida", type=float, default=0.0, help="Preço por 1k tokens de saída")
    args = parser.parse_args()

    enc = tiktoken.get_encoding("cl100k_base")

    with open(args.chat_json, "r", encoding="utf-8") as f:
        mensagens = json.load(f)

    interacoes = []
    tokens_entrada_total = 0
    tokens_saida_total = 0

    # percorre em pares (usuário + LLM)
    for i in range(0, len(mensagens), 2):
        entrada = mensagens[i]["content"]
        saida = mensagens[i+1]["content"] if i+1 < len(mensagens) else ""
        tokens_in = contar_tokens(enc, entrada)
        tokens_out = contar_tokens(enc, saida)
        total = tokens_in + tokens_out
        interacoes.append(total)
        tokens_entrada_total += tokens_in
        tokens_saida_total += tokens_out

    tokens_totais = sum(interacoes)
    media_tokens = tokens_totais / len(interacoes) if interacoes else 0

    print(f"Interações: {len(interacoes)}")
    print(f"Tokens de entrada: {tokens_entrada_total}")
    print(f"Tokens de saída: {tokens_saida_total}")
    print(f"Tokens totais: {tokens_totais}")
    print(f"Média de tokens por interação: {media_tokens:.2f}")

    if args.preco_entrada or args.preco_saida:
        custo_total = (tokens_entrada_total/1000)*args.preco_entrada + (tokens_saida_total/1000)*args.preco_saida
        print(f"Custo estimado total: US${custo_total:.4f}")
        if interacoes:  # evita divisão por zero
            custo_medio = custo_total / len(interacoes)
            print(f"Custo médio por interação: US${custo_medio:.4f}")


if __name__ == "__main__":
    main()
