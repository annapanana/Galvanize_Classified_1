
'use strict';

const express = require('express');
const router = express.Router();
const knex = require('../knex');

// YOUR CODE HERE

router.get('/', (req, res, next) => {
  knex('classifieds')
    .then((result) => {
      res.send(result);
    });
});

router.get('/:id/', (req, res, next) => {
  knex('classifieds')
    .where('id', req.params.id)
    .then((result) => {
      res.send(result[0]);
    });
});

router.post('/', (req, res, next) => {
  const { title, description, price, item_image } = req.body;
  const newPost = { title, description, price, item_image };
  knex('classifieds')
    .insert(newPost, '*')
    .then((result) => {
      // delete unnecessary returned data
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
          res.send(post);
        });
    });
});

module.exports = router;
