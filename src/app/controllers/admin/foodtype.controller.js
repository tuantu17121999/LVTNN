class foodTypeController{
    create (req, res){
        res.send('Thêm Loại thức ăn');
    }

    delete (req, res){
        res.send('Xóa Loại thức ăn');
    }
}

module.exports = new foodTypeController();
