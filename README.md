# Calculate GPA for Tsinghua
* These set of scripts can be used to calculate GPA.
* Star this repo if you like it~

# Step-by-Step Instruction
* Login in to [info](http://info.tsinghua.edu.cn/).
* Enter "全部成绩"

    ![all score](img/all_credit.png)
* Open "Developer tool". The short-cut for Chrome is <kbd>F12</kbd> (or <kbd>Fn</kbd>+<kbd>F12</kbd>). Then open "Console".

    ![console](img/console.png)

* Paste the code in gpa_*.js into the console, for example, the code below calculate overall GPA.
    ```
    var all_div = document.getElementsByTagName("div");
    function isInt(x) {
        var y = parseInt(x, 10);
        return !isNaN(y) && x == y && x.toString() == y.toString();
    }

    sum_credit = 0
    sum_score = 0

    for (i = 17; i < all_div.length; i+=8) {
        if (!isInt(all_div[i+2].innerText)) {
            continue;
        }
        sum_credit += parseInt(all_div[i].innerText);
        sum_score += parseInt(all_div[i].innerText)*parseInt(all_div[i+2].innerText);
    }

    sum_score / sum_credit
    ```
* Then you will get your GPA!

# Warning
* Currently only work when there is no item in "Substitute course (替代课程)" and "Mark of special course (特殊课程标志)".

# Functions
* **[gpa_overall.js](gpa_overall.js)** Calcualte overall GPA
* **[gpa_required.js](gpa_required.js)** Calcualte GPA for Required (必修) and Restricted Elective (限选).

# TODOs
* Convert 100 scale GPA to US 4.0 scale. Refer to [this](http://www.foreigncredits.com/Resources/GPA-Calculator/)
* Calculate GPA for the last two years.
* Handle "Substitute course (替代课程)" and "Mark of special course (特殊课程标志)".