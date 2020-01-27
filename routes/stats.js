const router = require('express').Router();
let Exercise = require('../models/exercise.model');
const moment = require('moment')

var firstday = moment().startOf('day');//todayu
var lastday = moment().subtract(7, 'days').calendar();//7 days ago

let query = {'date': {$gte: lastday, $lte: firstday} };

router.route('/').get((req, res) => {//find exercises greater than 60 minutes
  Exercise.find({$and: [ 
    {'duration': {$gte: 60}},
    {'date': {
      $gte: lastday}}
    ]})
  .select("-_id -createdAt -updatedAt") //less than or equal to
  .then( exercises => res.json(exercises))
  .catch(err => res.status(400).json('Error: ' + err));
});

/*for ( let i in User){
  console.log(User[i])
}*/

/* const getExcerciseBy = '';

exports.getExcerciseBy = async (req, res) => {
  try {
    const { search_field, search_value } = req.query;

    const queryObj = {};

    if (search_field !== '' && search_value !== ''){
      queryObj[search_field] = search_value;
    }

    console.log('::queryObj:::', queryObj);

    const username = await User.find(queryObj);
    
    if(!username){
      return res.status(404).json({
        status: 'Existe un error',
        message: 'El usuario con nombre ${search_field}:${search_value} no existe'
      });
    }

    res.status(200).json({
      status: 'correcto', //validar
      data: username
    });
  } catch (error) {
    res.status(500).json({
      status:'fallido',
      error: error.message
    });
  }
};

router.get('/search', getExcerciseBy); */

module.exports = router;