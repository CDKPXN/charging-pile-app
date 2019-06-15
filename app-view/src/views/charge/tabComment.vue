<template>
    <div>
        <divider> 敬请期待 </divider>

    
    
    
    </div>
    
    
    </div>
    
</template>

<script>
    import { Divider} from 'vux'
    export default {
        name:'TabComment',
        components: {
            Divider
        },
        data () {
            return {
                data:[]
            }
        },
        created () {
            // console.log("comment")
            // console.log(this)
            // this.$ajax({
            //     method:"get",
            //     url:'/api/commont/site/'+this.$route.query.id+'?page=1&size=5999'
            // })
            // .then(res=>{
            //     if(res.data.code==200){
            //         this.data = res.data.data.list
            //         console.log(this.data)
            //     }
            // })  
        }
    }
</script>