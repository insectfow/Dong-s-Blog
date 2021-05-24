export const state = () => ({
    path: 'news',
    tasks: [],
    nNewList: [],
    searchData: '',
    campaignCode: 'r-22310230123',
    influencerId: 'ehdgus96',
    clientId: 'ehdgus11',
    brandIdx:2302,
    highClassIdx:1222,
    middleClassIdx:120,
    issueIdx:0,
    contentIdx:234,
    fileForm: [
        {
            id: 0,
            name: '인플루언서 모집가이드 메인 사진',
            data: 'campaignCode-g-0',
            width: 450,
            height: 508
        },
        {
            id: 1,
            name: '인플루언서 모집가이드 상세1',
            data: 'campaignCode-g-1',
            width: 360,
            height: 670
        },
        {
            id: 2,
            name: '인플루언서 모집가이드 상세2',
            data: 'campaignCode-g-2',
            width: 360,
            height: 670
        },
        {
            id: 3,
            name: '인플루언서 모집가이드 상세3',
            data: 'campaignCode-g-3',
            width: 360,
            height: 670
        },
        {
            id: 4,
            name: '인플루언서 모집가이드 상세4',
            data: 'campaignCode-g-4',
            width: 360,
            height: 670
        },
        {
            id: 5,
            name: '인플루언서 모집가이드 포스팅 참고사례',
            data: 'campaignCode-g-5',
            width: 450,
            height: 300
        },
        {
            id: 6,
            name: '공구샵 개설 메인이미지',
            data: 'campaignCode-s-0',
            width: 450,
            height: 508
        },
        {
            id: 7,
            name: '공구샵 상품 소개1',
            data: 'campaignCode-s-1',
            width: 360,
            height: 670
        },
        {
            id: 8,
            name: '공구샵 상품 소개2',
            data: 'campaignCode-s-2',
            width: 360,
            height: 670
        },
        {
            id: 9,
            name: '공구샵 상품 소개3',
            data: 'campaignCode-s-3',
            width: 360,
            height: 670
        },
        {
            id: 10,
            name: '공구샵 상품 소개4',
            data: 'campaignCode-s-4',
            width: 360,
            height: 670
        },
        {
            id: 11,
            name: '공구샵 상품 소개 디테일',
            data: 'campaignCode-s-5-idx',
            width: 450,
            height: 300 
        },
        {
            id: 12,
            name: '광고주 브랜드 대표이미지',
            data: 'clientId-brandIdx-b-0',
            width: 500,
            height: 500 
        },
        {
            id: 13,
            name: '광고주 브랜드 로고',
            data: 'clientId-brandIdx-b-1',
            width: 140,
            height: 140 
        },
        {
            id: 14,
            name: '캠페인 가이드 작성 콘텐츠 예시 이미지',
            data: 'campaignCode-highClassIdx-middleClassIdx-issueIdx-contentIdx-idx', // issueIdx 0은 사전이슈잉 1은 공구포스팅용
            width: 450,
            height: 300 
        }
    ]
})

export const mutations = {
    getPath(state, data){
        state.path = data;
    },
    addTask(state, data){
        if(!data){
            return
        }
        state.tasks.push( {
            name: data,
            checked: false,
            del: ''
        });
        state.tasks.name = '';
    },
    delTask(state, data){
        state.tasks.splice(state.tasks.indexOf(data), 1);
    },
    checkTask(state, data){
        state.tasks[data].checked = !state.tasks[data].checked;
    },
    setNaverNews(state, data, searchData){
        state.nNewList = data.items;
        state.searchData = searchData;
    }
}
export const actions = {
    fetchPath(context, data) {
        context.commit('getPath', data)
    },
    async fetchNews(context, data){
        if(!data){
            data = '비트코인';
        }
        console.log('검색한 데이터:', data);
       
        await this.$axios.get(`api/search/news?query=${data}`).then( res => {
           context.commit('setNaverNews', res.data, data);
        } ).catch( err => {
            console.error(err);
        } )
    }
}
