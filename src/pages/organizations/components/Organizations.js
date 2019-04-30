import { connect } from 'dva';
import { Table, Pagination, Popconfirm, Button } from 'antd';
import { routerRedux } from 'dva/router';
import styles from './Organizations.css';
import { PAGE_SIZE } from '../constants';
import OrganModel from './organizationModel';

function Organizations({ dispatch, list: dataSource, loading, total, page: current }) {

  function deleteHandler(id) {
    dispatch({
      type: 'organizations/remove',
      payload: id,
    });
  }

  function pageChangeHandler(page) {
    dispatch(routerRedux.push({
      pathname: '/organizations',
      query: { page },
    }));
  }

  function editHandler(id, values) {
    dispatch({
      type: 'organizations/patch',
      payload: { id, values },
    });
  }

  function createHandler(values) {
    dispatch({
      type: 'organizations/post',
      'content-type': 'application/json',
      payload: values,
    });
  }

  function getHandler(id) {
    dispatch({
      type: 'organizations/get',
      'content-type': 'application/json',
      payload: id,
    });
  }

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (text, record) => (
       <a onClick={getHandler.bind(null, record.id)}>{text}</a>
      ),
    },
    {
      title: 'Province',
      dataIndex: 'province',
      key: 'province',
    }, {
      title: 'City',
      dataIndex: 'city',
      key: 'city',
    }, {
      title: 'Town',
      dataIndex: 'town',
      key: 'town',
    },
    {
      title: 'Rooms',
      dataIndex: 'room.name',
      key: 'room.name',
    },
    {
      title: 'Operation',
      key: 'operation',
      render: (text, record) => (
        <span className={styles.operation}>
          <OrganModel record={record} onOk={editHandler.bind(null, record.id)}>
            <a>Edit</a>
          </OrganModel>
          <Popconfirm title="Confirm to delete?" onConfirm={deleteHandler.bind(null, record.id)}>
            <a href="">Delete</a>
          </Popconfirm>
        </span>
      ),
    },
  ];

  return (
    <div className={styles.normal}>
      <div>
        <div className={styles.post}>
          <OrganModel record={{}} onOk={createHandler}>
            <Button type="primary">Create Organization</Button>
          </OrganModel>
        </div>
        <Table
          loading={loading}
          columns={columns}
          dataSource={dataSource}
          rowKey={record => record.id}
          pagination={false}
        />
        <Pagination
          className="ant-table-pagination"
          total={total}
          current={current}
          pageSize={PAGE_SIZE}
          onChange={pageChangeHandler}
        />
      </div>
    </div>
  );
}

function mapStateToProps(state) {
  const { list, total, page } = state.organizations;
  return {
    list,
    total,
    page,
    loading: state.loading.models.organizations,
  };
}

export default connect(mapStateToProps)(Organizations);
