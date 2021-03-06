# Feature highlight
* No need to enter courses one by one. Just copy and paste the script and get your GPA in one-shot!
* Output overall GPA, GPA for Required and Restricted Elective course, GPA in the last two years in one time.
* Simutaneously calculate 4.0 scale GPA based on the method [here](http://www.foreigncredits.com/Resources/GPA-Calculator/).
* Star this repo if you like it!

# 功能导览
* 使用脚本计算GPA，不需要一个个课程输入；
* 一次性输出所有课程GPA，必限GPA，近两年课程的GPA；
* 依据[GPA计算器](http://www.foreigncredits.com/Resources/GPA-Calculator/)的算法，输出4.0分级的GPA供参考。

# Step-by-Step Instruction
* Login in to [info](http://info.tsinghua.edu.cn/).
* Enter "全部成绩"

    ![all score](img/all_credit.png)
* Open "Developer tool". The short-cut for Chrome is <kbd>F12</kbd> (or <kbd>Fn</kbd>+<kbd>F12</kbd>). Then open "Console".

    ![console](img/console.png)

* Paste the code in [gpa_report.js](gpa_report.js) into the console.
    ```
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

    if (!String.prototype.format) {
        String.prototype.format = function() {
            var args = arguments;
            return this.replace(/{(\d+)}/g, function(match, number) {
                return typeof args[number] != 'undefined'
                    ? args[number]
                    : match
                ;
            });
        };
    }

    begin_ind = 9
    if (window.location.href.indexOf("sslvpn") > 0)
        begin_ind = 29
    current_year = new Date().getFullYear()

    var sum_credit = [0,0,0,0]
    var sum_score = [0,0,0,0]
    var sum_score_four = [0,0,0,0]

    for (i = begin_ind; i < all_div.length - 11; i+=11) {
        if (!isInt(all_div[i+2].getElementsByTagName("div")[0].innerText))
            continue;
        course_unit = parseInt(all_div[i].getElementsByTagName("div")[0].innerText);
        course_score = parseInt(all_div[i+2].getElementsByTagName("div")[0].innerText);
        course_year = all_div[i+6].getElementsByTagName("div")[0].innerText;
        // Overall GPA for all years
        sum_credit[0] += course_unit;
        sum_score[0] += course_score * course_unit;
        sum_score_four[0] += convert_to_4(course_score) * course_unit;
        if (current_year - parseInt(course_year.split('-')[0]) <= 2) {
            sum_credit[2] += course_unit;
            sum_score[2] += course_score * course_unit;
            sum_score_four[2] += convert_to_4(course_score) * course_unit;
        }
        // Overall GPA for Required and Restricted Elective
        if (all_div[i+4].getElementsByTagName("div")[0].innerText != "任选") {
            sum_credit[1] += course_unit;
            sum_score[1] += course_score * course_unit;
            sum_score_four[1] += convert_to_4(course_score) * course_unit;
            if (current_year - parseInt(course_year.split('-')[0]) <= 2) {
                sum_credit[3] += course_unit;
                sum_score[3] += course_score * course_unit;
                sum_score_four[3] += convert_to_4(course_score) * course_unit;
            }
        }
    }

    alert("你的GPA\n"
    + "所有课程 GPA: {0}/100, {1}/4.0\n".format(
        (sum_score[0]/sum_credit[0]).toFixed(2), (sum_score_four[0]/sum_credit[0]).toFixed(1))
    + "必修限选 GPA: {0}/100, {1}/4.0\n".format(
        (sum_score[1]/sum_credit[1]).toFixed(2), (sum_score_four[1]/sum_credit[1]).toFixed(1))
    + "近两年所有课程 GPA: {0}/100, {1}/4.0\n".format(
        (sum_score[2]/sum_credit[2]).toFixed(2), (sum_score_four[2]/sum_credit[2]).toFixed(1))
    + "近两年必修限选 GPA: {0}/100, {1}/4.0\n".format(
        (sum_score[3]/sum_credit[3]).toFixed(2), (sum_score_four[3]/sum_credit[3]).toFixed(1)))

    ```
* Then you will get your GPA!

    ![result](img/result.png)

# Warning
* The method used to calculate 4.0 scale GPA may vary between schools. The method used in this script is just for reference.

# License
* [MIT](LICENSE)