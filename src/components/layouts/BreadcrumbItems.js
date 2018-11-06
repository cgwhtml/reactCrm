import React , {Component} from 'react';
import { Breadcrumb } from 'antd';

class BreadcrumbItems extends Component{

    render(){
        return(
            <Breadcrumb separator=">" style={{ margin: '5px 0' }}>
                <Breadcrumb.Item>{this.props.itemText.item1}</Breadcrumb.Item>
                <Breadcrumb.Item>{this.props.itemText.item2}</Breadcrumb.Item>
                <Breadcrumb.Item>{this.props.itemText.item3}</Breadcrumb.Item>
            </Breadcrumb>
        )
    }
}
export default BreadcrumbItems;