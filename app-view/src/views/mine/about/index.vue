<template>
<!-- 问答评论 -->
    <div>
        <x-header class="xHeader" :left-options="{showBack: false}">
                    <!--  头部样式 -->
            <x-icon type="ios-arrow-back" size="20" style="position:absolute;left:14px;top:14px;" @click="jump('/home/mineV')"></x-icon>
            <span style="color:#fff">关于蓉E充</span>
            <!-- <a slot="right" style="color:#0dbc79" @click="show4 = true">分享</a> -->
        </x-header>
        <flexbox style="margin:40px 0 30px 0;">
            <flexbox-item>
                <div style="width:80px;height:80px;margin:0 auto;">
                    <img   style="width:100%;height:100%;"  src="../../../assets/logo1.png"  alt="">
                </div>
                <div style="width:80px;margin:5px auto;font-size:0.7em;text-align:center">
                    <span style="color:#999999">V 1.0.5</span>
                </div>
            </flexbox-item>
        </flexbox>
        <flexbox>
            <flexbox-item>
                <div style="padding:0 16px;text-indent:2em;color:#666666;font-size:0.9em;">
                    <span>成都蓉源能源发展有限责任公司系城投能源集团全资子公司，于2018年6月6日将公司注册资本增加为1亿元。经营范围包括销售：成品油（限分支机构经营）；批发、零售；建筑材料、装饰材料、汽车配件、矿产品；汽车美容；清洁服务；市场调查；合同能源管理；广告业；分布式交流充电桩安装、销售；集中式快速充电站安装、销售；换电设施安装、销售；机械设备经营租赁；电气安装；电力工程设计、施工。城投能源集团为尽快促进成都市新能源汽车充电基础设施及网络信息平台建设，保障和推动新能源汽车推广应用，安排成都蓉源能源发展有限责任公司具体实施充（换）电基础设施建设、运营。
                    </span>
                    <p>客服热线:028-64791922</p>
                </div>
            </flexbox-item>
        </flexbox>
        <flexbox style="position:absolute;bottom:20px">
            <flexbox-item style="text-align:center">
                <div style="color:#999999;font-size:0.7em;">
                    <span>Copyright 2017-2018 CD.All Rights Reserves</span>
                </div>
            </flexbox-item>
        </flexbox>
    </div>
</template>
<script>
import store from '../../../config/store.js'
import { XHeader , Group, Cell, XButton, Flexbox, FlexboxItem} from 'vux'
    export default {
        components: {
            XHeader,
            Group,
            Cell,
            XButton,
            Flexbox,
            FlexboxItem
        },
        data () {
            return {
                data: []
            }
        },
        methods:{
            jump (url) {
                this.$router.push(url)
            },
        }
    }
</script>
<style lang="less" scoped>
.xHeader{
    background-color:  @background-color;
}
</style>

