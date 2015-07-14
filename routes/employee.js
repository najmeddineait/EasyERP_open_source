/**
 * Created by Roman on 21.05.2015.
 */
var express = require('express');
var router = express.Router();
var EmployeeHandler = require('../handlers/employee');

module.exports = function (models) {
    var handler = new EmployeeHandler(models);

    router.get('/getForDD', handler.getForDD);
    router.get('/bySales', handler.getBySales);
    router.get('/getFilterValues', handler.getFilterValues);
    router.get('/byDepartment', handler.byDepartment);
    router.patch('/addFiredHired', handler.addFiredHired);

    return router;
};