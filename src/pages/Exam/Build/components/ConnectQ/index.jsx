import React, { Component } from 'react'
import { Input, Tooltip, Radio, InputNumber, Dropdown, Menu, Cascader, Modal, Form, Select, message, Upload } from 'antd'
import { PlusOutlined, InboxOutlined  } from '@ant-design/icons'
import { nanoid } from 'nanoid'
import { MyIcon } from '../../../../../assets/iconfont.js'
import ConnectQCss from './index.module.css'

const { TextArea } = Input;
const { SubMenu } = Menu;
const { Option } = Select;
const { Dragger } = Upload;

export default class ConnectQ extends Component {

    state = { textArea: '', radioValue: '', analysisArea: '',
      isAutomaticVisible: false, isAnalysisVisible: false,
      previewVisible: false, previewImage: '', previewTitle: '',
      fileList: [
        {
          uid: '-1',
          name: 'image.png',
          status: 'done',
          url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
        }
      ]}
  
    /* 待绑定的考纲的信息 */
    outline = [
      // value：数据值；label：页面显示的标签；children：级联的下一层数据（其内对象属性同父层级）
      {
        value: "计算机网络体系结构",
        label: "计算机网络体系结构",
        children: [
          {
            value: "计算机网络概述",
            label: "计算机网络概述",
            children: [
              {
                value: "计算机网络的概念、组成与功能",
                label: "计算机网络的概念、组成与功能"
              },
              {
                value: "计算机网络的分类",
                label: "计算机网络的分类"
              },
              {
                value: "计算机网络主要性能指标",
                label: "计算机网络主要性能指标"
              }
            ]
          },
          {
            value: "计算机网络体系结构与参考模型",
            label: "计算机网络体系结构与参考模型",
            children: [
              {
                value: "计算机网络分层结构",
                label: "计算机网络分层结构"
              },
              {
                value: "计算机网络协议、接口、服务等概念",
                label: "计算机网络协议、接口、服务等概念"
              },
              {
                value: "ISO/OSI参考模型和TCP/IP模型",
                label: "ISO/OSI参考模型和TCP/IP模型"
              }
            ]
          }
        ]
      },
      {
        value: "物理层",
        label: "物理层",
        children: [
          {
            value: "通信基础",
            label: "通信基础",
            children: [
              {
                value: "信道、信号、带宽、信源与信宿等基本概念",
                label: "信道、信号、带宽、信源与信宿等基本概念"
              },
              {
                value: "奈奎斯特定理与香农定理",
                label: "奈奎斯特定理与香农定理"
              },
              {
                value: "编码与调制",
                label: "编码与调制"
              },
              {
                value: "电路交换、报文交换与分组交换",
                label: "电路交换、报文交换与分组交换"
              },
              {
                value: "数据报与虚电路",
                label: "数据报与虚电路"
              }
            ]
          },
          {
            value: "传输介质",
            label: "传输介质",
            children: [
              {
                value: "双绞线、同轴电缆、光纤与无线传输介质",
                label: "双绞线、同轴电缆、光纤与无线传输介质"
              },
              {
                value: "物理层接口的特性",
                label: "物理层接口的特性"
              }
            ]
          },
          {
            value: "物理层设备",
            label: "物理层设备",
            children: [
              {
                value: "中继器",
                label: "中继器"
              }
            ]
          }
        ]
      },
      {
        value: "数据链路层",
        label: "数据链路层",
        children: [
          {
            value: "第一章",
            label: "第一章"
          },
          {
            value: "第二章",
            label: "第二章"
          },
          {
            value: "第三章",
            label: "第三章"
          }
        ]
      },
      {
        value: "网络层",
        label: "网络层",
        children: [
          {
            value: "第一章",
            label: "第一章"
          },
          {
            value: "第二章",
            label: "第二章"
          },
          {
            value: "第三章",
            label: "第三章"
          }
        ]
      },
      {
        value: "传输层",
        label: "传输层",
        children: [
          {
            value: "第一章",
            label: "第一章"
          },
          {
            value: "第二章",
            label: "第二章"
          },
          {
            value: "第三章",
            label: "第三章"
          }
        ]
      },
      {
        value: "应用层",
        label: "应用层",
        children: [
          {
            value: "第一章",
            label: "第一章"
          },
          {
            value: "第二章",
            label: "第二章"
          },
          {
            value: "第三章",
            label: "第三章"
          }
        ]
      }
    ]
    
    /* 更多菜单 */
    menu = (
      <Menu triggerSubMenuAction='click'>
        <SubMenu key={nanoid()} title="绑定考纲">
          <Cascader multiple options={this.outline} placeholder="请进行级联选择，不选则默认任意考点" />
        </SubMenu>
        <Menu.Item key={nanoid()}>
          <p onClick={() => this.showModal('analysis')} style={{marginBottom: 0}}>录入解析</p>
        </Menu.Item>
        <Menu.Item key={nanoid()}>
          <p onClick={() => this.showModal('automatic')} style={{marginBottom: 0}}>自动换题</p>
        </Menu.Item>
      </Menu>
    )

    render() {
        const { isAnalysisVisible, isAutomaticVisible} = this.state

        /* 上传图片的按钮 */
        const uploadButton = (
            <div>
            <PlusOutlined />
            <div style={{ marginTop: 8 }}>Upload</div>
            </div>
        )

        /* 拖拽上传的参数 */
        const props = {
            name: 'file',
            multiple: true,
            action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
            onChange(info) {
            const { status } = info.file;
            if (status !== 'uploading') {
                console.log(info.file, info.fileList);
            }
            if (status === 'done') {
                message.success(`${info.file.name} file uploaded successfully.`);
            } else if (status === 'error') {
                message.error(`${info.file.name} file upload failed.`);
            }
            },
            onDrop(e) {
            console.log('Dropped files', e.dataTransfer.files);
            },
        }

        return (<div className={this.props.isSave ? ConnectQCss.mainWrapper : ConnectQCss.mainWrapperShadow}>
            {/* 连线题题干行 */}
            <div className={ConnectQCss.lineWrapper} style={{color: '#7B7B7B', justifyContent: 'space-between'}}>
                <div className={ConnectQCss.lineWrapper}> {this.props.index}.&emsp;
                {this.props.isSave ? <nobr style={{color: '#1B1B1B'}}>{this.props.title}</nobr>
                : <TextArea ref={ c => this.title = c } style={{ marginLeft: 10, marginRight: 20, resize: 'none' }}
                value={this.state.value} autoSize onChange={this.onTextAreaChange} placeholder="请输入题干"
                defaultValue={this.props.title} />}</div>
                {/* 右上角按钮组 */}
                <div className={ConnectQCss.lineWrapper} style={{ width: '30%', justifyContent: 'flex-end' }}>
                {this.props.index > 1 ? <Tooltip title="上移">
                    <MyIcon style={{ marginRight: '5%', cursor: 'pointer' }} type='icon-shangyi' />
                    </Tooltip> : ''}
                <Tooltip title="下移"><MyIcon style={{ marginRight: '5%', cursor: 'pointer' }} type='icon-xiayi' /></Tooltip>
                <Tooltip title="删除"><MyIcon style={{ cursor: 'pointer' }} type='icon-shanchu'
                    onClick={() => {this.handleDelete(this.props.id)}} /></Tooltip>
                {!this.props.isSave ? <Tooltip title="保存">
                    <MyIcon style={{ marginLeft: '5%', cursor: 'pointer' }} type='icon-baocun'
                    onClick={() => {this.handleSave(this.props.id)}} />
                    </Tooltip> : <Tooltip title="编辑">
                    <MyIcon style={{ marginLeft: '5%', cursor: 'pointer' }} type='icon-xiugaichengji'
                    onClick={() => {this.handleEdit(this.props.id)}} />
                    </Tooltip>}
                </div>
            </div>
            {/* 设置行 */}
            <div className={ConnectQCss.lineWrapper} style={{ justifyContent: 'space-between', marginTop: 20, alignItems: 'flex-end' }}>
                <div className={ConnectQCss.lineWrapper} style={{ width: '70%' }}>
                  {this.props.isSave ? <Radio.Group value={this.props.answer} disabled>
                    <Radio value='A'>A</Radio>
                    <Radio value='B'>B</Radio>
                    <Radio value='C'>C</Radio>
                    <Radio value='D'>D</Radio>
                    <Radio value='E'>E</Radio>
                  </Radio.Group>
                  : <Radio.Group onChange={this.onRadiochange} defaultValue={this.props.answer}>
                    <Radio value='A'>A</Radio>
                    <Radio value='B'>B</Radio>
                    <Radio value='C'>C</Radio>
                    <Radio value='D'>D</Radio>
                    <Radio value='E'>E</Radio>
                  </Radio.Group>}
                {this.props.isSave ? '' : <nobr style={{color: '#7B7B7B', fontSize: 10}}>（ps：请选择以设置正确答案）</nobr>}
                </div>
                <div className={ConnectQCss.lineWrapper} style={{ width: '30%', justifyContent: 'flex-end' }}>
                <nobr style={{whiteSpace: 'nowrap'}}>分值：</nobr>{this.props.isSave ? <nobr>{this.props.grade}</nobr> 
                  : <InputNumber ref={ c => this.grade = c } min={1} max={100}
                      defaultValue={this.props.grade ? this.props.grade : ''} />}<nobr>&nbsp;分</nobr>
                  {!this.props.isSave ? <Tooltip title="更多">
                    <Dropdown overlay={this.menu} placement="bottomLeft" arrow trigger='click'>
                    <MyIcon style={{ marginLeft: '5%', cursor: 'pointer' }} type='icon-gengduo' onClick={this.more} />
                    </Dropdown>
                  </Tooltip> : ''}
                </div>
            </div>
            
            {/* 录入解析对话框 */}
            <Modal title="录入解析" maskClosable={false} visible={isAnalysisVisible} onOk={() => this.handleOk('analysis')} okText='完成录入'
                onCancel={() => this.handleCancel('analysis')} cancelText='取消' centered bodyStyle={{
                    display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start'
                }}>
                    <p>{this.props.index}.&emsp;{this.state.textArea}</p>
                    <Form style={{width: '100%'}}>
                    <Form.Item label="文字解析" name="text" style={{ marginBottom: '5%', width: '100%' }} >
                        <TextArea value={this.state.analysisArea} onChange={this.onChange} autoSize={{ minRows: 5, maxRows: 15 }} />
                    </Form.Item>

                    <Form.Item label="图片解析" name="qOutline" style={{ marginBottom: '5%', width: '100%' }} >
                        <Upload action="https://www.mocky.io/v2/5cc8019d300000980a055e76" listType="picture-card"
                        fileList={this.state.fileList} onPreview={this.handlePreview} onChange={this.handleChange}>
                        {this.state.fileList.length >= 8 ? null : uploadButton}
                        </Upload>
                        <Modal visible={this.state.previewVisible} title={this.state.previewTitle}
                        footer={null} onCancel={this.handlePicCancel}>
                        <img alt="example" style={{ width: '100%' }} src={this.state.previewImage} />
                        </Modal>
                    </Form.Item>

                    <Form.Item label="音视频解析" name="qOutline" style={{ marginBottom: '5%', width: '100%' }} >
                        <Dragger {...props}>
                        <p className="ant-upload-drag-icon"> <InboxOutlined /> </p>
                        <p className="ant-upload-text">Click or drag file to this area to upload</p>
                        <p className="ant-upload-hint">
                            Support for a single or bulk upload. Strictly prohibit from uploading company data or other
                            band files
                        </p>
                        </Dragger>
                    </Form.Item>
                    </Form>
            </Modal>
            
            {/* 自动换题对话框 */}
            <Modal title="自动换题" maskClosable={false} visible={isAutomaticVisible} onOk={() => this.handleOk('automatic')} okText='开始替换'
                onCancel={() => this.handleCancel('automatic')} cancelText='取消' centered bodyStyle={{
                    display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center'
                }}>
                    <Form style={{width: '80%'}}>
                    <Form.Item label="可选题型" name="qType" style={{ marginBottom: '5%', width: '100%' }} >
                        <Select mode="multiple" allowClear style={{width: '100%'}} placeholder="不选则默认任意题型">
                        <Option value='single'>单选题</Option>
                        <Option value='multiple'>多选题</Option>
                        <Option value='blank'>判断题</Option>
                        <Option value='calculate'>计算题</Option>
                        <Option value='connect'>连线题</Option>
                        <Option value='order'>排序题</Option>
                        <Option value='answer'>解答题</Option>
                        <Option value='subsection'>分段题</Option>
                        <Option value='program'>程序题</Option>
                        <Option value='oral'>口语题</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item label="可选考纲" name="qOutline" style={{ marginBottom: '5%', width: '100%' }} >
                        <Cascader multiple options={this.outline} placeholder="请进行级联选择，不选则默认任意考点" />
                    </Form.Item>
                    <Form.Item label="可选难度" name="qDifficulty" style={{ marginBottom: '5%', width: '100%' }} >
                        <Select mode="multiple" allowClear style={{width: '100%'}} placeholder="不选则默认任意难度">
                        <Option value='simple'>简单</Option>
                        <Option value='easy'>容易</Option>
                        <Option value='medium'>中等</Option>
                        <Option value='difficult'>困难</Option>
                        </Select>
                    </Form.Item>
                    </Form>
                    <p style={{color: '#ACACAC', marginBottom: 0}}>注：系统将根据设置在您的题库及共享题库中搜索符合要求的题目自动替换，您所创建的题库优先，且替换后仍可修改。</p>
            </Modal>
            </div>
        )
    }
}
