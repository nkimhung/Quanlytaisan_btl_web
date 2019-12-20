const Sequelize = require('sequelize')
const db = require('../config/db');
const sequelize = db.sequelize;
const Model = Sequelize.Model;

class ProductOrderModel extends Model {
    create(data) {
        return new Promise((resolve, reject) => {
            data.timeCreated = new Date().getTime();
            let sql = `SELECT * FROM productinfo where id= '${data.id}' and amountInWarehouse >=${data.amount} `;
            this.sequelize.query(sql, {
                type: this.sequelize.QueryTypes.SELECT
            }).then(result => {
                if (!result[0]) {
                    resolve({
                        status: 401,
                        err: "Số lượng trong kho không đủ. Vui lòng xem lại số lượng muốn mượn"
                    })
                } else {
                    console.log(data);
                    let dataOrder = {
                        name: data.name,
                        employeeIDrequest: data.employeeID,
                        dateBorrow: data.dateBorrow,
                        dateReturn: data.dateReturn,
                        status: "Wait",
                        timeCreated: data.timeCreated,
                        timeModified: data.timeCreated,
                        createdBy: data.employeeID,
                        modifiedBy: data.employeeID

                    }
                    ProductOrderModel.create(dataOrder).then(result => {
                        console.log(' ok');
                        console.log(dataOrder.timeCreated);
                        resolve(dataOrder.timeCreated);
                        return result;
                        console.log(result);
                        

                        
                          
                                

    

                    }
                    )
                }
            }).catch(err => {
                console("ol");
                reject(err)
            })
        })
    }

  getAllProductOrder() {
    return new Promise((resolve, reject) => {
      let sql = `SELECT * FROM productOrder`;
      this.sequelize.query(sql, {
        type: this.sequelize.QueryTypes.SELECT
      }).then(result => {
        resolve(result);
      }).catch(err => {
        reject(err)
      })
    })
  }

  updateStatus(data) {
        let id = data.id;
        let date = new Date().getTime();
    return new Promise((resolve, reject) => {
      //let sql = `UPDATE productOrder
      //            SET status = 'ACCEPT'
      //            WHERE id = '${id}'`;
        let sql = `select id,productorderID,productInfoID,amount
                from productinCart
                where productInCart.productOrderID = '${id}'`;
      this.sequelize.query(sql, {
        type: this.sequelize.QueryTypes.SELECT
      }).then(result => {
          if (!result[0]) {
              resolve({
                  status: 500,
                  err: "Lỗi Server khi tìm thông tin order"
              });
          } else {
              var data1 = result[0];
              if (data.status == "ACCEPT") {
                  
                  let sql = `update productInfo set amountInWarehouse = amountInWarehouse -'${data1.amount}',
                        timeModified='${date}',modifiedBy='${data.employeeIDresponse}'
                        where amountInWarehouse >= '${data1.amount}' and id= '${data1.productInfoID}'`;
                  this.sequelize.query(sql, {
                      type: this.sequelize.QueryTypes.SELECT
                  }).then(result => {
                      resolve(result);
                  }).catch(err => {
                      let sql = `update productorder set status='ACCEPT',timeModified='${date}',modifiedBy='${data.employeeIDresponse}',
                           employeeIDresponse = '${data.employeeIDresponse}' where id= '${data1.productorderID}'`;
                      this.sequelize.query(sql, {
                          type: this.sequelize.QueryTypes.SELECT
                      }).then(result => {
                          resolve(result);
                      }).catch(err => {
                          let sql = `update productincart set status='ACCEPT',
                                timeModified ='${date}',
                                modifiedBy = '${data.employeeIDresponse}'
                                where productOrderID= '${data1.productorderID}'`;
                          this.sequelize.query(sql, {
                              type: this.sequelize.QueryTypes.SELECT
                          }).then(result => {
                              resolve(result);
                          }).catch(err => {
                              resolve({ status: 200 });
                              reject(err)
                          })
                      })
                  })
              } else {
                  let sql = `update productorder set status='DELETE',timeModified='${date}',modifiedBy='${data.employeeIDresponse}',
                           employeeIDresponse = '${data.employeeIDresponse}' where id= '${data1.productorderID}'`;
                  this.sequelize.query(sql, {
                      type: this.sequelize.QueryTypes.SELECT
                  }).then(result => {
                      resolve(result);
                  }).catch(err => {
                      let sql = `update productincart set status='DELETE',
                                timeModified ='${date}',
                                modifiedBy = '${data.employeeIDresponse}'
                                where productOrderID= '${data1.productorderID}'`;
                      this.sequelize.query(sql, {
                          type: this.sequelize.QueryTypes.SELECT
                      }).then(result => {
                          resolve(result);
                      }).catch(err => {
                          resolve({ status: 200 });
                          reject(err)
                      })
                  })
              }
          }
              }).catch(err => {
                reject(err);
      })
    })
  }

  getAllOrderOfWait() {
    return new Promise((resolve, reject) => {
        let sql = `SELECT productOrder.*,productincart.amount FROM productOrder
                   inner join productincart on productincart.productOrderID=productorder.id
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
    getAllOrderOfAccept() {
        return new Promise((resolve, reject) => {
            let sql = `select productorder.*,productincart.amount,productincart.id as cartid,productincart.productinfoid from productorder
                   inner join productincart on productincart.productorderid=productorder.id
                   where productorder.status = 'accept'`;
            this.sequelize.query(sql, {
                type: this.sequelize.QueryTypes.SELECT
            }).then(result => {
                resolve(result);
            }).catch(err => {
                reject(err)
            })
        })
    }
    getAllOrderByEmployee(id) {
        return new Promise((resolve, reject) => {
            let sql = `SELECT productOrder.*,productincart.amount FROM productOrder
                   inner join productincart on productincart.productOrderID=productorder.id
                   WHERE productOrder.employeeIDrequest = '${id}'`;
            this.sequelize.query(sql, {
                type: this.sequelize.QueryTypes.SELECT
            }).then(result => {
                resolve(result);
            }).catch(err => {
                reject(err)
            })
        })
    }
    
    getmessageByEmployee(id) {
        return new Promise((resolve, reject) => {
            let date = new Date();
            let day = date.getDate();
            let month = date.getMonth();
            let year = date.getFullYear();
            day = day + 5;
            let check = new Date(year, month, day).getTime();
            let sql = `SELECT productOrder.*,productincart.amount FROM productOrder
                   inner join productincart on productincart.productOrderID=productorder.id
                   WHERE productOrder.employeeIDrequest = '${id}' and productOrder.status = 'ACCEPT' and dateReturn < '${check}'`;
            this.sequelize.query(sql, {
                type: this.sequelize.QueryTypes.SELECT
            }).then(result => {
                resolve(result);
            }).catch(err => {
                reject(err)
            })
        })
    }
}


ProductOrderModel.init({
  id: {
    field: 'id',
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    field: 'name',
    type: Sequelize.STRING
  },
  employeeIDrequest: {
    field: 'employeeIDrequest',
    type: Sequelize.INTEGER
  },
  employeeIDresponse: {
    field: 'employeeIDresponse',
    type: Sequelize.INTEGER
  },
  dateBorrow: {
    field: 'dateBorrow',
    type: Sequelize.INTEGER
  },
  dateReturn: {
    field: 'dateReturn',
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
    tableName: 'productOrder'
  });

module.exports = new ProductOrderModel();