(function () {
    var ajaxAPI = window.parent.getApi();
    var ajaxUrl = window.parent.getApi()+'/org/manager/api/get';
    var $table = $(".branch_list");
    var optuser =window.parent.optuser;
    var userManage = {
        getQueryCondition :function(data) {
            var param = {};
              param.branchcode = $.trim($(".branchcode").val()),
                param.branchname= $.trim($(".branchname").val()),
                param.committeecode = $.trim($(".committeecode").val()),
                param.committeename = $.trim($(".committeename").val()),
                param.parentbranchcode = $.trim($(".parentbranchcode").val()),
                param.fee = $.trim($(".fee").val()),
                param.actualfee = $.trim($(".actualfee").val()),
                  param.chkstate = $.trim($(".chkstate option:selected").val()),
                param.themonthe = $.trim($(".themonthe").val());
            //组装分页参数
            param.pageNum = (data.start / data.length) + 1;
            param.pageSize = data.length;
            return param;
        },
        editItemInit : function(item) {
            //编辑方法
            var tplOpt = "";
           if(item.chkstate == 0){
               tplOpt = '未确认';
           }
            if(item.chkstate == 1){
                tplOpt = '已确认';
            }
            if(item.chkstate == 2){
                tplOpt = '已提现';
            }
            if(item.chkstate == 3){
                tplOpt = '提现中';
            }
            var tplHtml = " <form id='edit_add'><div class='col-xs-6'><label  class='f-l'>党委名称</label><input type='text' readonly value="+item.committeename+"  class='input-text radius f-l'></div><div class='col-xs-6'><label >党委编码</label><input type='text' readonly value="+item.committeecode+"  class='input-text radius committeecode'name='committeecode' ></div>" +
                "<div class='col-xs-6'><label  class='f-l' >支部名称</label><input type='text' readonly  value="+item.branchname+"  class='input-text radius f-l'></div><div class='col-xs-6'><label >支部编码</label><input type='text'  class='input-text radius branchcode'readonly  value="+item.branchcode+" name='branchcode'></div>"+
                "<div class='col-xs-6'><label   class='f-l'>修改前应交金额</label><input type='text' readonly  value="+item.fee+"  class='input-text radius f-l' ></div><div class='col-xs-6'><label >修改后应交金额</label><input type='text'   class='input-text radius feenum'name='feenum' ></div>"+
                "<div class='col-xs-6'><label   class='f-l'>修改前实交金额</label><input type='text' readonly  value="+item.actualfee+"  class='input-text radius f-l'  ></div><div class='col-xs-6'><label >修改后实交金额</label><input type='text'   class='input-text radius actualFee'name='actualFee' ></div>"+
                "<div class='col-xs-6'><label   class='f-l'>修改前状态</label><input  class='input-text radius f-l'  readonly value="+tplOpt+" >"+
                "<input type='hidden'   value="+optuser+" name='optuser'></div>"+
                "<div class='col-xs-6'><label   class='f-l'>修改后状态</label><select name='chkstate' class='select input-text chkstate' id='chkstate' style='width: 100%'><option value=''   >请选择</option><option value=0   >未确认</option><option value=1   >已确认</option><option value=2   >已提现</option><option value=3   >提现中</option></select></div>" +
                "<div class='col-xs-6'><label >月份</label><input type='text'  readonly  value="+item.themonthe+" class='input-text radius themonthe'  name='themonthe' ></div>" +
                "<div class='col-xs-12 text-c mt-20'><a class='btn btn-primary radius ml-10' id='editAjaxBtn'>提交</a><a class='btn btn-primary radius ml-10 cloaseBtn '>取消</a></div></form>";
            var indexOpen = layer.open({
                type: 1,
                title:"编辑",
                // skin: 'layui-layer-rim', //加上边框
                area: ['800px', '500px'], //宽高
                content: tplHtml
            });
            $("#editAjaxBtn").click(function () {
                var editNum1 = $.trim($("#edit_add .feenum").val());
                var editNum2 = $.trim($("#edit_add .actualFee").val());
                var editNum3 = $.trim($("#edit_add .chkstate option:selected").val());
                if(editNum1||editNum2||editNum3){
                    var edit_data =  $("#edit_add").serialize().replace(/\+/g," ");
                    $.ajax({
                        type: "POST",
                        url: ajaxAPI+ "/org/manager/api/edit/Info",
                        cache: false, //禁用缓存
                        data: edit_data, //传入组装的参数
                        dataType: "json",
                        success: function (result) {
                            //异常判断与处理
                            if (result.status!==1) {
                                layer.msg(result.message, {
                                    time: 1000,
                                });
                                return;
                            }else{
                                layer.msg("修改成功，稍等生效", {
                                    time: 1000,
                                });
                                layer.close(indexOpen);
                                searchFUN(0);
                            }
            
                        },
                        error: function(XMLHttpRequest, textStatus, errorThrown) {
                            layer.msg("请求失败", {
                                time: 1000,
                            });
                        }
        
                    });
                }else{
                    layer.msg("请输入需要修改的内容", {
                        time: 1000,
                    });
                }
            })
            $(".cloaseBtn").click(function () {
                layer.close(indexOpen);
            })
            // alert("编辑"+item.id+"  "+item.themonthe);
        },
        deleteItem:function(item){
            //删除
            var deldatas = {
                // "id":item.id,
                "themonthe":item.themonthe,
                "branchcode":item.branchcode,
                "committeecode":item.committeecode,
                "optuser":optuser,
            }
            layer.confirm('确定要删除吗?', function(index){
                //ajax请求数据
                $.ajax({
                    type: "POST",
                    url: ajaxAPI+ "/org/manager/api/org/delete",
                    cache: false, //禁用缓存
                    data: deldatas, //传入组装的参数
                    dataType: "json",
                    success: function (result) {
                        //异常判断与处理
                        if (result.status!==1) {
                            layer.msg(result.message, {
                                time: 1000,
                            });
                            return;
                        }else{
                            layer.msg("删除成功，稍等生效", {
                                time: 1000,
                            });
                            layer.close(index);
                            searchFUN(0);
                        }
                
                    },
                    error: function(XMLHttpRequest, textStatus, errorThrown) {
                        layer.close(index);
                        layer.msg("请求失败", {
                            time: 1000,
                        });
                    }
            
                });
        
            });
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
        columns: [
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
                "data": "actualfee",
            },
            {
                "data": "overpaidamt"
            },
            {
                "data": "themonthe"
            },
            {
                "data": "branchcode"
            },
            {
                "data": "branchname"
            },
            {
                "data":  "committeecode"
            },
            {
                "data": "committeename"
            },
            {
                "data": "chkstate"
            },
            {
                "data": "fullpath"
            },
            {
                "data": "createtime"
            },
            {
                "data": "parentbranchcode"
            },
            {
                "data": null,
                defaultContent:""
            }
        ],
        "createdRow":function ( row, data, index ) {
            //不使用render，改用jquery文档操作呈现单元格
            var $opBtn = $('<a style="text-decoration:none" class="ml-5 btn-edit" href="javascript:;" title="编辑"><i class="Hui-iconfont">&#xe6df;</i></a> <a style="text-decoration:none" class="ml-5 btn-del" href="javascript:;" title="删除"><i class="Hui-iconfont">&#xe6e2;</i></a>');
            $('td', row).eq(14).append($opBtn);
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
            formval5 = $.trim($(".parentbranchcode").val()),
            formval6 = $.trim($(".fee").val()),
            formval7 = $.trim($(".actualfee").val()),
            formval8 = $.trim($(".themonthe").val()),
            formval9 = $.trim($(".chkstate option:selected").val());
        if(formval1||formval2||formval3||formval4||formval5||formval6||formval7||formval8||formval9){
            if(type){
                _table.draw();
            }else{
                var excelDate = $(".branchSearch_form").serialize().replace(/\+/g," ");
                var hrefUrl = ajaxAPI+"/org/manager/api/downLoadExcel?"+excelDate
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