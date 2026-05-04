// import axios from 'axios';

// // Action Types
// export const SEARCH_REQUEST = 'SEARCH_REQUEST';
// export const SEARCH_SUCCESS = 'SEARCH_SUCCESS';
// export const SEARCH_FAILURE = 'SEARCH_FAILURE';

// // Action Creators
// export interface SearchRequestAction {
//   type: typeof SEARCH_REQUEST;
// }

// export interface SearchSuccessAction {
//   type: typeof SEARCH_SUCCESS;
//   payload: Article[];
// }

// export interface SearchFailureAction {
//   type: typeof SEARCH_FAILURE;
//   payload: string;
// }

// // Thunk for searching articles
// export const searchArticles = (
//   keyword: string,
//   startDate: string,
//   endDate: string,
//   author: string
// ) => {
//   return async (dispatch: any) => {
//     dispatch(searchRequest());

//     try {
//       const response = await axios.get(
//         `http://localhost:8080/api/search?keyword=${keyword}&startDate=${startDate}&endDate=${endDate}&author=${author}`
//       );
//       dispatch(searchSuccess(response.data)); // Dispatch success action with the data
//     } catch (error) {
//       dispatch(searchFailure(error.message)); // Dispatch failure action with error message
//     }
//   };
// };

// // Action Creators Implementation
// export const searchRequest = (): SearchRequestAction => ({
//   type: SEARCH_REQUEST,
// });

// export const searchSuccess = (data: Article[]): SearchSuccessAction => ({
//   type: SEARCH_SUCCESS,
//   payload: data,
// });

// export const searchFailure = (error: string): SearchFailureAction => ({
//   type: SEARCH_FAILURE,
//   payload: error,
// });
