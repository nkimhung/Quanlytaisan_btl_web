const Sequelize = require('sequelize')
const db = require('../config/db');
const sequelize = db.sequelize;
const Model = Sequelize.Model;

class EmployeeModel extends Model {
  search(data) {
    return new Promise((resolve, reject) => {
      let sql = `select Employee.*  
                from Employee 
                where 1=1`

      if (data.fullName != undefined && data.fullName != "") {
        sql = sql + ` Employee.fullName LIKE '%${data.fullName}%'`
      }
      if (data.phone != null && data.phone != '') {
        sql = sql + ` Employee.phone LIKE '%${data.phone}%'`
      }
      if (data.status != null && data.status != 'all' && data.status != '') {
        sql = sql + ` Employee.status = '${data.status}'`
      }
      if (data.level != null && data.level != 'all' && data.level != '') {
        sql = sql + ` Employee.level = '${data.level}'`
      }
      this.sequelize.query(sql, {
        type: this.sequelize.QueryTypes.SELECT
      }).then(Employee => {
        resolve(Employee);
      }).catch(err => {
        reject(err)
      })
    })
  }

  create(data) {
      return new Promise((resolve, reject) => {
          data.timeCreated = new Date().getTime();
      EmployeeModel.create(data).then(result => {
        resolve(result);
      }).catch(err => {
        reject(err);
      })
    })
  }

  checkCode(code) {
    return new Promise((fulfill, reject) => {
      let sql = `SELECT * FROM Employee WHERE LOWER(code) = LOWER('${code}')`;
      this.sequelize.query(sql, {
        type: this.sequelize.QueryTypes.SELECT
      }).then(result => {
        fulfill(result);
      }).catch(err => {
        reject(err)
      })
    })
  }

  checkPhone(phone) {
    return new Promise((fulfill, reject) => {
      let sql = `SELECT * FROM Employee WHERE phone = '${phone}'`;
      this.sequelize.query(sql, {
        type: this.sequelize.QueryTypes.SELECT
      }).then(result => {
        fulfill(result);
      }).catch(err => {
        reject(err)
      })
    })
  }

  checkEmail(email) {
    return new Promise((fulfill, reject) => {
      let sql = `SELECT * FROM employee WHERE LOWER(email) = LOWER('${email}')`;
      this.sequelize.query(sql, {
        type: this.sequelize.QueryTypes.SELECT
      }).then(result => {
        fulfill(result);
      }).catch(err => {
        reject(err)
      })
    })
  }

  getEmployeeByID(employeeID) {
    return new Promise((resolve, reject) => {
      let sql = `SELECT * FROM employee  WHERE id = ${employeeID}`;
      this.sequelize.query(sql, {
        type: this.sequelize.QueryTypes.SELECT
      }).then(result => {
        resolve(result);
      }).catch(err => {
        reject(err)
      })
    })
  }
    getStatistic() {
        return new Promise((resolve, reject) => {
            let a;
            let sql = `select sum(amountInWarehouse)as amountInWarehouse,type  from productinfo group by productinfo.type`;
            this.sequelize.query(sql, {
                type: this.sequelize.QueryTypes.SELECT
            }).then(result => {
                a = result
                sql = `select sum(amount) as amount,productinfo.type from productincart 
                    inner join productinfo on productinfo.id=productincart.productinfoid 
                    where productincart.status="ACCEPT" group by productinfo.type`;
                this.sequelize.query(sql, {
                    type: this.sequelize.QueryTypes.SELECT
                }).then(result => {
                    resolve({
                        mount: result,
                        amountinwarehouse: a
                    });
                }).catch(err => {
                    reject(err)
                })
            }).catch(err => {
                reject(err)
            })
        })
    }

  updateByID(data) {
    return new Promise((resolve, reject) => {
        // data.timeModified = new Date().getTime();
       
      EmployeeModel.update(data, {
        where: {
          id: data.employeeId
        }
      }).then(result => {
        resolve(result);
      }).catch(err => {
        reject(err);
      })
    })
  }

  deleteByID(data) {
    return new Promise((resolve, reject) => {
      EmployeeModel.update(data, {
        where: {
          id: data.id
        }
      }).then(result => {
        resolve(result)
      }).catch(err => {
        reject(err)
      })
    })
  }

  getAllEmployee() {
    return new Promise((resolve, reject) => {
      let sql = `SELECT * FROM employee`;
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

EmployeeModel.init({
  id: {
    field: 'id',
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  code: {
    field: 'code',
    type: Sequelize.STRING
  },
  fullName: {
    field: 'fullName',
    type: Sequelize.STRING
  },
  email: {
    field: 'email',
    type: Sequelize.STRING
  },
  phone: {
    field: 'phone',
    type: Sequelize.STRING
  },
  address: {
    field: 'address',
    type: Sequelize.STRING
  },
  birthDate: {
    field: 'birthDate',
    type: Sequelize.INTEGER
  },
  avatar: {
    field: 'avatar',
    type: Sequelize.STRING
  },
  jobStartDate: {
    field: 'jobStartDate',
    type: Sequelize.INTEGER
  },
  jobEndDate: {
    field: 'jobEndDate',
    type: Sequelize.INTEGER
  },
  jobTitle: {
    field: 'jobTitle',
    type: Sequelize.STRING
  },
  gender: {
    field: 'gender',
    type: Sequelize.STRING
  },
  timeCreated: {
    field: 'timeCreated',
    type: Sequelize.INTEGER
  },
  createdBy: {
    field: 'createdBy',
    type: Sequelize.INTEGER
  },
  status: {
    field: 'status',
    type: Sequelize.STRING
  }
}, {
    timestamps: false,
    sequelize: sequelize,
    tableName: 'employee'
  })

module.exports = new EmployeeModel();