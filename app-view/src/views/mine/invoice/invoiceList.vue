<template>
<!-- 问答评论 -->
    <div>
        <x-header class="xHeader"  :left-options="{showBack: false}">
                    <!--  头部样式 -->
            <x-icon type="ios-arrow-back" size="20" style="position:absolute;left:14px;top:14px" @click.native="jump('/home/invoice/invoiceInformation')"></x-icon>
            <span >开票历史</span>
        </x-header>

            
        <div style="position:relative" v-if="isTrue">
            <div style="position:absolute;margin-top:50%;left:50%;margin-left:-125px;">
                <img src="../../../assets/icons/No_record.png" width="250px" alt="">
                <div style="text-align:center;margin-top:10%">
                    <span style="color:#999999;font-size:14px">暂无开票记录~</span>
                </div>
            </div>
        </div>
        <scroller lock-x scrollbar-y :height="height"  >
            <div>
                <!-- <div v-for="(tem,index) in data" @click="jumpDetail(tem.djhm)" v-if='!isTrue'>
                    <cell :title="str_money+tem.hjje" :value="tem.ctime" is-link></cell>
                </div> -->
                <cell   @click.native="status(tmp.status,tmp.id)"    v-if="!isTrue" v-for="tmp in data"  style="height:70px;width:80%;margin-left:6%;margin-top:20px;border-radius:4px;box-shadow:0px 1px 20px 0px rgba(7,0,2,0.2);">
                    <div    style="margin-top:-40px;width:90%;position:absolute;left:5%;text-align:left;display:flex;justify-content: space-between;">
                        <div style="font-size:0.8em;margin-top:10px;">
                            <div>
                                <span>{{tmp.ctime}}</span>
                            </div>
                            <div>
                                <span>发票抬头 : </span><span>{{tmp.gfmc}}</span><br/>
                            </div>
                            <div>
                                <span> 税号: </span><span>{{tmp.gfsh}}</span><br/>
                            </div>
                          
                        </div>
                        <div style="display:flex;align-items:flex-end;flex-direction:column;font-size:14px;margin-top:10px;" >
                            <span  v-if="tmp.status==0"  >开票中</span>
                             <span  v-if="tmp.status==1"  >已开票</span>
                            <span   style="margin-top: 16px;" > 价税合计:¥ {{tmp.jshj/100}} </span><br/>
                        </div>
                    </div>
                </cell>
            </div>
        </scroller>
    </div>
</template>

<script>
import { XHeader , Group, Cell,Scroller} from 'vux'
    export default {
        components: {
            XHeader,
            Group,
            Cell, 
            Scroller
        },
        data () {
            return {
                name:'',
                height:'auto',
                str_money:'￥',
                isTrue:false,
                data: [],
                list: [],
                height:'160px'
            }
        },
        mounted () {
            let Height = window.innerHeight - 54
            this.height =Height+'px'
        },
        created () {        
            let vm = this
            vm.name = sessionStorage.getItem('name')
            if (sessionStorage.getItem('token') == null){
                vm.jump('/login')
            } else {
                this.Get_order_list()
            }
        },
        methods:{
            status(status,index){
                if(status==1){
                //   this.jump('/home/invoice/invoiceDetail')
                this.jumpDetail(index)
                }
            },
            jump (url) {
                this.$router.push(url)
            },
            Get_order_list () {
                let vm = this
                vm.$ajax({
                    method:'get',
                    url:'/app/invoice',
                    headers:{'token':sessionStorage.getItem('token')},
                })
                .then(res=>{
                   
                    if(res.data.code == '200'){
                        vm.data = res.data.data.list
                        console.log("ttt",vm.data)
                        if(res.data.data.list.length == 0){
                            this.isTrue = true
                        }
                    }
                })
            },
            // 跳转到发票详情页
            jumpDetail(index){
                this.$router.push({path:'/home/invoice/invoiceDetail',query:{'invoiceId':index}})
            }
        }
    }
</script>
<style lang="less" scoped>
.xHeader{
    background-color:  @background-color;
}
</style>
