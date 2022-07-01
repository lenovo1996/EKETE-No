import React from 'react'
import {Avatar, Button, Input, List, Tooltip} from "antd";
import {
  CameraOutlined,
  FileGifOutlined,
  FileImageOutlined,
  SmileOutlined
} from "@ant-design/icons";
import styles from "./comment.module.scss";
import Feedback from './feedback'
import avatarRound from 'assets/img/avatar-round.png'


function Comment() {
  return (
    <div>
      <div className={styles['container-add-cmt']}>
        <div className={styles['container-avt']}>
          <Avatar size={40} src={avatarRound}/>
        </div>
        <div className={styles['container-input-add-cmt']}>
          <div className={styles['dashboard_manager_bottom_row_col_parent_top']}></div>
          <div className={styles['container-input']}>
            <Input
              className={styles['input-add-cmt']}
              placeholder="Thêm bình luận..."
              suffix={
                <Tooltip>
                  <SmileOutlined className={styles['icon-cmt']}/>
                  <CameraOutlined className={styles['icon-cmt']}/>
                  <FileGifOutlined className={styles['icon-cmt']}/>
                  <FileImageOutlined className={styles['icon-cmt']}/>
                </Tooltip>
              }
            />
            <div>
              <Button>Đăng</Button>
            </div>
          </div>
        </div>
      </div>
      {/*<List className={styles['container-cmt']}>*/}
      {/*  <List.Item className={styles['container-cmt']}>*/}
      {/*    <List.Item.Meta*/}
      {/*      avatar={*/}
      {/*        <Avatar*/}
      {/*          style={{*/}
      {/*            color: '#FFF',*/}
      {/*            backgroundColor: '#FDAA3E',*/}
      {/*            marginRight: 4,*/}
      {/*          }}*/}
      {/*          size={50}*/}
      {/*          src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"*/}
      {/*        />*/}
      {/*      }*/}
      {/*      title={*/}
      {/*        <a className={styles['name-cmt']} href="https://ant.design">*/}
      {/*          @hadudu*/}
      {/*        </a>*/}
      {/*      }*/}
      {/*      description={*/}
      {/*        <p className={styles['text-cmt']}>*/}
      {/*          {' '}*/}
      {/*          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do*/}
      {/*          eiusmod, Lorem ipsum dolor sit amet, consectetur adipiscing elit,*/}
      {/*          sed do eiusmod Lorem ipsum dolor sit amet, consectetur adipiscing*/}
      {/*          elit, sed do eiusmod*/}
      {/*        </p>*/}
      {/*      }*/}
      {/*    />*/}
      {/*  </List.Item>*/}
      {/*  <div className={styles['container-cmt-tool']}>*/}
      {/*    <div>*/}
      {/*      <a className={styles['item-tool']}>Thích</a>*/}
      {/*    </div>*/}
      {/*    <div>*/}
      {/*      <a className={styles['item-tool']}>Bình luận</a>*/}
      {/*    </div>*/}
      {/*    <div>*/}
      {/*      <Feedback key="index">*/}
      {/*        <a className={styles['item-tool']}>Phản hồi riêng</a>*/}
      {/*      </Feedback>*/}
      {/*    </div>*/}
      {/*  </div>*/}
      {/*</List>*/}
      {/*<List className={styles['container-cmt']}>*/}
      {/*  <List.Item className={styles['container-cmt']}>*/}
      {/*    <List.Item.Meta*/}
      {/*      avatar={*/}
      {/*        <Avatar*/}
      {/*          style={{*/}
      {/*            color: '#FFF',*/}
      {/*            backgroundColor: '#FDAA3E',*/}
      {/*            marginRight: 4,*/}
      {/*          }}*/}
      {/*          size={50}*/}
      {/*          src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"*/}
      {/*        />*/}
      {/*      }*/}
      {/*      title={*/}
      {/*        <a className={styles['name-cmt']} href="https://ant.design">*/}
      {/*          @hadudu*/}
      {/*        </a>*/}
      {/*      }*/}
      {/*      description={*/}
      {/*        <p className={styles['text-cmt']}>*/}
      {/*          {' '}*/}
      {/*          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do*/}
      {/*          eiusmod*/}
      {/*        </p>*/}
      {/*      }*/}
      {/*    />*/}
      {/*  </List.Item>*/}
      {/*  <div className={styles['container-cmt-tool']}>*/}
      {/*    <div>*/}
      {/*      <a className={styles['item-tool']}>Thích</a>*/}
      {/*    </div>*/}
      {/*    <div>*/}
      {/*      <a className={styles['item-tool']}>Bình luận</a>*/}
      {/*    </div>*/}
      {/*    <Feedback key="index">*/}
      {/*      <a className={styles['item-tool']}>Phản hồi riêng</a>*/}
      {/*    </Feedback>*/}
      {/*  </div>*/}
      {/*  <div className={styles['container-rep-cmt']}>*/}
      {/*    <List.Item className={styles['container-cmt']}>*/}
      {/*      <List.Item.Meta*/}
      {/*        avatar={*/}
      {/*          <Avatar*/}
      {/*            style={{*/}
      {/*              color: '#FFF',*/}
      {/*              backgroundColor: '#FDAA3E',*/}
      {/*              marginRight: 4,*/}
      {/*            }}*/}
      {/*            size={50}*/}
      {/*            src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"*/}
      {/*          />*/}
      {/*        }*/}
      {/*        title={*/}
      {/*          <a className={styles['name-cmt']} href="https://ant.design">*/}
      {/*            @hadudu*/}
      {/*          </a>*/}
      {/*        }*/}
      {/*        description={*/}
      {/*          <p className={styles['text-cmt']}>*/}
      {/*            {' '}*/}
      {/*            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do*/}
      {/*            eiusmod*/}
      {/*          </p>*/}
      {/*        }*/}
      {/*      />*/}
      {/*    </List.Item>*/}
      {/*    <div className={styles['container-cmt-tool']}>*/}
      {/*      <div>*/}
      {/*        <a className={styles['item-tool']}>Thích</a>*/}
      {/*      </div>*/}
      {/*      <div>*/}
      {/*        <a className={styles['item-tool']}>Bình luận</a>*/}
      {/*      </div>*/}
      {/*      <Feedback key="index">*/}
      {/*        <a className={styles['item-tool']}>Phản hồi riêng</a>*/}
      {/*      </Feedback>*/}
      {/*    </div>*/}
      {/*  </div>*/}
      {/*  <div className={styles['container-rep-cmt']}>*/}
      {/*    <List.Item className={styles['container-cmt']}>*/}
      {/*      <List.Item.Meta*/}
      {/*        avatar={*/}
      {/*          <Avatar*/}
      {/*            style={{*/}
      {/*              color: '#FFF',*/}
      {/*              backgroundColor: '#FDAA3E',*/}
      {/*              marginRight: 4,*/}
      {/*            }}*/}
      {/*            size={50}*/}
      {/*            src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"*/}
      {/*          />*/}
      {/*        }*/}
      {/*        title={*/}
      {/*          <a className={styles['name-cmt']} href="https://ant.design">*/}
      {/*            @hadudu*/}
      {/*          </a>*/}
      {/*        }*/}
      {/*        description={<p className={styles['text-cmt']}> Ok !</p>}*/}
      {/*      />*/}
      {/*    </List.Item>*/}
      {/*    <div className={styles['container-cmt-tool']}>*/}
      {/*      <div>*/}
      {/*        <a className={styles['item-tool']}>Thích</a>*/}
      {/*      </div>*/}
      {/*      <div>*/}
      {/*        <a className={styles['item-tool']}>Bình luận</a>*/}
      {/*      </div>*/}
      {/*      <Feedback key="index">*/}
      {/*        <a className={styles['item-tool']}>Phản hồi riêng</a>*/}
      {/*      </Feedback>*/}
      {/*    </div>*/}
      {/*  </div>*/}
      {/*</List>*/}
      {/*<div className={styles['container-text-see-cmts']}>*/}
      {/*  <a className={styles['text-see-cmts']}>Xem tất cả 7 bình luận</a>*/}
      {/*</div>*/}
    </div>
  )
}


export default Comment