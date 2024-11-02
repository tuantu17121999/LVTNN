const Handlebars = require('handlebars')
const moment = require('moment')

module.exports = {
    sum: (a, b) => a + b,
    dateFormat: (date,options)=>{
        const formatToUse = (options && options.hash && options.hash.format) || "HH:mm MM/DD/YYYY"
        return moment(date).format(formatToUse);
    },
    sortTable: (field, sort) =>{
        const sortType = field === sort.column ? sort.type : 'default'
        const icons = {
            default: 'oi oi-elevator',
            asc: 'oi oi-sort-ascending',
            desc: 'oi oi-sort-descending',
        }
        const types = {
            default: 'desc',
            asc : 'desc',
            desc : 'asc',
        }
        const type = types[sortType]
        const icon = icons[sortType]
        const href = Handlebars.escapeExpression(`?_sort&column=${field}&type=${type}`)

        var output = `<a href="${href}">
                        <span class="${icon}"></span>
                    </a>`
        return new  Handlebars.SafeString(output)
    },
    isdefined: function (value) {
        return value !== 0;
    },
    if_eq: function (a) {
        if(a > 0){
            return '<button class="btn btn-success btn-add-to-cart" >Thêm vào giỏ hàng</button>'
        }          
        else{
            return '<button class="btn btn-danger btn-add-to-cart disable" >Hết hàng</button>'
        }
    }

}