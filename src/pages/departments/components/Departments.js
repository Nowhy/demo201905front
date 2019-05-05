import { connect } from 'dva';
import { Table, Pagination, Popconfirm, Button } from 'antd';
import { routerRedux } from 'dva/router';
import styles from './Departments.css';
import { PAGE_SIZE } from '../constants';
import DepartmentModel from './DepartmentModel';

function Departments({ dispatch, list: dataSource, loading, total, page: current }) {

  function deleteHandler(id) {
    dispatch({
      type: 'departments/remove',
      payload: id,
    });
  }

  function pageChangeHandler(page) {
    dispatch(routerRedux.push({
      pathname: '/departments',
      query: { page },
    }));
  }

  function editHandler(id, values) {
    dispatch({
      type: 'departments/patch',
      payload: { id, values },
    });
  }

  function createHandler(values) {
    dispatch({
      type: 'departments/post',
      'content-type': 'application/json',
      payload: values,
    });
  }

  function getHandler(id) {
    dispatch({
      type: 'departments/get',
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
          <DepartmentModel record={record} onOk={editHandler.bind(null, record.id)}>
            <a>Edit</a>
          </DepartmentModel>
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
          <DepartmentModel record={{}} onOk={createHandler}>
            <Button type="primary">Create departments</Button>
          </DepartmentModel>
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
  const { list, total, page } = state.departments;
  return {
    list,
    total,
    page,
    loading: state.loading.models.departments,
  };
}

export default connect(mapStateToProps)(Departments);
