# App

GymPass style app.

## Requisitos funcionais

- [x] Deve ser possível se cadastrar;
- [ ] Deve ser possível se autenticar;
- [ ] Deve ser possível obter o perfil de um usuário logado;
- [ ] Deve ser possível obter o número de check-ins realizados pelo usuário;
- [ ] Deve ser possível o usuário obter seu histórico de check-ins;
- [ ] Deve ser possível o usuário buscar academias próximas;
- [ ] Deve ser possível o usuário buscar academias pelo nome;
- [ ] Deve ser possível o usuário realizar check-in em uma academia;
- [ ] Deve ser possível validar o check-in de um usuário;
- [ ] Deve ser possível cadastrar uma academia;

## Regras de negócio

- [x] O Usuário não deve poder se cadastrar com um e-mail duplicado;
- [ ] O Usuário não pode fazer 2 check-ins no mesmo dia;
- [ ] O Usuário não pode fazer check-in se não estiver pert o (100m) da academia;
- [ ] O checkin só pode ser validado até 20 minutos após criado;
- [ ] O checkin só pode ser validado por administradores;
- [ ] A academia só pode ser cadastrada por administradores;

## Requisitos não-funcionais

- [x] A senha do usuário precisa estar criptografada;
- [ ] Os dados da aplicação precisam estar persistidos em um banco PsotgreSQL;
- [ ] Todas listas de dados precisam estar paginadas com 20 itens por página;
- [ ] O usuário deve ser identfiicado por um JWT;
