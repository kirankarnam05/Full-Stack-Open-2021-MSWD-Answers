const logger = require('./logger')

const requestLogger = (request, response, next) => {
	logger.info('Method:', request.method)
	logger.info('Path:  ', request.path)
	logger.info('Body:  ', request.body)
	logger.info('---')
	next()
}

const unknownEndpoint = (request, response) => {
	response.status(404).json({error: 'Unknown resource'})
}

const errorHandler = (request, response, error, next) => {
	logger.error(error.name)

	if( error.name === 'CastError' && error.kind === 'ObjectId' ) 
		return response.status(400).json({error: 'Malformatted Id'})
	if( error.name === 'ValidationError' )
		return response.status(400).json({error: error.message})
	next(error)
}

module.exports = {
	requestLogger,
	unknownEndpoint,
	errorHandler,
}