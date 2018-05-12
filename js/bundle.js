$(document).ready(function () {
    //alert('hello world');
    $('#listCarsBtn').click(listCars);
});

function listCars() {
    $.get('costumer/listFoods', function (data) {
        var table = document.createElement('table');
        table.classList.add('table');

        var header = document.createElement('tr');

        var hname = document.createElement('th');
        hname.append("Name");

        var hprice = document.createElement('th');
        hprice.append("Price(HUF)");

        var hingr = document.createElement('th');
        hingr.append("Ingredients");

        header.appendChild(hname);
        header.appendChild(hprice);
        header.appendChild(hingr);
        table.appendChild(header);

        data.forEach(function (elem) {
            var row = document.createElement('tr');

            var name = document.createElement('td');
            name.append(elem.name);

            var price = document.createElement('td');
            price.append(elem.price);

            var ingredients = document.createElement('td');
            elem.ingredients.forEach(function (item) {
                ingredients.append(item + ", ");
            });

            var cb = document.createElement('td');
            var element = document.createElement('input');
            element.type = "checkbox";
            element.className = "box";
            element.name = elem.name;
            element.value = elem.price;
            cb.append(element);

            row.appendChild(cb);
            row.appendChild(name);
            row.appendChild(price);
            row.appendChild(ingredients);
            table.appendChild(row);
        });

        var submit = document.createElement('input');
        submit.id = "button";
        submit.type = "button";
        submit.value = "Elküldés";
        var row = document.createElement('tr');
        row.appendChild(submit);
        table.appendChild(row);

        $('#content').append(table);
        document.getElementById('button').addEventListener("click", sendOrder);
    });
}

function sendOrder() {
    alert('start');
    var orders = function () {
        var order = {
            foods: [],
            bartendersName: "Valaki Bartender",
            costumersName: "Valaki Costumer"
        };
        var j = 0;
        var elements = document.getElementsByClassName('box');
        for (var i = 0; i < elements.length; i++) {
            if (elements[i].checked) {
                console.log('log: ' + elements[i].name + "  " + elements[i].value);
                order.foods[j] = {name: elements[i].name.toString(), price: Number(elements[i].value)};
                j++;
            }
        }
        console.log(order);
        return order;
    };
    $.ajax({
        type: "POST",
        url: "costumer/orderFood",
        dataType: 'json',
        data: orders(),
    })
}