import Vue from 'vue';
import io from 'socket.io-client';

const socket = io('localhost:3000');

const SocketPlugin = {
    install(Vue) {
        Vue.mixin({
            
        });

        Vue.prototype.$sendMessage = ($payload) => {
            socket.emit('chat', {
                msg: $payload.msg,
                name: $payload.name
            })
        };

        // 인스턴스 메소드 추가
        Vue.prototype.$socket = socket;
    }
};

Vue.use(SocketPlugin);