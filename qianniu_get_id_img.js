// ==UserScript==
// @name         千牛获得商品id和img
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://myseller.taobao.com/home.htm/SellManage/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=taobao.com
// @grant        none
// ==/UserScript==
(function() {
    'use strict';
    var openSheet =true;
    var first =true;

    function createDivFloat(){
        //浮层div
        let div =document.createElement('div');
        div.style.position ='fixed';
        div.style.left = '50%';
        div.style.top ='50%';
        div.style.transform ='translate(-50%,-50%)';
        div.style.padding ='40px';
        div.style.background ='#fff';
        div.style.borderRadius ='8px';
        div.style.boxShadow = '0 0 10px rgba(0,0,0,0.3)';
        div.style.transition ='opacity 0.3s ease-in-out';
        div.style.opacity ='0';
        div.style.zIndex = '9999';
        //添加动画效果
        setTimeout(( ) => {
            div.style.opacity ='1';
        },50) ;
        //div.style.display = 'none';
        return div;
    }

    function createTable(ids, imgs){
        const table = document.createElement("table");
        table.style.borderCollapse = "collapse";

        const header =document.createElement("tr");
        const headerId =document.createElement("th");
        const headerUrl =document.createElement("th");
        headerId.textContent ="itemId";
        headerUrl.textContent ="imgUrl";
        header.appendChild(headerId);
        header.appendChild(headerUrl);
        table.appendChild(header);
        for (let i =0;i < ids.length;i++) {
            const row =document.createElement("tr");
            const cellId =document.createElement("td");
            const cellUrl =document.createElement("td");
            cellId.textContent =ids[i];
            cellUrl.textContent =imgs[i];
            row.appendChild(cellId);
            row.appendChild(cellUrl);
            table.appendChild(row);
        }
        return table;
    }

    function getDataAndShowTable(){
        //表格内容重绘
        const listItems =document. querySelectorAll('.sell-manage-component-desc .product-desc .product-desc-span:nth-child(2)');
        const ids =[];
        for (let i =0;i < listItems. length;i++) {
            var itemId =listItems[i]. textContent;
            ids. push(itemId.slice(3));
        }

        const listImgs =document.querySelectorAll('.sell-manage-component-desc  .product-desc-extend-image');
        const imgs =[];
        for ( let j =0;j < listImgs.length;j++) {
            imgs.push("https:"+listImgs[j].getAttribute('src'));
        }
        const table = createTable(ids, imgs);
        //清空div内容，然后将新的表格添加
        while (div.firstChild){
            div.removeChild(div.firstChild);
        }
        div.appendChild(table);
        if(first){
            document.body.appendChild(div);
            first =false;
            console.log('createSheet');
        }

        if(openSheet){
            div.style.display ='block';
            console.log('openSheet');
            openSheet =false;
        } else {
            div.style.display ='none';
            console.log('closeSheet');
            openSheet =true;
        }
    }

    function addButton(){
        // 创建一个按钮元素
        const btn =document.createElement('button');
        //设置按钮元素的属性和样式
        btn.textContent ='显示表格';
        btn.style.position ='fixed';
        btn.style.top ='100px';
        btn.style.right ='100px';
        btn.style.zIndex = '9999';
        btn.style.border ='none';
        btn.style.outline ='none';
        btn.style.backgroundColor ='#4CAF50';
        btn.style.color ='white';
        btn.style.padding ='12px 24px';
        btn.style.cursor ='pointer';
        btn.style.fontFamily ='Arial, sans-serif';
        btn.style.fontSize = '16px';
        //btn.onclick =getDataAndShowTable;
        btn.addEventListener('click', function(){
            if(openSheet){
                btn.textContent ='隐藏表格';
                btn.style.backgroundColor = '#A28430';
            }else {
                btn.textContent ='显示表格';
                btn.style.backgroundColor ='#4CAF50';
            }
            getDataAndShowTable();
        });

        //将按钮元素添加到页面中
        document.body.appendChild(btn);
    }

    var div = createDivFloat();
    addButton();
    })();