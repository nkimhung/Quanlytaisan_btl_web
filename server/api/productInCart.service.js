const ProductInfoModel = require('../model/productInfo.model');
const ProductInCartModel = require ('../model/productInCart.model');
const ProductOrderModel = require('../model/productOrder.model');

async function createMulti(data) {
  return new Promise((resolve, reject) => {
    ProductInCartModel.create(data).then(resCreate => {
      console.log("..........", resCreate);
      return resolve({
        status: 200,
        msg: 'ok xong',
      })
    }), err1 => {
      log.error("------------------ err1 : ", err1);
      return resolve({
        status: 500,
        err: err1
      })
    }
  })
}
async function deleteincart(id) {
    return new Promise((resolve, reject) => {
        ProductInCartModel.deletecart(id).then(resCreate => {
            console.log("..........", resCreate);
            return resolve({
                status: 200,
                msg: 'ok xong',
            })
        }), err1 => {
            log.error("------------------ err1 : ", err1);
            return resolve({
                status: 500,
                err: err1
            })
        }
    })
}
async function deleteincartsend(id) {
    return new Promise((resolve, reject) => {
        ProductInCartModel.deletecartsend2(id).then(resCreate => {
            console.log("..........", resCreate);
            return resolve({
                status: 200,
                msg: 'ok xong',
            })
        }), err1 => {
            log.error("------------------ err1 : ", err1);
            return resolve({
                status: 500,
                err: err1
            })
        }
    })
}

async function getNotification() {
  return new Promise((resolve, reject) => {
    ProductInCartModel.getNotification().then(resAllProduct => {
      return resolve({
        status: 200,
        msg: 'success',
        data: resAllProduct
      })
    }, err => {
      return resolve({
        status: 500,
        msg: 'loi'
      })
    })
  })
}

async function getAllInfoProductFromOrder(id) {
  return new Promise((resolve, reject) => {
    ProductInCartModel.getAllInfoProductFromOrder(id).then(resAllProduct => {
      return resolve({
        status: 200,
        msg: 'success',
        data: resAllProduct
      })
    }, err => {
      return resolve({
        status: 500,
        msg: 'loi'
      })
    })
  })
}

module.exports = {
  createMulti,
  getNotification,
    getAllInfoProductFromOrder,
    deleteincart,
    deleteincartsend
}