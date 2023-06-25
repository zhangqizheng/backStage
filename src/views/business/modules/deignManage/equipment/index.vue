<template>
  <div>
    <div class="g-box">
      <div class="g-filter">
        <el-form ref="formInline" :model="pageParam" label-width="120px">
          <el-row :gutter="10">
            <el-col :span="8">
              <el-form-item label="设备名称" prop="name">
                <el-input
                  v-model="pageParam.name"
                  placeholder="请输入设备名称"
                />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="设备类型" prop="type">
                <el-select
                  v-model="pageParam.type"
                  placeholder="请选择设备类型"
                >
                  <el-option
                    v-for="item in typeOption"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="设备角色" prop="role">
                <el-select
                  v-model="pageParam.role"
                  placeholder="请选择设备角色"
                >
                  <el-option
                    v-for="item in roleOption"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="10">
            <el-col :span="8">
              <el-form-item label="厂商" prop="firm">
                <el-select
                  v-model="pageParam.firm"
                  placeholder="请选择厂商"
                >
                  <el-option
                    v-for="item in firmOption"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6" :offset="10">
              <div style="float: right">
                <el-button
                  type="primary"
                  icon="el-icon-search"
                  size="small"
                >查询</el-button>
                <el-button
                  type="info"
                  icon="el-icon-refresh"
                  size="small"
                >重置</el-button>
              </div>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <div class="contentBox">
        <div class="handleBox">
          <div class="title">设备清单</div>
          <div class="btnList">
            <el-button
              type="primary"
              size="small"
              plain
              @click="openDrawer()"
            >新增设备</el-button>
            <el-button
              size="small"
              plain
              @click="openDrawer()"
            >下载设备清单</el-button>
            <el-button
              size="small"
              plain
              @click="openDrawer()"
            >批量删除</el-button>
          </div>
        </div>
        <el-table
          ref="showTable"
          :data="tableData"
          stripe
          border
          style="width: 100%;"
          height="calc(100vh - 350px)"
        >
          <el-table-column
            type="selection"
            align="center"
            width="55"
          />
          <el-table-column
            type="index"
            label="序号"
            width="50"
            align="center"
          />
          <el-table-column
            label="设备名称"
            prop="a"
            width="200"
            show-overflow-tooltip
            align="center"
          />
          <el-table-column
            label="设备类型"
            prop="b"
            width="120"
            show-overflow-tooltip
            align="center"
          >
            <template slot-scope="scope">
              <span>{{ scope.row.b === 1 ? '服务器' : '' }}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="产品"
            prop="c"
            width="120"
            show-overflow-tooltip
            align="center"
          />
          <el-table-column
            label="设备角色"
            prop="d"
            width="180"
            show-overflow-tooltip
            align="center"
          />
          <el-table-column
            label="数量"
            prop="e"
            width="80"
            align="center"
          />
          <el-table-column
            label="厂商"
            prop="f"
            width="120"
            show-overflow-tooltip
            align="center"
          />
          <el-table-column
            label="型号"
            prop="g"
            width="160"
            show-overflow-tooltip
            align="center"
          />
          <el-table-column
            label="CPU类型"
            prop="h"
            width="160"
            show-overflow-tooltip
            align="center"
          />
          <el-table-column
            label="CPU配置"
            prop="i"
            width="160"
            show-overflow-tooltip
            align="center"
          />
          <el-table-column
            label="内存配置"
            prop="j"
            width="160"
            show-overflow-tooltip
            align="center"
          />
          <el-table-column
            label="系统盘"
            prop="k"
            width="160"
            show-overflow-tooltip
            align="center"
          />
          <el-table-column
            label="数据盘"
            prop="l"
            width="160"
            show-overflow-tooltip
            align="center"
          />
          <el-table-column
            label="缓存盘"
            prop="m"
            width="160"
            show-overflow-tooltip
            align="center"
          />
          <el-table-column
            label="raid卡"
            prop="n"
            width="80"
            align="center"
          />
          <el-table-column
            label="板卡信息"
            prop="n"
            width="160"
            show-overflow-tooltip
            align="center"
          />
          <el-table-column
            label="设备标牌功率"
            prop="o"
            width="100"
            show-overflow-tooltip
            align="center"
          />
          <el-table-column
            label="是否现网在用设备"
            prop="p"
            width="80"
            align="center"
          />
          <el-table-column
            label="电源模块"
            prop="q"
            width="120"
            show-overflow-tooltip
            align="center"
          />
          <el-table-column
            label="电源类型"
            prop="e"
            width="120"
            show-overflow-tooltip
            align="center"
          />
          <el-table-column
            label="插座要求"
            prop="s"
            width="120"
            show-overflow-tooltip
            align="center"
          />
          <el-table-column
            label="设备尺寸(高x宽x深)(mm)"
            prop="t"
            width="160"
            show-overflow-tooltip
            align="center"
          />
          <el-table-column
            label="单台高度(U)"
            prop="u"
            width="80"
            align="center"
          />
          <el-table-column
            label="重量(kg)"
            prop="v"
            width="80"
            align="center"
          />
          <el-table-column
            label="是否定制化"
            prop="w"
            width="80"
            align="center"
          />
          <el-table-column label="操作" width="100" align="center" fixed="right">
            <template slot-scope="scope">
              <el-button-group class="tab-button-group">
                <el-link
                  type="primary"
                  @click="openDrawer(scope.row)"
                >编辑</el-link>
                |
                <el-link
                  type="primary"
                  @click="openDrawer(scope.row)"
                >删除</el-link>
              </el-button-group>
            </template>
          </el-table-column>
        </el-table>

        <el-pagination
          background
          class="g-pagination"
          layout="total, sizes, prev, pager, next"
          :total="pageTotal"
          :current-page="pageParam.page + 1"
          :page-size="pageParam.pageSize"
          :page-sizes="[5, 10, 20, 50, 100]"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>
    </div>
    <!-- 新增、编辑设备 -->
    <el-drawer
      title="新增设备"
      size="800px"
      style="overflow: auto;"
      :modal="false"
      :visible.sync="drawerFlag"
    >
      <div class="addFormBox">
        <el-form ref="formInline" :model="addForm" label-width="80px">
          <!-- 主要信息 -->
          <div class="headTitle">
            <span class="line" />
            <span class="title">主要信息</span>
          </div>
          <el-row :gutter="10">
            <el-col :span="8">
              <el-form-item label="产品" prop="cp">
                <el-input
                  v-model="addForm.cp"
                  placeholder="请输入设备名称"
                />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="设备角色" prop="role">
                <el-select
                  v-model="addForm.role"
                  placeholder="请选择设备角色"
                >
                  <el-option
                    v-for="item in roleOption"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="设备类型" prop="type">
                <el-select
                  v-model="addForm.type"
                  placeholder="请选择设备类型"
                >
                  <el-option
                    v-for="item in typeOption"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="10">
            <el-col :span="8">
              <el-form-item label="设备名称" prop="name">
                <el-input
                  v-model="addForm.name"
                  placeholder="请输入设备名称"
                />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="设备数量" prop="num">
                <el-input-number v-model="addForm.num" size="small" :min="1" label="请输入设备数量" controls-position="right" style="width:100%;" />
              </el-form-item>
            </el-col>
          </el-row>
          <!-- 设备配置 -->
          <div class="headTitle">
            <span class="line" />
            <span class="title">设备配置</span>
          </div>
          <el-row :gutter="10">
            <el-col :span="8">
              <el-form-item label="厂商" prop="cs">
                <el-select
                  v-model="addForm.cs"
                  placeholder="请选择厂商"
                >
                  <el-option
                    v-for="item in roleOption"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="型号" prop="xh">
                <el-select
                  v-model="addForm.xh"
                  placeholder="请选择型号"
                >
                  <el-option
                    v-for="item in roleOption"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="CPU类型" prop="cupType">
                <el-select
                  v-model="addForm.cupType"
                  placeholder="请选择CPU类型"
                >
                  <el-option
                    v-for="item in typeOption"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <!-- CPU配置 -->
          <el-row :gutter="10">
            <el-col :span="24">
              <el-form-item label="CPU配置" prop="num">
                <el-input-number v-model="addForm.cpuLu" size="small" :min="1" controls-position="right" style="width: 80px;" />
                <span class="textMargin">路</span>
                <el-input-number v-model="addForm.cpuHe" size="small" :min="1" controls-position="right" style="width: 80px;" />
                <span class="textMargin">核</span>
                <el-input
                  v-model="addForm.cupText"
                  style="width: 200px"
                  placeholder="请输入"
                />
              </el-form-item>
            </el-col>
          </el-row>
          <!-- 内存配置 -->
          <el-row :gutter="10">
            <el-col :span="24">
              <el-form-item label="内存配置" prop="num">
                <el-input-number v-model="addForm.ncA" size="small" :min="1" controls-position="right" style="width: 80px;" />
                <span class="textMargin" style="font-size: 20px;">*</span>
                <el-input-number v-model="addForm.ncB" size="small" :min="1" controls-position="right" style="width: 80px;" />
                <span class="textMargin" />
                <el-select
                  v-model="addForm.ncC"
                  style="width: 70px;"
                  placeholder=""
                >
                  <el-option key="1" label="GB" value="1" />
                  <el-option key="2" label="TB" value="2" />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="" prop="num">
                <el-input
                  v-model="addForm.ncD"
                  style="width: 456px;"
                />
              </el-form-item>
            </el-col>
          </el-row>
          <!-- 系统盘 -->
          <el-row :gutter="10">
            <el-col :span="24">
              <el-form-item label="系统盘" prop="num">
                <el-input-number v-model="addForm.xtA" size="small" :min="1" controls-position="right" style="width: 80px;" />
                <span class="textMargin" style="font-size: 20px;">*</span>
                <el-input-number v-model="addForm.xtB" size="small" :min="1" controls-position="right" style="width: 80px;" />
                <span class="textMargin" />
                <el-select
                  v-model="addForm.xtC"
                  style="width: 70px;"
                  placeholder=""
                >
                  <el-option key="1" label="GB" value="1" />
                  <el-option key="2" label="TB" value="2" />
                </el-select>

                <span class="textMargin" />
                <el-select
                  v-model="addForm.xtD"
                  style="width: 160px;"
                  placeholder=""
                >
                  <el-option key="1" label="SATA" value="1" />
                  <el-option key="2" label="SAS" value="2" />
                  <el-option key="3" label="SSD" value="3" />
                  <el-option key="4" label="PCIE NVME SSD" value="4" />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="" prop="num">
                <el-input
                  v-model="addForm.xtE"
                  style="width: 456px;"
                />
              </el-form-item>
            </el-col>
          </el-row>
          <!-- 数据盘 -->
          <el-row :gutter="10">
            <el-col :span="24">
              <el-form-item label="数据盘" prop="num">
                <el-input-number v-model="addForm.sjA" size="small" :min="1" controls-position="right" style="width: 80px;" />
                <span class="textMargin" style="font-size: 20px;">*</span>
                <el-input-number v-model="addForm.sjB" size="small" :min="1" controls-position="right" style="width: 80px;" />
                <span class="textMargin" />
                <el-select
                  v-model="addForm.sjC"
                  style="width: 70px;"
                  placeholder=""
                >
                  <el-option key="1" label="GB" value="1" />
                  <el-option key="2" label="TB" value="2" />
                </el-select>

                <span class="textMargin" />
                <el-select
                  v-model="addForm.sjD"
                  style="width: 160px;"
                  placeholder=""
                >
                  <el-option key="1" label="SATA" value="1" />
                  <el-option key="2" label="SAS" value="2" />
                  <el-option key="3" label="SSD" value="3" />
                  <el-option key="4" label="PCIE NVME SSD" value="4" />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="" prop="sjE">
                <el-input
                  v-model="addForm.sjE"
                  style="width: 456px;"
                />
              </el-form-item>
            </el-col>
          </el-row>
          <!-- 缓存盘 -->
          <el-row :gutter="10">
            <el-col :span="24">
              <el-form-item label="缓存盘" prop="num">
                <el-input-number v-model="addForm.hcA" size="small" :min="1" controls-position="right" style="width: 80px;" />
                <span class="textMargin" style="font-size: 20px;">*</span>
                <el-input-number v-model="addForm.hcB" size="small" :min="1" controls-position="right" style="width: 80px;" />
                <span class="textMargin" />
                <el-select
                  v-model="addForm.hcC"
                  style="width: 70px;"
                  placeholder=""
                >
                  <el-option key="1" label="GB" value="1" />
                  <el-option key="2" label="TB" value="2" />
                </el-select>

                <span class="textMargin" />
                <el-select
                  v-model="addForm.hcD"
                  style="width: 160px;"
                  placeholder=""
                >
                  <el-option key="1" label="SATA" value="1" />
                  <el-option key="2" label="SAS" value="2" />
                  <el-option key="3" label="SSD" value="3" />
                  <el-option key="4" label="PCIE NVME SSD" value="4" />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="" prop="num">
                <el-input
                  v-model="addForm.hcE"
                  style="width: 456px;"
                />
              </el-form-item>
            </el-col>
          </el-row>
          <!-- GPU、raid卡 -->
          <el-row :gutter="10">
            <el-col :span="14">
              <el-form-item label="GPU" prop="num">
                <el-input-number v-model="addForm.gpuVal" size="small" :min="1" controls-position="right" style="width: 80px;" />
                <span class="textMargin">*</span>
                <el-input
                  v-model="addForm.gpuText"
                  style="width: 230px;"
                  placeholder="请输入设备名称"
                />
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item label="raid卡" prop="num">
                <el-input-number v-model="addForm.raidCard" size="small" :min="1" controls-position="right" style="width: 80px;" />
                <span class="textMargin"> * raid卡</span>
              </el-form-item>
            </el-col>
          </el-row>
          <!-- 板卡信息 -->
          <el-row :gutter="10">
            <el-col :span="24">
              <el-form-item label="板卡信息" prop="num">
                <el-table
                  :data="addForm.bkList"
                  border
                  style="width: 100%"
                >
                  <el-table-column
                    label="板卡序号"
                    width="90"
                  >
                    <template slot-scope="scope">
                      <div class="indexBox">
                        <div>板卡{{ scope.$index + 1 }}</div>
                        <div v-if="addForm.bkList.length > 1" class="del" @click="delBk(scope.$index)"><i class="el-icon-delete" /></div>
                      </div>
                    </template>
                  </el-table-column>
                  <el-table-column
                    prop="type"
                    label="板卡类型"
                    width="200"
                  >
                    <template slot-scope="scope">
                      <div v-for="(item,index) in scope.row.list" :key="index" class="marginStyle">
                        <el-select
                          v-model="item.type"
                          placeholder=""
                        >
                          <el-option key="1" label="100GE光模块, 单模" value="1" />
                          <el-option key="2" label="100GE光模块, 多模" value="2" />
                          <el-option key="3" label="40GE光模块, 单模" value="3" />
                          <el-option key="4" label="40GE光模块, 多模" value="4" />
                          <el-option key="5" label="25GE光模块, 单模" value="5" />
                          <el-option key="6" label="25GE光模块, 多模" value="6" />
                        </el-select>
                      </div>
                    </template>
                  </el-table-column>
                  <el-table-column
                    prop="num"
                    label="数量"
                    width="80"
                  >
                    <template slot-scope="scope">
                      <div v-for="(item,index) in scope.row.list" :key="index" class="marginStyle">
                        <el-input-number v-model="item.num" size="small" :min="1" controls-position="right" style="width: 60px;" />
                      </div>
                    </template>
                  </el-table-column>
                  <el-table-column
                    prop="port"
                    label="端口"
                    width="200"
                  >
                    <template slot-scope="scope">
                      <div v-for="(item,index) in scope.row.list" :key="index" class="marginStyle">
                        <el-input-number v-model="item.portOne" size="small" :min="1" controls-position="right" style="width: 80px;" />
                        <span class="textMargin">-</span>
                        <el-input-number v-model="item.portTwo" size="small" :min="1" controls-position="right" style="width: 80px;" />
                      </div>
                    </template>
                  </el-table-column>
                  <el-table-column
                    label="操作"
                    width="60"
                  >
                    <template slot-scope="scope">
                      <div v-for="(item,index) in scope.row.list" :key="index" class="bkBtn marginStyle">
                        <div v-if="index === scope.row.list.length - 1" class="add" @click="addBkItem(scope.row, scope.$index)"><i class="el-icon-plus" /></div>
                        <div v-if="scope.row.list.length > 1" class="del" @click="delBkItem(scope.row, index)"><i class="el-icon-delete" /></div>
                      </div>
                    </template>
                  </el-table-column>
                </el-table>
              </el-form-item>
            </el-col>
          </el-row>
          <!-- 新增板卡信息 -->
          <el-row :gutter="10" style="margin-bottom: 30px;">
            <el-col :span="24">
              <div class="addBk" @click="addBk()">
                <i class="el-icon-plus" />
                <span>新增板卡信息</span>
              </div>
            </el-col>
          </el-row>
          <!-- 其他信息 -->
          <div class="headTitle">
            <span class="line" />
            <span class="title">其他信息</span>
          </div>
          <el-row :gutter="10">
            <el-col :span="8">
              <el-form-item label="设备标牌功率" prop="gl" label-width="100px">
                <el-input-number v-model="addForm.gl" size="small" :min="1" label="请输入设备数量" controls-position="right" style="width:100%;" />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="电源模块" prop="mk">
                <el-select
                  v-model="addForm.mk"
                  placeholder=""
                >
                  <el-option key="1" label="1" value="1" />
                  <el-option key="2" label="2" value="2" />
                  <el-option key="3" label="3" value="3" />
                  <el-option key="4" label="4" value="4" />
                  <el-option key="5" label="5" value="5" />
                  <el-option key="6" label="6" value="6" />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="电源类型" prop="dyType">
                <el-select
                  v-model="addForm.dyType"
                  placeholder=""
                >
                  <el-option key="1" label="国际交流" value="1" />
                  <el-option key="2" label="国际直流" value="2" />
                  <el-option key="3" label="欧标交流" value="3" />
                  <el-option key="4" label="欧标直流" value="4" />
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="10">
            <el-col :span="8">
              <el-form-item label="插座要求" prop="cz">
                <el-input-number v-model="addForm.czSl" size="small" :min="1" :max="6" controls-position="right" style="width: 60px;" />
                <span class="textMargin">*</span>
                <el-select
                  v-model="addForm.czGv"
                  style="width: 80px;"
                  placeholder=""
                >
                  <el-option key="1" label="10A" value="1" />
                  <el-option key="2" label="16A" value="2" />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="单台高度" prop="role">
                <el-input-number v-model="addForm.gd" size="small" :min="1" controls-position="right" style="width:100%" />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="重量" prop="type">
                <el-input-number v-model="addForm.zl" :step="0.1" size="small" :min="1" controls-position="right" style="width:100%" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="10">
            <el-col :span="24">
              <el-form-item label="设备尺寸（高*宽*深）(mm)" prop="cc" label-width="190px">
                <el-input-number v-model="addForm.k" :step="10" size="small" :min="10" controls-position="right" style="width: 100px;" />
                <span class="textMargin">*</span>
                <el-input-number v-model="addForm.g" :step="10" size="small" :min="10" controls-position="right" style="width: 100px;" />
                <span class="textMargin">*</span>
                <el-input-number v-model="addForm.s" :step="10" size="small" :min="10" controls-position="right" style="width: 100px;" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="10">
            <el-col :span="24">
              <el-form-item label="备注" prop="cc">
                <el-input v-model="addForm.bz" type="textarea" :rows="4" />
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <div class="handleList">
        <el-button
          size="small"
          @click="drawerFlag = false"
        >关闭</el-button>
        <el-button
          type="primary"
          size="small"
          @click="addDevice()"
        >保存</el-button>
      </div>
    </el-drawer>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 抽屉开关
      drawerFlag: false,
      typeOption: [{
        value: '1',
        label: '设备1'
      }, {
        value: '2',
        label: '设备2'
      }, {
        value: '3',
        label: '设备3'
      }, {
        value: '4',
        label: '设备4'
      }, {
        value: '5',
        label: '设备5'
      }],
      roleOption: [{
        value: '1',
        label: '角色1'
      }, {
        value: '2',
        label: '角色2'
      }, {
        value: '3',
        label: '角色3'
      }, {
        value: '4',
        label: '角色4'
      }, {
        value: '5',
        label: '角色5'
      }],
      firmOption: [{
        value: '1',
        label: '厂商1'
      }, {
        value: '2',
        label: '厂商2'
      }, {
        value: '3',
        label: '厂商3'
      }, {
        value: '4',
        label: '厂商4'
      }, {
        value: '5',
        label: '厂商5'
      }],
      // 查询条件
      pageParam: {
        page: 0,
        pageSize: 10
      },
      // 新增数据
      addForm: {
        // 板卡配置
        bkList: [
          {
            list: [
              {
                type: '',
                num: '',
                portOne: '',
                portTwo: ''
              }
            ]
          }
        ]
      },
      // 列表数据
      tableData: [
        {
          a: '4U缓存服务器',
          b: 1,
          c: 'CT3',
          d: '缓存服务器',
          e: '1',
          f: 'H3C',
          g: 'S6805-54HF',
          h: 'X86',
          i: '2C64核',
          j: '16*32G',
          k: '2*1.8TSAS',
          l: '24*16TSATA',
          m: '4*32TPCIE NVMESSD',
          n: '1',
          o: '2XIntel 8378A(21Cores,3.0GHz)CPU',
          p: '646W',
          q: '2',
          r: '交流',
          s: '2*10A',
          t: '44(1RU)x440x400',
          u: '1',
          v: '10',
          w: '否'
        },
        {
          a: '4U缓存服务器',
          b: 1,
          c: 'CT3',
          d: '缓存服务器',
          e: '1',
          f: 'H3C',
          g: 'S6805-54HF',
          h: 'X86',
          i: '2C64核',
          j: '16*32G',
          k: '2*1.8TSAS',
          l: '24*16TSATA',
          m: '4*32TPCIE NVMESSD',
          n: '1',
          o: '2XIntel 8378A(21Cores,3.0GHz)CPU',
          p: '646W',
          q: '2',
          r: '交流',
          s: '2*10A',
          t: '44(1RU)x440x400',
          u: '1',
          v: '10',
          w: '否'
        },
        {
          a: '4U缓存服务器',
          b: 1,
          c: 'CT3',
          d: '缓存服务器',
          e: '1',
          f: 'H3C',
          g: 'S6805-54HF',
          h: 'X86',
          i: '2C64核',
          j: '16*32G',
          k: '2*1.8TSAS',
          l: '24*16TSATA',
          m: '4*32TPCIE NVMESSD',
          n: '1',
          o: '2XIntel 8378A(21Cores,3.0GHz)CPU',
          p: '646W',
          q: '2',
          r: '交流',
          s: '2*10A',
          t: '44(1RU)x440x400',
          u: '1',
          v: '10',
          w: '否'
        }
      ],
      // 总条数
      pageTotal: 0
    }
  },
  computed: {},
  watch: {},
  created() {
  },
  mounted() {},
  methods: {
    // 新增设备
    addDevice() {
      console.log(this.addForm)
      // this.drawerFlag = false;
    },
    // 打开抽屉
    openDrawer() {
      this.drawerFlag = true
    },
    // 新增板卡信息
    addBk() {
      this.addForm.bkList.push({
        list: [
          {
            type: '',
            num: '',
            portOne: '',
            portTwo: ''
          }
        ]
      })
    },
    // 删除板卡信息
    delBk(index) {
      this.addForm.bkList.splice(index, 1)
    },
    // 新增板卡配置信息
    addBkItem(item) {
      console.log(item)
      item.list.push({
        type: '',
        num: '',
        portOne: '',
        portTwo: ''
      })
    },
    // 删除板卡配置信息
    delBkItem(item, index) {
      item.list.splice(index, 1)
    },
    // 每页数变化
    handleSizeChange(pageSize) {
      this.pageParam.page = 0
      this.pageParam.pageSize = pageSize
      this.queryList()
    },
    // 页码变化
    handleCurrentChange(currentPage) {
      this.pageParam.page = currentPage - 1
      this.queryList()
    }
  }
}
</script>
<style lang="scss" scoped>
.handleBox{
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 0;
  .title{
    font-weight: 700;
  }
  .btnList{
    display: flex;
    align-items: center;
  }
}
.addFormBox{
  padding: 0 10px;
  box-sizing: border-box;
  .headTitle{
    display: flex;
    align-items: center;
    font-size: 16px;
    color: #606266;
    font-weight: 700;
    margin-bottom: 20px;
    .line{
      width: 4px;
      height: 16px;
      background: #1890ff;
      margin-right: 4px;
    }
  }
  .addBk{
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid #dfe6ec;
    border-radius: 5px;
    font-size: 12px;
    padding: 10px 0;
    cursor: pointer;
    color: #606266;
    i{
      margin-right: 4px;
    }
  }
  .textMargin{
    margin: 0 10px;
  }
  ::v-deep{
    .el-input-number.is-controls-right .el-input__inner{
      padding-left: 0;
      padding-right: 30px;
    }
    .el-form-item{
      margin-bottom: 16px;
    }
    .indexBox{
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;
      .del{
        color: #f00;
        cursor: pointer;
      }
    }
    .bkBtn{
      width: 100%;
      height: 50px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-bottom: 1px solid #ddd;
      .add{
        color: #1890ff;
        cursor: pointer;
      }
      .del{
        color: #f00;
        cursor: pointer;
        margin-left: auto;
      }
    }
    .bkBtn:last-child{
      border-bottom: 0;
    }
    .marginStyle{
      padding: 5px 0;
    }
  }
}
.handleList{
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: 20px;
  box-sizing: border-box;
}
::v-deep{
  .el-drawer.rtl{
    overflow: auto;
  }
}
</style>
