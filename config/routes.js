module.exports = (app) => {
  app.route('/pessoas')
  .post(app.api.pessoa.save)
  .get(app.api.pessoa.get);

  app
    .route('/pessoas/:id')
    .put(app.api.pessoa.save)
    .get(app.api.pessoa.getById)
    .delete(app.api.pessoa.remove);
};
