import React , {Component}  from 'react';
import { Upload,Form, Icon, message,Row,Col,Button,Input} from 'antd';
const FormItem = Form.Item;

function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
}

function beforeUpload(file) {
  const isJPG = file.type === 'image/jpeg';
  if (!isJPG) {
    message.error('You can only upload JPG file!');
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('Image must smaller than 2MB!');
  }
  return isJPG && isLt2M;
}

class Avatar extends React.Component {
  state = {
    loading: false,
  };

  handleChange = (info) => {
    if (info.file.status === 'uploading') {
      this.setState({ loading: true });
      return;
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, imageUrl => this.setState({
        imageUrl,
        loading: false,
      }));
    }
  }
  
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  }
  render() {
    const uploadButton = (
      <div>
        <Icon type={this.state.loading ? 'loading' : 'plus'} />
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    const imageUrl = this.state.imageUrl;
    return (
      <Upload
        name="avatar"
        listType="picture-card"
        className="avatar-uploader"
        showUploadList={false}
        action="//jsonplaceholder.typicode.com/posts/"
        beforeUpload={beforeUpload}
        onChange={this.handleChange}
      >
        {imageUrl ? <img src={imageUrl} alt="avatar" /> : uploadButton}
      </Upload>
    );
  }
}

class uploadPhoto extends React.Component{
    state = {
        expand: false,
      };
    
      handleSearch = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
          console.log('Received values of form: ', values);
        });
      }
    
      handleReset = () => {
        this.props.form.resetFields();
      }
    
      toggle = () => {
        const { expand } = this.state;
        this.setState({ expand: !expand });
      }
      getFields() {
        const { getFieldDecorator } = this.props.form;
        const children = [];
        for (let i = 0; i < 10; i++) {
          children.push(
            <Col span={8} key={i}>
              <FormItem label={`Field ${i}`} labelCol={{span:4}}>
                {getFieldDecorator(`field-${i}`, {
                  rules: [{
                    required: true,
                    message: 'Input something!',
                  }],
                })(
                  <Avatar/>
                )}
              </FormItem>
            </Col>
          );
        }
        return children;
      }
    
    render(){
        return(
            <Form>
                <Row gutter={24}>{this.getFields()}</Row>
                <FormItem style={{textAlign:"center"}}>
                    <Button type="primary">取消</Button>
                    <Button type="primary" htmlType="submit" style={{marginLeft:'30px'}}>确定</Button>
                </FormItem>
            </Form>        
        )
    }
}
const uploadPhotos = Form.create()(uploadPhoto);
export default uploadPhotos; 