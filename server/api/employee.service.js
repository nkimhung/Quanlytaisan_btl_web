const config = require('config.json');
const jwt = require('jsonwebtoken');
const Role = require('_helpers/role');
const EmployeeModel = require('../model/employee.model');
// var JWT = require('jwt-decode');

async function getByCode(code) {
  return new Promise((resolve, reject) => {
    EmployeeModel.checkCode(code).then(resCode => {
      return resolve({
        status: 200,
        msg: 'success',
        data: resCode
      })
    })
  })
}

async function create(data) {
  return new Promise((resolve, reject) => {
    EmployeeModel.create(data).then(resCreate => {
      console.log(resCreate.dataValues);
      return resolve({
        status: 200,
        msg: 'okk xong',
        data: resCreate.dataValues
      })
    }).catch( err1 => {
      return resolve({
        status: 500,
        err: err1
      })
    })
  })
}

async function getAllEmployee() {
  return new Promise((resolve, reject) => {
    EmployeeModel.getAllEmployee().then(resAllEmployee => {
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
async function getStatistic() {
    return new Promise((resolve, reject) => {
        EmployeeModel.getStatistic().then(resAllEmployee => {
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

async function update(data) {
  return new Promise((resolve, reject) => {
    EmployeeModel.updateByID(data).then(res1 => {
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

async function getEmployeeByID(id) {
  return new Promise((resolve, reject) => {
    EmployeeModel.getEmployeeByID(id).then(resId => {
          return resolve ({
              status: 200,
              msg: 'success',
              data: resId[0]
          })
      })
  })
}


module.exports = {
  getByCode,
  create,
  getAllEmployee,
  update,
    getEmployeeByID,
    getStatistic
}