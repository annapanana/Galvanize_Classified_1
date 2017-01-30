'use strict';
exports.up = function(knex, Promise) {
  return knex.schema.createTable('classifieds', (table) => {
    table.increments().primary();
    table.string('title').notNullable();
    table.string('description').notNullable();
    table.decimal('price').notNullable();
    table.string('item_image').notNullable();
    table.timestamps(true, true); //might need not nullable and defaults to now
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('classifieds');
};
