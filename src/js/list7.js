(function () {
    var ajaxAPI = window.parent.getApi();
    var ajaxUrl = window.parent.getApi()+'/branch/count/api/orgdetail';
    var $table = $(".branch_list");
    var optuser =window.parent.optuser;
    var userManage = {
        getQueryCondition :function(data) {
            var param = {};
            param.branchcode = $.trim($(".branchcode").val()),
                param.branchname= $.trim($(".branchname").val()),
                param.committeecode = $.trim($(".committeecode").val()),
                param.committeename = $.trim($(".committeename").val()),
                param.end = $.trim($(".end").val()),
                param.begin = $.trim($(".begin").val());
            param.pageNum = (data.start / data.length) + 1;
            param.pageSize = data.length;
            return param;
        },
        editItemInit : function(item) {
      
        },
        deleteItem:function(item){
        
        },
        showItemDetail: function(item){
            //点击行
            alert("点击"+item.carrierId+"  "+item.carrierName);
        }
    };

    var tableSelect_Index =0;
   var  _table = $table.dataTable($.extend(true,{}, {
        "bSort":false,
        "pading":false,
        serverSide: true, //启用服务器端分页
        searching: false, //禁用原生搜索
        ajax: function (data, callback, settings) {
            tableSelect_Index ++;
            if(tableSelect_Index ==1){
                return;
            }
            //封装请求参数
            var param = userManage.getQueryCondition(data);//调用方法获取页面查询条件，已经分页所需要的数据
            //ajax请求数据
            $.ajax({
                type: "POST",
                url: ajaxUrl,
                cache: false, //禁用缓存
                data: param, //传入组装的参数
                dataType: "json",
                success: function (result) {
                    //异常判断与处理
                    if (result.status!==1) {
                        layer.msg(result.message, {
                            time: 1000,
                        });
                        return;
                    }
                    var returnData = {};
                    returnData.draw = result.data.startRow -1;//这里直接自行返回了draw计数器,应该由后台返回
                    returnData.recordsTotal = result.data.POSTtotal;//返回数据全部记录
                    returnData.recordsFiltered = result.data.total;//后台不实现过滤功能，每次查询均视作全部结果
                    returnData.data = result.data.list;//返回的数据列表
                    //此时的数据需确保正确无误，异常判断应在执行此回调前自行处理完毕
                    callback(returnData);
                },
                error: function(XMLHttpRequest, textStatus, errorThrown) {
                    layer.msg("请求失败", {
                        time: 1000,
                    });
                }
                
            });
        },
        columns: [
            {
                "data": "committeename"
            },
            {
                "data":"branchname"
            },
            {
                "data": "themonthe"
            },
            {
                "data": "member"
            },
            {
                "data":"actualmember"
            },
            {
                "data": "fee"
            },
            {
                "data": "actualfee"
            },
            {
                "data": "overpaidamt"
            },
            {
                "data": "createtime"
            }
        ],
        "createdRow":function ( row, data, index ) {
        
        },
        "drawCallback": function( settings ) {
            //渲染完毕后的回调
            //默认选中第一行
            //$("tbody tr",$table).eq(0).click();
        }
    })).api();
    function searchFUN(type){
        var formval1 = $.trim($(".branchcode").val()),
            formval2 = $.trim($(".branchname").val()),
            formval3 = $.trim($(".committeecode").val()),
            formval4 = $.trim($(".committeename").val()),
            formval8 = $.trim($(".begin").val()),
            formval9 = $.trim($(".end").val());
        if(formval1||formval2||formval3||formval4||formval8||formval9){
            if(type){
                _table.draw();
            }else{
                var excelDate = $(".branchSearch_form").serialize().replace(/\+/g," ");
                var hrefUrl = ajaxAPI+"/branch/count/api/orgdetaildown?"+excelDate;
                window.open(hrefUrl);
            }
            // $(':input', '.Huiform').val('');
            
        }else{
            layer.msg('请输入要查询的内容', {
                time: 1000,
            });
        }
    }
    $("#branch_openExcel").click(function () {
        searchFUN(0);
    })
    $("#branch_colume_search").click(function () {
        searchFUN(1);
        
    });
})();