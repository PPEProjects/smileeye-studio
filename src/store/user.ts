import { defineStore } from 'pinia'
import {GET_ME} from "#apollo/queries/user.query";
import {DetailMe, DetailMe_detail_me} from "#apollo/queries/__generated__/DetailMe";
import {useSmileeye} from "#apollo/client/smileeye";

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
            const smileeye = useSmileeye()
            try {
                const data = await smileeye.query<DetailMe>({
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
