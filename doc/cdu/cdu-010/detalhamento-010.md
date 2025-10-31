# CDU010. Adicionar sistema

- **Ator principal**: desenvolvedor
- **Atores secundários**: Não existe ator secundário
- **Resumo**: Este caso de uso descreve como o desenvolvedor pode adicionar um novo projeto na plataforma.
- **Pré-condição**: O desenvolvedor deve estar logado no sistema.
- **Pós-Condição**: O desenvolvedor deve ter adicionado um sistema na plataforma.

## Fluxo Principal
| Ações do ator | Ações do sistema |
| :-----------------: | :-----------------: | 
| 1 - O ator principal acessa a página de adicionar sistema | O sistema lista os campos que devem ser preenchidos |  
| 2 - O ator principal preenche as informações necessárias e navega até a opção "Enviar" | O sistema confirma o cadastro e o caso de uso é encerrado | 

## Fluxo de Exceção I - Campos não preenchidos corretamente
| Ações do ator | Ações do sistema |
| :-----------------: | :-----------------: | 
| 1.1 - O ator principal preenche algum campo de maneira incorreta e envia o formulário. | O sistema mostra uma mensagem de erro ao ator e lista os campos novamente |  
| 1.2 - O ator principal corrige as informações e torna a enviar o formulário | O sistema confirma o cadastro e o caso de uso é encerrado. | 

## Diagrama de Casos de Uso
![image](https://github.com/user-attachments/assets/90ac4494-e0aa-4287-a9d6-6d8881220d15)


## Diagrama Entidade-Relacionamento
![image](https://github.com/user-attachments/assets/2392f449-ed6f-41ca-a87b-8c36657c9ff4)

## Diagrama de Classes de Domínio
![image](https://github.com/user-attachments/assets/99605958-34b5-4dc5-a74c-6355926a2751)


## Diagrama de Interação (Sequência ou Comunicação)

> Substituir pela imagem correspondente...

## Diagrama de Classes de Projeto (Modelos)
![image](https://github.com/user-attachments/assets/876af968-d2ed-49b5-ada9-2cd70723a77c)


## Diagrama de Classes de Projeto
![image](https://github.com/user-attachments/assets/669bcf60-ffb4-4148-9d84-8776bd3b9b61)
