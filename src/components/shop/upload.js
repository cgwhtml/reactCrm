import React , {Component}  from 'react';
import { Upload,Form, Icon, message,Row,Col,Button,Input} from 'antd';
import {HttpRequest} from '../../utils/js/common';
import domain from '../../domain/domain';
require('../../utils/style/upload.css')

const FormItem = Form.Item;

function beforeUpload(file) {
  const isJPG = file.type === 'image/jpeg';
  if (!isJPG) {
    message.error('You can only upload JPG file!');
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('Image must smaller than 2MB!');
  }
  return false;
  
}

class Avatar extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      fileName:props.value,
      loading: false,
    };
  }
  handleData = (info) => {
    let file = info.file;
    let param = new FormData()  // 创建form对象
    param.append('picture', file)  // 通过append向form对象添加数据
    HttpRequest.uploadRequest(
      param,
      res=>{
          this.setState({
            fileName:res,
          })
          if(this.props.onChange){
            this.props.onChange(this.state.fileName) 
          }
      })
  }
  
  render() {
    const uploadButton = (
      <div>
        <Icon type={this.state.loading ? 'loading' : 'plus'} />
        <div className="ant-upload-text">上传图片</div>
      </div>
    );
    const imageUrl = this.state.fileName;
    return (
      <Upload
        name="avatar"
        listType="picture-card"
        className="avatar-uploader"
        action={domain.uploadImg}
        onChange={this.handleData}
        showUploadList={false}
        beforeUpload={beforeUpload}
      >
        {imageUrl ? <img src={imageUrl} alt="avatar" /> : uploadButton}
      </Upload>
    );
  }
}

class uploadPhoto extends React.Component{
  constructor(props){
    super(props);
    this.state={
      shopPhotoList:{}
    };

  }
    
  handleSubmit2 = (e) => {
    e.preventDefault();
    let flag=true;
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (err) {
        flag=false
      }
    });
    return flag;
  }
  getItemsValue2 = ()=>{    //3、自定义方法，用来传递数据（需要在父组件中调用获取数据）
    const values= this.props.form.getFieldsValue();       //4、getFieldsValue：获取一组输入控件的值，如不传入参数，则获取全部组件的值
    return values;
  }

  componentDidMount(){
    const id=this.props.id;
    if(id){
      HttpRequest.getRequest(
        {   
          url:domain.shopPhoto,
          params:{
            shopId:id
          } 
        },
        res=>{
          if(res.length>0){
            this.setState({
              shopPhotoList:res[0],
          })
          }
        }
      )
    }
  }
  getFields() {
    if(this.state.shopPhotoList){
      const id=this.props.id;
      const { getFieldDecorator } = this.props.form;
      const children = [];
      const shopPhotoList=this.state.shopPhotoList;
      if(Object.keys(shopPhotoList).length==0 && id){
        return;
      }
      const imgNameList=[{name:'营业执照照片',title:'businessLicenseUrl',required:true},{name:'开户许可证照片',title:'openLicenseUrl',required:true},{name:'门店打款凭证',title:'payCertificateUrl',required:true},
      {name:'门店场地租赁合同',title:'leaseContractUrl',required:true},{name:'身份证正面',title:'idcardFaceUrl',required:false},{name:'身份证反面',title:'idcardBackUrl',required:false},
      {name:'门店照片',title:'shopFrontUrl',required:true},{name:'厅内照片',title:'hallUrl',required:true},{name:'团队照片',title:'teamUrl',required:true}]
      imgNameList.map((item,i)=>{
        children.push(
          <Col span={12} key={i}>
            <FormItem label={item.name} labelCol={{span:5}}>
              {getFieldDecorator(item.title, {
                initialValue:shopPhotoList[item.title]?shopPhotoList[item.title]:'',
                rules: [{
                  required: item.required,
                  message: '请将图片补充完整!',
                }],
              })(
                <Avatar/>
              )}
            </FormItem>
          </Col>
        );
      })
      return children;
    }
  }
  render(){
      return(
          <Form onSubmit={this.handleSubmit2}>
            <Row gutter={24}>{this.getFields()}</Row>
          </Form>        
      )
  }
}
const UploadPhotos = Form.create()(uploadPhoto);
export default UploadPhotos; 