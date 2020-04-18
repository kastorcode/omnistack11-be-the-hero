const express = require('express');
const { celebrate, Segments, Joi } = require('celebrate');
const routes = express.Router();
const incidentController = require('./controllers/IncidentController');
const ongController = require('./controllers/OngController');
const profileController = require('./controllers/ProfileController');
const sessionController = require('./controllers/SessionController');

routes.get(['/'], (req, res) => {
	return res.send('Olá Mundo!');
});

routes.get(['/incidents'], celebrate({
	[Segments.QUERY]: Joi.object().keys({
		page: Joi.number(),
	}),
}), incidentController.list);

routes.get(['/incidents/total'], incidentController.total);
routes.post(['/incidents'], incidentController.create);

routes.delete(['/incidents/:id'], celebrate({
	[Segments.PARAMS]: Joi.object().keys({
		id: Joi.number().required(),
	}),
}), incidentController.delete);

routes.get(['/ongs'], ongController.list);

routes.post(['/ongs'], celebrate({
	[Segments.BODY]: Joi.object().keys({
		name: Joi.string().required(),
		email: Joi.string().required().email(),
		whatsapp: Joi.string().required().min(10).max(11),
		city: Joi.string().required(),
		uf: Joi.string().required().length(2),
	})
}), ongController.create);

routes.get(['/profile'], celebrate({
	[Segments.HEADERS]: Joi.object({
		authorization: Joi.string().required(),
	}).unknown(),
}), profileController.index);


routes.post(['/sessions'], sessionController.create);

module.exports = routes;