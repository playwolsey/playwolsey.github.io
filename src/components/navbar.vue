<style>
.navbar-wrap {height:80px;background:rgba(255,255,255,0.94);box-shadow:0px 6px 20px 0px rgba(0,0,0,0.12);position:fixed;z-index:99;left:0;top:0;right:0;}
.navbar-wrap.no-shadow {box-shadow:0 0 0 0;}
.navbar {height:24px;padding:30px 0;margin-bottom:10px;width:1065px;margin:0 auto;}
.navbar .navbar-brand {color:#000;letter-spacing:1.23px;float:left;height:24px;line-height:24px;font-weight:bold;font-size:16px;width:252px;position:relative;}
.navbar .navbar-brand h1 {font-size:16px;position:absolute;}
.navbar .navbar-brand .nav-brand-back {opacity:0;}
.navbar .navbar-brand:hover .nav-brand-back {opacity:1;}
.navbar .navbar-brand:hover .nav-brand-front {opacity:0;}
.navbar .nav {list-style:none;float:right;position:relative;}
.navbar .nav li {float:left;color:#969696;}
.navbar .nav li a {font-size:16px;color:#969696;line-height:24px;padding:0 15px;}
.navbar .nav li:nth-child(4) a {padding-right:0;}
.navbar .nav li a:hover {color:#000;}
.navbar .nav li a.router-link-active {color:#000;}
.navbar .subnav div a {float:none;color:#969696;padding:0 5px 10px;}
.navbar .nav li:nth-child(1) {}
.navbar .nav li:nth-child(1) .tem {display: inline-block; position: absolute; left: -74px;}
.navbar .nav .subnav {height: 24px; line-height: 24px; display: inline-block; width: 6px; overflow: hidden;position: relative;}
.navbar .nav .subnav .inner-wrap {white-space:nowrap;position:absolute;}
.left-silde {animation:tl 1.3s ease;animation-fill-mode:forwards;}
@-webkit-keyframes tl { from {width:6px;} to {width:280px;} }
@keyframes tl { from {width:6px;} to {width:280px;} }
.left-back {animation:lb 1s ease;animation-fill-mode:forwards;}
@-webkit-keyframes lb { from {width:280px;} to {width:6px;} }
@keyframes lb { from {width:280px;} to {width:6px;} }
</style>

<template>
<div id="navbar">
    <div :class="[isWork ? noShadowClass : '', wrapClass]"> 
        <div class="navbar"> 
            <a href="/" class="navbar-brand">
                <h1 class="nav-brand-front">QUANWEN DESIGN OFFICE.</h1>
                <h1 class="nav-brand-back">杭州全文室内设计</h1>
            </a>
            <ul class="nav"> 
                <li @mouseover="mouseover($event)" @mouseleave="mouseleave($event)">
                    <router-link class="tem" to="/work"><span class="nav-icon-text">WORK</span></router-link>
                    <div class="subnav" ref="worka">
                        <div class="inner-wrap">
                            <router-link to="/interior">Interior</router-link>
                            <router-link to="/architecture">Architecture</router-link>
                            <router-link to="/visual">Visual Design</router-link>
                        </div>
                    </div>
                </li>  
                <li><span>/</span><router-link to="/about"><span class="nav-icon-text">ABOUT</span></router-link><span>/</span></li>  
                <li><router-link to="/contact"><span class="nav-icon-text">CONTACT</span></router-link><span>/</span></li>
                <li><router-link to="/job"><span class="nav-icon-text">JOB</span></router-link></li>
            </ul>
        </div>
    </div>
</div>
</template>

<script>
export default {
    name: 'navbar',
    data() {
        return {
            wrapClass: 'navbar-wrap',
            noShadowClass: 'no-shadow',
            isWork: true
        }
    },
    created() {
        this.getIsWork();
        window.onscroll = () => {
            if (window.scrollY > 10) {
                this.noShadowClass = '';
            } else {
                this.noShadowClass = 'no-shadow';
            }
        }
    },
    watch: {
        '$route': 'getIsWork'
    },
    methods: {
        getIsWork() {
            let path = this.$route.path.split('/')[1];
            path || (path = 'work');

            if (path === 'work' || path === 'interior' || path === 'architecture' || path === 'visual') {
                this.isWork = true;
            } else {
                this.isWork = false;
            }
        },
        mouseover(e) {
            this.$refs.worka.className = 'subnav left-silde';
        },
        mouseleave(e) {
            this.$refs.worka.className = 'subnav left-back';
        }
    }
}
</script>
