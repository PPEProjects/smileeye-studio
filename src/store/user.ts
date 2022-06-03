import { defineStore } from 'pinia'
import {inject} from "vue";
import {GET_ME} from "../apollo/queries/user.query";
import {ApolloInstance} from "#types/apollo";
import {DetailMe, DetailMe_detail_me} from "../apollo/queries/__generated__/DetailMe";

type IUser = DetailMe_detail_me | null;

interface IUserStore {
    user: IUser,
    _token: string
}

export const useUserStore = defineStore({
    id: 'user',

    state: (): IUserStore => ({
        user: null,
        _token: ''
    }),

    getters: {
        auth: state => state.user !== null
    },

    actions: {
        setUser(payload: any) {
            this.user = payload
        },

        setToken (token: string) {
            this._token = token
        },

        async getMe () {
            const apollo = inject<ApolloInstance>('apollo')
            try {
                const data = await apollo?.apolloClient?.query<DetailMe>({
                    query: GET_ME
                })
                // @ts-ignore
                this.user = data?.data?.detail_me
            } catch (e) {
                // Logout
                console.log(e)
            }
        },

        logout() {
            this._token = ''
            this.user = null
        }
    }
})
