wx.onMessage(data => {
  console.log(data);
  if(data.type === 'drawHighest') {
    let keys = ['highest_score'];
    wx.getUserCloudStorage({
      keyList: keys,
      success(res) {
        console.log(res.KVDataList);
      },
      fail() {
        console.log('Fail to get user cloud storage');
      }
    });
  }
});