/*********************
Cauculate overall GPA, 4.0 scale
Author: chaonan99
Date: 12/03/2016
**********************/
var all_div = document.getElementsByTagName("td");
function isInt(x) {
    var y = parseInt(x, 10);
    return !isNaN(y) && x == y && x.toString() == y.toString();
}

function convert_to_4(x) {
    if (x >= 85)
        return 4.0
    else if (x >= 75)
        return 3.0
    else if (x >= 60)
        return 2.0
    else
        return 0.0
}

sum_credit = 0
sum_score = 0

for (i = 9; i < all_div.length - 11; i+=11) {
    if (!isInt(all_div[i+2].getElementsByTagName("div")[0].innerText)) {
        continue;
    }
    sum_credit += parseInt(all_div[i].getElementsByTagName("div")[0].innerText);
    sum_score += parseInt(all_div[i].getElementsByTagName("div")[0].innerText)
        *parseInt(convert_to_4(all_div[i+2].getElementsByTagName("div")[0].innerText));
}

sum_score / sum_credit