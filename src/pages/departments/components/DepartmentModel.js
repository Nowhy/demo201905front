import { Component } from 'react';
import { Modal, Form, Input } from 'antd';

const FormItem = Form.Item;

class DepartmentEditModal extends Component {

  constructor(props) {
    super(props);
    this.state = {
      visible: false,
    };
  }

  showModalHandler = (e) => {
    if (e) e.stopPropagation();
    this.setState({
      visible: true,
    });
  };

  hideModelHandler = () => {
    this.setState({
      visible: false,
    });
  };

  okHandler = () => {
    const { onOk } = this.props;
    this.props.form.validateFields((err, values) => {
      if (!err) {
        onOk(values);
        this.hideModelHandler();
      }
    });
  };

  render() {
    if(this.props.record==={}){
      return;
    }
    const { children } = this.props;
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 14 },
    };

    return (
      <span>
        <span onClick={this.showModalHandler}>
          { children }
        </span>
        <Modal
          title="Update"
          visible={this.state.visible}
          onOk={this.okHandler}
          onCancel={this.hideModelHandler}
        >
          <Form onSubmit={this.okHandler}>
            <FormItem
              {...formItemLayout}
              label="签约事业部*"
            >
              {
                getFieldDecorator('签约事业部*', {
                  initialValue: this.props.record['签约事业部*'],
                })(<Input />)
              }
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="客户名称*"
            >
              {
                getFieldDecorator('客户名称*', {
                  initialValue: this.props.record['客户名称*'],
                })(<Input />)
              }
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="合同金额*"
            >
              {
                getFieldDecorator('合同金额*', {
                  initialValue: this.props.record['合同金额*'],
                })(<Input />)
              }
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="签约教室间数"
            >
              {
                getFieldDecorator('签约教室间数', {
                  initialValue: this.props.record['签约教室间数'],
                })(<Input />)
              }
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="签订日期*"
            >
              {
                getFieldDecorator('签订日期*', {
                  initialValue: this.props.record['签订日期*'],
                })(<Input />)
              }
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="合同状态*"
            >
              {
                getFieldDecorator('合同状态*', {
                  initialValue: this.props.record['合同状态*'],
                })(<Input />)
              }
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="签订人*"
            >
              {
                getFieldDecorator('签订人*', {
                  initialValue: this.props.record['签订人*'],
                })(<Input />)
              }
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="是否付款"
            >
              {
                getFieldDecorator('是否付款', {
                  initialValue: this.props.record['是否付款'],
                })(<Input />)
              }
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="付款日期"
            >
              {
                getFieldDecorator('付款日期', {
                  initialValue: this.props.record['付款日期'],
                })(<Input />)
              }
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="机构开课学期"
            >
              {
                getFieldDecorator('机构开课学期', {
                  initialValue: this.props.record['机构开课学期'],
                })(<Input />)
              }
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="机构开课年份"
            >
              {
                getFieldDecorator('机构开课年份', {
                  initialValue: this.props.record['机构开课年份'],
                })(<Input />)
              }
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="省"
            >
              {
                getFieldDecorator('省', {
                  initialValue: this.props.record['省'],
                })(<Input />)
              }
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="市"
            >
              {
                getFieldDecorator('市', {
                  initialValue: this.props.record['市'],
                })(<Input />)
              }
            </FormItem>
          </Form>
        </Modal>
      </span>
    );
  }
}

export default Form.create()(DepartmentEditModal);
