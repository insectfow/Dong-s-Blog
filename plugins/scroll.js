import Vue from 'vue';
import VueScroll from 'vuescroll/dist/vuescroll-native';

Vue.use(VueScroll, {
    ops: {
        bar: {
            showDelay: 500,
            onlyShowBarOnScroll: true,
            keepShow: false,
            background: '#c1c1c1',
            opacity: 1,
            hoverStyle: false,
            specifyBorderRadius: false,
            minSize: 0,
            size: '6px',
            disable: false
        },
        vuescroll: {
            mode: 'native',
            sizeStrategy: 'percent',
            locking: true
        },
        scrollPanel: {
            initialScrollY: false,
            initialScrollX: false,
            scrollingX: true,
            scrollingY: true,
            speed: 300,
            easing: undefined,
            verticalNativeBarPos: 'right'
        },
        rail: {
            background: '#01a99a',
            opacity: 0,
            size: '6px',
            specifyBorderRadius: false,
            gutterOfEnds: null,
                gutterOfSide: '2px',
            keepShow: false
        }
    },
})