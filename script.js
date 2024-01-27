
let data;
let MktCap=document.getElementById("MktCap");
let percentage=document.getElementById("percentage")
const searchInput = document.getElementById('Search');


// fetch data using async await 
async function fetchMoviesJSON() {
    const response = await fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false');
    const coingecko = await response.json();
    return coingecko;
  }
  
  fetchMoviesJSON().then(coingecko => {
   // fetched coingecko
    data=coingecko
    showdata(data)
    
  });

  // render data on table

  function showdata(shdta){
    let table = document.createElement("table")
    table.setAttribute("id","table")
    shdta.map(i=>{
        table.innerHTML += `
        <tr id="${i.id}" class="coins">
            <td><img src="${i.image}" alt="${i.name}"></td>
            <td>${i.name}</td>
            <td>${i.symbol}</td>
            <td>$${i.current_price}</td>
            <td>$${i.total_volume}</td>
            <td class="changColer">${i.market_cap_change_percentage_24h.toFixed(2)}</td>
            <td>Mkt Cap : $${i.market_cap}</td>    
        </tr>
        `;
    })
    var body = document.getElementsByTagName("body")[0];
    body.appendChild(table);
    let buttons = document.getElementsByClassName('changColer');

     for(var i=0; i< buttons.length; i++){
      let x=+buttons[i].innerHTML
      if(x<0){
        console.log(buttons[i])
        buttons[i].style.color="red";
      }
     }
  }

// sort by Mkt Cap Price

 MktCap.addEventListener("click", sortByMktCap)
 function sortByMktCap() {
    data.sort(function(a,b){
      return  a.market_cap-b.market_cap
    })
    let table=document.getElementById("table");
    table.remove()
    showdata(data)
  }

// sort by percentage

  percentage.addEventListener("click", sortByPercentage)
  function sortByPercentage(){
    data.sort(function(a,b){
        return  a.market_cap_change_percentage_24h-b.market_cap_change_percentage_24h
      })
      let table=document.getElementById("table");
      table.remove()
      showdata(data)
  }

  // Serch by Name or Symbole

  searchInput.addEventListener('input', function() {
    const searchValue = searchInput.value.toLowerCase();
    let newdata=data.filter(item => item.name.toLowerCase().includes(searchValue) || item.symbol.toLowerCase().includes(searchValue));
    let table=document.getElementById("table");
    table.remove()
    showdata(newdata)
  });