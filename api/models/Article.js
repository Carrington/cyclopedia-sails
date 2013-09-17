//Model entity for Article
var Article = {
	attributes: {
		title: {
			type: 'string',
			required: true,
			alphanumeric: true
		},
		author: 'string',
		body: 'text'
		
	}
}
