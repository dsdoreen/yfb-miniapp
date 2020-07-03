// components/Tabs/tabs.js
Component({
  /**
   * 组件的属性列表 
   */
  properties: {
    //获取父组件传过来的值
    tabs:{
      type:Array,
      value:[]
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
   
  },

  /**
   * 组件的方法列表
   */
  methods: {
    changeTit(e){
      //获取点击传过来的值
      const index=e.currentTarget.dataset.index;
      //触发父组件的事件,并把值传递过去 事件名称自定义
      this.triggerEvent("tabsItemChange",index)
     
    }
  }
})
