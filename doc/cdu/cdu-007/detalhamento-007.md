# CDU007. Cadastrar desenvolvedor

- **Ator principal**: desenvolvedor.
- **Resumo**: esse caso de uso descreve as ações necessárias para que o ator principal efetue cadastro como desenvolvedor no sistema.
- **Pré-condição**: não há pré-condição.
- **Pós-Condição**: espera-se que a plataforma Sisteminha registre o usuário-desenvolvedor no banco de dados e habilite o uso da página para o ator principal como usuário logado.

## Fluxo Principal
| Ações do ator | Ações do sistema |
| :-----------------: | :-----------------: | 
| 1 - O ator principal navega até a opção "Cadastre-se" | O sistema exibe página de cadastro |
| 2 - O ator principal seleciona a opção "Desenvolvedor" | O sistema exibe a seção selecionada com campos a serem preenchidos |
| 3 - O ator principal preenche os campos necessários | O sistema registra e valida o novo usuário |

## Fluxo Alternativo I
| Ações do ator | Ações do sistema |
| :-----------------: | :-----------------: | 
| 3.1 - O ator principal não preenche os campos requisitados | O sistema exibe mensagem de erro | 


## Diagrama de Casos de Uso

![CDU07](https://github.com/user-attachments/assets/8d6ed3ce-a42b-4c0c-b062-0758cad6f544)

## Diagrama Entidade-Relacionamento

![image](https://github.com/user-attachments/assets/b1962e58-cf8e-45ef-8f86-9e632c76d66f)

## Diagrama de classes de domínio

![image](https://github.com/user-attachments/assets/bc772aac-aaf1-4b8e-8abd-723e769e1168)

## Diagrama de Classes de Projeto (Modelos)
![image](https://github.com/user-attachments/assets/cb2b1620-5d8f-4611-8097-ac7984462dea)

## Diagrama de Classes de Projeto

![image](https://github.com/user-attachments/assets/735134ec-8e7e-4371-a868-b7e18a62bf18)

## Diagrama de Interação (Sequência ou Comunicação)

![image](https://github.com/user-attachments/assets/759f51b4-9a07-406d-867e-ccf9b4c5fb42)
