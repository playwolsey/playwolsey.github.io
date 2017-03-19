<style>
#mwork {width:14.2rem;}
.mwork-item {width:7rem;position:absolute;top:.05rem;bottom:.05rem;left:.05rem;right:.05rem;}
.mwork-item img {width:100%;}
</style>

<template>
<div id="mwork">
    <waterfall :line-gap="gap" :watch="works">
        <waterfall-slot v-for="(work, index) in works" :width="work.width" :height="work.height" :order="index" :key="work.id">
            <div class="mwork-item">
                <router-link :to="{name:'mdetail', params: {id:work.id}}"><img v-lazy="work.cover" :alt="work.desc.name"></router-link>
            </div>
        </waterfall-slot>
    </waterfall>
</div>
</template>

<script>
import Waterfall from 'vue-waterfall/lib/waterfall.vue'
import WaterfallSlot from 'vue-waterfall/lib/waterfall-slot.vue'

export default {
    data() {
        return {
            works: [],
            gap: 284,
            complement: 'work'
        }
    },
    watch: {
        '$route': 'getWorks'
    },
    created() {
        this.getWorks();
        this.getGap();
    },
    methods: {
        getWorks() {
            let path = this.$route.path.split('/m/')[1];

            if (!path || path === 'all') {
                path = "work";
            }

            this.complement = path
            this.$emit('updateHead')

            this.$http.jsonp('/res/data/' + path + '.json', {
                jsonp: "callback", 
                jsonpCallback: path 
            }, {
                emulateJSON: true
            }).then(response => {
                this.works = response.data.works
            }, response => {
                console.log(response)
            });
        },
        getGap() {
            this.gap = 7.1 *(+window.document.documentElement.style.fontSize.split('px')[0]);
        }
    },
    components: { Waterfall, WaterfallSlot },
    head: {
        title() {
            return {
                inner: '全文室内设计有限公司',
                complement: this.complement
            }
        },
        meta() { 
            return [
                { name: 'keywords', content: 'quanwends,全文,全文设计,室内设计' },
                { name: 'description', content: '全文室内设计有限公司' },
                { name: 'apple-mobile-web-app-capable', content: 'yes' },
                { name: 'apple-touch-fullscreen', content: 'yes' },
                { name: 'apple-mobile-web-app-status-bar-style', content: 'black' },
                { name: 'format-detection', content: 'telephone=no,email=no,address=no' }
            ]
        }
    }
}
</script>
