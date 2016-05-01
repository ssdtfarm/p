define(function(require, exports, module) {

    var jquery = require('../jquery/jquery/1.9.1/jquery');

    $(function() {
        $("#J_rankingListBtn").on("click", function() {
            var url = "/default/fakeorderlist";
            $.ajax({
                "url": url,
                "dataType": "jsonp",
                "jsonp": "callback",
                success: function(res) {
                    if (res.status == "succ") {
                        rankingListDialog(res.data);
                    }
                },
                error: function() {
                    alert("网络忙");    
                    console.log("Sdfsdf");
                }
            });
        })
    }); 

    function rankingListDialog(dataSource) {
        var txt = "<a href=\"javascript:void(0);\" id=\"J_rDialogxBtn\" class=\"ranking-list-close\">&#215;</a><p class=\"title\">排名PK奖</p><p id=\"test\"></p><div class=\"ranking-list-container\"><table class=\"ranking-list-table\"align=\"center\"border=\"0\"cellpadding=\"0\"cellspacing=\"0\"><thead><tr><th>排名</th><th>ID</th><th>实付金额</th></tr></thead><tbody id=\"J_rankingList1\"></tbody></table><table class=\"ranking-list-table\"align=\"center\"border=\"0\"cellpadding=\"0\"cellspacing=\"0\"><thead><tr><th>排名</th><th>ID</th><th>实付金额</th></tr></thead><tbody id=\"J_rankingList2\"></tbody></table><table class=\"ranking-list-table\"align=\"center\"border=\"0\"cellpadding=\"0\"cellspacing=\"0\"><thead><tr><th>排名</th><th>ID</th><th>实付金额</th></tr></thead><tbody id=\"J_rankingList3\"></tbody></table><table class=\"ranking-list-table\"align=\"center\"border=\"0\"cellpadding=\"0\"cellspacing=\"0\"><thead><tr><th>排名</th><th>ID</th><th>实付金额</th></tr></thead><tbody id=\"J_rankingList4\"></tbody></table><table class=\"ranking-list-table\"align=\"center\"border=\"0\"cellpadding=\"0\"cellspacing=\"0\"><thead><tr><th>排名</th><th>ID</th><th>实付金额</th></tr></thead><tbody id=\"J_rankingList5\"></tbody></table></div>";
        $("#J_rankingList").html(txt);
        appendRankingList(dataSource, "J_rankingList1", 1, 40);
        appendRankingList(dataSource, "J_rankingList2", 41, 80);
        appendRankingList(dataSource, "J_rankingList3", 81, 120);
        appendRankingList(dataSource, "J_rankingList4", 121, 160);
        appendRankingList(dataSource, "J_rankingList5", 161, 200);
        $("#J_rankingMark").show();
        $("#J_rankingMark").height($(window).height());
        $(window).resize(function() {
            $("#J_rankingMark").height($(window).height());
        });
        $("#J_rankingList").show();
        $("#J_rDialogxBtn").on("click", function() {
            $("#J_rankingMark").hide();
            $("#J_rankingList").hide().html("");
        });
    }

    function appendRankingList(dataSource, id, startNum, endNum) {
        var appendData = dataSource;
        for (var i = (startNum - 1); i < endNum; i++) {
            var idNum = appendData[i].idNum,
                idNameO = appendData[i].idName,
                paySum = appendData[i].paySum;
            var idName;
            if (idNameO.length <= 4) {
                idName = idNameO.replace(idNameO.substr(1, 2), '**');

            } else {
                idName = idNameO.replace(idNameO.substr(4, 4), '****');
            };
            var str = "<tr><td><p class=\"sp-td\">" + idNum + "</p></td><td><p title=\"" + idName + "\">" + idName + "</p></td><td><p title=\"" + paySum + "\">" + paySum + "</p></td></tr>";
            $("#" + id).append(str);
        };
    }
});
