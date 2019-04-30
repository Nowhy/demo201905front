import { connect } from 'dva';
import { Table, Pagination, Popconfirm, Button } from 'antd';
import { routerRedux } from 'dva/router';
import styles from './Rooms.css';
import { PAGE_SIZE } from '../constants';
import RoomModel from './RoomModel';

function Rooms({ dispatch, list: dataSource, loading, total, page: current }) {

  function deleteHandler(id) {
    dispatch({
      type: 'rooms/remove',
      payload: id,
    });
  }

  function pageChangeHandler(page) {
    dispatch(routerRedux.push({
      pathname: '/rooms',
      query: { page },
    }));
  }

  function editHandler(id, values) {
    dispatch({
      type: 'rooms/patch',
      payload: { id, values },
    });
  }

  function createHandler(values) {
    dispatch({
      type: 'rooms/post',
      'content-type': 'application/json',
      payload: values,
    });
  }

  function getHandler(id) {
    dispatch({
      type: 'rooms/get',
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
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
    }, {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: 'Organization',
      dataIndex: 'organization.name',
      key: 'organization.name',
    },
    {
      title: 'Operation',
      key: 'operation',
      render: (text, record) => (
        <span className={styles.operation}>
          <RoomModel record={record} onOk={editHandler.bind(null, record.id)}>
            <a>Edit</a>
          </RoomModel>
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
          <RoomModel record={{}} onOk={createHandler}>
            <Button type="primary">Create Room</Button>
          </RoomModel>
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
  const { list, total, page } = state.rooms;
  return {
    list,
    total,
    page,
    loading: state.loading.models.rooms,
  };
}

export default connect(mapStateToProps)(Rooms);
