import { connect } from 'dva';
import { Table, Pagination, Popconfirm, Button } from 'antd';
import { routerRedux } from 'dva/router';
import 'antd/dist/antd.css';
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
      title: '签约事业部*',
      dataIndex: '签约事业部*',
      key: '签约事业部*',
      render: (text, record) => (
       <a onClick={getHandler.bind(null, record.id)}>{text}</a>
      ),
    },
    {
      title: '客户名称*',
      dataIndex: '客户名称*',
      key: '客户名称*',
    }, {
      title: '合同金额*',
      dataIndex: '合同金额*',
      key: '合同金额*',
    },
    {
      title: '签约教室间数',
      dataIndex: '签约教室间数',
      key: '签约教室间数',
    },{
      title: '签订日期*',
      dataIndex: '签订日期*',
      key: '签订日期*',
    },{
      title: '合同状态*',
      dataIndex: '合同状态*',
      key: '合同状态*',
    },{
      title: '签订人*',
      dataIndex: '签订人*',
      key: '签订人*',
    },{
      title: '是否付款',
      dataIndex: '是否付款',
      key: '是否付款',
    },{
      title: '付款日期',
      dataIndex: '付款日期',
      key: '付款日期',
    },{
      title: '机构开课学期',
      dataIndex: '机构开课学期',
      key: '机构开课学期',
    },{
      title: '机构开课年份',
      dataIndex: '机构开课年份',
      key: '机机构开课年份',
    },{
      title: '省',
      dataIndex: '省',
      key: '省',
    },{
      title: '市',
      dataIndex: '市',
      key: '市',
    },
    {
      title: 'Operation',
      key: 'operation',
      fixed: 'right',
      width: 100,
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
        <Table className={styles.tab}
          loading={loading}
          columns={columns}
          dataSource={dataSource}
          rowKey={record => record.id}
          scroll={{ x: 100 }}
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
