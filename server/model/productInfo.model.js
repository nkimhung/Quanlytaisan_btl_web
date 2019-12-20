const Sequelize = require('sequelize')
const db = require('../config/db');
const sequelize = db.sequelize;
const Model = Sequelize.Model;

class ProductInfoModel extends Model {
    create(data) {
        return new Promise((resolve, reject) => {
            data.timeCreated = new Date().getTime();
            ProductInfoModel.create(data).then(result => {
                resolve(result);
            }).catch(err => {
                reject(err);
            })
        })
    }
    deleteId(id) {
        return new Promise((resolve, reject) => {
            
            let sql = `SELECT productinfo.* FROM productInfo 
                        inner join productincart on productinfo.id = productincart.productInfoID
                        and  productinfo.id = ${id} and productincart.status='ACCEPT'`;
            this.sequelize.query(sql, {
                type: this.sequelize.QueryTypes.SELECT
            }).then(result => {
                if (!result[0]) {
                    let sql = `DELETE FROM productInfo where productinfo.id = ${id}`;
                    this.sequelize.query(sql, {
                        type: this.sequelize.QueryTypes.SELECT
                    }).then(result => {
                        resolve(result);
                    }).catch(err => {
                        reject(err)
                    })
                    resolve({
                        status: 200,
                        msg: "ok đã xóa"
                    });
                }
                resolve({
                    status: 401,
                    err: "Sản phẩm đang cho mượn không thể xóa!"
                });

            }).catch(err => {
                reject(err)
            })
        })
    }
    revoke(data) {
        return new Promise((resolve, reject) => {
            let sql = `update productInfo set amountInWarehouse=amountInWarehouse+${data.amount} where id=${data.productinfoid}`;
            this.sequelize.query(sql, {
                type: this.sequelize.QueryTypes.SELECT
            }).then(result => {
                resolve(result);
            }).catch(err => {
                reject(err)
            })
            sql = `update productincart set status='Returned' where id=${data.cartid}`;
            this.sequelize.query(sql, {
                type: this.sequelize.QueryTypes.SELECT
            }).then(result => {
                resolve(result);
            }).catch(err => {
                reject(err)
            })
            sql = `update productorder set status='Returned' where id=${data.id}`;
            this.sequelize.query(sql, {
                type: this.sequelize.QueryTypes.SELECT
            }).then(result => {
                resolve(result);
            }).catch(err => {
                reject(err)
            })
            resolve({
                status:200
            })
        })
    }

    getAllProduct() {
        return new Promise((resolve, reject) => {
            let sql = `SELECT * FROM productInfo`;
            this.sequelize.query(sql, {
                type: this.sequelize.QueryTypes.SELECT
            }).then(result => {
                resolve(result);
            }).catch(err => {
                reject(err)
            })
        })
    }
    getProductByID(productID) {
        return new Promise((resolve, reject) => {
            let sql = `SELECT * FROM productinfo  WHERE id = ${productID}`;
            this.sequelize.query(sql, {
                type: this.sequelize.QueryTypes.SELECT
            }).then(result => {
                resolve(result);
            }).catch(err => {
                reject(err)
            })
        })
    }

    updateByID(data) {
        return new Promise((resolve, reject) => {
            data.timeModified = new Date().getTime();
            console.log(data);
            ProductInfoModel.update(data, {
                where: {
                    id: data.id
                }
            }).then(result => {
                resolve(result);
            }).catch(err => {
                reject(err);
            })
        })
    }
}

ProductInfoModel.init({
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
  description: {
    field: 'description',
    type: Sequelize.STRING
  },
  image: {
    field: 'image',
    type: Sequelize.STRING
  },
  type: {
    field: 'type',
    type: Sequelize.STRING
  },
  amountInWarehouse: {
    field: 'amountInWarehouse',
    type: Sequelize.INTEGER
  },
  employeeIDcreate: {
    field: 'employeeIDcreate',
    type: Sequelize.INTEGER
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
    tableName: 'productInfo',
    timestamps: false
  });

module.exports = new ProductInfoModel();