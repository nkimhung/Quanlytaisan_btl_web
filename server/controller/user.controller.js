const userService = require('../api/user.service');
const multer = require('multer');

module.exports = function authenticate(req, res, next) {
  userService.login(req.body)
      .then(user => user ? res.json(user) : res.status(400).json({ message: 'Username or password is incorrect' }))
      .catch(err => next(err));
}

// module.exports = function getAll(req, res, next) {
//   userService.getAll()
//       .then(users => res.json(users))
//       .catch(err => next(err));
// }

// let storageAvatar = multer.diskStorage({
//   destination: (req, file, callback) => {
//     cb(null, DIR);
//   },
//   filename: (req, file, callback) => {
//     callback(null, file.fieldname + '-' + Date.now() + '.' + path.extname(file.originalname));
//   }
// });

// let upload = multer({storage: storageAvatar});
