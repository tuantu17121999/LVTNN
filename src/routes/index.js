const adminRouter = require('./admin');
const staffRouter = require('./staff');
const customerRouter = require('./customer/');


function router(app) {
    app.use('/', customerRouter);
    app.use('/admin', adminRouter);
    app.use('/staff', staffRouter);
}

module.exports = router;