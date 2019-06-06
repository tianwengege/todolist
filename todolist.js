window.addEventListener('load',function () {
    let tab = document.querySelectorAll('.tab>li');
    let prev = 0;
    let content=document.querySelector('.content');
    let type="all";
    let todolist=[
        {
            id: 1, content: '端午节要交作业', ctime:'2019/6/4', status: false
        },
        {
            id: 2, content: '端午节要交作业', ctime:'2019/6/4', status: false
        },
        {
            id: 3, content: '企业网站', ctime:'2019/5/31', status: true
        },
        {
            id: 4, content: '端午节要交作业', ctime:'2019/6/4', status: false
        }
    ];

    let str=localStorage.getItem('todolist');
    if (!str){
        saveData();
        str=localStorage.getItem('todolist');
    }
    todolist=JSON.parse(str);


    tab.forEach(function (ele,index) {
        ele.onclick = function () {
            tab[prev].classList.remove('hot');
            this.classList.add('hot');
            prev = index;
            type=this.getAttribute('type');
            console.log(type);
            render(filterData(type));
        }
    });
    tab[0].onclick();



    content.onclick=function (e) {
        let target=e.target;
        let id=target.parentNode.id;
        if (target.nodeName=='DEL') {
            let index=todolist.findIndex(ele=>ele.id==id);
            todolist.splice(index,1);
        }else if (target.nodeName=='INPUT'){
            let ele=todolist.filter(ele=>ele.id==id)[0];
            ele.status=target.checked;
        }
        render(filterData(type));
        saveData();
    };

    function filterData(type){
            let arr=[];
            switch (type) {
                case 'all':
                    arr=todolist;
                    break;
                case 'done':
                    arr=todolist.filter(function (ele) {return ele.status});
                    break;
                case 'doing':
                    arr=todolist.filter(function (ele) {return !ele.status});
                    break;
            }
        return arr;
    }

    ////////////////////////////////////////////////////////////////////////////////////////
    let forms=document.forms[0];
    let textBtn=forms.elements['content'];
    let submitBtn=forms.elements[1];

    submitBtn.onclick=function (e) {
        e.preventDefault();
        let obj=createObj();
        todolist.push(obj);
        forms.reset();
        render(filterData(type));
        saveData();
    };

    function createObj() {
        let id=todolist[todolist.length-1].id+1;
        let content=textBtn.value;
        let ctime=new Date().toLocaleDateString();
        let status=false;
        return{id,content,ctime,status}
    }
    ////////////////////////////////////////////////////////////////////////////////////////
    //本地存储
    function saveData(){
        localStorage.setItem('todolist',JSON.stringify(todolist))
    }
    ////////////////////////////////////////////////////////////////////////////////////////
    //渲染函数
    function render(arr) {
        let html = '';
        arr.forEach(function (ele, index) {
            if (ele.status) {
                html +=
                    `
                     <li id="${ele.id}">
                     <input type="checkbox" checked> <p>${ele.content}</p><del>❌</del> <time>${ele.ctime}</time>
                     </li>
                    `;
            } else {
                html +=
                    ` 
                     <li id="${ele.id}">
                     <input type="checkbox"> <p>${ele.content}</p><del>❌</del> <time>${ele.ctime}</time>
                     </li>
                    `;
            }
        });
        content.innerHTML = html;
    }
    //渲染函数完




});