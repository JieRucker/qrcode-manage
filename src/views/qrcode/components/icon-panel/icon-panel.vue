<style lang="scss">
  .qrcode-detail__left {
    @include b(icon-panel) {
      background-color: #fff;
      border-bottom-left-radius: 10px;
      border-bottom-right-radius: 10px;
      min-height: 85px;
      color: #a9a9a9;
      text-align: center;
      padding: 10px;
      @include e(top) {
        border: 1px dashed #e4e4e4;
        @include m(title) {
          color: #a3a3a3;
          line-height: 32px;
          font-size: 14px;
          text-align: center;
        }
      }

      @include e(bottom) {
        border-right: 1px dashed #e4e4e4;
        border-bottom: 1px dashed #e4e4e4;
        border-left: 1px dashed #e4e4e4;
        @include m(title) {
          color: #a3a3a3;
          line-height: 32px;
          font-size: 14px;
          text-align: center;
        }
      }

      @include b(l-list) {
        @include e(item) {
          margin-bottom: 10px;
          position: relative;
          float: left;
          border-radius: 3px;
          cursor: pointer;
          text-align: center;
          width: 74px;
          @include m(icon) {
            font-size: 35px;
          }

          &.active {
            background-color: #f8f8f8;
            p {
              background-color: #e9e9e9;
              color: #333;
            }
          }
        }

        @include e(more) {
          text-align: center;
          width: 100%;
          position: relative;
          float: left;
          border-radius: 3px;
          cursor: pointer;
          height: 27px;
          line-height: 27px;
          margin-bottom: 0;
        }
      }

      @include b(l-more-list) {
        border-bottom: 1px dashed #e4e4e4;
        overflow: hidden;
        padding-bottom: 0;
        float: left;
        @include e(item) {
          margin: 0 0 10px;
          position: relative;
          float: left;
          border-radius: 3px;
          cursor: pointer;
          text-align: center;
          width: 74px;
          @include m(icon) {
            font-size: 35px;
          }

          &.active {
            background-color: #f8f8f8;
            p {
              background-color: #e9e9e9;
              color: #333;
            }
          }
        }
        @include e(hidden) {
          text-align: center;
          width: 100%;
          position: relative;
          float: left;
          border-radius: 3px;
          cursor: pointer;
          height: 27px;
          line-height: 27px;
        }
      }

      @include b(l-record-list) {
        @include e(item) {
          width: 274px;
          height: 68px;
          background: rgb(248, 248, 248);
          margin-left: 11px;
          border-radius: 3px;
          cursor: pointer;
          position: relative;
          margin-bottom: 8px;
          &.record {
            cursor: not-allowed;
          }
          &:hover {
            .l-record-list__item--tip {
              opacity: 1;
            }
          }
          @include m(icon) {
            float: left;
            margin-top: 12px;
            margin-left: 87px;
            font-size: 30px;
          }
          @include m(name) {
            float: left;
            margin-top: 25px;
            margin-left: 5px;
            color: #a3a3a3;
            font-size: 14px;
          }
          @include m(tip) {
            position: absolute;
            top: 0;
            font-size: 12px;
            color: #fff;
            background: rgba(0, 0, 0, .7);
            width: 100%;
            text-align: center;
            height: 100%;
            line-height: 70px;
            border-radius: 3px;
            transition: all .1s ease-in-out;
            opacity: 0;
          }
          @include m(state) {
            float: right;
            margin-top: 26px;
            margin-right: 12px;
          }
        }
      }
    }
  }
</style>

<template>
  <div class="icon-panel">
    <div class="icon-panel__module">
      <div class="icon-panel__top">
        <p class="icon-panel__top--title">选择信息展示模块</p>
        <ul class="l-list clearfix">
          <li :title="icon.iconName" class="l-list__item" @click="clickHandler(icon)" v-for="icon in iconList">
            <i :class="'iconfont l-list__item--icon '+ icon.iconClass"></i>
            <p>{{icon.iconName}}</p>
          </li>
          <li class="l-list__more l-list__item" title="更多" @click="action.showMore = true" v-if="!action.showMore">
            <Icon type="chevron-down"></Icon>

          </li>
          <ul class="l-more-list" v-if="action.showMore">
            <li class="l-more-list__item"
                :title="iconMore.iconName"
                @click="clickHandler(iconMore)"
                v-for="iconMore in iconMoreList">
              <i :class="'iconfont l-more-list__item--icon '+ iconMore.iconClass"></i>
              <p>{{iconMore.iconName}}</p>
            </li>
            <li class="l-more-list__hidden" title="收起" @click="action.showMore = false" v-if="action.showMore">
              <Icon type="chevron-up"></Icon>
            </li>
          </ul>
        </ul>
      </div>
      <div class="icon-panel__bottom" v-if="showRecord">
        <p class="icon-panel__bottom--title">添加维护模板</p>
        <ul class="l-record-list">
          <li class="l-record-list__item" title="维护模板" @click="recordModule"
              v-if="!disRdModule">
            <i class="iconfont icon-icon-test l-record-list__item--icon"></i>
            <p class="l-record-list__item--name">维护模板</p>
            <p class="l-record-list__item--tip">点击添加维护模板，可以扫码进行巡检记录</p>
          </li>
          <li class="l-record-list__item record" title="维护模板" v-if="disRdModule">
            <i class="iconfont icon-icon-test l-record-list__item--icon"></i>
            <p class="l-record-list__item--name">维护模板</p>
            <p class="l-record-list__item--state">（已添加）
            </p>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "icon-panel",
    props: {
      moduleLayer: Array,
      panel: Object
    },
    computed: {
      disRdModule() {
        let a = false;
        [...this.moduleLayer].forEach(m => (m.moduleType === 13) && (a = true));
        return a;
      },
      showRecord() {
        let bean = true;
        bean = (parseFloat(this.$route.query.templateType) !== 2);
        return bean;
      }
    },
    data() {
      return {
        iconList: [
          {
            iconAlias: 'imgs-module',
            iconClass: 'icon-tupian',
            iconName: '图片'
          },
          {
            iconAlias: 'imgs-txt-module',
            iconClass: 'icon-31tuwenxiangqing',
            iconName: '图文'
          },
          {
            iconAlias: 'product-setting-module',
            iconClass: 'icon-chanpincanshu',
            iconName: '参数'
          },
          {
            iconAlias: 'file-module',
            iconClass: 'icon-wenjianliebiao',
            iconName: '文件'
          },
          {
            iconAlias: 'material-module',
            iconClass: 'icon-wendang',
            iconName: '素材'
          },
          {
            iconAlias: 'imgs-group-module',
            iconClass: 'icon-tuku',
            iconName: '图集'
          },
          {
            iconAlias: 'link-module',
            iconClass: 'icon-fenxianglianjie',
            iconName: '链接'
          },
          {
            iconAlias: 'card-module',
            iconClass: 'icon-mingpian',
            iconName: '名片'
          }
        ],
        iconMoreList: [
          {
            iconAlias: 'video-module',
            iconClass: 'icon-shipin',
            iconName: '视频'
          },
          {
            iconAlias: 'contact-info-module',
            iconClass: 'icon-lianxiwomen',
            iconName: '联系方式'
          },
          {
            iconAlias: 'classify-module',
            iconClass: 'icon-fenlei',
            iconName: '嵌套'
          },
          {
            iconAlias: 'web-nav-module',
            iconClass: 'icon-icon-',
            iconName: '网址'
          },
          {
            iconAlias: 'audio-module',
            iconClass: 'icon-yinleyinpin',
            iconName: '音频'
          }
        ],
        action: {
          showMore: false, // 显示更多
        }
      }
    },
    methods: {
      clickHandler(item) {
        switch (item.iconAlias) {
          case 'imgs-module':
            this.imgsModule();
            break;
          case 'imgs-txt-module':
            this.imgsTxtModule();
            break;
          case 'product-setting-module':
            this.productSettingsModule();
            break;
          case 'file-module':
            this.fileModule();
            break;
          case 'material-module':
            this.materialModule();
            break;
          case 'imgs-group-module':
            this.imgsGroupModule();
            break;
          case 'link-module':
            this.linkModule();
            break;
          case 'card-module':
            this.cardModule();
            break;
          case 'video-module':
            this.videoModule();
            break;
          case 'contact-info-module':
            this.contactInfoModule();
            break;
          case 'classify-module':
            this.classifyModule();
            break;
          case 'web-nav-module':
            this.webNavModule();
            break;
          case 'audio-module':
            this.audioModule();
            break;
        }
      },
      /**
       * 图片
       */
      imgsModule() {
        let params = this.processContent({
          moduleTitle: '图片',//模块名称
          moduleType: 0, // 模块类型 0图片 1图文 2参数 3文件 4图集 5链接 6名片 7视频 8音频 9联系方式 10素材 11嵌套 12网址导航 13维护模板
          moduleVOJson: JSON.stringify({
            moduleObject: {
              bucketName: "",
              displayAuthGroupList: [],
              displayAuthPassword: "",
              displayAuthState: 1,
              editAuthGroupList: [],
              editAuthState: 0,
              fileSize: "",
              id: "",
              imageName: "",
              imageUrl: "",
              ossKey: ""
            }
          }),
        });

        this.$api.qrcodeInterface.saveModuleImageVO(params).then(res => {
          if (res.data.success) {
            this.$Message.info('成功');
            this.$parent.initModulelist({
              templateId: this.$route.query.templateId
            });
          }
        }).catch(err => {
          console.error(err)
        })
      },
      /**
       * 图文
       */
      imgsTxtModule() {
        let params = this.processContent({
          moduleTitle: '图文',//模块名称
          moduleType: 1, // 模块类型 0图片 1图文 2参数 3文件 4图集 5链接 6名片 7视频 8音频 9联系方式 10素材 11嵌套 12网址 13维护模板
          moduleVOJson: JSON.stringify({
            moduleObject: {
              image: {
                bucketName: "",
                fileSize: "",
                id: "",
                imageName: "",
                imageUrl: "",
                ossKey: ""
              },
              textContent: ""
            },
          }),
        });

        this.$api.qrcodeInterface.saveModuleImageTextVO(params).then(res => {
          if (res.data.success) {
            this.$Message.info('成功');
            this.$parent.initModulelist({
              templateId: this.$route.query.templateId
            });
          }
        }).catch(err => {
          console.error(err)
        })
      },
      /**
       * 参数
       */
      productSettingsModule() {
        let params = this.processContent({
          moduleTitle: '参数',//模块名称
          moduleType: 2, // 模块类型 0图片 1图文 2参数 3文件 4图集 5链接 6名片 7视频 8音频 9联系方式 10素材 11嵌套 12网址 13维护模板
          moduleVOJson: JSON.stringify({
            moduleObject: {
              productParameterList: [
                {
                  displayable: false,
                  image: {
                    bucketName: "",
                    fileSize: "",
                    id: "",
                    imageName: "",
                    imageUrl: "",
                    ossKey: ""
                  },
                  paramName: "",
                  text: "",
                  textarea: "",
                  type: 0
                }
              ]
            },
          }),
        });

        this.$api.qrcodeInterface.saveModuleProductParameterVO(params).then(res => {
          if (res.data.success) {
            this.$Message.info('成功');
            this.$parent.initModulelist({
              templateId: this.$route.query.templateId
            });
          }
        }).catch(err => {
          console.error(err)
        })
      },
      /**
       * 文件
       */
      fileModule() {
        let params = this.processContent({
          moduleTitle: '文件',//模块名称
          moduleType: 3, // 模块类型 0图片 1图文 2参数 3文件 4图集 5链接 6名片 7视频 8音频 9联系方式 10素材 11嵌套 12网址 13维护模板
          moduleVOJson: JSON.stringify({
            moduleObject: {
              displayAuthGroupList: [],
              displayAuthPassword: "",
              displayAuthState: 1,
              fileList: []
            }
          }),
        });

        this.$api.qrcodeInterface.saveModuleFileVO(params).then(res => {
          if (res.data.success) {
            this.$Message.info('成功');
            this.$parent.initModulelist({
              templateId: this.$route.query.templateId
            });
          }
        }).catch(err => {
          console.error(err)
        })
      },
      /**
       * 素材
       */
      materialModule() {
        let params = this.processContent({
          moduleTitle: '素材',//模块名称
          moduleType: 10, // 模块类型 0图片 1图文 2参数 3文件 4图集 5链接 6名片 7视频 8音频 9联系方式 10素材 11嵌套 12网址 13维护模板
          moduleVOJson: JSON.stringify({
            moduleObject: {
              templateId: '',
              templateName: '',
              showStyle: 0,
              linkName: ''
            }
          })
        });

        this.$api.qrcodeInterface.saveModule(params).then(res => {
          if (res.data.success) {
            this.$Message.info('成功');
            this.$parent.initModulelist({
              templateId: this.$route.query.templateId
            });
          }
        }).catch(err => {
          console.error(err)
        })
      },
      /**
       * 图集
       */
      imgsGroupModule() {
        let params = this.processContent({
          moduleTitle: '图集',//模块名称
          moduleType: 4, // 模块类型 0图片 1图文 2参数 3文件 4图集 5链接 6名片 7视频 8音频 9联系方式 10素材 11嵌套 12网址 13维护模板
          moduleVOJson: JSON.stringify({
            moduleObject: {
              imageList: []
            }
          }),
        });

        this.$api.qrcodeInterface.saveModuleAtlasVO(params).then(res => {
          if (res.data.success) {
            this.$Message.info('成功');
            this.$parent.initModulelist({
              templateId: this.$route.query.templateId
            });
          }
        }).catch(err => {
          console.error(err)
        })
      },
      /**
       * 链接
       */
      linkModule() {
        let params = this.processContent({
          moduleTitle: '链接',//模块名称
          moduleType: 5, // 模块类型 0图片 1图文 2参数 3文件 4图集 5链接 6名片 7视频 8音频 9联系方式 10素材 11嵌套 12网址 13维护模板
          moduleVOJson: JSON.stringify({
            moduleObject: {
              linkList: [],
              moduleDesc: "",
              showWxTip: false
            }
          }),
        });

        this.$api.qrcodeInterface.saveModule(params).then(res => {
          if (res.data.success) {
            this.$Message.info('成功');
            this.$parent.initModulelist({
              templateId: this.$route.query.templateId
            });
          }
        }).catch(err => {
          console.error(err)
        })
      },
      /**
       * 名片
       */
      cardModule() {
        let params = this.processContent({
          moduleTitle: '名片',//模块名称
          moduleType: 6, // 模块类型 0图片 1图文 2参数 3文件 4图集 5链接 6名片 7视频 8音频 9联系方式 10素材 11嵌套 12网址 13维护模板
          moduleVOJson: JSON.stringify({
            moduleObject: {
              cardId: ''
            }
          })
        });

        this.$api.qrcodeInterface.saveModule(params).then(res => {
          if (res.data.success) {
            this.$Message.info('成功');
            this.$parent.initModulelist({
              templateId: this.$route.query.templateId
            });
          }
        }).catch(err => {
          console.error(err)
        })
      },
      /**
       * 视频
       */
      videoModule() {
        let params = this.processContent({
          moduleTitle: '视频',//模块名称
          moduleType: 7, // 模块类型 0图片 1图文 2参数 3文件 4图集 5链接 6名片 7视频 8音频 9联系方式 10素材 11嵌套 12网址 13维护模板
          moduleVOJson: JSON.stringify({
            moduleObject: {
              bucketName: "",
              displayAuthGroupList: [],
              displayAuthPassword: "",
              displayAuthState: 1,
              fileSize: "",
              id: "",
              ossKey: "",
              videoName: "",
              videoUrl: ""
            }
          }),
        });

        this.$api.qrcodeInterface.saveModuleVideoVO(params).then(res => {
          if (res.data.success) {
            this.$Message.info('成功');
            this.$parent.initModulelist({
              templateId: this.$route.query.templateId
            });
          }
        }).catch(err => {
          console.error(err)
        })
      },
      /**
       * 联系方式
       */
      contactInfoModule() {
        let params = this.processContent({
          moduleTitle: '联系方式',//模块名称
          moduleType: 9, // 模块类型 0图片 1图文 2参数 3文件 4图集 5链接 6名片 7视频 8音频 9联系方式 10素材 11嵌套 12网址 13维护模板
          moduleVOJson: JSON.stringify({
            moduleObject: {
              address: {
                dimension: "",
                longitude: "",
                address: ""
              },
              contactWayList: [],
              moduleDesc: ""
            }
          }),
        });

        this.$api.qrcodeInterface.saveModule(params).then(res => {
          if (res.data.success) {
            this.$Message.info('成功');
            this.$parent.initModulelist({
              templateId: this.$route.query.templateId
            });
          }
        }).catch(err => {
          console.error(err)
        })
      },
      /**
       * 嵌套
       */
      classifyModule() {
        let params = this.processContent({
          moduleTitle: '嵌套',//模块名称
          moduleType: 11, // 模块类型 0图片 1图文 2参数 3文件 4图集 5链接 6名片 7视频 8音频 9联系方式 10素材 11嵌套 12网址 13维护模板
          moduleVOJson: JSON.stringify({
            moduleObject: {
              image: {
                bucketName: "",
                fileSize: "",
                id: "",
                imageName: "",
                imageUrl: "",
                ossKey: ""
              },
              templateId: "",
              textContent: ""
            }
          }),
        });

        this.$api.qrcodeInterface.saveModuleClassifyVO(params).then(res => {
          if (res.data.success) {
            this.$Message.info('成功');
            this.$parent.initModulelist({
              templateId: this.$route.query.templateId
            });
          }
        }).catch(err => {
          console.error(err)
        })
      },
      /**
       * 网址
       */
      webNavModule() {
        let params = this.processContent({
          moduleTitle: '网址',//模块名称
          moduleType: 12, // 模块类型 0图片 1图文 2参数 3文件 4图集 5链接 6名片 7视频 8音频 9联系方式 10素材 11嵌套 12网址 13维护模板
          moduleVOJson: JSON.stringify({
            moduleObject: {
              image: {
                bucketName: "",
                fileSize: "",
                id: "",
                imageName: "",
                imageUrl: "",
                ossKey: ""
              },
              navigationList: [],
              navigationType: 4
            }
          }),
        });

        this.$api.qrcodeInterface.saveModuleNavigationVO(params).then(res => {
          if (res.data.success) {
            this.$Message.info('成功');
            this.$parent.initModulelist({
              templateId: this.$route.query.templateId
            });
          }
        }).catch(err => {
          console.error(err)
        })
      },
      /**
       * 音频
       */
      audioModule() {
        let params = this.processContent({
          moduleTitle: '音频',//模块名称
          moduleType: 8, // 模块类型 0图片 1图文 2参数 3文件 4图集 5链接 6名片 7视频 8音频 9联系方式 10素材 11嵌套 12网址 13维护模板
          moduleVOJson: JSON.stringify({
            moduleObject: {
              audioName: "",
              audioUrl: "",
              bucketName: "",
              displayAuthGroupList: [],
              displayAuthPassword: "",
              displayAuthState: 1,
              fileSize: "",
              id: "",
              ossKey: ""
            }
          }),
        });

        this.$api.qrcodeInterface.saveModuleImageVO(params).then(res => {
          if (res.data.success) {
            this.$Message.info('成功');
            this.$parent.initModulelist({
              templateId: this.$route.query.templateId
            });
          }
        }).catch(err => {
          console.error(err)
        })
      },
      /**
       * 记录
       */
      recordModule() {
        let params = this.processContent({
          moduleTitle: '记录',//模块名称
          moduleType: 13, // 模块类型 0图片 1图文 2参数 3文件 4图集 5链接 6名片 7视频 8音频 9联系方式 10素材 11嵌套 12网址 13维护模板
          moduleVOJson: JSON.stringify({
            moduleObject: {
              // 维护模板
              recordList: [],
              // 查看记录权限
              displayRecordAuth: {
                displayRecordAuthState: 0, // 0所有人不可见 1所有人可见 2选择人员组可见  3仅维护人可见[添加记录的人仅能看到自己添加的记录
                displayRecordAuthGroup: [] // 选择人员组
              },
              // 添加记录权限
              addRecordAuth: {
                is_open_apply_qrcode_auth_user: false, // false 未开放 true 开放 如果选择开放，那么扫码二维码后会,不是二维码维护人的用户会显示'申请成为维护人'按钮
                apply_qrcode_auth_user_title: '', // 扫码申请标题
                apply_qrcode_auth_user_explain: '' // 扫码申请说明
              }
            }
          }),
        });

        this.$api.qrcodeInterface.saveModule(params).then(res => {
          if (res.data.success) {
            this.$Message.info('成功');
            this.$parent.initModulelist({
              templateId: this.$route.query.templateId
            });
          }
        }).catch(err => {
          console.error(err)
        })
      },
      processContent(options) {
        const DEFAULTS = {
          isFold: 0,//是否折叠 0否 1是
          isUsed: 1,//是否启用 0否 1是
          hasNew: false,
          moduleId: '', // 模块编号
          templateId: this.$route.query.templateId,
          sortId: this.moduleLayer.length ? this.moduleLayer.length : 0, // 排序编号
          uploadId: '' // 文件id
        };
        return Object.assign({}, DEFAULTS, options);
      }
    }
  }
</script>
