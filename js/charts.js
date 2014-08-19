$(document).ready(function () {
    var items = $(document).find(".chart");
    $.each(items, function (inc, item) {
        var canvas = document.getElementById(item.getAttribute("id"));
        var context = canvas.getContext('2d');
        var centerX = canvas.width / 2;
        var centerY = canvas.height / 2;
        var radius = 40;
        context.beginPath();
        context.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
        context.fillStyle = '#f5f5f5';
        context.fill();
        context.lineWidth = 15;
        context.strokeStyle = '#f1f1f1';
        context.stroke();
    });
});
function drawAddedNewsCanvas(canvasId, optionId) {
    var canvas = document.getElementById(canvasId);
    var context = canvas.getContext('2d');
    var centerX = canvas.width / 2;
    var centerY = canvas.height / 2;
    var radius = 40;
    context.beginPath();
    var multiplier = $(document).find(optionId).val() / $(document).find("#pages-plan").val() * 100;
    context.arc(centerX, centerY, radius, 0, 2 * Math.PI * multiplier, false);
    context.fillStyle = '#f5f5f5';
    context.fill();
    context.lineWidth = 15;
    context.strokeStyle = '#32a0ee';
    context.stroke();
}

$(document).ready(function () {
    $(document).find("#added-news").change(function () {
        drawAddedNewsCanvas("canvas-chart-1", "#added-news");
    });
});