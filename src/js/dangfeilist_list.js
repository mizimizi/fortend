(function () {
    var ajaxAPI = window.parent.getApi();
    var ajaxUrl = window.parent.getApi()+'/org/standard/api/data/type';
    var $table = $(".branch_list1");
    var optuser =window.parent.optuser;
    var columsDate= [
        {
            "data": "username"
        },
        {
            "data": "phonenum"
        },
        {
            "data": "idnum"
        },
        {
            "data": "themonthe",
        },
        {
            "data": "feenum"
        },
        {
            "data": "overpaidamt"
        },
        {
            "data": "branchname"
        },
        {
            "data": "branchcode"
        },
        {
            "data": "committeename"
        },
        {
            "data": "committeecode"
        },
        {
            "data": "createtime"
        }
    ];
    var userManage = {
        getQueryCondition :function(data) {
            var param = {};
                param.branchcode = $.trim($(".branchcode").val()),
                param.themonthe= $.trim($(".themonthe").val()),
                param.type = $("#tab_demo .tabBar  .current").index()+1;
               
            //组装分页参数
            param.pageNum = (data.start / data.length) + 1;
            param.pageSize = data.length;
            return param;
        },
        getColums:function () {
            var  type = $("#tab_demo .tabBar  .current").index()+1;
            var columsDate1= [
                {
                    "data": "username"
                },
                {
                    "data": "phonenum"
                },
                {
                    "data": "idnum"
                },
                {
                    "data": "themonthe",
                },
                {
                    "data": "feenum"
                },
                {
                    "data": "overpaidamt"
                },
                {
                    "data": "branchname"
                },
                {
                    "data": "branchcode"
                },
                {
                    "data": "committeename"
                },
                {
                    "data": "committeecode"
                },
                {
                    "data": "createtime"
                }
            ];
            var columsDate2= [
                {
                    "data": "member"
                },
                {
                    "data": "actualmember"
                },
                {
                    "data": "fee"
                },
                {
                    "data": "actualfee",
                },
                {
                    "data": "overpaidamt"
                },
                {
                    "data": "branchname"
                },
                {
                    "data": "branchcode"
                },
                {
                    "data": "committeename"
                },
                {
                    "data": "committeecode"
                },
                {
                    "data": "chkstate"
                },
                {
                    "data": "createtime"
                }
            ];
            var columsDate3= [
                {
                    "data": "branchcode"
                },
                {
                    "data": "committeecode"
                },
                {
                    "data": "themonthe"
                },
                {
                    "data": "createtime"
                },
                {
                    "data": "chkstate"
                }
            ];
            var columsDate4= [
                {
                    "data": "username"
                },
                {
                    "data": "phonenum"
                },
                {
                    "data": "idnum"
                },
                {
                    "data": "themonthe",
                },
                {
                    "data": "feenum"
                },
                {
                    "data": "overpaidamt"
                },
                {
                    "data": "branchcode"
                },
                {
                    "data": "committeecode"
                },
                {
                    "data": "paymentstate"
                },
                {
                    "data": "createtime"
                }
            ];
            var dataColunsRback = "columsDate"+type;
             return dataColunsRback;
            
            
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
                        returnData.recordsTotal = result.data.total;//返回数据全部记录
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
            columns:columsDate,
            "createdRow":function ( row, data, index ) {
      
            },
            "drawCallback": function( settings ) {
                //渲染完毕后的回调
                //默认选中第一行
                //$("tbody tr",$table).eq(0).click();
            }
        })).api();

   
    
    // $('.table-sort').DataTable( {
    //     "ajax": "../libs/tabledata.json",
    //     "bSort":false
    //
    // } );
    function searchFUN(type){
        var formval1 = $.trim($(".branchcode").val()),
            formval2 = $.trim($(".themonthe").val()),
            selectType;
        if(formval1||formval2){
            columsDate = userManage.getColums();
            selectType =  $("#tab_demo .tabBar  .current").index()+1;
            $table = $(".branch_list"+selectType);
            if(type){
                _table.draw();
            }else{
                var excelDate = $(".orgForm").serialize().replace(/\+/g," ");
                var hrefUrl = ajaxAPI+"/org/standard/api/syncRecord";
                $.ajax({
                    type: "POST",
                    url: hrefUrl,
                    cache: false, //禁用缓存
                    data: excelDate, //传入组装的参数
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
            }
        
        }else{
            layer.msg('请输入要查询的内容', {
                time: 1000,
            });
        }
    }
    $("#dangfei_openExcel").click(function () {
        searchFUN(0);
    })
    $("#branch_colume_search").click(function () {
        searchFUN(1);
        
    });
})();