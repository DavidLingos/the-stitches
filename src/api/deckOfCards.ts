import axios, { AxiosResponse } from 'axios';
import { ShuffleNewDeckResponse } from '../interfaces/deckOfCards';

const DeckOfCardsClient = axios.create({
  baseURL: 'https://deckofcardsapi.com/api/deck/',
})

export const shuffleTheCards = (): Promise<AxiosResponse<ShuffleNewDeckResponse>> => DeckOfCardsClient.get('/new/shuffle');