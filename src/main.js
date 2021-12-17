import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import {ApolloClient,createHttpLink,InMemoryCache,} from "@apollo/client/core";
import { createApolloProvider } from "@vue/apollo-option";
import { setContext } from "apollo-link-context";
//SweetAlert2
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';


const httpLink = createHttpLink({
    uri: 'https://api-gateway-reciclaje.herokuapp.com/'
});

const authLink = setContext((_, { headers }) => {
    return {
    headers: {
        ...headers,
            Authorization: localStorage.getItem("token_access") || ""
            }
        }
})

const apolloClient = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache()
    })

const apolloProvider = new createApolloProvider({
    defaultClient: apolloClient
    })

createApp(App).use(VueSweetalert2).use(router).use(apolloProvider).mount('#app')
