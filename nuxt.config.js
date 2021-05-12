
export default {
    head: {
        htmlAttrs: {
            lang: 'ko',
        },
        title: "Dong's blog",
        meta: [
            { charset: 'utf-8' },
            {
                property: 'og:url',
                content: 'https://naver.com/'
            },
            {
                property: 'og:title',
                content: 'dong blog'
            },
            {
                name: 'viewport',
                content: 'width=device-width'
            },
            {
                name: 'format-detection',
                content: 'telephone=no'
            },
            {
                name: 'mobile-web-app-capable',
                content: 'yes'
            }
        ],
        link: [{ rel: 'icon', type: 'image/x-icon', href: '/icon.png' }],
        script: [{src: 'https://use.fontawesome.com/9b80b23575.js'}
        ]
    },
    // 컴포넌트 자동으로 가져오기
    // components: true // true or false
    router: {
    },
    server : {
        host: '0.0.0.0',
        port: '3000'
    },
    components: {
        dirs: [
            '~/components'
          ]
    },
    loading: '~/components/modules/LoadingBar.vue',
    generate: {
        dir: 'generate'
    },
    // target: 'static', // 정적 생성 사이트 배포
    target: 'server',
    // ssr: true,
    mode: 'universal',
    // manifest: {
    //     name: 'Dong_Blog',
    //     short_name: 'Dong Blog',
    //     start_url: '/?utm_source=homescreen',
    //     display: 'standalone',
    //     background_color: '#000'
    // },
    // workbox: {
    //     offline: false,
    //     runtimeCaching: [
    //       {
    //         urlPattern: "/*",
    //         handler: "networkFirst",
    //         method: "GET"
    //       }
    //     ]
    // },
    // serverMiddleware : [ '~/api/index.js'],
    modules: [
        '@nuxtjs/axios', '@nuxtjs/proxy'
    ],
    css: [
        '@/assets/css/reset.css'
    ],
    serverMiddleware: [
        { path: '/api', handler: '@/static/api/index.js' },
    ],
    // axios: {
    //     baseUrl: 'https://master.d9ypdpedk0pao.amplifyapp.com:8085'
    // },
    proxy: {
        '/api' : {
            target : 'http://13.125.22.192:3000/api',
            changeOrigin: true,
            pathRewrite: {
                '^/api': ''
            }
        }
    },
    outputDir: '../static/api/',
    axios: {
        proxy: true
    },
    plugins: [
        { src: '~/plugins/croppie.js', ssr: false }
    ]
    // io: {

    // }
    // 'nuxt-socket-io',

}
