const ProductInfoModel = require('../model/productInfo.model');
const productInCart = require ('../model/productInCart.model');
const ProductOrderModel = require('../model/productOrder.model');

async function create(data) {
  return new Promise((resolve, reject) => {
    ProductOrderModel.create(data).then(resCreate => {
      console.log(resCreate.dataValues);
      return resolve({
        status: 200,
        msg: 'okk xong',
        data: resCreate
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

async function getAllProductOrder() {
  return new Promise((resolve, reject) => {
    ProductOrderModel.getAllProductOrder().then(resAllEmployee => {
      return resolve({
        status: 200,
        msg: 'success',
        data: resAllEmployee
      })
    }, err => {
      return resolve({
        status: 500,
        msg: 'loi'
      })
    })
  })
}

async function getAllOrderOfWait() {
  return new Promise((resolve, reject) => {
    ProductOrderModel.getAllOrderOfWait().then(resAllEmployee => {
      return resolve({
        status: 200,
        msg: 'success',
        data: resAllEmployee
      })
    }, err => {
      return resolve({
        status: 500,
        msg: 'loi'
      })
    })
  })
}
async function getAllOrderOfAccept() {
    return new Promise((resolve, reject) => {
        ProductOrderModel.getAllOrderOfAccept().then(resAllEmployee => {
            return resolve({
                status: 200,
                msg: 'success',
                data: resAllEmployee
            })
        }, err => {
            return resolve({
                status: 500,
                msg: 'loi'
            })
        })
    })
}
async function getMessageEmployee(id) {
    return new Promise((resolve, reject) => {
        ProductOrderModel.getmessageByEmployee(id).then(resAllEmployee => {
            return resolve({
                status: 200,
                mss: 'success',
                data: resAllEmployee
            })
        }, err => {
            return resolve({
                status: 500,
                msg: 'loi'
            })
        })
    })
}
async function getAllOrderByEmployee(id) {
    return new Promise((resolve, reject) => {
        ProductOrderModel.getAllOrderByEmployee(id).then(resAllEmployee => {
            return resolve({
                status: 200,
                mss: 'success',
                data: resAllEmployee
            })
        }, err => {
            return resolve({
                status: 500,
                msg: 'loi'
            })
        })
    })
}


async function updateStatus(data) {
  return new Promise((resolve, reject) => {
    ProductOrderModel.updateStatus(data).then(res1 => {
      return resolve({
        status: 200,
        data: res1
      })
    }).catch(err1 => {
      return resolve({
        status: 500,
        err: err1
      })
    })
  })
}

module.exports = {
  create,
  getAllProductOrder,
  updateStatus,
    getAllOrderOfWait,
    getAllOrderByEmployee,
    getMessageEmployee,
    getAllOrderOfAccept,
}