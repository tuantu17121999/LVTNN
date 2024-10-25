class adminController{
    show (req, res){
        res.send('Xem Admin');
    }

}

module.exports = new adminController();