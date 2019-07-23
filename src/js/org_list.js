(function () {
    var ajaxAPI = window.parent.getApi();
    var ajaxUrl = window.parent.getApi()+'/org/fullpath/api/get';
    var $table = $(".branch_list");
    var optuser =window.parent.optuser;
    var userManage = {
        getQueryCondition :function(data) {
            var param = {};
              param.parentBranchcode = $.trim($(".parentBranchcode").val()),
                param.branchcode= $.trim($(".branchcode").val()),
                param.branchname = $.trim($(".branchname").val()),
                param.orgfull = $.trim($(".orgfull").val()),
                param.themonthe = $.trim($(".themonthe").val());
            //组装分页参数
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
    // 按钮点击事件
    $table.on("click",".btn-edit",function() {
        //点击编辑按钮
        var item = _table.row($(this).closest('tr')).data();
        userManage.editItemInit(item);
    }).on("click",".btn-del",function() {
        //点击删除按钮
        var item = _table.row($(this).closest('tr')).data();
        userManage.deleteItem(item);
    });
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
                "data": "orgpath"
            },
            {
                "data":"themonthe"
            },
            {
                "data": "branchname"
            },
            {
                "data": "branchcode",
            },
            {
                "data": "ishavedbankacount"
            },
            {
                "data": "parentbranchcode"
            },
            {
                "data": "orgtype"
            },
            {
                "data": "createtime"
            }
        ],
        "createdRow":function ( row, data, index ) {
            //不使用render，改用jquery文档操作呈现单元格
            // var $opBtn = $('<a style="text-decoration:none" class="ml-5 btn-edit" href="javascript:;" title="编辑"><i class="Hui-iconfont">&#xe6df;</i></a> <a style="text-decoration:none" class="ml-5 btn-del" href="javascript:;" title="删除"><i class="Hui-iconfont">&#xe6e2;</i></a>');
            // $('td', row).eq(14).append($opBtn);
        },
        "drawCallback": function( settings ) {
            //渲染完毕后的回调
            //默认选中第一行
            //$("tbody tr",$table).eq(0).click();
        }
    })).api();
    function searchFUN(type){
        var formval1 = $.trim($(".parentBranchcode").val()),
            formval2 = $.trim($(".branchcode").val()),
            formval3 = $.trim($(".branchname").val()),
            formval4 = $.trim($(".orgfull").val()),
            formval5 = $.trim($(".themonthe").val());
        if(formval1||formval2||formval3||formval4||formval5){
                _table.draw();
        }else{
            layer.msg('请输入要查询的内容', {
                time: 1000,
            });
        }
    }
    $("#branch_colume_search").click(function () {
        searchFUN(1);
        
    });
    $("#branch_colume_refresh").click(function () {
        $.ajax({
            type: "POST",
            url: ajaxAPI+'/org/fullpath/api/sync',
            cache: false, //禁用缓存
            data: {'optuser':optuser}, //传入组装的参数
            dataType: "json",
            success: function (result) {
                //异常判断与处理
                layer.msg(result.message, {
                    time: 1000,
                });
            },
            error: function(XMLHttpRequest, textStatus, errorThrown) {
                layer.msg("请求失败", {
                    time: 1000,
                });
            }
        
        });
    })
})();