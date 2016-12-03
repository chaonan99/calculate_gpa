/*********************
Cauculate GPA for Required and Restricted Elective
Author: chaonan99
Date: 12/03/2016
**********************/
var all_div = document.getElementsByTagName("div");
function isInt(x) {
    var y = parseInt(x, 10);
    return !isNaN(y) && x == y && x.toString() == y.toString();
}

sum_credit = 0
sum_score = 0

for (i = 17; i < all_div.length; i+=8) {
    if (!isInt(all_div[i+2].innerText) || all_div[i+3].innerText == "任选") {
        continue;
    }
    sum_credit += parseInt(all_div[i].innerText);
    sum_score += parseInt(all_div[i].innerText)*parseInt(all_div[i+2].innerText);
}

sum_score / sum_credit