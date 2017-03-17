<style>
#work {width:1080px;}
.work-item {position:absolute;top:3px;left:3px;bottom:3px;right:3px;}
.work-item:nth-child(4n) {margin-right:0;}
.work-item img {width:264px;height:100%;min-height:30px;}
.work-item .work-item-cover {width:100%;height:100%;background:linear-gradient(-180deg, rgba(0,0,0,0.00) 0%, rgba(0,0,0,.75) 100%);position:absolute;top:0;left:0;color:#fff;opacity:0;filter:alpha(opacity=0);-webkit-transition:background .5s ease;transition:background .5s ease;line-height:1;color:#FFF;}
.work-item a:hover .work-item-cover {opacity:1;filter:alpha(opacity=1);}
.work-item .work-item-cover .desc-wrap {pointer-events:none;position:absolute;width:100%;bottom:0;}
.work-item .work-item-cover .desc {position:absolute;left:20px;}
.work-item .work-item-cover .hd {font-size:12px;bottom:56px;}
.work-item .work-item-cover .bd {font-size:14px;bottom:38px;width:222px;}
.work-item .work-item-cover .ft {font-size:12px;bottom:18px;font-style:italic;}
.show-desc {animation:sss 1s ease;-webkit-animation:sss 1s ease;}
@-webkit-keyframes sss {
    from {bottom:-5px;}
    to {bottom:0;}
}
@keyframes sss {
    from {bottom:-5px;}
    to {bottom:0;}
}
</style>

<template>
<div id="work">
    <waterfall :line-gap="270" :watch="works">
        <waterfall-slot v-for="(work, index) in works" :width="work.width" :height="work.height" :order="index" :key="work.id">
            <div class="work-item">
                <router-link :to="{name:'detail', params: {id:work.id}}">
                    <img v-lazy="work.cover" :alt="work.desc.name">
                    <div class="work-item-cover" @mouseover="mouseover($event)" @mouseleave="mouseleave($event)">
                        <div class="desc-wrap">
                            <div class="desc hd"><p>{{work.desc.name}}</p></div>
                            <div class="desc bd"><p class="u-ellipsis">{{work.desc.ename}}</p></div>
                            <div class="desc ft"><p>{{work.desc.tag}}</p></div>
                        </div>
                    </div>
                </router-link>
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
            show: false,
            complement: 'work'
        }
    },
    created() {
        if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
            this.$router.push({ path: 'm' })
            return
        }

        this.getWorks()
    },
    watch: {
        '$route': 'getWorks'
    },
    methods: {
        getWorks() {
            let path = this.$route.path.split('/')[1]
            path || (path = "work")
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
        mouseover(e) {
            e.target.firstChild.className += ' show-desc';
        },
        mouseleave(e) {
            e.target.firstChild.className = 'desc-wrap';
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
                { name: 'description', content: '全文室内设计有限公司' }
            ]
        }
    }
}
</script>
