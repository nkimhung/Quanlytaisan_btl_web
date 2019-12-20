const path = require('path');
const express = require('express');
const router = express.Router();
const userService = require('../api/user.service');
const employeeService = require('../api/employee.service');
const productInfoService = require('../api/productInfo.service');
const productOrderService = require('../api/productOrder.service');
const productInCartService = require('../api/productInCart.service');
const authorize = require('_helpers/authorize');
const Role = require('_helpers/role');
const authenticate = require('../controller/user.controller');

router.post('/registerProduct',(req, res) => {
  productInfoService.create(req.body)
    .then(products => res.json(products))
    .catch(err => {
      res.send('error: ' + err)
    })
});

router.post('/borrowProduct',(req, res) => {
  console.log(req.body);
  productInCartService.createMulti(req.body)
    .then(products => res.json(products))
    .catch(err => {
      res.send('error: ' + err)
    })
});

router.get('/list-product', getAllProduct);
router.get('/product-order', getAllProductOrder);
router.get('/order-detail', getAllOrderOfWait);
router.get('/notification', getNotification);
router.get('/info-product-order/:id', getAllInfoProductFromOrder);
router.get('/allorderemployee/:id', getAllOrderEmployee);
router.get('/message/:id', getMessageEmployee);
router.get('/order-accept', getAllOrderOfAccept);
router.get('/:id', getProductByID);
router.get('/deletecart/:id', deleteInCart);
router.get('/deletecartsend/:id', deleteInCartSend);

router.post('/update-product', (req, res) => {
    productInfoService.update(req.body)
        .then(product => res.json(product))
        .catch(err => {
            res.send('error: ' + err)
        });
})
router.get('/delete/:id', authorize(Role.Admin), (req, res) => {
    productInfoService.deleteId(req.params.id)
        .then(productinfo => {
            res.json(productinfo)
            // let token = jwt.sign({ sub: user.id, role: user.role }, config.secret)
            //res.json({ token: token }) authorize(Role.Admin),

        })
        .catch(err => {
            res.send('error: ' + err)
        })
})

router.post('/update-status', (req, res) => {
    productOrderService.updateStatus(req.body)
    .then(notification => res.json(notification))
    .catch(err => {
      res.send('error: ' + err)
    });
  })
router.post('/revokeproduct', (req, res) => {
    productInfoService.revoke(req.body)
        .then(notification => res.json(notification))
        .catch(err => {
            res.send('error: ' + err)
        });
})

function getAllInfoProductFromOrder(req, res, next) {
  const id = parseInt(req.params.id);
  productInCartService.getAllInfoProductFromOrder(id)
    .then(products => res.json(products))
    .catch(err => next(err));
}
function getAllOrderEmployee(req, res, next) {
    const id = parseInt(req.params.id);
    productOrderService.getAllOrderByEmployee(id)
        .then(products => res.json(products))
        .catch(err => next(err));
}
function getMessageEmployee(req, res, next) {
    const id = parseInt(req.params.id);
    productOrderService.getMessageEmployee(id)
        .then(products => res.json(products))
        .catch(err => next(err));
}
function getAllOrderOfWait(req, res, next) {
  productOrderService.getAllOrderOfWait() 
    .then(orders => res.json(orders))
    .catch(err => next(err))
}
function getAllOrderOfAccept(req, res, next) {
    productOrderService.getAllOrderOfAccept()
        .then(orders => res.json(orders))
        .catch(err => next(err))
   
}


function getNotification(req, res, next) {
  productInCartService.getNotification()
    .then(notifications => res.json(notifications))
    .catch(err => next(err));
}

function getAllProduct(req, res, next) {
  productInfoService.getAllProduct()
    .then(products => res.json(products))
    .catch(err => next(err));
}

function getAllProductOrder(req, res, next) {
  productOrderService.getAllProductOrder()
    .then(productOrders => res.json(productOrders))
    .catch(err => next(err));
}
function getProductByID(req, res, next) {
    const currentUser = req.user;
    const id = parseInt(req.params.id);

    // only allow admins to access other user records
    // if (id !== currentUser.sub && currentUser.role !== Role.Admin) {
    //   return res.status(401).json({ message: 'Unauthorized' });
    // }

    productInfoService.getProductByID(req.params.id)
        .then(product => product ? res.json(product) : res.sendStatus(404))
        .catch(err => next(err));
}
function deleteInCart(req, res, next) {
    productInCartService.deleteincart(req.params.id)
        .then(info => res.json({
            status: 200,
            data:info
        }))
        .catch(err => {
            console.log(err);
            next(err)
        });
}
function deleteInCartSend(req, res, next) {
    productInCartService.deleteincartsend(req.params.id)
        .then(info => res.json({
            status: 200,
            data: info
        }))
        .catch(err => {
            console.log(err);
            next(err)
        });
}
router.post('/registerProductOrder',(req, res) => {
  productOrderService.create(req.body)
    .then(products => res.json(products))
    .catch(err => {
      res.send('error: ' + err)
    })
});

module.exports = router;

