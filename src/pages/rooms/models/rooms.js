import * as roomsService from '../services/rooms';
import { message } from 'antd';

export default {
  namespace: 'rooms',
  state: {
    list: [],
    total: null,
    page: null,
  },
  reducers: {
    save(state, { payload: { data: list, total, page } }) {
     const a ={ ...state, list, total, page };
     return a;
    },
  },
  effects: {
    *fetch({ payload: { page = 1 } }, { call, put }) {
        const { data, headers} = yield call(roomsService.fetch, { page });
        yield put({
          type: 'save',
          payload: {
            data,
            total: parseInt(headers['x-total-count'], 10),
            page: parseInt(page, 10),
          },
        });
    },
    *get({ payload: id }, { call }) {
      yield call(roomsService.get, id);
    },
    *remove({ payload: id }, { call, put, select }) {
      yield call(roomsService.remove, id);
      const page = yield select(state => state.rooms.page);
      yield put({ type: 'fetch', payload: { page } });
    },
    *patch({ payload: { id, values } }, { call, put, select }) {
      yield call(roomsService.patch, id, values);
      const page = yield select(state => state.rooms.page);
      yield put({ type: 'fetch', payload: { page } });
    },
    *post({ payload: values }, { call, put, select }) {
      try{
      yield call(roomsService.post, values);
    }
    catch (err){
      message.error(err.message);
    }
    const page = yield select(state => state.rooms.page);
    yield put({ type: 'fetch', payload: { page } });
    },
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname, query }) => {
        if (pathname === '/rooms') {
          dispatch({ type: 'fetch', payload: query });
        }
      });
    },
  },
};
