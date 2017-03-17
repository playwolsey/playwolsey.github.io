<style>
.mdetail-wrap p {font-weight:600;}
.mdetail-wrap .detail-img-wrap li {margin-bottom:.25rem;}
.mdetail-wrap .detail-img-wrap li img {width:100%;}
.mdetail-wrap .denav  {position:relative;margin:1rem 0;height:1.4rem;}
.mdetail-wrap .denav a {display:inline-block;font-family:Avenir, "Microsoft Yahei";font-weight:600;font-size:.7rem;color:#000;letter-spacing:1.3px;position:absolute;}
.mdetail-wrap .denav .back {width:.98rem;height:.7rem;background:url(/res/img/arrow.png) no-repeat center center;background-size:100% 100%;left:0}
.mdetail-wrap .denav .home {left:50%;margin-left:-1.3rem;}
.mdetail-wrap .denav .top {right:0;}
.mdetail-wrap .copyright {font-size:.45rem;color:#000;border-top:1px solid #DCDCDC;padding:.6rem 0 .8rem;}
</style>

<template>
<div id="detail">
    <div class="mdetail-wrap">
        <article class="m-article">
            <h5 class="m-title">{{details.name}}</h5>
            <h5 class="m-title">{{details.ename}}</h5>
            <section class="m-section">
                <p>DESINGER：{{details.designer}}</p>
                <p>YEAR: {{details.year}}</p>
                <p>CLIENT: {{details.client}}</p>
            </section>
            <section class="m-section">
                <p v-for="desc in details.descs">{{desc}}</p>
            </section>
            <ul class="detail-img-wrap">
                <li v-for="img in details.imgs"><img v-lazy="img"></li>
            </ul>
        </article>

        <div class="denav">
            <a class="back" href="javascript:void(0);" @click="back"></a>
            <router-link class="home" to="/m">HOME</router-link>
            <a class="top" href="javascript:void(0);" @click="scrollToTop">TOP</a>
        </div>

        <div class="copyright">Copyrights of Hangzhou Quanwen Interior Design Co.,Ltd.</div>
    </div>
</div>
</template>

<script>
export default {
    data() {
        return {
            details: {},
            headConfig: {
                complement: '',
                description: '',
                keywords: ''
            }
        }
    },
    created() {
        let id = this.$route.path.split('/detail/')[1];
        this.getDetails(id);
    },
    methods: {
        getDetails(id) {
            this.$http.jsonp('/res/data/' + id + '.json', {
                jsonp: "callback", 
                jsonpCallback: id 
            }, {
                emulateJSON: true
            }).then(response => {
                this.details = response.data
                this.headConfig.complement = response.data.name
                this.headConfig.keywords = response.data.meta.keywords
                this.headConfig.description = response.data.meta.description
                this.$emit('updateHead')
            }, response => {
                console.log(response)
            });
        },
        back() {
            this.$router.go(-1);
        },
        scrollToTop() {
            let scrollStep = -window.scrollY / (800 / 15),

            scrollInterval = setInterval(function() {
                if (window.scrollY != 0) {
                    window.scrollBy(0, scrollStep);
                } else {
                    clearInterval(scrollInterval); 
                }
            }, 15);
        }
    },
    head: {
        title() {
            return {
                inner: '全文室内设计有限公司',
                complement: this.headConfig.complement
            }
        },
        meta() { 
            return [
                { name: 'keywords', content: this.headConfig.keywords },
                { name: 'description', content: this.headConfig.description },
                { name: 'apple-mobile-web-app-capable', content: 'yes' },
                { name: 'apple-touch-fullscreen', content: 'yes' },
                { name: 'apple-mobile-web-app-status-bar-style', content: 'black' },
                { name: 'format-detection', content: 'telephone=no,email=no,address=no' }
            ]
        }
    }
}
</script>
