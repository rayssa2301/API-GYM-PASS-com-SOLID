# App 

GymPass

## RFs - Requisitos Funcionais

-[x] Deve ser possível se cadastrar;
-[x] Deve ser possível se autenticar;
-[x] Deve ser possível obter o perfil do usuário logado;
-[x] Deve ser possível obter o número de check-ins realizados pelo usuário logado;
-[x] Deve ser possível o usuário obter o histórico de check-ins realizados;
-[x] Deve ser possível o usuário buscar academias proximas;
-[x] Deve ser possível o usuário buscar academias por nome;
-[x] Deve ser possível o usuário realizar check-in em uma academia;
-[ ] Deve ser possível validar o check-in realizado pelo usuário;
-[x] Deve ser possível cadastrar uma academia;

## RNFs - Regras de Negócio

- [x] o usuário não pode se cadastrar com um e-mail duplicado;
- [x] o usuário não pode fazer dois check-ins no mesmo dia;
- [x] o usuário não pode fazer check-in se não estiver perto (100m) da academia;
- [ ] o check-in só pode ser validado até 20 minutos após criado;
- [ ] o check-in só pode ser validado por administradores; 
- [ ] A academia só pode ser cadastrada por administradores;

## RNs - Requisitos Não Funcionais

- [x] A senha do usuário deve ser criptografada;
- [x] Os dados da aplicação devem estar persistidos em um banco de dados PostgreSQL;
- [x] Todas as listas de dados precisam estar paginadas com 20 itens por página;
- [] O usuário deve ser autenticado com JWT (JSON Web Token);
