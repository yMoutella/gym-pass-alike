# App

GymPass style app.

## Requisitos funcionais

- [x] Deve ser possível se cadastrar;
- [x] Deve ser possível se autenticar;
- [x] Deve ser possível obter o perfil de um usuário logado;
- [x] Deve ser possível obter o número de check-ins realizados pelo usuário;
- [x] Deve ser possível o usuário obter seu histórico de check-ins;
- [x] Deve ser possível o usuário buscar academias próximas até 5km;
- [x] Deve ser possível o usuário buscar academias pelo nome;
- [x] Deve ser possível o usuário realizar check-in em uma academia;
- [x] Deve ser possível validar o check-in de um usuário;
- [x] Deve ser possível cadastrar uma academia;

## Regras de negócio

- [x] O Usuário não deve poder se cadastrar com um e-mail duplicado;
- [x] O Usuário não pode fazer 2 check-ins no mesmo dia;
- [x] O Usuário não pode fazer check-in se não estiver pert o (100m) da academia;
- [x] O checkin só pode ser validado até 20 minutos após criado;

## Requisitos não-funcionais

- [x] A senha do usuário precisa estar criptografada;
- [x] Os dados da aplicação precisam estar persistidos em um banco PsotgreSQL;
- [x] Todas listas de dados precisam estar paginadas com 20 itens por página;
- [x] O usuário deve ser identificado por um JWT;

Done.
