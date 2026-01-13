$(function() {

    $("#portfolioForm").submit(function(e) {
        e.preventDefault(); // ❗老師的關鍵

        var title = $("#title").val();
        var imgSrc = $("#imgSrc").val();
        var href = $("#href").val();
        var text = $("#text").val();

        $.ajax({
            url: "/portfolio_add",
            type: "POST",
            data: {
                title: title,
                imgSrc: imgSrc,
                href: href,
                text: text
            },
            success: function() {
                $("#addSuccess").html(
                    "<div class='alert alert-success'>作品新增成功</div>"
                );

                $("#portfolioForm").trigger("reset");
            },
            error: function() {
                $("#addSuccess").html(
                    "<div class='alert alert-danger'>新增失敗</div>"
                );
            }
        });
    });

});
