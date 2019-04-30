import { Component } from 'react';
import { Modal, Form, Input } from 'antd';

const FormItem = Form.Item;

class RoomEditModal extends Component {

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
          title="Edit Room"
          visible={this.state.visible}
          onOk={this.okHandler}
          onCancel={this.hideModelHandler}
        >
          <Form onSubmit={this.okHandler}>
            <FormItem
              {...formItemLayout}
              label="Name"
            >
              {
                getFieldDecorator('name', {
                  initialValue: '',
                })(<Input />)
              }
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="Status"
            >
              {
                getFieldDecorator('status', {
                  initialValue: '开课',
                })(<Input />)
              }
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="Address"
            >
              {
                getFieldDecorator('address', {
                  initialValue: '',
                })(<Input />)
              }
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="Organization"
            >
              {
                getFieldDecorator('organization', {
                  initialValue: null,
                })(<Input />)
              }
            </FormItem>
          </Form>
        </Modal>
      </span>
    );
  }
}

export default Form.create()(RoomEditModal);
