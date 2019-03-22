
// const Validator = require('validator');
// const isEmpty = require('./is-empty');

// module.exports = function validateAddDealAsGuestInput(data){
//     let errors = {};
    
//     data.name = !isEmpty(data.name) ? data.name: '';
//     data.category = !isEmpty(data.category) ? data.category: '';

//     data.email = !isEmpty(data.email) ? data.email: '';
//     data.password = !isEmpty(data.password) ? data.password: '';
//     data.password2 = !isEmpty(data.password2) ? data.password2: '';
    
//     if(!Validator.isLength(data.name, {min: 2, max: 30})){
//         errors.name = 'Please enter the name of the item that is least 2 characters long and not longer than 30 characters';
//     }
//     if(Validator.isEmpty(data.name)){
//         errors.name = 'Name field is required';
//     }



//     if(!Validator.isLength(data.category, {min: 2, max: 30})){
//         errors.category = 'Please select the Category';
//     }
//     if(Validator.isEmpty(data.category)){
//         errors.category = 'Category field is required';
//     }

//     return {
//         errors,
//         isValid: isEmpty(errors)
//     };
// };