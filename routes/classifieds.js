
'use strict';

const express = require('express');
const router = express.Router();
const knex = require('../knex');

// YOUR CODE HERE

router.get('/', (req, res, next) => {
  knex('classifieds')
    .then((result) => {
      result = result.map((r) => {
        delete r.created_at;
        delete r.updated_at;
        return r;
      });
      res.send(result);
    });
});

router.get('/:id/', (req, res, next) => {
  knex('classifieds')
    .where('id', req.params.id)
    .then((result) => {
      delete result[0].created_at;
      delete result[0].updated_at;
      res.send(result[0]);
    });
});

router.post('/', (req, res, next) => {
  const { title, description, price, item_image } = req.body;
  const newPost = { title, description, price, item_image };
  knex('classifieds')
    .insert(newPost, '*')
    .then((result) => {
      delete result[0].created_at;
      delete result[0].updated_at;
      res.send(result[0]);
    });
});

router.patch('/:id/', (req, res, next) => {
  const { title, description, price, item_image } = req.body;
  const newPost = { title, description, price, item_image };
  knex('classifieds')
    .where('id', req.params.id)
    .update(newPost, '*')
    .then((result) => {
      delete result[0].created_at;
      delete result[0].updated_at;
      res.send(result[0]);
    });
});

router.delete('/:id/', (req, res, next) => {
  knex('classifieds')
    .where('id', req.params.id)
    .then((result) => {
      const post = result[0];
      knex('classifieds')
        .where('id', req.params.id)
        .del()
        .then(() => {
          delete result[0].created_at;
          delete result[0].updated_at;
          res.send(post);
        });
    });
});

module.exports = router;
