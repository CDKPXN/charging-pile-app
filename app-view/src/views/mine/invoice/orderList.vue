<template>
    <div>
      <x-header class="xHeader"  :left-options="{showBack: false}">
                    <!--  头部样式 -->
            <x-icon type="ios-arrow-back" size="20" style="position:absolute;left:14px;top:14px" @click.native="jump('/home/invoice/invoiceDetail')"></x-icon>
            <span style="color:#fff">包含订单</span>
        </x-header>
      
        <scroller lock-x scrollbar-y :height="height">
            <div>
                <cell   v-for="tmp in data" style="height:210px;width:80%;margin-left:6%;margin-top:20px;border-radius:4px;box-shadow:0px 1px 20px 0px rgba(7,0,2,0.2);">
                    <div style="margin-top:-80px;width:90%;position:absolute;left:5%;text-align:left">
                        <div style="color:rgb(12, 11, 11);">
                            <span>{{tmp.sitename}}</span><span style="float:right">充电费用:¥{{tmp.cost / 100}}</span>
                        </div>
                        <div style="font-size:0.8em;margin-top:10px;">
                            <div>
                                <span>{{tmp.begin_time}}</span> &nbsp;至&nbsp;<span>{{tmp.end_time}}</span>
                            </div>
                            <div>
                                <span>订单编号 : </span><span>{{tmp.id}}</span><br/>
                            </div>
                            <div>
                                <span>电费 : </span><span>¥ {{tmp.cprice / 100}}</span><br/>
                            </div>
                            <div>
                                <span>服务费 : </span><span>¥ {{tmp.sprice / 100}}</span><br/>
                            </div>
                            <div>
                                <span>停车费 : </span><span>¥ {{tmp.parking_fee / 100}}</span><br/>
                            </div>
                            <div>
                                <span>充电电量 : </span><span>{{tmp.electric_quantity}}度</span><br/>
                            </div>
                            <div>
                                <span>充电时长 : </span><span>{{tmp.duration}}</span><br/>
                            </div>
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
        created(){
            // this.djhm=this.$route.query.testdjhm;
            this.djhm=sessionStorage.getItem("voiceid")
            // console.log("dddd",this.djhm)
          

              this.$ajax({
                    method:'get',
                    url:'/app/invoice/'+this.djhm+'/orders',
                    headers:{'token':sessionStorage.getItem('token')},
                })
                .then(res=>{
                    if(res.data.code == 200){
                        this.data=res.data.data;
                        console.log("data",res.data.data)
                    }
                })
        },
        data(){
            return{
                height:'auto',
                 data: [],
                 djhm:""
            }
        },
        methods:{
              jump (url) {
                this.$router.push(url)
            },
        }
}
</script>

<style>

</style>
