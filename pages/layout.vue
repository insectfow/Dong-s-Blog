<template>
        <div class="layout-page">
            <div class="layout">
                <vue-scroll>
                    <header class="header">header</header>
                    <section class="section">section1</section>
                    <section class="section">section1</section>
                    <section class="section">section1</section>
                    <section class="section">section1</section>
                </vue-scroll>
            </div>
        </div>
</template>

<script>
export default {
    methods: {
    }
}
</script>

<style>

.layout-page {
    position: relative;
    width: 100%;
    margin: 0 auto;
    text-align: center;
}
.layout {
    overflow: auto;
    width: 100%;
    height: 100vh;
}
.layout .header {
    width: 100%;
    height: 60px;
    background: #fff;
    box-shadow: 1px 0 10px rgba(0,0,0,.2);
    position: sticky;
    top: 0;
}
.layout .section {
    width: 100%;
    height: calc(100vh - 60px);
}


</style>