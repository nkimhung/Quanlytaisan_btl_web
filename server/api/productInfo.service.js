const ProductInfoModel = require('../model/productInfo.model');
const productInCart = require ('../model/productInCart.model');
const ProductOrderModel = require('../model/productOrder.model');

async function getAllProduct() {
  return new Promise((resolve, reject) => {
    ProductInfoModel.getAllProduct().then(resAllProduct => {
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

async function create(data) {
  return new Promise((resolve, reject) => {
    ProductInfoModel.create(data).then(resCreate => {
      console.log(resCreate.dataValues);
      return resolve({
        status: 200,
        msg: 'okk xong',
        data: resCreate.dataValues
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
async function update(data) {
    return new Promise((resolve, reject) => {
        ProductInfoModel.updateByID(data).then(res1 => {
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
async function deleteId(id) {
    return new Promise((resolve, reject) => {
        ProductInfoModel.deleteId(id).then(resCreate => {
            if (resCreate.status == 401)
                return resolve({
                    status: 401,
                    err: resCreate.err,
                });
            return resolve({
                status: resCreate.status,
                err: resCreate.err,
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
async function revoke(data) {
    return new Promise((resolve, reject) => {
        ProductInfoModel.revoke(data).then(resCreate => {
            return resolve({
                status: 200,
                mss: "ok",
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

async function getProductByID(id) {
    return new Promise((resolve, reject) => {
        ProductInfoModel.getProductByID(id).then(resId => {
            return resolve({
                status: 200,
                msg: 'success',
                data: resId[0]
            })
        })
    })
}


module.exports = {
  getAllProduct,
  create,
  update,
  getProductByID,
    deleteId,
  revoke
}