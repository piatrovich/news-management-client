 var pause_time = 2000;

 $(document).ready(function(){
    var startBtn = $(document).find(".btn-success");
    $(startBtn).click(function(event){
        disableOptions();
        deleteMessage();
        if(checkOptions() == true) {
            $(this).attr("class", "btn btn-warning");
            var start = parseInt($(document).find("#start-page").val());
            var total = parseInt($(document).find("#pages-plan").val());
            var startTime = new Date();
            for (var k = start; k < start + total; ++k) {
                var items = getPage(k);
                //alert(JSON.stringify(items));
                if (items["response"]["status"] == "ok") {
                    var newsList = items["response"]["results"];
                    if (newsList.length != 0) {
                        increasePageCounter();
                    }
                    for (var i = 0; i < newsList.length; ++i) {
                        //alert(newsList[i]["fields"]["commentable"]);
                        if (newsList[i]["fields"]["commentable"] == "true") {
                            increaseNewsCounter();
                        } else {
                            increaseWithoutCommentsCounter();
                            //pause(pause_time);
                        }
                        /*var news = new Object();
                         news.title = newsList[i]["webTitle"];
                         news.creationDate = newsList[i]["webPublicationDate"];
                         alert(JSON.stringify(news));*/
                    }
                } else {
                    alert(JSON.stringify(items));
                    if(confirm("Would you liki to stop parser?")){
                        k = total + 1;
                    }
                }
            }
            $(this).attr("class", "btn btn-success");
                var finishTime = new Date();
                finishTime -= startTime;
                printMessage("Finished. Time: " + finishTime/1000 + " s.");
        }
        enableOptions();
    });
});

function checkOptions(){
    if($(document).find("#pages-plan").val() < 1){
        printMessage("Enter pages plan");
        return false;
    } else if ($(document).find("#start-page").val() < 1){
        printMessage("Enter start page");
        return false;
    } else if ($(document).find("#request-delay").val() < 1) {
        printMessage("Enter request delay");
        return false;
    } else if ($(document).find("#parse-delay").val() < 1){
        printMessage("Enter parse delay")
    } else {
        return true;
    }
}

function printMessage(message){
    $(document).find("#console").text(message);
}

function deleteMessage(){
    $(document).find("#console").text('');
}

function disableOptions(){
    var options = ["start-page", "pages-plan", "request-delay", "parse-delay"];
    $.each(options, function(i, value){
        $(document).find("#" + value).attr("disabled", "disabled");
    });
}

function enableOptions(){
    var options = ["start-page", "pages-plan", "request-delay", "parse-delay"];
    $.each(options, function(i, value){
        $(document).find("#" + value).removeAttr("disabled");
    });
}

function getPage(k){
    var response = "";
    $.ajax({
        type: "GET",
        url: "http://beta.content.guardianapis.com/search?api-key=hhw24za77apr5ncsywzf2s8c&page-size=100&order-by=oldest&show-tags=keyword&show-fields=all&page=" + k,
        async: false,
        success: function(data){
            response = data;
        },
        dataType: "json"
    });
    return response;
}

function increaseAddedNews(){
    var val = $(document).find("#added-news").val();
    $(document).find("#added-news").val(++val).trigger('change');
}


function increaseWithoutCommentsCounter(){
    var val = $(document).find("#without-comments-counter").text();
    $(document).find("#without-comments-counter").text(parseInt(val) + 1);
 }

 function increaseNewsCounter(){
     var val = $(document).find("#news-counter").text();
     $(document).find("#news-counter").text(parseInt(val) + 1);
 }

 function increasePageCounter(){
     var val = $(document).find("#page-counter").text();
     $(document).find("#page-counter").text(parseInt(val) + 1);
 }

