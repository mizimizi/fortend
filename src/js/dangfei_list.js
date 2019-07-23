(function () {
    var ajaxAPI = window.parent.getApi();
    var ajaxUrl = window.parent.getApi()+'/dangfei/detail/api/get';
    // var ajaxUrl = '../libs/tabledata.json';
    var $table = $(".table-sort");
    var optuser =window.parent.optuser;
    var userManage = {
        getQueryCondition :function(data) {
            var param = {};
            param.committeename = $.trim($(".committeename").val()),
                param.committeecode= $.trim($(".committeecode").val()),
                param.branchname = $.trim($(".branchname").val()),
                param.branchcode = $.trim($(".branchcode").val()),
                param.username = $.trim($(".username").val()),
                param.phone = $.trim($(".phone").val()),
                param.idnum = $.trim($(".idnum").val()),
                param.themonthe = $.trim($(".themonthe").val());
            //组装分页参数
            param.pageNum = (data.start / data.length) + 1;
            param.pageSize = data.length;
            return param;
        },
        editItemInit : function(item) {
            //编辑方法
            var tplOpt = item.canpaytoother == 0 ? ' <option value=0  selected >否</option><option value=1  >是</option>':' <option value=0   >否</option><option value=1 selected >是</option>';
            var tplHtml = " <form id='edit_add'><div class='col-xs-6'><label  class='f-l'>原姓名</label><input type='text' readonly value="+item.username+"  class='input-text radius f-l'></div><div class='col-xs-6'><label >修改后姓名</label><input type='text'   class='input-text radius'name='username' ></div>" +
                "<div class='col-xs-6'><label  class='f-l' >原手机号</label><input type='text' readonly  value="+item.phonenum+"  class='input-text radius f-l'></div><div class='col-xs-6'><label >修改后手机号</label><input type='text'  class='input-text radius branchcode' name='phone'></div>"+
                "<div class='col-xs-6'><label   class='f-l'>原身份证号</label><input type='text' readonly  value="+item.idnum+"  class='input-text radius f-l'  name='pIdnum'></div><div class='col-xs-6'><label >修改后身份证号</label><input type='text'   class='input-text radius'name='aIdnum' ></div>"+
                "<div class='col-xs-6'><label >月份</label><input type='text'  readonly  value="+item.themonthe+" class='input-text radius'  name='themonthe' ></div>" +
                "<div class='col-xs-6'><label   class='f-l'>代缴</label><select name='canPayFlag' class='select' id='canpayflag'>" +
                 tplOpt+
                "</select></div><input type='hidden'   value="+item.branchcode+" name='branchcode' ><input type='hidden'   value="+optuser+" name='optuser'>"+
                "<div class='col-xs-12 text-c mt-20'><a class='btn btn-primary radius ml-10' id='editAjaxBtn'>提交</a><a class='btn btn-primary radius ml-10 qxClose_btn'onclick='layer.close()'>取消</a></div></form>";
            var thisIndex = layer.open({
                type: 1,
                title:"修改证件号",
                // skin: 'layui-layer-rim', //加上边框
                area: ['800px', '400px'], //宽高
                content: tplHtml
            });
            $("#editAjaxBtn").click(function () {
              var edit_data =  $("#edit_add").serialize().replace(/\+/g," ");
                $.ajax({
                    type: "POST",
                    url: ajaxAPI+ "/dangfei/detail/api/dangfei/Info",
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
                            layer.close(thisIndex);
                            searchFUN(0);
                        }
            
                    },
                    error: function(XMLHttpRequest, textStatus, errorThrown) {
                        layer.msg("请求失败", {
                            time: 1000,
                        });
                    }
        
                });
            })
            $(".qxClose_btn").click(function () {
                layer.close(thisIndex);
            })
            // alert("编辑"+item.id+"  "+item.themonthe);
        },
        dealItem:function(item){
            //删除
            var deldatas = {
                "id":item.id,
                "themonthe":item.themonthe,
                "branchcode":item.branchcode,
                "optuser":optuser,
            }
            layer.confirm('确定要党费金额置零吗?', function(index){
                //ajax请求数据
                $.ajax({
                    type: "POST",
                    url: ajaxAPI+ "/dangfei/detail/api/editFeeToZero",
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
                            layer.msg("修改成功，稍等生效", {
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
        deleteItem : function(item) {
            //删除
            var optuser ="123";
            var deldatas = {
                "id":item.id,
                "themonthe":item.themonthe,
                "branchcode":item.branchcode,
                "optuser":optuser,
            }
            layer.confirm('确定要删除账单吗?', function(index){
                //ajax请求数据
                $.ajax({
                    type: "POST",
                    url: ajaxAPI+ "/dangfei/detail/api/delete",
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
                            layer.msg("修改成功，稍等生效", {
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
    }).on("click",".btn_zero",function () {
        //点击党费金额置0
        var item = _table.row($(this).closest('tr')).data();
        userManage.dealItem(item);
    });
        var tableSelect_Index =0;
       var  _table = $table.dataTable($.extend(true,{}, {
            "bSort":false,
            "pading":false,
            serverSide: true, //启用服务器端分页
            searching: false, //禁用原生搜索
           sServerMethod:"POST",
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
                        //此时的数据需确保正确无误，异常判断应在执行此回调前自行处理完毕
                        returnData.draw = result.data.startRow - 1;//这里直接自行返回了draw计数器,应该由后台返回
                        returnData.recordsTotal = result.data.total;//返回数据全部记录
                        returnData.recordsFiltered  = result.data.total;//后台不实现过滤功能，每次查询均视作全部结果
                        returnData.data = result.data.list;//返回的数据列表
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
                    "data": "canpaytoother"
                },
                {
                    "data": "committeename"
                },
                {
                    "data": "committeecode"
                },
                {
                    "data": "createtime"
                },
                {
                    "data": "createuser"
                },
                {
                    "data": "bzmsg"
                },
                {
                    "data": null,
                    defaultContent:""
                }
            ],
            "createdRow":function ( row, data, index ) {
                //不使用render，改用jquery文档操作呈现单元格
                var $opBtn = $('<button  class="btn btn-primary-outline radius mt-5 btn_zero">党费金额置0</button> <button  class="btn btn-primary-outline radius mt-5 btn-edit">修改证件号</button> <button  class="btn btn-primary-outline radius mt-5 btn-del">删除账单</button>');
                $('td', row).eq(14).append($opBtn);
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
        var formval1 = $.trim($(".committeename").val()),
            formval2 = $.trim($(".committeecode").val()),
            formval3 = $.trim($(".branchname").val()),
            formval4 = $.trim($(".branchcode").val()),
            formval5 = $.trim($(".username").val()),
            formval6 = $.trim($(".phone").val()),
            formval7 = $.trim($(".idnum").val()),
            formval8 = $.trim($(".Wdate").val());
        if(formval1||formval2||formval3||formval4||formval5||formval6||formval7||formval8){
            if(formval6){
                if(!(/^1[3456789]\d{9}$/.test(formval6))){
                    layer.msg('请输入正确的手机号查询', {
                        time: 1000,
                    });
                    $(".phone").val("");
                    return false;
                }
            }
            if(formval7){
                if(!(/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(formval7))){
                    layer.msg('请输入正确的身份证号查询', {
                        time: 1000,
                    });
                    $(".idnum").val("");
                    return false;
                }
            }
            if(type){
                _table.draw();
            }else{
                var excelDate = $(".Huiform").serialize().replace(/\+/g," ");
                var hrefUrl = ajaxAPI+"/dangfei/detail/api/downExcel?"+excelDate
                window.open(hrefUrl);
            }
            // $(':input', '.Huiform').val('');
        
        }else{
            layer.msg('请输入要查询的内容', {
                time: 1000,
            });
        }
    }
    $("#dangfei_openExcel").click(function () {
        searchFUN(0);
    })
    $("#dangfei_colume_search").click(function () {
        searchFUN(1);
        
    });
})();