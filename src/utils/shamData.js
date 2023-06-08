const data = {
  // 状态
  statusOption: [
    {
      label: '待使用',
      value: '1'
    },
    {
      label: '使用中',
      value: '2'
    },
    {
      label: '已注销',
      value: '3'
    },
    {
      label: '已解约',
      value: '4'
    }
  ],
  statusMap: {
    '1': '待使用',
    '2': '使用中',
    '3': '已注销',
    '4': '已解约'
  },

  // 培训类型
  trainOption: [
    {
      label: '适应性培训',
      value: '1'
    },
    {
      label: '职业技能培训',
      value: '2'
    },
    {
      label: '创业培训',
      value: '3'
    }
  ],
  trainMap: {
    '1': '适应性培训',
    '2': '职业技能培训',
    '3': '创业培训'
  },

  // 公式状态
  publicityOption: [
    {
      label: '未公示',
      value: '1'
    },
    {
      label: '已公示',
      value: '2'
    }
  ],
  publicityMap: {
    '1': '未公示',
    '2': '已公示'
  },

  // 单位性质数据
  natureOptions: [
    {
      label: '普通高等院校',
      value: '1'
    },
    {
      label: '职业院校',
      value: '2'
    },
    {
      label: '技工院校',
      value: '3'
    },
    {
      label: '公办培训机构',
      value: '4'
    },
    {
      label: '民办培训机构',
      value: '5'
    },
    {
      label: '企业实训基地',
      value: '6'
    },
    {
      label: '创业孵化基地',
      value: '7'
    },
    {
      label: '职工培训中心',
      value: '8'
    },
    {
      label: '技能大师工作室',
      value: '9'
    }
  ],
  natureMap: {
    '1': '普通高等院校',
    '2': '职业院校',
    '3': '技工院校',
    '4': '公办培训机构',
    '5': '民办培训机构',
    '6': '企业实训基地',
    '7': '创业孵化基地',
    '8': '职工培训中心',
    '9': '技能大师工作室'
  },

  // 资产性质
  qualityOption: [
    {
      label: '国有',
      value: '1'
    },
    {
      label: '集体',
      value: '2'
    },
    {
      label: '私有',
      value: '3'
    },
    {
      label: '混合',
      value: '4'
    }
  ],
  qualityMap: {
    '1': '国有',
    '2': '集体',
    '3': '私有',
    '4': '混合'
  },

  // 运营方式
  runOption: [
    {
      label: '自营',
      value: '1'
    },
    {
      label: '委托',
      value: '2'
    },
    {
      label: '合作',
      value: '3'
    }
  ],
  runMap: {
    '1': '自营',
    '2': '委托',
    '3': '合作'
  }
}

export default { data }
