/**
 * Preference
 *
 * @module      :: Cyclopedia (Sails)
 * @description :: Preference storage for user to specify what content they want to see/what content they want to have hidden.
 * @todo        :: When Waterline is updated with associations, this User has a one-to-many relationship with this model.
 */

module.exports = {

  attributes: {
    preferenceName: {
      type: 'STRING',
    },
    exclusionValues: {
      type: 'array'
    },
    inclusionValues: {
      type: 'array'
    }    
  }

};
