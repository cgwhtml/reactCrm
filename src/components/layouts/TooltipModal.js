import React , {Component} from 'react';
import { Modal } from 'antd';
import PropTypes from 'prop-types';

//提示 弹出框
class TooltipModal extends Component{
    static propTypes = {
        // itemText: PropTypes.object
    }

    constructor(props){
        super(props);
        this.state = { visible: false }
    }

    showModal = () => {
        this.setState({
            visible: true,
        });
    }

    handleOk = (e) => {
        this.setState({
            visible: false,
        });
    }

    handleCancel = (e) => {
        this.setState({
            visible: false,
        });
    }

    render() {
        return (
            <div>
                <Modal
                    title="提示"
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                >
                    <p>{this.props.content}</p>
                </Modal>
            </div>
        );
    }
}

export default TooltipModal;