# Documento de Visão

## Histórico de Revisões

| Data                |  Versão             |          Descrição  |  Autores            |
| :-----------------: | :-----------------: | :-----------------: | :-----------------: |
| - | - | Versão inicial |  - |
| - | - | - |  - |


## 1. Objetivo do projeto
Sisteminha planeja facilitar a busca de microempreendedores por desenvolvedores para desenvolver sistemas para seus negócios.

## 2. Descrição do problema

|     |      |
| --- | --- |
| **Problema**            | Encontrar plataformas que ofereçam serviços específicos de desenvolvimento de softwares para microempreendedores|
| **Afeta**               | Os microempreendedores e os desenvolvedores |  
| **Impacta**             | As ineficiências operacionais, limitações de crescimento, competitividade reduzida e uma série de outros desafios que podem prejudicar a capacidade desses empreendedores de ter sucesso em seus negócios|
| **Solução**             | O desenvolvimento de uma plataforma que forneça serviços relacionados  a desenvolvimento de softwares  específicos para microempreendedores| 

## 3. Descrição dos usuários 

| Nome                |  Descrição          |   Responsabilidade  |
| -----------------   | -----------------   | -----------------   |
|Desenvolvedores |Profissionais que desenvolvem os softwares | Disponibilizar seu portfólio e softwares implantados. |
|Microempreendedores |Cliente final que está em busca de um software para sua empresa | Encontrar desenvolvedores e  softwares que se adequem às necessidades dos seus negócios. |
|Visitante|Usuário não cadastrado explora parte da plataforma|Explorar plataforma.|

## 4. Descrição do ambiente dos usuários

Por se tratar de uma plataforma interativa voltada para a colaboração entre microempreendedores e desenvolvedores, é essencial contar com uma conexão à internet para acessá-la. Desenvolvida com foco na praticidade e na eficiência, a plataforma foi otimizada para uso em desktop.

## 5. Principais necessidades dos usuários

Microempreendedores sentem falta de um ambiente confiável em que possam buscar um sistema que atenda às suas necessidades. Atualmente, os métodos disponíveis incluem a busca por indicações de pessoas ou a utilização de plataformas genéricas de freelancers. Nesse sentido, microempreendedores desejam soluções para encontrar profissionais que ofereçam sistemas específicos para seus negócios. 
Sendo assim, o sistema deve permitir que desenvolvedores disponibilizem seus projetos prontos na plataforma, bem como as habilidades para se adaptar a uma nova ideia.  Assim, os clientes poderão escolher um sistema de acordo com sua necessidade. Para isso, é de fundamental importância que o sistema ofereça um meio de comunicação direto entre as partes.

## 6. Alternativas concorrentes

99Freelas:
É uma plataforma dedicada à contratação de profissionais freelancers no Brasil. Se você precisa de ajuda em projetos de programação, design, conteúdo, SEO, vídeo e outras áreas.

Behance:
É uma plataforma online que reúne e exibe projetos criativos de diversos campos, como fotografia, vídeo, logotipos, ilustrações e design de marca. É um espaço onde artistas, designers e criativos podem compartilhar seus trabalhos, obter inspiração e se conectar com outros profissionais.

LinkedIn:
É uma plataforma profissional de networking, projetada para conectar profissionais de diversas áreas e setores. Além disso, o LinkedIn oferece recursos de recrutamento, permitindo que empresas publiquem vagas e encontrem candidatos qualificados. 

## 7. Visão geral do produto

O Sisteminha visa favorecer microempreendedores que buscam por um sistema para seus negócios através de desenvolvedores qualificados e experientes na área de desenvolvimento de software. Sendo assim, o Sisteminha almeja facilitar a comunicação entre microempreendedor e desenvolvedor, promovendo um contato direto e eficiente. Através da plataforma, microempreendedores terão acesso a projetos prontos, com os mais variados layouts e as tecnologias mais atualizadas do mercado.


## 8. Requisitos funcionais

| Código              |  Nome               |          Descrição  |
| :-----------------: | :-----------------: | :-----------------: |
| F01 | Cadastro de perfil  |Permite que os interessados se cadastrem como desenvolvedores ou clientes (microempreendedores). |
| F02 | Autenticação de usuário |O sistema deve coletar dados de login informados pelo usuário e autenticá-lo após verificação. |
| F03 | Postagem de sistemas |O usuário-desenvolvedor tem a capacidade de listar e apresentar seus projetos de forma organizada na plataforma.|
| F04 | Sistema de avaliação|Permite aos microempreendedores avaliarem o desenvolvedor e/ou sistema por meio de estrelas e/ou comentários.|
| F05 | Busca de sistema |Permite que os usuários busquem sistemas na plataforma. |
| F06 | Busca de desenvolvedor |Permite que os usuários busquem desenvolvedores na plataforma. | 
| F07 | Edição de perfil |Permite que o usuário edite seu perfil e complete com informações pessoais. |
| F08 | Visualização de exibição de categorias de sistemas |Permite a visualização de categorias por ordem com maior ranking na plataforma.|
| F09 | Visualização de perfil do desenvolvedor |Permite que os usuários visualizem os perfis dos desenvolvedores registrados na plataforma. |


## 9. Requisitos não-funcionais

| Código              |  Nome               |          Descrição  |  Categoria          |  Classificação      |
| :-----------------: | :-----------------: | :-----------------: | :-----------------: | :-----------------: |
| NF01 |Proteção de Dados |O sistema deve garantir que os dados pessoais informados estarão protegidos. |Confiabilidade|Obrigatório|
| NF02 |Autenticação|Somente usuários autenticados podem ter acesso aos recursos apropriados do sistema.|Segurança|Obrigatório|

## 10. Casos de uso por ordem de prioridade

| Código              | Casos de uso        |  Prioridade alta    | Prioridade média    | Prioridade baixa    | Status    |
| :-----------------: | :-----------------: | :-----------------: | :-----------------: | :-----------------: | :-----------------: |
|         [CDU004](../cdu/cdu-004/detalhamento-004.md)        | Buscar desenvolvedor       |           x         |                     |                     | Feito |
|         [CDU003](../cdu/cdu-003/detalhamento-003.md)       | Buscar sistema    |           x         |                     |                     | Feito |
|         [CDU010](../cdu/cdu-010/detalhamento-010.md)       | Adicionar sistema    |           x         |                     |                     | Feito |
|         [CDU006](../cdu/cdu-006/detalhamento-006.md)       | Visualizar perfil do desenvolvedor |    x    |                     |                     | Feito |
|         [CDU009](../cdu/cdu-009/detalhamento-009.md)       | Realizar login      |           x         |                     |                     | Feito |
|         [CDU002](../cdu/cdu-002/detalhamento-002.md)       | Avaliar desenvolvedor    |                   |           x         |                     | Feito |
|         [CDU001](../cdu/cdu-001/detalhamento-001.md)        | Avaliar sistema |                   |           x         |                     | Feito |
|         [CDU007](../cdu/cdu-007/detalhamento-007.md)        | Cadastrar desenvolvedor |                   |           x         |                     | Feito |
|         [CDU008](../cdu/cdu-008/detalhamento-008.md)        | Cadastrar microempreendedor   |                   |           x          |                    | Feito |
|         [CDU005](../cdu/cdu-005/detalhamento-005.md)        | Visualizar exibição de categorias de sistemas |        |                     |          x          | Feito |


## 11. Casos de uso x Requisitos funcionais

| UC X RF                                                | F01 | F02 | F03 | F04 | F05 | F06 | F07 | F08 | F09 |
| :----------------------------------------------------- | :--: | :--: | :--: | :--: | :--: | :--: | :--: | :--: | :--: |
| Cadastrar microempreendedor                            |  x  |     |     |     |     |     |     |     |     |
| Cadastrar desenvolvedor                                |  x  |     |     |     |     |     |     |     |     |
| Realizar login                                         |     |  x  |     |     |     |     |     |     |     |
| Buscar sistema                                         |     |     |     |     |  x  |     |     |     |     |
| Buscar desenvolvedor                                   |     |     |     |     |     |  x  |     |     |     |
| Avaliar sistema                                        |     |     |     |  x  |     |     |     |     |     |
| Avaliar desenvolvedor                                  |     |     |     |  x  |     |     |     |     |     |
| Visualizar perfil do desenvolvedor                     |     |     |     |     |     |     |     |     |  x  |
| Adicionar sistema                                      |     |     |  x  |     |     |     |     |     |     |
| Visualizar exibição de categorias de sistemas          |     |     |     |     |     |     |     |  x  |     |


## 12. Regras de Negócio
| **Código** | **Descrição**                                                                                           |
|------------|---------------------------------------------------------------------------------------------------------|
| **RN01**   | Visitantes e perfis autenticados poderão explorar a área de visualização de categorias, sem restrição.                   |
| **RN02**   | Somente perfis autenticados como desenvolvedor poderão adicionar sistemas na plataforma.                 |
| **RN03**   | Somente perfis autenticados poderão avaliar desenvolvedores ou sistemas.                                 |
| **RN04**   | Ao buscar desenvolvedores ou sistemas na plataforma, tanto o microempreendedor quanto o desenvolvedor poderão fazer uso da busca por palavra-chave e de filtros por avaliação e/ou setor. |
| **RN05**   | Desenvolvedores autenticados poderão exibir seus repositórios públicos por meio da API externa do GITHUB para outros perfis da plataforma. |
| **RN06**   | 	Perfis autenticados poderão editar suas informações pessoais após cadastro na plataforma. |

