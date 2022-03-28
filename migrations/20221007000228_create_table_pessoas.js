exports.up = function (knex, Promise) {
  return knex.schema.createTable('pessoas', (table) => {
    table.increments('pessoaId').primary();
    table.string('name', 50).notNullable();
    table.string('sexo').notNullable();
    table.string('cpf').notNullable().unique();
    table.string('email').notNullable();
    table.date('dtNascimento').notNullable();
    table.string('celular').notNullable();
    table.string('whastsapp').notNullable();
  });
};

exports.down = function (knex, Promise) {
  return knex.schema.dropTable('pessoas');
};
