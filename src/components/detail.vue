<style>
.detail-article-wrap .m-section {width:500px;}
.detail-img-wrap {margin-top:30px;}
.detail-img-wrap img {width:700px;margin:10px 0;}
#detail .copyright {color:#000;border-top:1px solid #DCDCDC;padding:20px 0 30px;margin-top:45px;}
.swiper-wrap {width:700px;margin:80px 0 30px;position:relative;}
.swiper-wrap img {width:213px;height:213px;}
.swiper-wrap .inner {position:absolute;left:45px;top:10px;font-size:14px;font-weight:600;}
.swiper-wrap .inner-newer {left:45px;}
.swiper-wrap .inner-older {left:-60px;}
div.swiper-button-next, div.swiper-button-prev {width:32px;height:32px;background-size:32px 32px;position:absolute;top:-20px;}
div.swiper-button-next {background-image:url(/res/img/next.png);}
div.swiper-button-prev {background-image:url(/res/img/back.png);}
/*.swiper-slide-next + div, .swiper-slide-active {-webkit-filter:grayscale(100%);-moz-filter:grayscale(100%);-ms-filter:grayscale(100%);-o-filter:grayscale(100%);filter:grayscale(100%);filter:gray;}*/
.swiper-slide {-webkit-filter:grayscale(100%);-moz-filter:grayscale(100%);-ms-filter:grayscale(100%);-o-filter:grayscale(100%);filter:grayscale(100%);filter:gray;}
.swiper-slide.current, .swiper-slide:hover {-webkit-filter:grayscale(0);-moz-filter:grayscale(0);-ms-filter:grayscale(0);-o-filter:grayscale(0);filter:grayscale(0);filter:initial;}
.swiper-slide.current .detail-desc-wrap, .swiper-slide:hover .detail-desc-wrap {color:#000;}
.detail-desc-wrap {color:#969696;line-height:18px;margin-top:16px;}
.detail-desc-wrap .name {font-size:13px;font-weight:600;}
.detail-desc-wrap .year {font-size:12px;font-style:italic;}
</style>

<template>
<div id="detail">
    <div class="article-wrap detail-article-wrap">
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
        <div class="swiper-wrap">
            <swiper :options="swiperOption" ref="detailSwiper">
                <swiper-slide v-for="work in works" :class="work.current">
                    <router-link :to="{name:'detail', params: {id:work.id}}">
                        <img :src="work.cover">
                        <div class="detail-desc-wrap">
                            <p class="name u-ellipsis">{{work.desc.ename}}</p>
                            <p class="year">{{work.desc.tag.split(' ')[0]}}</p>
                        </div>
                    </router-link>
                </swiper-slide>
            </swiper>
            <div class="swiper-button-prev" slot="button-prev"><p class="inner inner-newer">NEWER</p></div>
            <div class="swiper-button-next" slot="button-next"><p class="inner inner-older">OLDER</p></div>
            <div class="copyright">Copyrights of Hangzhou Quanwen Interior Design C,Ltd.</div>
        </div>

    </div>
</div>
</template>

<script>
import { swiper, swiperSlide } from 'vue-awesome-swiper'

export default {
    data() {
        return {
            works: {},
            details: {},
            id: '',
            swiperOption: {
                notNextTick: true,
                nextButton: '.swiper-button-next',
                prevButton: '.swiper-button-prev',
                slidesPerView: 3,
                spaceBetween: 30
            },
            headConfig: {
                complement: '',
                description: '',
                keywords: ''
            }
        }
    },
    watch: {
        //'$route': 'getWorks'
        $route(data, old) {
            this.id = this.$route.path.split('/detail/')[1];
            this.getWorks()
            this.getDetails(this.id)
        }
    },
    created() {
        this.id = this.$route.path.split('/detail/')[1];

        if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
            this.$router.push({ name: 'mdetail', params: { id: this.id }})
        }

        this.getDetails(this.id);
        this.getWorks();
    },
    computed: {
        swiper() {
            return this.$refs.detailSwiper.swiper
        }
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
        getWorks() {
            this.$http.jsonp('/res/data/work.json', {
                jsonp: "callback", 
                jsonpCallback: 'work' 
            }, {
                emulateJSON: true
            }).then(response => {
                this.works = response.data.works
                for (let [index, work] of this.works.entries()) {
                    if (work.id === this.id) {
                        work.current = 'current'
                        this.swiperOption.initialSlide = (index -1) < 0 ? 0 : (index -1) 
                        this.swiper.slideTo(this.swiperOption.initialSlide, 1000, false)
                    } else {
                        work.current = ''
                    }
                }
            }, response => {
                console.log(response)
            });
        },
    },
    components: { swiper, swiperSlide },
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
                { name: 'description', content: this.headConfig.description }
            ]
        }
    }
}
</script>
