var keyLocalStorageItemCart = 'ListItemCart';
var keyLocalStorageTotalOrderMoney = 'TotalOrderMoney';
var keyLocalStorageAddress = 'Address';
var keyLocalStoragePayment = 'Payment';

function getListItemCart() {
    var listItemCart = new Array();
    var jsonListItemCart = localStorage.getItem(keyLocalStorageItemCart);
    if (jsonListItemCart != null) {
        listItemCart = JSON.parse(jsonListItemCart);
    }
    return listItemCart;
}

function showListItemCartInnerID(idHTML) {
    var listItemCart = getListItemCart();
    var HTML = listItemCartToHTML(listItemCart);
    var nodeCart = document.getElementById(idHTML);
    nodeCart.innerHTML = HTML;
}

// chuyển một danh sách thành html
function listItemCartToHTML(listItemCart) {
    var allHTML = '';
    for (var i = 0; i < listItemCart.length; i++) {
        allHTML = allHTML + itemCartToHTML(listItemCart[i]);
        if ((i + 1) != listItemCart.length) {
            allHTML = allHTML;
        }
    }
    return allHTML;
}

// chuyển một đối tượng thành html
function itemCartToHTML(itemCart) {
    var price = itemCart.amount * itemCart.price;
    var truoc = '\'';
    var id = truoc + itemCart.id + truoc;
    var idmain = itemCart.id + 'main';
    var idprice = itemCart.id + 'price';
    var html = '    <div class="row pt-1">\n' +
        '        <div class="col-2">\n' +
        '            <img class="cart-item-img" src="/upload/' + itemCart.image + '" alt="">\n' +
        '        </div>\n' +
        '        <div class="col-1">\n' +
        '            <span class="price-bold">' + itemCart.amount + '</span>\n' +
        '        </div>\n' +
        '        <div class="col-7">\n' +
        '            <span class="price-bold">' + itemCart.name + '</span>\n' +
        '        </div>\n' +
        '        <div class="col-2">\n' +
        '            <span class="price-bold float-right">' + price + '<small>.000đ</small></span>\n' +
        '        </div>\n' +
        '    </div>\n'

    return html;
}

///Tổng tiền
function showTotalOrderMoneyInnerID(idHTML) {
    var TotalOrderMoney = getTotalOrderMoney();
    var nodeCart = document.getElementById(idHTML);
    nodeCart.innerHTML = TotalOrderMoney;
    return true;
}

function showTotalShipOrderMoneyInnerID(idHTML) {
    var TotalOrderMoney = getTotalOrderMoney();
    var nodeCart = document.getElementById(idHTML);
    nodeCart.innerHTML = TotalOrderMoney + 15;
    return true;
}

function getTotalOrderMoney() {
    var jsonTotalOrderMoney = localStorage.getItem(keyLocalStorageTotalOrderMoney);
    if (jsonTotalOrderMoney != null) {
        var TotalOrderMoney = JSON.parse(jsonTotalOrderMoney);
    }
    return TotalOrderMoney.totalOrderMoney;
}

//Địa chỉ nhận Hàng
function showAddressInnerID(idHTML) {
    var address = getAddress();
    var payment = getPayment();
    var HTML = '<div class="delivery_des delivery_des_new">\n' +
        '    <div class="items">\n' +
        '        <h3 class="delivery_title mt-2 mb-2 new_deli_title">' + address.fullName + '</h3>\n' +
        '        <p><span>Điện thoại: </span> ' + address.phone + '</p>\n' +
        '        <p><span>Email: </span>' + address.email + '</p>\n' +
        '        <p><span>Địa chỉ: </span>' + address.address + '</p>\n' +
        '        <p><span>Phường/Xã: </span>' + address.wards + '</p>\n' +
        '        <p><span>Quận/Huyện: </span>' + address.district + '</p>\n' +
        '        <p><span>Tỉnh/Thành phố: </span>' + address.city + '</p>\n' +
        '    </div>\n' +
        '    <div class="item mt-4">\n' +
        '        <p><span>Phương thức thanh toán:</span></p>\n' +
        '        <div class="payment_item mt-2">\n' +
        '            <div class="d-flex align-items-center bd-highlight mt-1 mb-1">\n' +
        '                <span class="ml-2 bd-highlight">' + payment.write + '</span>\n' +
        '            </div>\n' +
        '        </div>\n' +
        '    </div>\n' +
        '</div>';
    var nodeCart = document.getElementById(idHTML);
    nodeCart.innerHTML = HTML;
    return true;
}

function showPaymentInnerID(idHTML) {
    var payment = getPayment();
    var HTML = '<div class="delivery_des delivery_des_new">\n' +
        '    <div class="item mt-4">\n' +
        '        <p><span>Phương thức thanh toán:</span></p>\n' +
        '        <div class="payment_item mt-2">\n' +
        '            <div class="d-flex align-items-center bd-highlight mt-1 mb-1">\n' +
        '                <span class="ml-2 bd-highlight">' + payment.write + '</span>\n' +
        '            </div>\n' +
        '        </div>\n' +
        '    </div>\n' +
        '</div>';
    var nodeCart = document.getElementById(idHTML);
    nodeCart.innerHTML = HTML;
    return true;
}

function getAddress() {
    var jsonAddress = localStorage.getItem(keyLocalStorageAddress);
    if (jsonAddress != null) {
        var address = JSON.parse(jsonAddress);
    }
    return address;
}

function getPayment() {
    var jsonPayment = localStorage.getItem(keyLocalStoragePayment);
    if (jsonPayment != null) {
        var payment = JSON.parse(jsonPayment);
    }
    return payment;
}

function addValueInnerInputID(inputID, value) {
    var input = document.getElementById(inputID);
    input.val(value);
    return true;
}

function listItemCartToString(listItemCart) {
    var allString = '';
    for (var i = 0; i < listItemCart.length; i++) {
        allString = allString + itemCartToString(listItemCart[i]);
    }
    return allString;
}

function itemCartToString(itemCart) {
    var string = '/' + itemCart.id + '-' + itemCart.amount;
    return string;
}

function deleteInLocal() {
    var empty = '[]';
    localStorage.setItem(keyLocalStorageItemCart, empty);
    localStorage.setItem(keyLocalStorageTotalOrderMoney, empty);
    localStorage.setItem(keyLocalStorageAddress, empty);
    localStorage.setItem(keyLocalStoragePayment, empty);
}