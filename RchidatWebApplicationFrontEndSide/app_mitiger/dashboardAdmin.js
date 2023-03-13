document.querySelector(".jsFilter").addEventListener("click", function () {
    document.querySelector(".filter-menu").classList.toggle("active");
  });
  
  document.querySelector(".grid").addEventListener("click", function () {
    document.querySelector(".list").classList.remove("active");
    document.querySelector(".grid").classList.add("active");
    document.querySelector(".products-area-wrapper").classList.add("gridView");
    document
      .querySelector(".products-area-wrapper")
      .classList.remove("tableView");
  });
  
  document.querySelector(".list").addEventListener("click", function () {
    document.querySelector(".list").classList.add("active");
    document.querySelector(".grid").classList.remove("active");
    document.querySelector(".products-area-wrapper").classList.remove("gridView");
    document.querySelector(".products-area-wrapper").classList.add("tableView");
  });
  
  var modeSwitch = document.querySelector('.mode-switch');
  modeSwitch.addEventListener('click', function () {                      
    document.documentElement.classList.toggle('light');
    modeSwitch.classList.toggle('active');
  });
  var sidebarListItem = document.querySelectorAll(".sidebar-list-item");
  sidebarListItem.forEach((item)=>{
    item.addEventListener("click",()=>{
        sidebarListItem.forEach((item)=>{
            item.classList.remove("active");
        });
        item.classList.add("active");
    });
  });
//   let products = document.getElementById("products"),
//          users = document.getElementById("users"),
//          orders = document.getElementById("orders"),
//          comments = document.getElementById("comments"),
//          home = document.getElementById("home"),
//         statistics= document.getElementById("statistics"),
let productsContent = document.getElementById("products-content"),
    usersContent = document.getElementById("users-content"),
    ordersContent = document.getElementById("orders-content"),
    commentsContent = document.getElementById("comments-content"),
    statisticsContent= document.getElementById("statistics-content");
productsContent.style="display:block";
usersContent.style="display:none";
statisticsContent.style="display:none";
ordersContent.style="display:none";
commentsContent.style="display:none";
home.onclick=()=>{
    location.replace("index.html");
}
users.onclick=()=>{
    productsContent.style="display:none";
    usersContent.style="display:block";
    statisticsContent.style="display:none";
    ordersContent.style="display:none";
    commentsContent.style="display:none";
}
orders.onclick=()=>{
    productsContent.style="display:none";
    usersContent.style="display:none";
    statisticsContent.style="display:none";
    ordersContent.style="display:block";
    commentsContent.style="display:none";
}
comments.onclick=()=>{
    productsContent.style="display:none";
    usersContent.style="display:none";
    statisticsContent.style="display:none";  
    ordersContent.style="display:none";
    commentsContent.style="display:block";
}
statistics.onclick=()=>{
    productsContent.style="display:none";
    usersContent.style="display:none";
    statisticsContent.style="display:block";
    ordersContent.style="display:none";
    commentsContent.style="display:none";
}
products.onclick=()=>{
    productsContent.style="display:block";
    usersContent.style="display:none";
    statisticsContent.style="display:none";
    ordersContent.style="display:none";
    commentsContent.style="display:none";
}