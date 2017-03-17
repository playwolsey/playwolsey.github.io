<style>
.about-wrap {width:492px;}
.about-wrap:last-child {margin-left:79px;}
.about-wrap .m-member {width:150px;float:left;margin-right:14px;}
.about-wrap .m-member img {width:150px;}
.about-wrap .m-member .name {line-height:36px;font-weight:600;}
.about-wrap .m-member .desc {color:#969696;line-height:23px;}
.about-wrap .m-partner {width:78px;float:left;margin-right:20px;text-align:center;}
.about-wrap .m-partner img {width:78px;}
.about-wrap .m-partner p {line-height:30px;}
.about-wrap .m-purl a {display:block;text-decoration:underline;color:#000;}
</style>

<template>
<div id="about">
    <div class="article-wrap about-wrap">
        <article class="m-article">
            <h5 class="m-title">杭州全文室内设计</h5>
            <div class="m-line"></div>
            <section class="m-section">
                <p>全文室内设计事务所是一家集合中国美术学院建筑、室内、环艺、平面设计系师生新锐力量的空间设计机构。</p>
            </section>
            <section class="m-section">
                <p>公司创立于2015年，致力于室内空间的设计与研究，注重 简约与质朴的设计风格；接受室内外空间规划设计、商业品牌策划、硬装、软装设计及家具家居采购等一体化设计服务。以简约、建筑美感和空间规划为设计重点，致力于中国传统美学精神和现代设计语言的新建筑室内风格。工作室业务范围目前以精品酒店、服装店铺、餐厅、咖啡馆、办公空间、展示空间为主。</p>
            </section>
        </article>
        <article class="m-article">
            <h5 class="m-title">团队成员</h5>
            <section class="m-section">
                <div class="m-member">
                    <img v-lazy="group[0]" alt="sunquanwen">
                    <p class="name">孙全文</p>
                    <p class="desc">主创室内设计师，毕业于中国美术学院环境艺术专业。擅长复合空间设计，小型建筑设计改造 。</p>
                </div>
                <div class="m-member">
                    <img v-lazy="group[1]" alt="yangrourou">
                    <p class="name">杨肉肉</p>
                    <p class="desc">软装设计师／平面视觉设计师，毕业于浙江理工大学工业设计专业。曾参与绿城、朗诗、融创等样板房软装设计，高级住宅软装设计，担任虾米音乐专题设计师等。</p>
                </div>
                <div class="m-member">
                    <img v-lazy="group[2]" alt="zhoujian">
                    <p class="name">周简</p>
                    <p class="desc">中国美术学院建筑学院教师，毕业于北京大学建筑研究生院，擅长中国本土建筑设计改造，复兴本土融通自然、城市、建筑和景观的整体营造方式 。</p>
                </div>
            </section>
        </article>
        <article class="m-article u-clear" style="padding-top:40px;height:247px;">
            <h5 class="m-title">战略联盟</h5>
            <section class="m-section">
                <div class="m-partner">
                    <img v-lazy="partner[0]" alt="rebau">
                    <p>RE BAU设计</p>
                </div>
                <div class="m-partner">
                    <img v-lazy="partner[1]" alt="suzao">
                    <p>杭州素造设计</p>
                </div>
            </section>
        </article>
    </div>

    <div class="article-wrap about-wrap">
        <article class="m-article">
            <h5 class="m-title">QUANWEN DESIGN OFFICE</h5>
            <div class="m-line"></div>
            <section class="m-section">
                <p>Quan Wen Interior Design is specialized in room design with talents designers from China Academy of Art in Construction, Interior Design,  Environmental and Arts Design and Graphic Design professionals.</p>
            </section>
            <section class="m-section">
                <p>Started in 2015, Quan Wen dedicates to interior designs and explorations which emphasizes on simple and plain styles. Its business scope covers interior and exterior design, business plan, home furnishing design and household furniture purchasing. The simple architectural aesthetic feeling and space planning as its key points which devotes to Chinese traditional aesthetic spirits and modern interior design styles.Main business covers boutique hotels, clothes shops, restaurants, coffee shops, offices and exhibition rooms.</p>
            </section>
        </article>
        <article class="m-article">
            <section class="m-section">
                <div class="m-member">
                    <p class="name">Sun Quanwen</p>
                    <p class="desc">Main Interior Designer, majored in Environmental and Arts Design, graduated from China Academy of Art, is specialized in composite space design and architecture design and reform in miniature.</p>
                </div>
                <div class="m-member">
                    <p class="name">Yang Roiroi</p>
                    <p class="desc">Home furnishing design and graphic visual designers, graduated from Zhejiang Sci-Tech University, majored in Industrial Design, has been engaged in samples soft design of Lv City, Lang Shi and Rong Chuang, superior residential soft outfit design as well as project designer of Xiami.</p>
                </div>
                <div class="m-member">
                    <p class="name">Zhou Jian</p>
                    <p class="desc">A teacher of China Academy of Art, graduated from Graduate School of Peking University, specialized in Chinese traditional architecture design and modification and pursuit an overall pattern of integrated nature, city, architecture and landscape features.</p>
                </div>
            </section>
        </article>
        <!--<article class="m-article u-clear" style="padding-top:40px;">
            <section class="m-section">
                <div class="m-purl">
                    <a href="http://www.rebau.cn/" target="_blank">REBAU design</a>
                    <a href="http://www.sozoer.com/headSoZo" target="_blank">Hangzhou SOZO design</a>
                </div>
            </section>
        </article>-->
    </div>
</div>
</template>

<script>
export default {
    data() {
        return {
            group: [ "/res/img/qw.jpg", "/res/img/yrr.jpg", "/res/img/zj.jpg" ],
            partner: [ "/res/img/rebau.jpg", "/res/img/suzao.jpg" ]
        }
    },
    head: {
        title() {
            return {
                inner: '全文室内设计有限公司',
                complement: '关于我们' 
            }
        }
    }
}
</script>
