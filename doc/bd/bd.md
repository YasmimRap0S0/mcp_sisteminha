# Modelo de Dados

## Diagrama ER

![image](https://github.com/user-attachments/assets/7fa10172-dc23-4588-8bb1-3d5f31bb7f03)

## Modelo Relacional

![image](https://github.com/user-attachments/assets/efcc6643-1c5a-4675-8367-b5f65f171035)

## Dicionário de Dados

---

**Tabela** : User

*Descrição* : Referente ao usuário da plataforma(microempreendedor e/ou desenvolvedor).
| Colunas | Descrição | Tipo de Dado | Tamanho | Null | PK | FK | Unique | Identity | Default | Check | 
| ------- | --------- | ------------ | ------- | ---- | -- | -- | ------ | -------- | ------- | ----- |
| id_user | identificador do usuário | integer |  | &#9744;  | &#9745; | &#9744; | &#9744; | &#9745; |  |  | 
| username | nome genérico do usuário | varchar |150| &#9744;  |&#9744; | &#9744; | &#9744; | &#9744; |  |  |
| email | endereço de e-mail do usuário | varchar | | &#9744;  |&#9744; | &#9744; | &#9745; | &#9744; |  |  |
| password | senha definida pelo usuário | varchar |50 | &#9744;  |&#9744; | &#9744; | &#9744; | &#9744; |  |  |
| first_name | primeiro nome do usuário | varchar |50 | &#9744;  |&#9744; | &#9744; | &#9744; | &#9744; |  |  |
| last_name | segundo nome do usuário | varchar |50 | &#9744;  |&#9744; | &#9744; | &#9744; | &#9744; |  |  |


**Tabela** : Desenvolvedor

*Descrição* : Essa tabela armazenará as informações do desenvolvedor.
| Colunas | Descrição | Tipo de Dado | Tamanho | Null | PK | FK | Unique | Identity | Default | Check | 
| ------- | --------- | ------------ | ------- | ---- | -- | -- | ------ | -------- | ------- | ----- |
| id_desenvolvedor | inteiro único que identifica o desenvolvedor | Integer | | &#9744;  | &#9745; | &#9745; | &#9744; | &#9744; | &#9744; | &#9744; |
| cpf | atributo unico do desenvolvedor | CharField | 11 | &#9744;  | &#9744; | &#9744; | &#9745; | &#9744; | &#9744; | &#9744; |
| foto | foto de perfil do desenvolvedor | ImageField |  | &#9744;  | &#9744; | &#9744; | &#9744; | &#9744; | 'mgs/avatar.png' | &#9744; |
| descricao | descrição do desenvolvedor | TextField |  | &#9744;  | &#9744; | &#9744; | &#9744; | &#9744; | "Descrição está vazia" | &#9744; |
| github | github do desenvolvedor | CharField | 20 | &#9744;  | &#9744; | &#9744; | &#9745; | &#9744; | &#9744; | &#9744; |



**Tabela** : Sistema

*Descrição* : Essa tabela armazenará as informações dos sistemas cadastrados.

*Observações* : Essa tabela possui uma chave estrangeira da tabela Categoria e uma chave estrangeira da tabela desenvolvedor.
| Colunas | Descrição | Tipo de Dado | Tamanho | Null | PK | FK | Unique | Identity | Default | Check | 
| ------- | --------- | ------------ | ------- | ---- | -- | -- | ------ | -------- | ------- | ----- |
| id | inteiro único que identifica o Sistema | SERIAL |  | &#9744;  | &#9745; | &#9744; | &#9744; | &#9745; |  |  | 
| nome | nome único para o Sistema | VARCHAR | 250 | &#9744;  | &#9744; | &#9744; | &#9744; | &#9744; |  | Ugroup1 | 
| setor | setor do Sistema | VARCHAR | 250 | &#9744;  | &#9744; | &#9744; | &#9744; | &#9744; |  |  | 
| imagem | armazena a imagem do Sistema | VARCHAR | 255 | &#9744;  | &#9744; | &#9744; | &#9744; | &#9744; |  |  | 
| descricao | descrição detalhada do Sistema | TEXT |  | &#9744;  | &#9744; | &#9744; | &#9744; | &#9744; |  |  | 
| status | armazena o status do Sistema | VARCHAR | 20 | &#9744;  | &#9744; | &#9744; | &#9744; | &#9744; |  |  | 
| id_categoria | identifica a Categoria que o Sistema pertence | INTEGER |  | &#9744;  | &#9744; | &#9745; | &#9744; | &#9744; |  |  | 
| id_desenvolvedor | identifica o desenvolvedor que desenvolveu o Sistema | INTEGER |  | &#9744;  | &#9744; | &#9745; | &#9744; | &#9744; |  | Ugroup1 | 


**Tabela** : avaliacao_sistema

*Descrição* :  A tabela avaliacao_sistema contempla a realização de avaliações à sistemas feitas por usuário.<br>	
*Observações* : Essa tabela possui uma chave estrangeira da tabela Sistema(id_sistema) e uma chave estrangeira da tabela Usuario(id_usuario).									
| Colunas | Descrição | Tipo de Dado | Tamanho | Null | PK | FK | Unique | Identity | Default | Check | 
| ------- | --------- | ------------ | ------- | ---- | -- | -- | ------ | -------- | ------- | ----- |
| id_user| id da pessoa que avalia|INTEGER| | &#9744;  | &#9745; | &#9745; | &#9744; | &#9744; | 
| id_sistema | sistema avaliado   |INTEGER | | &#9744; | &#9745; | &#9745; | &#9744; | &#9744; |
| estrela |  média das avaliações | INTEGER |  | &#9744; | &#9744; | &#9744; | &#9744; | &#9744; |
| comentario |  avaliação em comentário | TEXTFIELD|  | &#9745; | &#9744; | &#9744; | &#9744; | &#9744; |



**Tabela** : avaliacao_desenvolvedor

*Descrição* : A tabela avaliacao_desenvolvedor contempla a realização de avaliações para desenvolvedores feitas por usuário.<br>						
*Observações* : Essa tabela possui uma chave estrangeira da tabela User e uma chave estrangeira da tabela Desenvolvedor							
| Colunas | Descrição | Tipo de Dado | Tamanho | Null | PK | FK | Unique | Identity | Default | Check | 
| ------- | --------- | ------------ | ------- | ---- | -- | -- | ------ | -------- | ------- | ----- |
| id_user| id da pessoa que avalia|INTEGER| | &#9744;  | &#9745; | &#9745; | &#9744; | &#9744; | 
| id_ desenvolvedor | id do avaliado   |INTEGER | | &#9744; | &#9745; | &#9745; | &#9744; | &#9744; |
| estrela |  média das avaliações | INTEGER |  | &#9744; | &#9744; | &#9744; | &#9744; | &#9744; |
| comentario |  avaliação em comentário | TEXTFIELD|  | &#9745; | &#9744; | &#9744; | &#9744; | &#9744; |


**Tabela** : Microempreendedor

*Descrição* : Essa tabela armazenará as informações do microemprendedor
| Colunas | Descrição | Tipo de Dado | Tamanho | Null | PK | FK | Unique | Identity | Default | Check | 
| ------- | --------- | ------------ | ------- | ---- | -- | -- | ------ | -------- | ------- | ----- |
| id_microempreendedor| inteiro único que identifica o Microempreendedor | Integer | | &#9744;  | &#9745; | &#9745; | &#9744; | &#9744; | &#9744; | &#9744; |
| cnpj | atributo unico do Microempreendedor | CharField | 14 | &#9744;  | &#9744; | &#9744; | &#9745; | &#9744; | &#9744; | &#9744; |
| foto| foto de perfil do microempreendedor | ImageField |  | &#9744;  | &#9744; | &#9744; | &#9744; | &#9744; | 'mgs/avatar.png' | &#9744; |
| descricao| descrição do microempreendedor | TextField |  | &#9745;  | &#9744; | &#9744; | &#9744; | &#9744; |  | &#9744; |


**Tabela** : Categoria

*Descrição* : Essa tabela armazenará as informações das categorias do sistema.

| Colunas | Descrição | Tipo de Dado | Tamanho | Null | PK | FK | Unique | Identity | Default | Check | 
| ------- | --------- | ------------ | ------- | ---- | -- | -- | ------ | -------- | ------- | ----- |
| id | inteiro único que identifica a categoria | SERIAL |  | &#9744;  | &#9745; | &#9744; | &#9744; | &#9745; |  |  | 
| nome | nome único para a categoria| VARCHAR | 250 | &#9744;  | &#9744; | &#9744; | &#9744; | &#9744; |  |  |  
| imagem | armazena a imagem da categoria| VARCHAR | 255 | &#9745;  | &#9744; | &#9744; | &#9744; | &#9744; |  |  | 
