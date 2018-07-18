/**
 * Created by zhangxin on 2018/5/17.
 */
$(function () {
    $(".datepicker").daterangepicker({
        maxDate : moment(), //最大时间
        dateLimit : {
            days : 18000
        },//起止时间的最大间隔
        autoApply:true,
        format : 'YYYY-MM-DD', //控件中from和to 显示的日期格式
        separator : ' 到 ',
        autoUpdateInput: false,
        ranges : {
            '昨日': [moment().subtract('days', 1).startOf('day'), moment().subtract('days', 1).endOf('day')],
            '最近7日': [moment().subtract('days', 6), moment()],
            '最近30日': [moment().subtract('days', 29), moment()]
        },
        locale: {
            applyLabel : '确定',
            cancelLabel : '取消',
            fromLabel : '起始时间',
            toLabel : '结束时间',
            customRangeLabel : '自定义',
            daysOfWeek : [ '日', '一', '二', '三', '四', '五', '六' ],
            monthNames : [ '一月', '二月', '三月', '四月', '五月', '六月',
                '七月', '八月', '九月', '十月', '十一月', '十二月' ],
            firstDay : 1
        }
    }).on('apply.daterangepicker', function(ev, picker) {
        $(this).val(picker.startDate.format('YYYY-MM-DD') + ' 到 ' + picker.endDate.format('YYYY-MM-DD'));
    }).on('cancel.daterangepicker', function(ev, picker) {
        $(this).val('');
    });

    /**
     * bootstrap-table
     * @type a
     */
    var $table = $("#table");
    function initTable() {
        $table.bootstrapTable({
            url: '../data/data.json',
            method:'get',
            dataType: 'json',
            queryParams: {},
            pagination: true,
            sidePagination: 'server',
            pageNumber:1,//初始化加载第一页，默认第一页
            pageSize: 10,//每页的记录行数（*）
            // pageList: [10, 25, 50, 100],        //可供选择的每页的行数（*）
            pageList: "",        //可供选择的每页的行数（*）
            columns: [
                {
                    field: 'id',
                    title: '序号',
                    align: 'center',
                    valign: 'middle'
                },
                {
                    field: 'field2',
                    title: '用户角色',
                    align: 'center',
                    valign: 'middle'
                },
                {
                    field: 'field3',
                    title: '帐号',
                    align: 'center',
                    valign: 'middle'
                },
                {
                    field: 'field4',
                    title: '姓名',
                    align: 'center',
                    valign: 'middle'
                },
                {
                    field: 'field5',
                    title: '用户手机号',
                    align: 'center',
                    valign: 'middle'
                },
                {
                    field: 'field6',
                    title: '员工编号',
                    align: 'center',
                    valign: 'middle'
                },
                {
                    field: 'field7',
                    title: '所属部门',
                    align: 'center',
                    valign: 'middle'
                },
                {
                    field: 'field8',
                    title: '投放项目',
                    align: 'center',
                    valign: 'middle'
                },
                {
                    field: 'field10',
                    title: '开通日期',
                    align: 'center',
                    valign: 'middle'
                },
                {
                    title: '操作',
                    align: 'center',
                    valign: 'middle',
                    events: operateEvents,
                    formatter: function() {
                        var a = [
                            '<a href="index02.html"><i class="iconfont icon-xiugai"></i></a> ',
                            '<a href="index03.html"><i class="iconfont icon-quanxianguanli1"></i></a> ',
                            '<a href="javascript:void(0);" title="Remove" class="remove"><i class="iconfont icon-shanchu"></i></a>'
                        ].join('');
                        return a;
                    }
                },
                {
                    title: '账号状态',
                    align: 'center',
                    valign: 'middle',
                    events: operateEvents,
                    formatter: function() {
                        var a = [
                            '<a href="javascript:void(0);" title="Remove" class="onOff"><span class="text-blue">开通</span><i class="iconfont icon-kaiguan3" style="font-size: 30px;"></i><span>关闭</span></a>'
                        ].join('');
                        return a;
                    }
                }
            ]
        });
        // sometimes footer render error.
        setTimeout(function () {
            $table.bootstrapTable('resetView');
        }, 200);
        $(window).resize(function () {
            $table.bootstrapTable('resetView');
        });
    }
    window.operateEvents = {
        'click .remove': function (e, value, row, index) {
            $("#warningMsgModal").modal("show").find(".btn-blue").one("click",function () {
                /**
                 * 这段代码是删除行的
                 */
                $table.bootstrapTable('remove', {
                    field: 'id',
                    values: [row.id]
                });
                $(this).parents("#warningMsgModal").modal("hide");
                Notification.init({
                    title:"提示",
                    type:"success",
                    duration:4500,
                    message:"用户账号删除成功",
                    onClose:function(){
                        console.log("关闭后的回调函数");
                    },
                    onClick:function(){
                        console.log("点击的回调函数");
                    }
                });
            }).parents("#warningMsgModal").on('hidden.bs.modal',function () {
                /**
                 * 当模态窗口关闭后
                 */
                $(this).find(".btn-blue").off('click');
            });
        },
        'click .onOff': function (e, value, row, index) {
            var _thisOnOff = $(this).find('.iconfont');
            _thisOnOff.hasClass('icon-kaiguan4') ? _thisOnOff.removeClass('icon-kaiguan4').prev().addClass('text-blue').siblings().removeClass("text-blue") : _thisOnOff.addClass('icon-kaiguan4').next().addClass('text-blue').siblings().removeClass("text-blue")
        }
    };
    initTable();
});