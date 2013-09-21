//Model entity for Article
module.exports = {
	attributes: {
		title: {
			type: 'string',
			required: true,
			alphanumeric: true
		},
		authorId: 'int',
		body: 'text'
		
	}
}
