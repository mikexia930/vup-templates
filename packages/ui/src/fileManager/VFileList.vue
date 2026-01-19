<script setup lang="ts">
import { ref, toRaw, computed, reactive } from 'vue';
import { EFileType } from './types';
import type { IFileSelectItem, VFileProps } from './types';
import type { UploadProps, UploadRawFile, UploadRequestOptions } from 'element-plus';
import VIcon from '../icon/VIcon.vue';
import VMessage from '../message/VMessage';
import VEmpty from '../empty/VEmpty.vue';
import VPagination from '../pagination/VPagination.vue';
import VButton from '../button/VButton.vue';
import VTooltip from '../tooltip/VTooltip.vue';
import VPopconfirm from '../popconfirm/VPopconfirm.vue';
import VImage from '../image/VImage.vue';
import VInput from '../input/VInput.vue';
import VUpload from '../upload/VUpload.vue';

const props = withDefaults(defineProps<VFileProps>(), {
  limit: 1,
});

const emit = defineEmits(['upload', 'select', 'deselect', 'delete', 'pageChange']);

const curSelectIds = computed(() => {
  return props.selected.map((item) => item.id);
});

const curSelected = computed({
  get: () => {
    return props.selected.filter((item) => curSelectIds.value.includes(item.id));
  },
  set: (value: IFileSelectItem[]) => {
    emit('select', value);
  },
});

const searchData = reactive({
  keyword: '',
});

const uploadRef = ref();
const handleExceed: UploadProps['onExceed'] = (files) => {
  uploadRef.value!.clearFiles();
  const file = files[0] as UploadRawFile;
  uploadRef.value!.handleStart(file);
};
const handleUpload = async (options: UploadRequestOptions) => {
  emit('upload', { file: options.file });
};

const handleSelect = (item: IFileSelectItem) => {
  if (curSelectIds.value.includes(item.id)) {
    emit('deselect', item);
  } else {
    const newSelectItem: IFileSelectItem = {
      id: item.id,
      path: item.path,
      name: item.name,
      originalName: item.originalName,
      size: item.size,
      uploadType: item.uploadType,
      suffix: item.suffix,
    };
    if (props.selected.length < props.limit) {
      curSelected.value.push(newSelectItem);
    } else {
      curSelected.value.shift();
      curSelected.value.push(newSelectItem);
    }
  }
};

const handleCopy = (item: IFileSelectItem) => {
  navigator.clipboard.writeText(item.path);
  VMessage.success('复制成功');
};

const handlePreview = (item: IFileSelectItem) => {
  window.open(item.path, '_blank');
};
const handleDelete = async (item: IFileSelectItem) => {
  emit('delete', item);
};

const handlePageChange = (page: number) => {
  emit('pageChange', page);
};

defineExpose({
  selected: () => {
    return toRaw(curSelected.value);
  },
});
</script>

<template>
  <div class="flex flex-col gap-4">
    <div class="flex items-center gap-2">
      <VInput v-model="searchData.keyword" placeholder="搜索文件">
        <template #prefix>
          <VIcon icon="Search" />
        </template>
      </VInput>
      <VUpload
        ref="uploadRef"
        action=""
        :limit="1"
        :on-exceed="handleExceed"
        :auto-upload="true"
        :show-file-list="false"
        :accept="suffixes.join(',')"
        :http-request="handleUpload"
      >
        <template #trigger>
          <VButton type="primary"> 上传 </VButton>
        </template>
      </VUpload>
    </div>
    <div class="flex justify-center items-center" v-if="list.length === 0">
      <VEmpty :image-size="200" />
    </div>
    <div v-else class="grid grid-cols-4 gap-4">
      <div
        class="border border-gray-200 rounded-md flex flex-col items-center justify-center"
        v-for="item in list"
        :key="item.id"
        :class="{ selected: curSelectIds.includes(item.id) }"
      >
        <div
          class="w-full cursor-pointer flex flex-col items-center justify-center"
          @click="handleSelect(item)"
        >
          <div
            v-if="type !== EFileType.IMAGE"
            style="width: 100px; height: 100px"
            class="flex items-center justify-center bg-gray-100 flex-col text-gray-400"
          >
            <VIcon :icon="type === EFileType.MEDIA ? 'VideoPlay' : 'Document'" size="36" />
            <div>{{ item.suffix.toUpperCase() }}</div>
          </div>
          <VImage v-else :src="item.name" style="width: 180px; height: 100px" fit="contain" />
          <div
            class="w-full text-gray-500 bg-gray-100 text-sm p-2 break-all line-clamp-2 overflow-hidden text-ellipsis"
            style="height: 50px"
            :title="item.originalName"
          >
            {{ item.originalName }}
          </div>
        </div>
        <div class="w-full bg-gray-100 flex items-center justify-center p-2 gap-1">
          <VTooltip effect="dark" content="复制链接" placement="top">
            <VButton size="small" @click="handleCopy(item)">
              {{ '复制' }}
            </VButton>
          </VTooltip>
          <VButton
            style="margin-left: 0 !important"
            type="primary"
            size="small"
            @click="handlePreview(item)"
          >
            {{ '预览' }}
          </VButton>
          <VPopconfirm placement="top" title="确定删除吗？" @confirm="handleDelete(item)">
            <template #reference>
              <VButton style="margin-left: 0 !important" type="danger" size="small">
                {{ '删除' }}
              </VButton>
            </template>
          </VPopconfirm>
        </div>
      </div>
    </div>
    <div class="flex justify-end" v-if="pagination.total > pagination.size">
      <VPagination
        background
        layout="total, prev, pager, next"
        :total="pagination.total || 0"
        :page-size="pagination.size"
        :current-page="pagination.page"
        @current-change="handlePageChange"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.selected {
  border-color: var(--el-color-primary);
}
</style>
