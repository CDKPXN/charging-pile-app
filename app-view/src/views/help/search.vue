<template>
<!-- 查询帮助 -->
    <div>
        <search
            @result-click="resultClick"
            @on-change="getResult"
            :results="results"
            v-model="value"
            placeholder="请输入搜索内容"
            position="absolute"
            auto-scroll-to-top
            @on-focus="onFocus"
            @on-cancel="onCancel"
            @on-submit="onSubmit"
            ref="search">
        </search>
    </div> 
</template>

<script>
import { Search } from 'vux'
    export default {
        components: {
            Search
        },
        data () {
            return {

            }
        },
        methods: {
            onCancel () {
                this.$router.push('/home/state')
            }
        }
    }
</script>