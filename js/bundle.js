var clicked = false;
var order = {
    foods: [],
    bartendersName: "",
    costumersName: ""
};
$(document).ready(function () {
    $('#listFoodsBtn').click(listFoods);
    document.getElementById('fulfill').addEventListener("click", fullOrder);
});

function listFoods() {
    if (clicked === true) {
        return;
    }

    var table = document.createElement('table');
    table.classList.add('table');
    table.classList.add('table-bordered');
    table.classList.add('table-striped');

    var thead = document.createElement('thead');
    var header = document.createElement('tr');

    var hfood = document.createElement('th');
    var hdrink = document.createElement('th');
    hfood.append('Foods');
    hdrink.append('Drinks');

    var hname = document.createElement('th');
    hname.append("Name");

    var hprice = document.createElement('th');
    hprice.append("Price(HUF)");

    var hingr = document.createElement('th');
    hingr.append("Ingredients");

    header.appendChild(hfood);
    header.appendChild(hname);
    header.appendChild(hprice);
    header.appendChild(hingr);
    thead.appendChild(header);
    table.appendChild(thead);

    var tbody = document.createElement('tbody');

    $.get('costumer/listFoods', function (data) {
        data.forEach(function (elem) {
            var row = document.createElement('tr');

            var name = document.createElement('td');
            name.append(elem.name);

            var price = document.createElement('td');
            price.append(elem.price);

            var ingredients = document.createElement('td');

            for (var i = 0; i < elem.ingredients.length; i++) {
                ingredients.append(elem.ingredients[i]);
                if (i !== elem.ingredients.length - 1) {
                    ingredients.append(", ");
                }
            }

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
            tbody.appendChild(row);
        });
        var drinkrow = document.createElement('tr');
        drinkrow.appendChild(hdrink);
        tbody.appendChild(drinkrow);
    });


    $.get('costumer/listDrinks', function (data) {
        data.forEach(function (elem) {
            var row = document.createElement('tr');

            var name = document.createElement('td');
            name.append(elem.name);

            var price = document.createElement('td');
            price.append(elem.price);

            var ingredients = document.createElement('td');
            for (var i = 0; i < elem.ingredients.length; i++) {
                ingredients.append(elem.ingredients[i]);
                if (i !== elem.ingredients.length - 1) {
                    ingredients.append(", ");
                }
            }

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
            tbody.appendChild(row);
        });

        var submit = document.createElement('input');
        submit.id = "button";
        submit.type = "button";
        submit.value = "Submit";
        var row = document.createElement('tr');
        row.appendChild(submit);
        tbody.appendChild(row);

        document.getElementById('button').addEventListener("click", addForm);
    });

    table.appendChild(tbody);

    $('#MyContent').append(table);

    clicked = true;
}

function sendOrder() {

    var asd = $("form").serializeArray();

    var costumersName = asd[0].value + " " + asd[1].value;
    var address = asd[2].value + " " + asd[3].value + " " + asd[4].value;

    $.ajax({
        type: "POST",
        url: "costumer/add",
        dataType: 'json',
        data: {name: costumersName, billing_address: address},
    });

    $.get('bar/rnd', function (data) {
        order.bartendersName = data.name;
        order.costumersName = costumersName;
        $.ajax({
            type: "POST",
            url: "costumer/orderFood",
            dataType: 'json',
            data: order,
        });
    });
    alert("Your order is successfully registered!");
}

function addForm() {

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

    $('#MyContent').html('<form>\n' +
        '    <strong>Just one more step to finish your order</strong><br>\n' +
        '    <input type="text" name="fname" placeholder="First name"><br>\n' +
        '    <input type="text" name="lname" placeholder="Last name"><br>\n' +
        '    <input type="text" name="city" placeholder="City"><br>\n' +
        '    <input type="text" name="address" placeholder="Address"><br>\n' +
        '    <input type="text" name="house" placeholder="House Number"><br>\n' +
        '    <input type="button" id="order" value="Submit">\n' +
        '</form>');
    document.getElementById('order').addEventListener("click", sendOrder);
}

function fullOrder() {
    var asd = $("form").serializeArray();
    var cname = asd[0].value;
    console.log(asd);
    $.ajax({
        type: "POST",
        url: "bar/fulfillOrder",
        dataType: 'json',
        data: {costumerssName: cname},
    });
}