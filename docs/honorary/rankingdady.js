function rank(){
    var donations = JSON.parse(data)
    donations.sort(function(a,b){
        return a.amount < b.amount;
    });

    addDonations(donations)
    addTotal(donations)
}

function addDonations(donations){
  var rankings = document.getElementById("rankings");
  var tbody = document.createElement("tbody");

  for (let e of donations.entries()){
    var tr = document.createElement("tr");

    createRow(tr, e)
    tbody.appendChild(tr);
    rankings.appendChild(tbody);
  }
}

function addTotal(donations){
  var total = document.getElementById("total");
  total.appendChild(document.createTextNode("total raised thru dady.io $" + 
    donations.map(_ => _.amount).reduce((a,b) => a + b, 0)))
}

function createRow(tr, e){
    textInTable(tr, e[0] + 1)
    textInTable(tr, e[1].name)
    textInTable(tr, e[1].amount)
    textInTable(tr, e[1].causeName, e[1].causeLink)
}

function textInTable(tr, text, causeLink){
    var td = document.createElement("td");
    if(causeLink){
        var a = document.createElement('a');
        var linkText = document.createTextNode(text);
        a.appendChild(linkText);
        a.title = text;
        a.href = causeLink;

        td.appendChild(a)
    } else{
        td.appendChild(document.createTextNode(text));
    }

    tr.appendChild(td);
}