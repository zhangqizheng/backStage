<template>
  <div>
    <div class="g-box">
      <div class="g-filter">
        <el-form ref="formInline" :model="pageParam" label-width="80px">
          <el-row :gutter="10">
            <el-col :span="6">
              <el-form-item label="设备类型" prop="dcfId">
                <el-select
                  v-model="pageParam.dcfId"
                  placeholder="请选择设备类型"
                  filterable
                  @change="getRoleList"
                >
                  <el-option
                    v-for="item in dict.device_type"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                  />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="设备角色" prop="drId">
                <el-select
                  v-model="pageParam.drId"
                  placeholder="请选择设备角色"
                  filterable
                >
                  <el-option
                    v-for="item in dtidRoleListPageOption"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                  />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="厂商" prop="manufacture">
                <el-select
                  v-model="pageParam.manufacture"
                  placeholder="请选择厂商"
                  filterable
                >
                  <el-option
                    v-for="item in dict.manufacture"
                    :key="item.id"
                    :label="item.name"
                    :value="item.name"
                  />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <div style="float: right">
                <el-button
                  type="primary"
                  icon="el-icon-search"
                  size="small"
                  @click="getListData()"
                >查询</el-button>
                <el-button
                  type="info"
                  icon="el-icon-refresh"
                  size="small"
                  @click="resetSearch()"
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
            <el-button size="small" plain>下载设备清单</el-button>
            <el-button size="small" plain>批量删除</el-button>
          </div>
        </div>
        <el-table
          ref="showTable"
          :data="tableData"
          stripe
          border
          style="width: 100%"
          height="calc(100vh - 350px)"
        >
          <el-table-column type="selection" align="center" width="55" />
          <el-table-column
            type="index"
            label="序号"
            width="50"
            align="center"
          />
          <el-table-column
            label="产品"
            prop="product"
            width="120"
            show-overflow-tooltip
            align="center"
          />
          <el-table-column
            label="设备类型"
            prop="dcfId"
            width="120"
            show-overflow-tooltip
            align="center"
          >
            <template slot-scope="scope">
              {{ dictMap.device_type[scope.row.dcfId] }}
            </template>
          </el-table-column>
          <el-table-column
            label="设备角色"
            prop="drId"
            width="180"
            show-overflow-tooltip
            align="center"
          >
            <template slot-scope="scope">
              {{ dictMap.device_role[scope.row.drId] }}
            </template>
          </el-table-column>
          <el-table-column
            label="数量"
            prop="count"
            width="80"
            align="center"
          />
          <el-table-column
            label="厂商"
            prop="manufacture"
            width="120"
            show-overflow-tooltip
            align="center"
          />
          <el-table-column
            label="型号"
            prop="model"
            width="160"
            show-overflow-tooltip
            align="center"
          />
          <el-table-column
            label="CPU类型"
            prop="deviceSrv.cpuType"
            width="160"
            show-overflow-tooltip
            align="center"
          />
          <el-table-column
            label="CPU配置"
            width="160"
            show-overflow-tooltip
            align="center"
          >
            <template v-if="scope.row.deviceSrv" slot-scope="scope">
              {{ scope.row.deviceSrv.cpuCount }}路{{
                scope.row.deviceSrv.cpuCore
              }}核
            </template>
          </el-table-column>
          <el-table-column
            label="内存配置"
            width="160"
            show-overflow-tooltip
            align="center"
          >
            <template v-if="scope.row.deviceSrv" slot-scope="scope">
              {{ scope.row.deviceSrv.memCount }}*{{
                scope.row.deviceSrv.memCap / 100000
              }}{{ scope.row.deviceSrv.memCapUnit === 1 ? "GB" : "TB" }}
            </template>
          </el-table-column>
          <el-table-column
            label="系统盘"
            width="160"
            show-overflow-tooltip
            align="center"
          >
            <template v-if="scope.row.deviceSrv" slot-scope="scope">
              {{ scope.row.deviceSrv.diskCountSys }}*{{
                scope.row.deviceSrv.diskCapSys / 100000
              }}{{ scope.row.deviceSrv.sysCapUnit === 1 ? "GB" : "TB" }}
              {{ scope.row.deviceSrv.diskTypeSys }}
            </template>
          </el-table-column>
          <el-table-column
            label="数据盘"
            width="160"
            show-overflow-tooltip
            align="center"
          >
            <template v-if="scope.row.deviceSrv" slot-scope="scope">
              {{ scope.row.deviceSrv.diskCountData }}*{{
                scope.row.deviceSrv.diskCapData / 100000
              }}{{ scope.row.deviceSrv.dataCapUnit === 1 ? "GB" : "TB" }}
              {{ scope.row.deviceSrv.diskTypeData }}
            </template>
          </el-table-column>
          <el-table-column
            label="缓存盘"
            width="160"
            show-overflow-tooltip
            align="center"
          >
            <template v-if="scope.row.deviceSrv" slot-scope="scope">
              {{ scope.row.deviceSrv.diskCountCache }}*{{
                scope.row.deviceSrv.diskCapCache / 100000
              }}{{ scope.row.deviceSrv.cacheCapUnit === 1 ? "GB" : "TB" }}
              {{ scope.row.deviceSrv.diskTypeCache }}
            </template>
          </el-table-column>
          <el-table-column label="raid卡" width="80" align="center">
            <template v-if="scope.row.deviceSrv" slot-scope="scope">
              {{ scope.row.deviceSrv.raidCount }}*Raid卡
            </template>
          </el-table-column>
          <el-table-column
            label="板卡/网口"
            prop="cbcList"
            width="160"
            show-overflow-tooltip
            align="center"
          >
            <template slot-scope="scope">
              <span v-for="(item, index) in scope.row.cbcList" :key="index">
                {{ item.count }}*{{ item.cbcType }}
                <template v-if="index !== scope.row.cbcList.length-1">+</template>
              </span>
            </template>
          </el-table-column>
          <el-table-column
            label="额定功率"
            prop="powerLable"
            width="100"
            show-overflow-tooltip
            align="center"
          />
          <el-table-column
            label="电源模块"
            prop="powerCount"
            width="120"
            show-overflow-tooltip
            align="center"
          />
          <el-table-column
            label="电源类型"
            prop="powerType"
            width="120"
            show-overflow-tooltip
            align="center"
          />
          <el-table-column
            label="插座要求"
            prop="plugCount"
            width="120"
            show-overflow-tooltip
            align="center"
          />
          <el-table-column
            label="设备尺寸(高x宽x深)(mm)"
            width="160"
            show-overflow-tooltip
            align="center"
          >
            <template slot-scope="scope">
              {{ scope.row.height }}x{{ scope.row.width }}x{{
                scope.row.length
              }}
            </template>
          </el-table-column>
          <el-table-column
            label="单台高度(U)"
            prop="ucount"
            width="80"
            align="center"
          />
          <el-table-column
            label="重量(kg)"
            prop="weight"
            width="80"
            align="center"
          />
          <el-table-column
            label="备注"
            prop="remark"
            width="80"
            align="center"
          />
          <el-table-column
            label="操作"
            width="100"
            align="center"
            fixed="right"
          >
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
          :current-page="pageParam.pageNum"
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
      style="overflow: auto"
      :modal="false"
      :visible.sync="drawerFlag"
    >
      <div class="addFormBox">
        <el-form
          ref="formInline"
          :model="addForm"
          :rules="newRules"
          label-width="80px"
        >
          <!-- 主要信息 -->
          <div class="headTitle">
            <span class="line" />
            <span class="title">主要信息</span>
          </div>
          <el-row :gutter="10">
            <el-col :span="8">
              <el-form-item label="产品" prop="product">
                <el-select
                  v-model="addForm.product"
                  placeholder="请选择产品"
                  filterable
                >
                  <el-option
                    v-for="item in dict.product"
                    :key="item.id"
                    :label="item.name"
                    :value="item.name"
                  />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="设备类型" prop="dcfId">
                <el-select
                  v-model="addForm.dcfId"
                  placeholder="请选择设备类型"
                  filterable
                  @change="getRoleList"
                >
                  <el-option
                    v-for="item in dict.device_type"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                  />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="设备角色" prop="drId">
                <el-select
                  v-model="addForm.drId"
                  placeholder="请选择设备角色"
                  filterable
                >
                  <el-option
                    v-for="item in dtidRoleOption"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                  />
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="10">
            <el-col :span="8">
              <el-form-item label="设备数量" prop="count">
                <el-input-number
                  v-model="addForm.count"
                  size="small"
                  :min="1"
                  label="请输入设备数量"
                  controls-position="right"
                  style="width: 100%"
                />
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
              <el-form-item label="厂商" prop="manufacture">
                <el-select
                  v-model="addForm.manufacture"
                  placeholder="请选择厂商"
                  filterable
                  @change="getMfIdRoleOption()"
                >
                  <el-option
                    v-for="item in dict.manufacture"
                    :key="item.id"
                    :label="item.name"
                    :value="item.name"
                  />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="型号" prop="model">
                <el-select
                  v-model="addForm.model"
                  placeholder="请选择型号"
                  filterable
                  @change="getDeviceTemplate()"
                >
                  <el-option
                    v-for="item in this.mfIdRoleOption"
                    :key="item.id"
                    :label="item.name"
                    :value="item.name"
                  />
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <div v-show="addForm.dcfId === 1" v-if="addForm.deviceSrv">
            <!-- CPU配置 -->
            <el-row :gutter="10">
              <el-col :span="8">
                <el-form-item label="CPU类型" prop="deviceSrv[cpuType]">
                  <el-select
                    v-model="addForm.deviceSrv.cpuType"
                    placeholder="请选择CPU类型"
                    filterable
                  >
                    <el-option
                      v-for="item in dict.cpuType"
                      :key="item.id"
                      :label="item.name"
                      :value="item.name"
                    />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="CPU配置" prop="deviceSrv[cpuCount]">
                  <el-input-number
                    v-model="addForm.deviceSrv.cpuCount"
                    size="small"
                    :min="1"
                    controls-position="right"
                    style="width: 80px"
                  />
                  <span class="textMargin">路</span>
                  <el-input-number
                    v-model="addForm.deviceSrv.cpuCore"
                    size="small"
                    :min="1"
                    controls-position="right"
                    style="width: 80px"
                  />
                  <span class="textMargin">核</span>
                  <el-input
                    v-model="addForm.deviceSrv.cupInfo"
                    style="width: 200px"
                    placeholder="请输入"
                  />
                </el-form-item>
              </el-col>
            </el-row>
            <!-- 内存配置 -->
            <el-row :gutter="10">
              <el-col :span="24">
                <el-form-item label="内存配置" prop="deviceSrv[memCount]">
                  <el-input-number
                    v-model="addForm.deviceSrv.memCount"
                    size="small"
                    :min="1"
                    controls-position="right"
                    style="width: 80px"
                  />
                  <span class="textMargin" style="font-size: 20px">*</span>
                  <el-input-number
                    v-model="addForm.deviceSrv.memCap"
                    size="small"
                    :min="1"
                    controls-position="right"
                    style="width: 80px"
                  />
                  <span class="textMargin" />
                  <el-select
                    v-model="addForm.deviceSrv.memCapUnit"
                    style="width: 70px"
                    placeholder=""
                  >
                    <el-option
                      v-for="item in dict.capType"
                      :key="item.id"
                      :label="item.name"
                      :value="item.id"
                    />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="" prop="num">
                  <el-input v-model="addForm.ncD" style="width: 456px" />
                </el-form-item>
              </el-col>
            </el-row>
            <!-- 系统盘 -->
            <el-row :gutter="10">
              <el-col :span="24">
                <el-form-item label="系统盘" prop="deviceSrv[diskCountSys]">
                  <el-input-number
                    v-model="addForm.deviceSrv.diskCountSys"
                    size="small"
                    :min="1"
                    controls-position="right"
                    style="width: 80px"
                  />
                  <span class="textMargin" style="font-size: 20px">*</span>
                  <el-input-number
                    v-model="addForm.deviceSrv.diskCapSys"
                    size="small"
                    :min="1"
                    controls-position="right"
                    style="width: 80px"
                  />
                  <span class="textMargin" />
                  <el-select
                    v-model="addForm.deviceSrv.sysCapUnit"
                    style="width: 70px"
                    placeholder=""
                  >
                    <el-option
                      v-for="item in dict.capType"
                      :key="item.id"
                      :label="item.name"
                      :value="item.id"
                    />
                  </el-select>

                  <span class="textMargin" />
                  <el-select
                    v-model="addForm.deviceSrv.diskTypeSys"
                    style="width: 160px"
                    placeholder=""
                  >
                    <el-option
                      v-for="item in dict.sysType"
                      :key="item.id"
                      :label="item.name"
                      :value="item.name"
                    />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="" prop="deviceSrv[diskCacheSys]">
                  <el-input
                    v-model="addForm.deviceSrv.diskCacheSys"
                    style="width: 456px"
                  />
                </el-form-item>
              </el-col>
            </el-row>
            <!-- 数据盘 -->
            <el-row :gutter="10">
              <el-col :span="24">
                <el-form-item label="数据盘" prop="diskCountData">
                  <el-input-number
                    v-model="addForm.deviceSrv.diskCountData"
                    size="small"
                    :min="1"
                    controls-position="right"
                    style="width: 80px"
                  />
                  <span class="textMargin" style="font-size: 20px">*</span>
                  <el-input-number
                    v-model="addForm.deviceSrv.diskCapData"
                    size="small"
                    :min="1"
                    controls-position="right"
                    style="width: 80px"
                  />
                  <span class="textMargin" />
                  <el-select
                    v-model="addForm.deviceSrv.dataCapUnit"
                    style="width: 70px"
                    placeholder=""
                  >
                    <el-option
                      v-for="item in dict.capType"
                      :key="item.id"
                      :label="item.name"
                      :value="item.id"
                    />
                  </el-select>

                  <span class="textMargin" />
                  <el-select
                    v-model="addForm.deviceSrv.diskTypeData"
                    style="width: 160px"
                    placeholder=""
                  >
                    <el-option
                      v-for="item in dict.sysType"
                      :key="item.id"
                      :label="item.name"
                      :value="item.name"
                    />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="" prop="diskCacheData">
                  <el-input
                    v-model="addForm.deviceSrv.diskCacheData"
                    style="width: 456px"
                  />
                </el-form-item>
              </el-col>
            </el-row>
            <!-- 缓存盘 -->
            <el-row :gutter="10">
              <el-col :span="24">
                <el-form-item label="缓存盘" prop="diskCountCache">
                  <el-input-number
                    v-model="addForm.deviceSrv.diskCountCache"
                    size="small"
                    :min="0"
                    controls-position="right"
                    style="width: 80px"
                  />
                  <span class="textMargin" style="font-size: 20px">*</span>
                  <el-input-number
                    v-model="addForm.deviceSrv.diskCapCache"
                    size="small"
                    :min="0"
                    controls-position="right"
                    style="width: 80px"
                  />
                  <span class="textMargin" />
                  <el-select
                    v-model="addForm.deviceSrv.cacheCapUnit"
                    style="width: 70px"
                    placeholder=""
                  >
                    <el-option
                      v-for="item in dict.capType"
                      :key="item.id"
                      :label="item.name"
                      :value="item.id"
                    />
                  </el-select>

                  <span class="textMargin" />
                  <el-select
                    v-model="addForm.deviceSrv.diskTypeCache"
                    style="width: 160px"
                    placeholder=""
                  >
                    <el-option
                      v-for="item in dict.sysType"
                      :key="item.id"
                      :label="item.name"
                      :value="item.name"
                    />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="" prop="diskCacheCache">
                  <el-input
                    v-model="addForm.deviceSrv.diskCacheCache"
                    style="width: 456px"
                  />
                </el-form-item>
              </el-col>
            </el-row>
            <!-- GPU、raid卡 -->
            <el-row :gutter="10">
              <el-col :span="24">
                <el-form-item label="GPU" prop="gpuCount">
                  <el-input-number
                    v-model="addForm.deviceSrv.gpuCount"
                    size="small"
                    :min="0"
                    controls-position="right"
                    style="width: 80px"
                  />
                  <span class="textMargin">*</span>
                  <el-input
                    v-model="addForm.gpuInfo"
                    style="width: 200px"
                    placeholder=""
                  />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="10">
              <el-col :span="24">
                <el-form-item label="raid卡" prop="raidCount">
                  <el-input-number
                    v-model="addForm.deviceSrv.raidCount"
                    size="small"
                    :min="1"
                    controls-position="right"
                    style="width: 80px"
                  />
                  <span class="textMargin"> * raid卡</span>
                  <el-input
                    v-model="addForm.deviceSrv.raidCache"
                    style="width: 200px"
                    placeholder=""
                  />
                </el-form-item>
              </el-col>
            </el-row>

          </div>

          <!-- 板卡信息 -->
          <el-row :gutter="10">
            <el-col :span="24">
              <el-form-item :label="cbcLabel" prop="cbcList">
                <el-table :data="addForm.cbcList" border style="width: 100%">
                  <el-table-column label="序号" width="90">
                    <template slot-scope="scope">
                      <div class="indexBox">
                        <div>{{ scope.$index + 1 }}</div>
                        <div
                          v-if="addForm.cbcList.length > 1"
                          class="del"
                          @click="delBk(scope.$index)"
                        >
                          <i class="el-icon-delete" />
                        </div>
                      </div>
                    </template>
                  </el-table-column>
                  <el-table-column prop="cbcType" label="模块类型" width="200">
                    <template slot-scope="scope">
                      <div
                        v-for="(item, index) in scope.row.deviceCbcModuleList"
                        :key="index"
                        class="marginStyle"
                      >
                        <el-select v-model="item.cbcType" placeholder="">
                          <el-option
                            v-for="item in dict.cbcType"
                            :key="item.id"
                            :label="item.name"
                            :value="item.name"
                          />
                        </el-select>
                      </div>
                    </template>
                  </el-table-column>
                  <el-table-column prop="count" label="数量" width="80">
                    <template slot-scope="scope">
                      <div
                        v-for="(item, index) in scope.row.deviceCbcModuleList"
                        :key="index"
                        class="marginStyle"
                      >
                        <el-input-number
                          v-model="item.count"
                          size="small"
                          :min="1"
                          controls-position="right"
                          style="width: 60px"
                        />
                      </div>
                    </template>
                  </el-table-column>
                  <el-table-column prop="port" label="端口" width="200">
                    <template slot-scope="scope">
                      <div
                        v-for="(item, index) in scope.row.deviceCbcModuleList"
                        :key="index"
                        class="marginStyle"
                      >
                        <el-input-number
                          v-model="item.portOne"
                          size="small"
                          :min="0"
                          controls-position="right"
                          style="width: 80px"
                        />
                        <span class="textMargin">-</span>
                        <el-input-number
                          v-model="item.portTwo"
                          size="small"
                          :min="0"
                          controls-position="right"
                          style="width: 80px"
                        />
                      </div>
                    </template>
                  </el-table-column>
                  <el-table-column label="操作" width="60">
                    <template slot-scope="scope">
                      <div
                        v-for="(item, index) in scope.row.deviceCbcModuleList"
                        :key="index"
                        class="bkBtn marginStyle"
                      >
                        <div
                          v-if="
                            index === scope.row.deviceCbcModuleList.length - 1
                          "
                          class="add"
                          @click="addBkItem(scope.row, scope.$index)"
                        >
                          <i class="el-icon-plus" />
                        </div>
                        <div
                          v-if="scope.row.deviceCbcModuleList.length > 1"
                          class="del"
                          @click="delBkItem(scope.row, index)"
                        >
                          <i class="el-icon-delete" />
                        </div>
                      </div>
                    </template>
                  </el-table-column>
                </el-table>
              </el-form-item>
            </el-col>
          </el-row>
          <!-- 新增板卡信息 -->
          <el-row :gutter="10" style="margin-bottom: 30px">
            <el-col :span="24">
              <div class="addBk" @click="addBk()">
                <i class="el-icon-plus" />
                <span>新增{{ cbcLabel }}信息</span>
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
              <el-form-item
                label="额定功率"
                prop="powerLable"
                label-width="108px"
              >
                <el-input-number
                  v-model="addForm.powerLable"
                  size="small"
                  :min="1"
                  label="请输入设备数量"
                  controls-position="right"
                  style="width: 100%"
                />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="电源模块" prop="powerCount">
                <el-select
                  v-model="addForm.powerCount"
                  placeholder=""
                  filterable
                  @change="$forceUpdate()"
                >
                  <el-option key="2" label="2" value="2" />
                  <el-option key="4" label="4" value="4" />
                  <el-option key="6" label="6" value="6" />
                  <el-option key="8" label="8" value="8" />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="电源类型" prop="powerType">
                <el-select
                  v-model="addForm.powerType"
                  placeholder=""
                  filterable
                  @change="$forceUpdate()"
                >
                  <el-option
                    v-for="item in dict.powerType"
                    :key="item.id"
                    :label="item.name"
                    :value="item.name"
                  />
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="10">
            <el-col :span="8">
              <el-form-item label="插座要求" prop="plugCount">
                <el-input-number
                  v-model="addForm.plugCount"
                  size="small"
                  :min="1"
                  :max="6"
                  :step="2"
                  controls-position="right"
                  style="width: 60px"
                />
                <span class="textMargin">*</span>
                <el-select
                  v-model="addForm.plugCurrent"
                  style="width: 80px"
                  placeholder=""
                  filterable
                  @change="$forceUpdate()"
                >
                  <el-option key="1" label="10A" value="10A" />
                  <el-option key="2" label="16A" value="16A" />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="单台高度" prop="ucount">
                <el-input-number
                  v-model="addForm.ucount"
                  size="small"
                  :min="1"
                  controls-position="right"
                  style="width: 100%"
                />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="重量" prop="weight">
                <el-input-number
                  v-model="addForm.weight"
                  size="small"
                  :min="1"
                  controls-position="right"
                  style="width: 100%"
                />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="10">
            <el-col :span="24">
              <el-form-item
                label="设备尺寸（高*宽*深）(mm)"
                prop="height"
                label-width="195px"
              >
                <el-input-number
                  v-model="addForm.height"
                  :step="10"
                  size="small"
                  :min="10"
                  controls-position="right"
                  style="width: 100px"
                />
                <span class="textMargin">*</span>
                <el-input-number
                  v-model="addForm.width"
                  :step="10"
                  size="small"
                  :min="10"
                  controls-position="right"
                  style="width: 100px"
                />
                <span class="textMargin">*</span>
                <el-input-number
                  v-model="addForm.length"
                  :step="10"
                  size="small"
                  :min="10"
                  controls-position="right"
                  style="width: 100px"
                />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="10">
            <el-col :span="24">
              <el-form-item label="备注" prop="remark">
                <el-input
                  v-model="addForm.remark"
                  type="textarea"
                  :rows="4"
                  @input="$forceUpdate()"
                />
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <div class="handleList">
        <el-button size="small" @click="drawerFlag = false">关闭</el-button>
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
import { getListData, addDevice, getDeviceTemplate } from './api/index'
export default {
  data() {
    return {
      // 抽屉开关
      drawerFlag: false,
      dtidRoleOption: [],
      dtidRoleListPageOption: this.dict.device_role,
      mfIdRoleOption: [],
      cbcLabel: '',
      // 查询条件
      pageParam: {
        pageNum: 1,
        pageSize: 5
      },
      // 新增数据
      addForm: {
        engineeringId: '1',
        roomId: '1',
        deviceSrv: {},
        cbcList: []
      },
      // addForm: {"engineeringId":"2","roomId":"2","deviceSrv":{"cpuType":1},"cbcList":[],"count":1,"powerLable":2,"plugCount":4,"ucount":5,"weight":2,"height":40,"width":50,"length":60,"product":1,"dcfId":2,"drId":2,"manufacture":1,"model":1,"powerCount":"3","powerType":2,"plugCurrent":"1","remark":"123123"},
      // 列表数据
      tableData: [],
      // 总条数
      pageTotal: 0,
      // 校验
      rules: {
        product: [{ required: true, message: '请选择产品', trigger: 'change' }],
        drId: [
          { required: true, message: '请选择设备角色', trigger: 'change' }
        ],
        dcfId: [
          { required: true, message: '请选择设备类型', trigger: 'change' }
        ],
        count: [
          { required: true, message: '请选择设备数量', trigger: 'change' }
        ],
        manufacture: [
          { required: true, message: '请选择厂商', trigger: 'change' }
        ],
        model: [{ required: true, message: '请选择型号', trigger: 'change' }],

        powerLable: [
          { required: true, message: '请填写额定功率', trigger: 'change' }
        ],
        powerCount: [
          { required: true, message: '请选择电源模块', trigger: 'change' }
        ],
        powerType: [
          { required: true, message: '请选择电源类型', trigger: 'change' }
        ],
        plugCount: [
          {
            required: true,
            message: '请选择插座数量及插头电流',
            trigger: 'change'
          }
        ],
        ucount: [
          { required: true, message: '请填写单台高度', trigger: 'change' }
        ],
        weight: [{ required: true, message: '请填写重量', trigger: 'change' }],
        height: [{ required: true, message: '请填写尺寸', trigger: 'change' }],
        cbcList: [{ required: true, message: '请填写板卡信息', trigger: 'change' }]
      },
      deviceSrvRules: {
        'deviceSrv[cpuType]': [
          { required: true, message: '请选择CPU类型', trigger: 'change' }
        ],
        'deviceSrv[cpuCount]': [
          {
            required: true,
            message: '请填写cpu数量、核数及描述',
            trigger: 'change'
          }
        ],
        'deviceSrv[memCount]': [
          {
            required: true,
            message: '请填写内存条数量、容量及描述',
            trigger: 'change'
          }
        ],
        'deviceSrv[diskCountSys]': [
          {
            required: true,
            message: '请填写系统盘数量、容量、类型及描述',
            trigger: 'change'
          }
        ],
        'deviceSrv[raidCount]': [
          {
            required: true,
            message: '请填写raid卡数量及描述',
            trigger: 'change'
          }
        ]
      }
    }
  },
  computed: {
    newRules() {
      if (this.addForm.dcfId === 1) {
        return Object.assign(this.rules, this.deviceSrvRules)
      } else {
        return this.rules
      }
    }
  },
  watch: {},
  created() {
    this.getListData()
    console.log(11111111, this.dict, this.dictMap)
  },
  mounted() {},
  methods: {
    // 新增设备
    addDevice() {
      console.log('this.addForm', this.addForm)
      this.$refs.formInline.validate((valid) => {
        if (valid) {
          const arr = []
          this.addForm.cbcList.forEach((item, index) => {
            item.deviceCbcModuleList.forEach((items) => {
              arr.push({
                ...items,
                name: `板卡${index + 1}`,
                rangePorts: `${items.portOne}-${items.portTwo}`
              })
            })
          })

          const params = { ...this.addForm }
          params.cbcList = arr

          // 处理GB，TB单位问题
          this.getNewDeviceSrvData()
          addDevice(params).then((res) => {
            console.log(res)
            this.getListData()
            if (res.status === 200) {
              this.$message({
                type: 'success',
                message: '设备添加成功'
              })
              this.$refs.formInline.resetFields()
            } else {
              this.$message.error(res.data.exception_msg)
            }
          })
        }
      })
      // this.drawerFlag = false;
    },
    // 获取设备清单列表
    getListData() {
      getListData(this.pageParam).then((res) => {
        if (res.status === 200) {
          this.tableData = res.body.data
          this.pageTotal = res.body.totalElements
          console.log(res, this.tableData)
        }
      })
    },
    // 查询
    resetSearch() {
      this.dtidRoleListPageOption = this.dict.device_role
      this.pageParam = {
        pageNum: this.pageParam.pageNum,
        pageSize: this.pageParam.pageSize
      }
      this.getListData()
    },
    //* 100000
    getNewDeviceSrvData() {
      this.addForm.deviceSrv.memCap = this.addForm.deviceSrv.memCap * 1000000
      this.addForm.deviceSrv.diskCapSys = this.addForm.deviceSrv.diskCapSys * 1000000
      this.addForm.deviceSrv.diskCapData = this.addForm.deviceSrv.diskCapData * 1000000
      this.addForm.deviceSrv.diskCapCache = this.addForm.deviceSrv.diskCapCache * 1000000
    },
    // /100000
    setOriginDeviceSrvData() {
      this.addForm.deviceSrv.memCap = this.addForm.deviceSrv.memCap / 1000000
      this.addForm.deviceSrv.diskCapSys = this.addForm.deviceSrv.diskCapSys / 1000000
      this.addForm.deviceSrv.diskCapData = this.addForm.deviceSrv.diskCapData / 1000000
      this.addForm.deviceSrv.diskCapCache = this.addForm.deviceSrv.diskCapCache / 1000000
    },
    // 打开抽屉
    openDrawer(rowData) {
      this.drawerFlag = true
      this.getRoleList(this.addForm.dcfId)
      console.log(this.addForm)
      if (rowData) {
        this.addForm = rowData
        this.setOriginDeviceSrvData()
      }
    },
    // 新增板卡信息
    addBk() {
      this.addForm.cbcList.push({
        deviceCbcModuleList: [
          {
            cbcType: undefined,
            count: undefined,
            portOne: undefined,
            portTwo: undefined
          }
        ]
      })
    },
    // 删除板卡信息
    delBk(index) {
      this.addForm.cbcList.splice(index, 1)
    },
    // 新增板卡配置信息
    addBkItem(item) {
      item.deviceCbcModuleList.push({
        cbcType: undefined,
        count: undefined,
        portOne: undefined,
        portTwo: undefined
      })
    },
    // 删除板卡配置信息
    delBkItem(item, index) {
      item.deviceCbcModuleList.splice(index, 1)
    },
    getRoleList(val) {
      delete this.addForm.drId
      console.log('this.addForm', this.addForm)
      this.cbcLabel = this.addForm.dcfId === 1 ? '网卡' : '板卡'
      this.dtidRoleOption = this.dict.device_role.filter((item) => {
        if (item.dtid !== val) { delete this.pageParam.drId }
        return item.dtid === val
      })
      // 设备清单list界面，如果没选设备类型，设备角色可选全部
      this.dtidRoleListPageOption = this.dtidRoleOption.length < 0 ? this.dict.device_role : this.dtidRoleOption
    },
    // 每页数变化
    handleSizeChange(pageSize) {
      this.pageParam.pageNum = 1
      this.pageParam.pageSize = pageSize
      this.getListData()
    },
    // 页码变化
    handleCurrentChange(currentPage) {
      this.pageParam.pageNum = currentPage
      this.getListData()
    },
    // 选了厂商和型号自动带出后面的数据
    getDeviceTemplate() {
      const params = {
        manufacture: this.addForm.manufacture,
        model: this.addForm.model
      }
      if (this.addForm && this.addForm.manufacture && this.addForm.model) {
        getDeviceTemplate(params).then((res) => {
          if (res.status === 200) {
            Object.assign(this.addForm, res.body)
            this.addForm.cbcList = res.body.cbc
            for (const key in this.addForm.deviceSrv) {
              // 解决回显时默认带0问题
              if (this.addForm.deviceSrv[key] === null) {
                this.addForm.deviceSrv[key] = undefined
              }
            }
            this.setOriginDeviceSrvData(this.addForm)
          } else {
            this.$message.error(res.data.exception_msg)
          }
        })
      }
    },
    // 获得厂商和型号联动信息
    getMfIdRoleOption() {
      delete this.addForm.model
      const manufactureRole = this.dict.manufacture.filter((item) => {
        return item.name === this.addForm.manufacture
      })

      this.mfIdRoleOption = this.dict.model.filter((item) => {
        return item.mfId === manufactureRole[0].id
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.handleBox {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 0;
  .title {
    font-weight: 700;
  }
  .btnList {
    display: flex;
    align-items: center;
  }
}
.addFormBox {
  padding: 0 10px;
  box-sizing: border-box;
  .headTitle {
    display: flex;
    align-items: center;
    font-size: 16px;
    color: #606266;
    font-weight: 700;
    margin-bottom: 20px;
    .line {
      width: 4px;
      height: 16px;
      background: #1890ff;
      margin-right: 4px;
    }
  }
  .addBk {
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
    i {
      margin-right: 4px;
    }
  }
  .textMargin {
    margin: 0 10px;
  }
  ::v-deep {
    .el-input-number.is-controls-right .el-input__inner {
      padding-left: 0;
      padding-right: 30px;
    }
    .el-form-item {
      margin-bottom: 16px;
    }
    .indexBox {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;
      .del {
        color: #f00;
        cursor: pointer;
      }
    }
    .bkBtn {
      width: 100%;
      height: 50px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-bottom: 1px solid #ddd;
      .add {
        color: #1890ff;
        cursor: pointer;
      }
      .del {
        color: #f00;
        cursor: pointer;
        margin-left: auto;
      }
    }
    .bkBtn:last-child {
      border-bottom: 0;
    }
    .marginStyle {
      padding: 5px 0;
    }
  }
}
.handleList {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: 20px;
  box-sizing: border-box;
}
::v-deep {
  .el-drawer.rtl {
    overflow: auto;
  }
  .el-input--small .el-input__inner {
    height: 36px;
    line-height: 36px;
  }

  .el-table .cell.el-tooltip {
    white-space: normal;
  }
}
</style>
