import * as organizationsService from '../services/organizations';
import { message } from 'antd';

export default {
  namespace: 'organizations',
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
        const { data, headers} = yield call(organizationsService.fetch, { page });
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
      yield call(organizationsService.get, id);
    },
    *remove({ payload: id }, { call, put, select }) {
      yield call(organizationsService.remove, id);
      const page = yield select(state => state.organizations.page);
      yield put({ type: 'fetch', payload: { page } });
    },
    *patch({ payload: { id, values } }, { call, put, select }) {
      yield call(organizationsService.patch, id, values);
      const page = yield select(state => state.organizations.page);
      yield put({ type: 'fetch', payload: { page } });
    },
    *post({ payload: values }, { call, put, select }) {
      try{
      yield call(organizationsService.post, values);
    }
    catch (err){
      message.error(err.message);
    }
    const page = yield select(state => state.organizations.page);
    yield put({ type: 'fetch', payload: { page } });
    },
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname, query }) => {
        if (pathname === '/organizations') {
          dispatch({ type: 'fetch', payload: query });
        }
      });
    },
  },
};
