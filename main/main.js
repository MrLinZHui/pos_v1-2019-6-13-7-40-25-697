'use strict';

//TODO: 请在该文件中实现练习要求并删除此注释
var menu = loadAllItems();
var offermenu = loadPromotions();
var offermenus = offermenu[0].barcodes;
//console.log(offermenu[0].barcodes);
//console.log(menu[0].price);
function printReceipt(tags) {
    var ReceiptString = "";
    var order1 = countSameElements(tags);
    //console.log("order1:"+order1[1].count);
    if(order1){
        ReceiptString += countAndprintOrder (order1);
    }else{
        ReceiptString = "[ERROR]:";
    }  
   // console.log(Itemstr);
   console.log(ReceiptString);
    return ReceiptString;

}
function countSameElements(inputs) {
  var obj={};
  for(var i= 0, l = inputs.length; i< l; i++){ 
    var item = inputs[i]; 
    var num = 0;
    var pat = /[\d]+[.][\d]+/;
    if(item.length>10){
      num= parseFloat(item.match(pat));
      if(isNaN(num)){
        num= parseInt((item.substring(10)).replace(/[^0-9]/ig,""));
      }
      console.log(num);
      item = item.substring(0,10);
      obj[item] = obj[item] ? obj[item] +num : num
    } else{
      obj[item] = (obj[item] +1 ) || 1; 
    }
} 
 return obj;
}
//makeReceipts(order);
  
function countAndprintOrder(order){
    var sum = 0.00;
    var ReceiptString1 = "";
    var simplesum = 0.00;
    var simpleReceiptString1 = "";
    for(let key in order){
        var simplesum = 0.00;
        var simpleReceiptString1 = "";
        var simpleOrder = order[key];
        for(let j = 0; j < menu.length; j++){
            var simplemenu = menu[j];
            if(key==simplemenu.barcode){
                simplesum = countOrder(key,simpleOrder,simplemenu);
                simpleReceiptString1 += printOrder(key,simpleOrder,simplemenu)+".00(元)，小计："+simplesum+".00(元)\n";
                sum+=simplesum;
                ReceiptString1 += simpleReceiptString1;
                //sum +=countOrder(simpleOrder,simplemenu);
                //ReceiptString1 += printOrder(simpleOrder,simplemenu);
            }
            continue;
        }
    }
     ReceiptString1 += "----------------------\n";
     ReceiptString1 += "总计：" + sum+".00(元)\n";
     ReceiptString1 += "**********************";
    
    // console.log("sum:"+sum);
    return ReceiptString1;
}
function countOrder(order,simpleOrder,menu1){
    var OrderPay = 0.00;
    if(offermenus.indexOf(order)!=-1 && simpleOrder > 3){
        OrderPay = (simpleOrder  - simpleOrder/3)* menu1.price;
    }else{
        OrderPay = simpleOrder * menu1.price;
    }
    return OrderPay;
}
//var ordert = [{key: "0001", count: 1},{key: "0003", count: 2},{key: "0005", count: 1}];
function printOrder(order1,simpleOrder,menu1){
    var ReceiptString2 = "";
    ReceiptString2 ="名称：" + menu1.name+"，数量：" + simpleOrder +menu1.unit + "，单价：" + menu1.price;
    return ReceiptString2;
}
function offerOrderByPay(order,menu1){
    var OrderPay = 0.00;
   
    return OrderPay;
}