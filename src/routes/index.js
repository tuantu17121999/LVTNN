const adminRouter = require('./admin');
const staffRouter = require('./staff');
const customerRouter = require('./customer/');
const { checkTokenCustomer } = require('../app/common/checkAuthentication.js')

function router(app) {
    app.use('/', customerRouter);
    app.use('/admin', adminRouter);
    app.use('/staff', staffRouter);
}

module.exports = router;