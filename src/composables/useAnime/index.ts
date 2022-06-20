import { inject } from 'vue'
import { AnimeInstance } from '#types/anime'
import { ANIME_CONSTANT } from '@plugins/animejs'

export const useAnime = (): AnimeInstance => {
  // @ts-ignore
  return inject(ANIME_CONSTANT)!
}
