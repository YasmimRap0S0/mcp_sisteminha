# Protótipos de Interface com o Usuário

## Mapa do Site

> Obs.: propõem-se a utilização de alguma ferramenta que possibilite a representação textual do diagrama. como o seguinte exemplo:

```mermaid
flowchart TD
    A[Index] --- R[Perguntas frequentes]
    A[Index] --- S[Como funciona]
    A[Index] --- B[Cadastro do microempreendedor]
    A[Index] --- C[Login do microempreendedor]
    A[Index] --- E[Login do desenvolvedor]
    A[Index] --- D[Cadastro do desenvolvedor]

    C[Login do microempreendedor] --- F[Homepage do microempreendedor]
    B[Cadastro do microempreendedor] --- F[Homepage do microempreendedor]
    F[Homepage do microempreendedor] --- J[Buscar desenvolvedor]
    F[Homepage do microempreendedor] --- I[Buscar sistema]
    F[Homepage do microempreendedor] --- G[Perfil do microempreendedor]
    G[Perfil do microempreendedor] --- H[Editar perfil do microempreendedor]

    I[Buscar sistema] --- L[Avaliar sistema]
    I[Buscar sistema] --- U[Ver sistema]

    J[Buscar desenvolvedor] --- K[Avaliar desenvolvedor]
    J[Buscar desenvolvedor] --- M[Ver perfil]
    M[Ver Perfil] --- P[Editar perfil do desenvolvedor]
    J[Buscar desenvolvedor] --- T[Mensagem]

    E[Login do desenvolvedor] --- N[Homepage do desenvolvedor]
    D[Cadastro do desenvolvedor] --- N[Homepage do desenvolvedor]
    N[Homepage do desenvolvedor] --- I[Buscar sistema]
    N[Homepage do desenvolvedor] --- J[Buscar desenvolvedor]
    N[Homepage do desenvolvedor] --- P[Editar perfil do desenvolvedor]
    P[Editar perfil do desenvolvedor] --- O[Adicionar Sistema]

    
     
    P[Editar perfil do desenvolvedor] --- Q[Completar dados do desenvolvedor]
```

## A. Tela 1: Index

![Captura de tela 2024-11-18 225600](https://github.com/user-attachments/assets/725e8af4-a0a0-4277-bda0-e08e340249a3)

![Captura de tela 2024-11-18 225612](https://github.com/user-attachments/assets/f5f8a19d-d273-485a-a6fa-e84b6f682275)

> https://www.figma.com/file/s41bxH7WI2saZvLkUiIVA9/Sisteminha?type=design&node-id=0%3A1&mode=design&t=m5HGIgOakCzQFhiK-1

## B. Tela 2: Cadastro do microempreendedor

![Captura de tela 2024-12-03 184911](https://github.com/user-attachments/assets/c25a3dd5-0670-4142-aa45-8fdda5fab4f1)

> https://www.figma.com/file/s41bxH7WI2saZvLkUiIVA9/Sisteminha?type=design&node-id=0%3A1&mode=design&t=m5HGIgOakCzQFhiK-1

## C. Tela 3: Login do microempreendedor

![Captura de tela 2024-11-18 225742](https://github.com/user-attachments/assets/fbca22a4-7c85-4349-9aa6-3a1163eb8c48)

> https://www.figma.com/file/s41bxH7WI2saZvLkUiIVA9/Sisteminha?type=design&node-id=0%3A1&mode=design&t=m5HGIgOakCzQFhiK-1

## D. Tela 4: Cadastro do desenvolvedor

![Captura de tela 2024-12-03 184927](https://github.com/user-attachments/assets/fd96ca06-9ca1-474c-bffb-21fa63171dd9)

> https://www.figma.com/file/s41bxH7WI2saZvLkUiIVA9/Sisteminha?type=design&node-id=0%3A1&mode=design&t=m5HGIgOakCzQFhiK-1

## E. Tela 5: Login do desenvolvedor
![Captura de tela 2024-11-18 225954](https://github.com/user-attachments/assets/0e3e32f7-0ac3-42b5-998f-74e9bcd3d7b3)

> https://www.figma.com/file/s41bxH7WI2saZvLkUiIVA9/Sisteminha?type=design&node-id=0%3A1&mode=design&t=m5HGIgOakCzQFhiK-1

## F. Tela 6: Homepage do microempreendedor

![Captura de tela 2024-11-18 225634](https://github.com/user-attachments/assets/a0a147eb-d627-4441-a0c6-2c6e4d669e24)

> https://www.figma.com/file/s41bxH7WI2saZvLkUiIVA9/Sisteminha?type=design&node-id=0%3A1&mode=design&t=m5HGIgOakCzQFhiK-1

## G. Tela 7: Perfil do microempreendedor

![Captura de tela 2024-12-03 192200](https://github.com/user-attachments/assets/05338268-76ce-4e62-8ad6-c1555bccf162)

> https://www.figma.com/file/s41bxH7WI2saZvLkUiIVA9/Sisteminha?type=design&node-id=0%3A1&mode=design&t=m5HGIgOakCzQFhiK-1

## H. Tela 8: Editar perfil do microempreendedor

![Captura de tela 2024-12-03 192209](https://github.com/user-attachments/assets/775a4dfa-af98-472b-adba-35a4bb19ae5a)

> https://www.figma.com/file/s41bxH7WI2saZvLkUiIVA9/Sisteminha?type=design&node-id=0%3A1&mode=design&t=m5HGIgOakCzQFhiK-1

## I. Tela 9: Buscar sistema como microempreendedor

![Captura de tela 2024-11-18 225828](https://github.com/user-attachments/assets/9fac40d6-e5de-4692-85b3-1f66703f2400)

> https://www.figma.com/file/s41bxH7WI2saZvLkUiIVA9/Sisteminha?type=design&node-id=0%3A1&mode=design&t=m5HGIgOakCzQFhiK-1

## J. Tela 10: Buscar desenvolvedor como microempreendedor

![Captura de tela 2024-11-18 225816](https://github.com/user-attachments/assets/77d2cfe1-3ea0-4af4-aa72-0e6e2d1e1a3f)

> https://www.figma.com/file/s41bxH7WI2saZvLkUiIVA9/Sisteminha?type=design&node-id=0%3A1&mode=design&t=m5HGIgOakCzQFhiK-1

## K. Tela 11: Avaliar desenvolvedor

![Captura de tela 2024-11-18 225851](https://github.com/user-attachments/assets/d2b6bdb1-b9c6-4f12-aefe-8d2dd02fc61c)

> https://www.figma.com/file/s41bxH7WI2saZvLkUiIVA9/Sisteminha?type=design&node-id=0%3A1&mode=design&t=m5HGIgOakCzQFhiK-1

## L. Tela 12: Avaliar sistema

![Captura de tela 2024-11-18 225858](https://github.com/user-attachments/assets/02967e92-ef18-4523-9bbd-cd6c70b85c69)

> https://www.figma.com/file/s41bxH7WI2saZvLkUiIVA9/Sisteminha?type=design&node-id=0%3A1&mode=design&t=m5HGIgOakCzQFhiK-1

## M. Tela 13: Visualizar perfil do desenvolvedor como microempreendedor

![Captura de tela 2024-12-03 191605](https://github.com/user-attachments/assets/7aa276ac-02b2-49b7-b163-292e1ef2c414)

> https://www.figma.com/file/s41bxH7WI2saZvLkUiIVA9/Sisteminha?type=design&node-id=0%3A1&mode=design&t=m5HGIgOakCzQFhiK-1

## N. Tela 14:  Homepage do desenvolvedor

![Captura de tela 2024-11-18 225623](https://github.com/user-attachments/assets/e18d2ad0-edfc-4fed-aa8f-5ba7493bde8a)


> https://www.figma.com/file/s41bxH7WI2saZvLkUiIVA9/Sisteminha?type=design&node-id=0%3A1&mode=design&t=m5HGIgOakCzQFhiK-1

## O. Tela 15: Perfil do desenvolvedor

![Captura de tela 2024-12-03 191509](https://github.com/user-attachments/assets/ef220aa7-8883-4567-b88c-73a3221566bb)

> https://www.figma.com/file/s41bxH7WI2saZvLkUiIVA9/Sisteminha?type=design&node-id=0%3A1&mode=design&t=m5HGIgOakCzQFhiK-1

## P. Tela 16: Editar perfil do desenvolvedor

![Captura de tela 2024-12-03 191531](https://github.com/user-attachments/assets/1176c13a-2afb-4e7c-8346-1f1e3a3a1ed7)

> https://www.figma.com/file/s41bxH7WI2saZvLkUiIVA9/Sisteminha?type=design&node-id=0%3A1&mode=design&t=m5HGIgOakCzQFhiK-1

## Q. Tela 17: Adicionar Sistema

![Adicionar Sistema](https://github.com/user-attachments/assets/dfd51e01-a294-4657-ac3d-d2c94b8e3048)


## R. Tela 18: Completar dados

![Captura de tela 2024-12-03 191540](https://github.com/user-attachments/assets/7e52f4d6-57a6-4aa5-9fa9-c0687627c282)

> https://www.figma.com/file/s41bxH7WI2saZvLkUiIVA9/Sisteminha?type=design&node-id=0%3A1&mode=design&t=m5HGIgOakCzQFhiK-1

## S. Tela 19: Perguntas frequentes

![Captura de tela 2024-11-18 225719](https://github.com/user-attachments/assets/da8c6a0d-b395-4de8-a174-e662aea1cdfc)


> https://www.figma.com/file/s41bxH7WI2saZvLkUiIVA9/Sisteminha?type=design&node-id=0%3A1&mode=design&t=m5HGIgOakCzQFhiK-1

## T. Tela 20: Como funciona 

![Captura de tela 2024-11-18 225656](https://github.com/user-attachments/assets/7043dbee-f7b9-4ea0-8fa0-bf085842dcdb)

![Captura de tela 2024-11-18 225708](https://github.com/user-attachments/assets/8c497e70-3b6f-4371-8b7f-3367bccf80aa)


> https://www.figma.com/file/s41bxH7WI2saZvLkUiIVA9/Sisteminha?type=design&node-id=0%3A1&mode=design&t=m5HGIgOakCzQFhiK-1

























