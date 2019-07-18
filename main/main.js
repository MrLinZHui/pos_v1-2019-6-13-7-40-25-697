'use strict';

//TODO: 请在该文件中实现练习要求并删除此注释
var menu = loadAllItems();
var offermenu = loadPromotions();
var offermenus = offermenu[0].barcodes;
function printReceipt(tags) {
    var ReceiptString = "***<没钱赚商店>收据***\n";
    var order1 = countSameElements(tags);
    if(order1){
        ReceiptString += countAndprintOrder (order1);
    }else{
        ReceiptString = "[ERROR]:";
    }  
   console.log(ReceiptString);
    return ReceiptString;

}
function countSameElements(inputs) {
  var obj={};
  inputs.forEach(item => {
    var num = 0;
    var pat = /[\d]+[.][\d]+/;
    if(item.length>10){
      num= parseFloat(item.match(pat));
      if(isNaN(num)){
        num= parseInt((item.substring(10)).replace(/[^0-9]/ig,""));
      }
      item = item.substring(0,10);
      obj[item] = obj[item] ? obj[item] +num : num
    } else{
      obj[item] = (obj[item] +1 ) || 1; 
    }
  });
 return obj;
}
function countAndprintOrder(order){
    var sum = 0.00;
    var ReceiptString1 = "";
    var payArray = [];
    var simplesum = 0.00;
    var sum1 = 0.00;
    var simpleReceiptString1 = "";
    for(let key in order){
        var simplesum = 0.00;
        var simpleReceiptString1 = "";
        var simpleOrder = order[key];
        for(let j = 0; j < menu.length; j++){
            var simplemenu = menu[j];
            if(key==simplemenu.barcode){
                payArray = countOrder(key,simpleOrder,simplemenu);
                simplesum = payArray[0];    
                simpleReceiptString1 += `${printOrder(key,simpleOrder,simplemenu)}(元)，小计：${parseFloat(simplesum).toFixed(2)}(元)\n`;
                sum+=simplesum;
                sum1 += payArray[1]
                ReceiptString1 += simpleReceiptString1;
            }
            continue;
        }
    }
     ReceiptString1 += `----------------------\n总计：${parseFloat(sum).toFixed(2)}(元)\n节省：${parseFloat(sum1-sum).toFixed(2)}(元)\n**********************`;
    return ReceiptString1;
}
function countOrder(order,simpleOrder,menu1){
    var payArray = [];
    var OrderPay = 0.00;
    var OrderPay1 = 0.00;
    OrderPay = (offermenus.indexOf(order)!=-1 && simpleOrder >= 3)?OrderPay = (simpleOrder  - parseInt(simpleOrder/3))* menu1.price:OrderPay = simpleOrder * menu1.price;
   OrderPay1 = simpleOrder * menu1.price;
   payArray.push(OrderPay);
   payArray.push(OrderPay1);
    return payArray;
}
function printOrder(order1,simpleOrder,menu1){
    var ReceiptString2 = `名称：${menu1.name}，数量：${simpleOrder}${menu1.unit}，单价：${parseFloat(menu1.price).toFixed(2)}`;
    return ReceiptString2;
}