import * as departmentsService from '../services/departments';
import { message } from 'antd';

export default {
  namespace: 'departments',
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
        const { data, headers} = yield call(departmentsService.fetch, { page });
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
      yield call(departmentsService.get, id);
    },
    *remove({ payload: id }, { call, put, select }) {
      yield call(departmentsService.remove, id);
      const page = yield select(state => state.departments.page);
      yield put({ type: 'fetch', payload: { page } });
    },
    *patch({ payload: { id, values } }, { call, put, select }) {
      try{
        console.log('11wwwww1');
        const res = yield call(departmentsService.patch, id, values);
        console.log('111', res);
      }catch(err){
        message.error(err.message);
      }
      const page = yield select(state => state.departments.page);
      yield put({ type: 'fetch', payload: { page } });
    },
    *post({ payload: values }, { call, put, select }) {
      try{
      yield call(departmentsService.post, values);
    }
    catch (err){
      message.error(err.message);
    }
    const page = yield select(state => state.departments.page);
    yield put({ type: 'fetch', payload: { page } });
    },
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname, query }) => {
        if (pathname === '/departments') {
          dispatch({ type: 'fetch', payload: query });
        }
      });
    },
  },
};
