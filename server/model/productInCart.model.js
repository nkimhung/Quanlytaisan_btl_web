const Sequelize = require('sequelize')
const db = require('../config/db');
const sequelize = db.sequelize;
const Model = Sequelize.Model;

async function asyncForEach(array, callback) {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array)
  }
}

class ProductInCartModel extends Model {
  timeout(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  createMulti(data) {
    return new Promise(async (resolve, reject) => {
      await asyncForEach(data, async (item) => {
        await this.timeout(300);
        let insert = {}
        insert.productOrderID = item.productOrderID;
        insert.productInfoID = item.productInfoID;
        insert.amount = item.amount;
        insert.status = item.status;
        // insert.timeCreated = new Date().getTime();
        ProductInCartModel.create(insert).then(result => {
          resolve(result);
        }).catch(err => {
          reject(err);
        })
      })
    })
  }

  create(data) {
      return new Promise((resolve, reject) => {
          let sql = `SELECT id FROM productOrder where timeCreated = '${data.timeCreated}'`;
          this.sequelize.query(sql, {
              type: this.sequelize.QueryTypes.SELECT
          }).then(result => {
              if (!result[0]) {
                  resolve({
                      status: 500,
                      err: "Lỗi tìm thông tin order"
                  })
              }
              let cart = {
                  productOrderID: result[0].id,
                  productInfoID: data.productInfoID,
                  amount: data.amount,
                  status: 'Wait',
                  timeCreated: data.timeCreated,
                  timeModified: data.timeCreated,
                  createdBy: data.createdBy,
                  modifiedBy: data.createdBy
              }
              ProductInCartModel.create(cart).then(result => {
                  resolve({
                      status: 200,
                      mss: "ok"
                  });
              }).catch(err => {
                  reject(err);
              })
          }).catch(err => {
              reject(err)
          })
     
      
    })
  }
    deletecart(id) {
        return new Promise((resolve, reject) => {
            let sql = `delete  FROM productOrder where productOrder.id = ${id} and status <> 'ACCEPT'`;
            this.sequelize.query(sql, {
                type: this.sequelize.QueryTypes.SELECT
            }).then(result => {
                console.log('yes');
                resolve(result);

            }).catch(err => {
                console.log('no');
                reject(err)
            })
            
            resolve({ status: 200 });
        })
    }
    deletecartsend2(id) {
        return new Promise((resolve, reject) => {
            let sql = `select id from productincart where productOrderID = ${id}`;
            this.sequelize.query(sql, {
                type: this.sequelize.QueryTypes.SELECT
            }).then(result => {
                if (!result[0]) {
                    resolve({
                        status: 500,
                        err: " loi"
                    })
                } else {
                    let id2 = result[0].id;
                    let sql = `delete  FROM productincart where id = ${id2} and status <> 'ACCEPT'`;
                    this.sequelize.query(sql, {
                        type: this.sequelize.QueryTypes.SELECT
                    }).then(result => {
                        console.log('yes');
                        resolve(result);

                    }).catch(err => {
                        console.log('no');
                        reject(err)
                    })

                    resolve({ status: 200 });
                }

            }).catch(err => {
                console.log('no');
                reject(err)
            })

            resolve({ status: 200 });
        })
           
    }

  getNotification() {
    return new Promise((resolve, reject) => {
      let sql = `SELECT productInCart.id, productInCart.productOrderID,productInCart.productInfoID,productInCart.amount, productInfo.name,productOrder.status, productOrder.employeeIDrequest,productOrder.dateBorrow, productOrder.dateReturn FROM productInCart
                  INNER JOIN productInfo ON productInfo.id = productInCart.productInfoID
                  INNER JOIN productOrder ON productOrder.id = productInCart.productOrderID 
                  WHERE productOrder.status = 'WAIT'`;
      this.sequelize.query(sql, {
        type: this.sequelize.QueryTypes.SELECT
      }).then(result => {
        resolve(result);
      }).catch(err => {
        reject(err)
      })
    })
  }

  getAllInfoProductFromOrder(id) {
    return new Promise((resolve, reject) => {
      //let sql = `SELECT productInfo.*,productInCart.productInfoID  FROM productInCart
      //            INNER JOIN productInfo ON productInfo.id = productInCart.productInfoID 
      //            WHERE productInCart.productOrderID = '${id}'`;
        let sql = `select productinfo.image,productinfo.amountInWarehouse,productincart.amount,productorder.dateBorrow,productorder.dateReturn,employee.fullName,productinCart.timeCreated,productinfo.name
        from productinCart
        inner join employee on productincart.createdBy = employee.id
        inner join productinfo on productincart.productinfoid = productinfo.id
        inner join productorder on productincart.productOrderID = productorder.id
        where productInCart.productOrderID = '${id}'`;
      this.sequelize.query(sql, {
        type: this.sequelize.QueryTypes.SELECT
      }).then(result => {
        resolve(result);
      }).catch(err => {
        reject(err);
      })
    })
  }
   
}


ProductInCartModel.init({
  id: {
    field: 'id',
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  productOrderID: {
    field: 'productOrderID',
    type: Sequelize.INTEGER
  },
  productInfoID: {
    field: 'productInfoID',
    type: Sequelize.INTEGER
  },
  amount: {
    field: 'amount',
    type: Sequelize.INTEGER
  },
  status: {
    field: 'status',
    type: Sequelize.STRING
  },
  timeCreated: {
    field: 'timeCreated',
    type: Sequelize.INTEGER
  },
  timeModified: {
    field: 'timeModified',
    type: Sequelize.INTEGER
  },
  createdBy: {
    field: 'createdBy',
    type: Sequelize.INTEGER
  },
  modifiedBy: {
    field: 'modifiedBy',
    type: Sequelize.INTEGER
  }
}, {
    sequelize: sequelize,
    tableName: 'productInCart'
  });

module.exports = new ProductInCartModel();