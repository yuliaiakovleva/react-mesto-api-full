const Card = require('../models/card');
const { NotFoundError, BadRequestError, NoRightsError } = require('../errors/errors');

module.exports.getCards = (req, res, next) => {
  Card.find({})
    .populate('likes')
    .then((cards) => {
      // console.log(cards);
      res.send(cards);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Переданы некорректные данные.'));
      } else {
        next(err);
      }
    });
};

module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;
  console.log(req.user._id, 'Еще один вывод в консоль!');
  const owner = req.user._id;
  Card.create({ name, link, owner })
    .then((card) => res.send(card))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Переданы некорректные данные при создании карточки.'));
      } else {
        next(err);
      }
    });
};

module.exports.likeCard = (req, res, next) => {
  const { cardId } = req.params;
  Card.findByIdAndUpdate(
    cardId,
    { $addToSet: { likes: req.user._id } }, // добавить _id в массив, если его там нет
    { new: true, runValidators: true },
  )
    .populate('likes')
    .orFail(() => {
      throw new NotFoundError('Передан несуществующий _id карточки.');
    })
    .then((card) => res.send(card))
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError('Передан невалидный _id карточки.'));
      } else {
        next(err);
      }
    });
};

module.exports.dislikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } }, // убрать _id из массива
    { new: true, runValidators: true },
  )
    .populate('likes')
    .orFail(() => {
      throw new NotFoundError('Передан несуществующий _id карточки.');
    })
    .then((card) => res.send(card))
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError('Передан невалидный _id карточки.'));
      } else {
        next(err);
      }
    });
};

module.exports.deleteCard = (req, res, next) => {
  const { cardId } = req.params;
  // console.log(req.user._id);
  // console.log(cardId);
  Card.findById(cardId)
    .populate('likes')
    .orFail(() => {
      throw new NotFoundError('Карточка по указанному _id не найдена.');
    })
    .then((card) => {
      if (card.owner.toString() === req.user._id) {
        // console.log(card.owner.toString());
        // console.log(req.user._id);
        // console.log(card._id.toString());
        return Card.findByIdAndRemove(card._id.toString())
          .then((answer) => res.send(answer));
      } else {
        next(new NoRightsError('У вас нет права удалять эту карточку.'));
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError('Передан невалидный _id карточки.'));
      } else {
        next(err);
      }
    });
};
