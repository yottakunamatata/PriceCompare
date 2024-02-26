// 6. 蔬菜比價網：串接 API 顯示資料
// 7. 蔬菜比價網：可以篩選『蔬菜』、『水果』、『花卉』三個類別
// 8. 蔬菜比價網：可以搜尋作物名稱，並顯示當前搜尋的字詞和結果
// 9. 蔬菜比價網：可以排序篩選、點擊表頭中的上下 icon 可以跟著排序（參考設計稿第五頁）

const showlist = document.querySelector('.showList')
const btnGroup =document.querySelector('.button-group')
const search = document.querySelector('.search')
const input = document.querySelector('.rounded-end')
const sortSelect = document.querySelector('.sort-select')
const sortAdvance = document.querySelector('.js-sort-advanced')
const sortArrows = document.querySelectorAll('.inline-flex i')
const dataHeader =document.querySelector('.dataHeader')


const url = 'https://hexschool.github.io/js-filter-data/data.json'
let dataSet = []
let filterData =[]
let dataCount = 0
dataType = '全部'

axios.get(url).then(function(response){
    dataSet = response.data
    // 去除空值
    dataSet.forEach(function(item,index){
        if(item.作物名稱 == null || item.作物名稱=='' || item.種類代碼 == null|| item.種類代碼==''){
            dataSet.splice(index,1)
        }
    })
    renderList(dataSet)
    dataCount =dataSet.length
    renderHeader(dataType,dataCount)
})

// 顯示資料
function renderList(data){
    let strList = ""
    data.forEach(function(item,index){
        strList += `
        <tr>
            <td>${item.作物名稱}</td>
            <td>${item.市場名稱}</td>
            <td>${item.上價}</td>
            <td>${item.中價}</td>
            <td>${item.下價}</td>
            <td>${item.平均價}</td>
            <td>${item.交易量}</td>
          </tr>
        `
    })
    showlist.innerHTML = strList
}

// 顯示資料敘述
function renderHeader(dataType,dataCount){
    headerStr = `<span>【${dataType}】共有${dataCount}筆資料</span>`
    dataHeader.innerHTML = headerStr
}

// 篩選類別
btnGroup.addEventListener("click",function(e){
    if(e.target.getAttribute('data-type') =="N04"){
        filterData = dataSet.filter((item) => item.種類代碼 =="N04")
        renderList(filterData)
        dataCount = filterData.length
        dataType = '蔬果'
        renderHeader(dataType,dataCount)

    }
    if(e.target.getAttribute('data-type') =="N05"){
        filterData = dataSet.filter((item) => item.種類代碼 =="N05")
        renderList(filterData)
        dataCount = filterData.length
        dataType = '水果'
        renderHeader(dataType,dataCount)
    }
    if(e.target.getAttribute('data-type') =="N06"){
        filterData = dataSet.filter((item) => item.種類代碼 =="N06")
        renderList(filterData)
        dataCount = filterData.length
        dataType = '花卉'
        renderHeader(dataType,dataCount)
    }
    if(e.target.getAttribute('data-type') =="all"){
        renderList(dataSet)
        dataCount = dataSet.length
        dataType = '全部'
        renderHeader(dataType,dataCount)
    }
})

// 搜尋作物
search.addEventListener("click",function(e){
    // .trim(): 去除多餘空白值
    let searchTxt = input.value.trim()
    if (input.value ==""){
        return alert('請輸入作物名稱')
    }else{
        filterData = dataSet.filter(function(item){
        if(item.作物名稱 != null){
            return item.作物名稱.includes(searchTxt) == true
        }
    })
    renderList(filterData)
    input.value =''
    }
})

// 排序篩選
sortSelect.addEventListener("change",function(e){
    if(e.target.value != '排序篩選'){
    let sortTxt = e.target.value.replace("依","").replace('排序',"").trim()
    let filterData = dataSet.sort(function(a,b){
        return  b[sortTxt] - a[sortTxt]
    })
    renderList(filterData)
    }
    
})

// 升冪降冪排序
sortAdvance.addEventListener("click",function(e){
    let dataPrice = e.target.getAttribute('data-price')
    let dataSort = e.target.getAttribute('data-sort')
    if(dataSort =='down'){
        if(filterData.length == 0){
            filterData = dataSet.sort(function(a,b){
            return a[dataPrice] - b[dataPrice]
        })
        renderList(filterData)
        }else{
            filterData = filterData.sort(function(a,b){
            return a[dataPrice] - b[dataPrice]
        })
        renderList(filterData)
        }
        
    }
    if(dataSort =='up'){
        if(filterData.length == 0){
            filterData = dataSet.sort(function(a,b){
            return b[dataPrice] - a[dataPrice]
        })
        renderList(filterData)
        }else{
            filterData = filterData.sort(function(a,b){
            return b[dataPrice] - a[dataPrice]
        })
        renderList(filterData)
        }
        
    }else{
        return
    }
})