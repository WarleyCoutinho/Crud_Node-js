module.exports = (app) => {
  const save = (req, res) => {
    const pessoa = { ...req.body };
    console.log('To Aqui', req.body);
    if (pessoa.pessoaId) {
      app
        .db('pessoas')
        .update(pessoa)
        .where({
          pessoaId: pessoa.pessoaId,
        })
        .then((_) => res.status(204).send())
        .catch((err) => res.status(500).send(err));
    } else {
      app
        .db('pessoas')
        .insert(pessoa)
        .then((_) => res.status(204).send())
        .catch((err) => res.status(500).send(err));
    }
  };

  const remove = async (req, res) => {
    try {
      existsOrError(req.params.id, 'Código da pessoa não informado.');

      const rowsDeleted = await app
        .db('pessoas')
        .where({ pessoaId: req.params.id })
        .del();
      existsOrError(rowsDeleted, 'A pessoa não foi encontrado.');

      res.status(204).send();
    } catch (msg) {
      res.status(400).send(msg);
    }
  };
  const get = (req, res) => {
    app
      .db('pessoas')
      .select(
        'pessoaId',
        'name',
        'sexo',
        'cpf',
        'email',
        'dtNascimento',
        'celular',
        'whastsapp'
      )
      .from('pessoas')
      .then((pessoa) => {
        // console.log(pessoa);
        res.json(pessoa);
      })
      .catch((err) => res.status(500).send(err));
  };

  const getById = (req, res) => {
    app
      .db('pessoas')
      .select(
        'pessoa.pessoaId',
        'pessoa.name',
        'pessoa.sexo',
        'pessoa.cpf',
        'pessoa.email',
        'pessoa.dtNascimento',
        'pessoa.celular',
        'pessoa.whastsapp'
      )
      .where({ pessoaId: req.params.id })
      .first()
      .then((pessoa) => res.json(pessoa))
      .catch((err) => res.status(500).send(err));
  };

  return { save, remove, get, getById };
};
