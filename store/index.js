export const state = () => ({
    path: 'news',
    tasks: [],
    nNewList: [],
    searchData: '',
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
            data = 'samsung';
        }
        console.log('검색한 데이터:', data);
        await this.$axios.get(`http://127.0.0.1:3000/search/news?query=${data}` ).then( res => {
           context.commit('setNaverNews', res.data, data);
        } ).catch( err => {
            console.error(err);
        } )
    }
}