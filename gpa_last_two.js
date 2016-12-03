/*********************
Cauculate GPA in the last two years.
Author: chaonan99
Date: 12/03/2016
**********************/

/* Set parameter here */
scale_4 = false         // Calculate 4.0 scale GPA. Set false to calculate 100 scale GPA.
only_required = false   // Only calculate Required and Restricted Elective courses. Set
                        // false to calculate overall GPA.

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
today = new Date()
current_year = today.getFullYear()
current_month = today.getMonth() + 1

for (i = 9; i < all_div.length - 11; i+=11) {
    if (!isInt(all_div[i+2].getElementsByTagName("div")[0].innerText))
        continue;
    if (only_required && all_div[i+4].getElementsByTagName("div")[0].innerText == "任选")
        continue;
    course_year = all_div[i+6].getElementsByTagName("div")[0].innerText;
    if (current_year - parseInt(course_year.split('-')[0]) > 2)
        continue;
    course_unit = parseInt(all_div[i].getElementsByTagName("div")[0].innerText);
    course_score = parseInt(all_div[i+2].getElementsByTagName("div")[0].innerText);
    if (scale_4) {
        course_score = convert_to_4(course_score);
    }
    sum_credit += course_unit;
    sum_score += course_score * course_unit;
}

sum_score / sum_credit