var orderID = 0
var price = 0 ;
var qty = 0 ;
var completeOrder = 0;
var leftOrder = 0;
var sumOrder = 0;

function createOrderID(){
    if (orderID == 0){
        let number = 1
        let order =  number.toString().padStart(5, '0') ;
        orderID +=2
        return order
    } else{
        let order = orderID.toString().padStart(5, '0') ;
        orderID +=1
        return order
    }
    
}
function checkedItem(id) {
    var dataPrice = parseInt(id.getAttribute('data-price'))
    var parentElement = id.parentNode;
    
       if (id.checked) {
           console.log('checked');
           parentElement.setAttribute('style','background-color: #BAB6B6')
           price += dataPrice
           qty += 1
       } else{
           price -= dataPrice
           qty -= 1
           console.log('un checked');
           parentElement.setAttribute('style','')
       }

       document.getElementById('QTY').innerText = qty
       document.getElementById('price').innerText = price
}



function noteCreate(txtOrderId) {
    // สร้าง note
    const noteCreate = document.createElement('div');
    const h1 = document.createElement('h1');
    const h2 = document.createElement('h2');
    const h3 = document.createElement('h3');
    const ul_list = document.createElement('ul');
    const btn_end = document.createElement('button');
   noteCreate.setAttribute('class','note')
   h1.setAttribute('style','text-align: center;')
   btn_end.setAttribute('onclick','endJob(this)')
   btn_end.setAttribute('style','font-size: 24px;padding: 5px;width: 130px;margin-top: 30px;margin-left: 60px;color: #c70300;')
   h1.textContent = txtOrderId
   h3.textContent = "ยอดสุทธิ "+price+" บาท"
   h2.textContent = 'จ่ายแล้ว'
   btn_end.textContent = 'ส่งออเดอร์'


   document.getElementById('bord').appendChild(noteCreate)
   noteCreate.appendChild(h1)
   noteCreate.appendChild(h3)
   noteCreate.appendChild(h2)
   noteCreate.appendChild(ul_list)
   noteCreate.appendChild(btn_end)

   var checkboxes = document.querySelectorAll('.menu');
   checkboxes.forEach(function(checkbox) {
      if(checkbox.checked){


        // เพิ่มลิสต์ note
        const newItemNote = document.createElement('li');
        newItemNote.textContent = checkbox.value
       ul_list.appendChild(newItemNote)

      }
    });
}


function Sendorder(){
    const txtOrderId = "#"+createOrderID()
    const orderSummary = document.getElementById('order-summary')
    const newDivID = document.createElement('div')
    document.getElementById('qty-summary').innerText = qty
      document.getElementById('price-summary').innerText = price
newDivID.setAttribute('id','order-list')
orderSummary.appendChild(newDivID)
noteCreate(txtOrderId)

    const h1 = document.createElement('h1');
    const h2 = document.createElement('h2');
    const h3 = document.createElement('h3');
   h1.textContent = txtOrderId


   var checkboxes = document.querySelectorAll('.menu');
   checkboxes.forEach(function(checkbox) {
      if(checkbox.checked){


       // เพิ่มลิสต์ orderlist
       const newDiv = document.createElement('div');
       const txtPrice = document.createElement('p')
       const txtname = document.createElement('p')
       const price = checkbox.getAttribute('data-price')
       
       newDiv.setAttribute('class','group-txt')
        txtPrice.textContent = price+'฿'
       txtname.textContent = checkbox.value

       
       newDivID.appendChild(newDiv)
        newDiv.appendChild(txtname)
       newDiv.appendChild(txtPrice)

       // เคลียร์ค่า
       checkbox.checked = false;
      }

      
      checkedItem(checkbox)
      qty = 0
      price = 0
      document.getElementById('QTY').innerText = qty
        document.getElementById('price').innerText = price
   });

   // เปิด model

   const model = document.getElementById('model')
   document.getElementById('orderID').innerText = txtOrderId
   model.setAttribute('style','')

   leftOrder += 1;
    sumOrder += 1;
    document.getElementById('left-order').innerText = leftOrder
    document.getElementById('sum-order').innerText = sumOrder



}


function endJob(i) {
    i.parentNode.remove()
console.log(i.parentNode)
completeOrder += 1;
leftOrder -= 1;

document.getElementById('left-order').innerText = leftOrder
document.getElementById('complete-order').innerText = completeOrder

}

function closeModel() {
    const model = document.getElementById('model')
    model.setAttribute('style','display: none;')
    document.getElementById('order-list').remove()
}