<style>
.mnavbar-wrap {width:14.2rem;margin:0 auto;}
.mnavbar-wrap .mnavbar {font-size:.9rem;line-height:1rem;letter-spacing:1px;padding:.36rem 0;position:relative;border-bottom:8px solid #000000;}
.mnavbar-wrap .mnavbar .back {width:1.6rem;height:1.6rem;background:url(/res/img/back.png) no-repeat center center;background-size:100% 100%;margin:.3rem 0 1.1rem;}
.mnavbar-wrap .mnavbar .menu {font-size:.3375rem;position:absolute;right:0;bottom:.33rem;cursor:pointer;}
.mnavbar-wrap .mnavbar .menu span {width:.925rem;height:0.1125rem;background:#000;margin-bottom:.196rem;-webkit-transition:all 0.3s ease;-moz-transition:all 0.3s ease;transition:all 0.3s ease;display:block;cursor:pointer;}
.menu.open span:nth-child(1) {-webkit-transform:rotate(45deg);transform:rotate(45deg);-webkit-transform-origin:left top;transform-origin:left top;}
.menu.open span:nth-child(2) {opacity:0;}
.menu.open span:nth-child(3) {-webkit-transform:rotate(-45deg);transform: rotate(-45deg);-webkit-transform-origin:left bottom;transform-origin:left bottom;}
.mnavbar-wrap .menubox {font-size:1.35rem;line-height:1.35rem;margin-top:.5rem;font-weight:600;opacity:0;}
.mnavbar-wrap .menubox a {color:#DCDCDC;}
.mnavbar-wrap .menubox a.router-link-active {color:#000;}
.mnavbar-wrap .menubox.show {animation:fadeIn 1s ease;-webkit-animation:fadeIn 1s ease;animation-fill-mode:forwards;}
.mnavbar-wrap .menubox.hidden {animation:fadeOut 1s ease;-webkit-animation:fadeOut 1s ease;animation-fill-mode:forwards;}
</style>

<template>
<div id="mnavbar">
    <div class="mnavbar-wrap">
        <div class="mnavbar"> 
            <div>
                <h1 v-if="!isDetail&&!isWork">QUANWEN<br>DESIGN<br>OFFICE.</h1>
                <div v-if="!isDetail" :class="[show ? openClass : '', menuClass]" @click="showNavbar">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </div>
            <div class="back" v-if="isDetail||isWork" @click="back"></div>
        </div>
        <div class="menubox" ref="menubox">
            <ul v-if="!isWork">
                <li><router-link to="/m/work">Work</router-link></li>
                <li><router-link to="/m/about">About</router-link></li>
                <li><router-link to="/m/contact">Contact</router-link></li>
                <li><router-link to="/m/job">Job</router-link></li>
            </ul>
            <ul v-if="isWork">
                <li><router-link to="/m/interior">Interior</router-link></li>
                <li><router-link to="/m/architecture">Architecture</router-link></li>
                <li><router-link to="/m/visual">Visual Design</router-link></li>
                <li><router-link to="/m/all">All</router-link></li>
            </ul>
        </div>
    </div>
</div>
</template>

<script>
export default {
    name: 'mnavbar',
    data() {
        return {
            menuClass: 'menu',
            openClass: 'open',
            show: false,
            scroll: false,
            isWork: false,
            isDetail: false
        }
    },
    watch: {
        $route(data, old) {
            let path = this.$route.path;
            this.getIsDetail()
            this.show = false
            this.scroll = false
            this.$refs.menubox.className = 'menubox'

                this.$emit('slideDown', this.scroll)
        }
    },
    created() {
        this.getIsDetail()
    },
    methods: {
        getIsDetail() {
            let path = this.$route.path;

            if (path.indexOf('detail') > -1) {
                this.isDetail = true
                this.show = false
            } else {
                this.isDetail = false;
            }

            if (path.indexOf('work') > -1 || path.indexOf('interior') > -1 || path.indexOf('architecture') > -1 || path.indexOf('visual') > -1 || path.indexOf('all') > -1) {
                this.isWork = true
            } else {
                this.isWork = false
            }
        },
        back() {
            let path = this.$route.path;

            if (path.indexOf('detail') > -1) {
                this.$router.go(-1)
            }

            if (path.indexOf('work') > -1 || path.indexOf('interior') > -1 || path.indexOf('architecture') > -1 || path.indexOf('visual') > -1 || path.indexOf('all') > -1) {
                this.$router.push({path: '/m'})
            }
        },
        showNavbar() {
            this.show = !this.show
            this.scroll = !this.scroll
            this.$emit('slideDown', this.scroll)

            if (this.scroll) {
                this.$refs.menubox.className = 'menubox show'
            } else {
                this.$refs.menubox.className = 'menubox hidden'
            }
        }
    }
}
</script>
