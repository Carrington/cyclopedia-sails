/**
 * Relationship
 *
 * @module      :: Model
 * @description :: A short summary of how this model works and what it represents.
 *
 */

module.exports = {

  attributes: {
    owner: {
      type: 'string',
      required: true
    },
    owned: {
      type: 'string',
      required: true
    },
    type: {
      type: 'array',
      required: true
    }
  }

};
