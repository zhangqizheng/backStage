const dict = {
  'device_type': [
    {
      'name': '服务器',
      'id': 1
    },
    {
      'name': '交换机',
      'id': 2
    }
  ],
  'device_role': [
    {
      'id': 1,
      'name': 'LVS服务器',
      'dtid': 1
    },
    {
      'id': 2,
      'name': '管理服务器',
      'dtid': 1
    },
    {
      'id': 3,
      'name': '缓存服务器',
      'dtid': 1
    },
    {
      'id': 4,
      'name': '直播缓存服务器',
      'dtid': 1
    },
    {
      'id': 5,
      'name': 'DC交换机',
      'dtid': 2
    },
    {
      'id': 6,
      'name': '25G接入交换机',
      'dtid': 2
    },
    {
      'id': 7,
      'name': '万兆接入交换机',
      'dtid': 2
    },
    {
      'id': 8,
      'name': '管理交换机',
      'dtid': 2
    }
  ],
  'manufacture': [
    {
      'id': 1,
      'name': '烽火'
    },
    {
      'id': 2,
      'name': '华三'
    },
    {
      'id': 3,
      'name': '华为'
    },
    {
      'id': 4,
      'name': '华讯'
    },
    {
      'id': 5,
      'name': '锐捷'
    },
    {
      'id': 6,
      'name': '四川虹信'
    },
    {
      'id': 7,
      'name': '紫光'
    },
    {
      'id': 8,
      'name': '可控'
    }
  ],
  'model': [
    {
      'id': 1,
      'name': 'Fitserver R2280 V6',
      'mfId': 1
    },
    {
      'id': 2,
      'name': 'S6825',
      'mfId': 2
    },
    {
      'id': 3,
      'name': 'CE16808',
      'mfId': 3
    },
    {
      'id': 4,
      'name': 'ACS8000',
      'mfId': 4
    },
    {
      'id': 5,
      'name': 'RG-S5750',
      'mfId': 5
    },
    {
      'id': 6,
      'name': 'RG-S6510',
      'mfId': 5
    },
    {
      'id': 7,
      'name': 'RG-S6250',
      'mfId': 5
    },
    {
      'id': 8,
      'name': 'RG-S5750V2',
      'mfId': 5
    },
    {
      'id': 9,
      'name': 'TG525B1',
      'mfId': 6
    },
    {
      'id': 10,
      'name': 'H3C R4900G5',
      'mfId': 7
    },
    {
      'id': 11,
      'name': 'R6240H0',
      'mfId': 8
    }
  ],
  'powerType': [
    {
      'id': 1,
      'name': '国标交流'
    },
    {
      'id': 2,
      'name': '国标直流'
    },
    {
      'id': 3,
      'name': '欧标交流'
    },
    {
      'id': 4,
      'name': '欧标直流'
    }
  ],
  'cpuType': [
    {
      'id': 1,
      'name': 'XC-海光(x86)'
    },
    {
      'id': 2,
      'name': 'XC-鲲鹏 (arm)'
    },
    {
      'id': 3,
      'name': 'XC-飞腾 (arm)'
    },
    {
      'id': 4,
      'name': 'X86'
    },
    {
      'id': 5,
      'name': 'XC-龙芯 (Loongarch)'
    }
  ],
  'product': [
    {
      'id': 1,
      'name': 'CT3'
    },
    {
      'id': 2,
      'name': 'CT4'
    },
    {
      'id': 3,
      'name': 'ECX'
    },
    {
      'id': 4,
      'name': 'CDN'
    },
    {
      'id': 5,
      'name': 'CloudDesktop'
    }
  ],
  'sysType': [
    {
      'id': 1,
      'name': 'SATA'
    },
    {
      'id': 2,
      'name': 'SAS'
    },
    {
      'id': 3,
      'name': 'SSD'
    },
    {
      'id': 4,
      'name': 'PCIE NVME SSD'
    }
  ],
  'cbcType': [
    {
      'id': 1,
      'name': '100GE光模块，单模'
    },
    {
      'id': 2,
      'name': '100GE光模块，多模'
    },
    {
      'id': 3,
      'name': '40GE光模块，多模'
    },
    {
      'id': 4,
      'name': '40GE光模块，多模'
    },
    {
      'id': 5,
      'name': '25GE光模块，多模'
    },
    {
      'id': 6,
      'name': '25GE光模块，多模'
    },
    {
      'id': 7,
      'name': '10GE光模块，多模'
    },
    {
      'id': 8,
      'name': '10GE光模块，多模'
    },
    {
      'id': 9,
      'name': 'GE光模块，多模'
    },
    {
      'id': 10,
      'name': 'GE光模块，多模'
    },
    {
      'id': 11,
      'name': 'GE电'
    },
    {
      'id': 12,
      'name': 'FE电'
    }
  ],
  'capType': [
    {
      'id': 1,
      'name': 'GB'
    },
    {
      'id': 2,
      'name': 'TB'
    }
  ]
}

const dictMap = {}
Object.values(dict).forEach((arr, index) => {
  const obj = {}
  arr.forEach(item => {
    obj[item.id] = item.name
  })
  dictMap[Object.keys(dict)[index]] = obj
})

export { dict, dictMap }
