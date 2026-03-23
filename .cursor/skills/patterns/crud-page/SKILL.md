---
name: crud-page-pattern
description: >-
  Standard CRUD page pattern for admin panels: search, table, pagination,
  add/edit dialog. Use when creating management pages, data tables, list views,
  form dialogs, or any page that involves listing, creating, updating, or
  deleting records.
---

# CRUD 页面规范

定义管理后台最常见的页面模式：搜索 + 表格 + 分页 + 新增/编辑弹窗。覆盖前端页面和后端接口的完整实现。

## 文件组成

每个 CRUD 模块包含以下文件：

```
前端：
src/
├── views/user/
│   ├── index.vue                  # 页面主体（搜索 + 表格 + 分页）
│   ├── components/
│   │   └── UserFormDialog.vue     # 新增/编辑弹窗
│   └── stores/user.ts            # 页面级 store
├── api/modules/user.ts            # API 接口定义

后端（Nest）：
src/user/
├── user.module.ts
├── user.controller.ts
├── user.service.ts
├── dto/
│   ├── create-user.dto.ts
│   ├── update-user.dto.ts
│   └── query-user.dto.ts
└── entities/
    └── user.entity.ts
```

## 前端：页面主体

```vue
<!-- src/views/user/index.vue -->
<template>
  <div class="space-y-4">
    <!-- 搜索栏 -->
    <VForm :model="searchForm" inline>
      <VFormItem label="用户名">
        <VInput v-model="searchForm.username" placeholder="请输入" clearable />
      </VFormItem>
      <VFormItem label="状态">
        <VSelect v-model="searchForm.status" placeholder="请选择" clearable>
          <VOption label="启用" :value="1" />
          <VOption label="禁用" :value="0" />
        </VSelect>
      </VFormItem>
      <VFormItem>
        <VButton type="primary" @click="handleSearch">搜索</VButton>
        <VButton @click="handleReset">重置</VButton>
      </VFormItem>
    </VForm>

    <!-- 操作栏 -->
    <div class="flex justify-between">
      <VButton v-permission="'user:create'" type="primary" @click="handleAdd"
        >新增</VButton
      >
    </div>

    <!-- 数据表格 -->
    <VTable :data="userStore.list" v-loading="userStore.loading" border>
      <VTableColumn prop="id" label="ID" width="80" />
      <VTableColumn prop="username" label="用户名" />
      <VTableColumn prop="email" label="邮箱" />
      <VTableColumn prop="status" label="状态">
        <template #default="{ row }">
          <VTag :type="row.status === 1 ? 'success' : 'danger'">
            {{ row.status === 1 ? '启用' : '禁用' }}
          </VTag>
        </template>
      </VTableColumn>
      <VTableColumn prop="createdAt" label="创建时间" width="180" />
      <VTableColumn label="操作" width="200" fixed="right">
        <template #default="{ row }">
          <VButton
            v-permission="'user:edit'"
            type="primary"
            text
            @click="handleEdit(row)"
            >编辑</VButton
          >
          <VPopconfirm title="确定删除？" @confirm="handleDelete(row.id)">
            <template #reference>
              <VButton v-permission="'user:delete'" type="danger" text
                >删除</VButton
              >
            </template>
          </VPopconfirm>
        </template>
      </VTableColumn>
    </VTable>

    <!-- 分页 -->
    <div class="flex justify-end">
      <VPagination
        v-model:current-page="userStore.pagination.page"
        v-model:page-size="userStore.pagination.size"
        :total="userStore.pagination.total"
        :page-sizes="[10, 20, 50]"
        layout="total, sizes, prev, pager, next"
        @change="userStore.fetchList()"
      />
    </div>

    <!-- 新增/编辑弹窗 -->
    <UserFormDialog ref="formDialogRef" @success="userStore.fetchList()" />
  </div>
</template>

<script setup lang="ts">
import UserFormDialog from './components/UserFormDialog.vue';

const userStore = useUserStore();
const formDialogRef = ref();

const searchForm = reactive({
  username: '',
  status: undefined as number | undefined,
});

function handleSearch() {
  userStore.pagination.page = 1;
  userStore.fetchList(searchForm);
}

function handleReset() {
  Object.assign(searchForm, { username: '', status: undefined });
  handleSearch();
}

function handleAdd() {
  formDialogRef.value?.open();
}

function handleEdit(row: any) {
  formDialogRef.value?.open(row);
}

async function handleDelete(id: number) {
  await userApi.deleteUser(id);
  VMessage.success('删除成功');
  userStore.fetchList();
}

onMounted(() => userStore.fetchList());
</script>
```

## 前端：表单弹窗

```vue
<!-- src/views/user/components/UserFormDialog.vue -->
<template>
  <VDialog
    v-model="visible"
    :title="isEdit ? '编辑用户' : '新增用户'"
    width="500"
    destroy-on-close
  >
    <VForm ref="formRef" :model="form" :rules="rules" label-width="80px">
      <VFormItem label="用户名" prop="username">
        <VInput v-model="form.username" />
      </VFormItem>
      <VFormItem label="邮箱" prop="email">
        <VInput v-model="form.email" />
      </VFormItem>
      <VFormItem v-if="!isEdit" label="密码" prop="password">
        <VInput v-model="form.password" type="password" show-password />
      </VFormItem>
      <VFormItem label="状态" prop="status">
        <VSwitch v-model="form.status" :active-value="1" :inactive-value="0" />
      </VFormItem>
    </VForm>
    <template #footer>
      <VButton @click="visible = false">取消</VButton>
      <VButton type="primary" :loading="submitting" @click="handleSubmit"
        >确定</VButton
      >
    </template>
  </VDialog>
</template>

<script setup lang="ts">
import type { FormInstance, FormRules } from 'element-plus';

const emit = defineEmits<{ success: [] }>();

const visible = ref(false);
const isEdit = ref(false);
const submitting = ref(false);
const editId = ref<number>();
const formRef = ref<FormInstance>();

const form = reactive({
  username: '',
  email: '',
  password: '',
  status: 1,
});

const rules: FormRules = {
  username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
  email: [
    {
      required: true,
      type: 'email',
      message: '请输入有效邮箱',
      trigger: 'blur',
    },
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur', min: 6 },
  ],
};

function open(row?: any) {
  visible.value = true;
  if (row) {
    isEdit.value = true;
    editId.value = row.id;
    Object.assign(form, {
      username: row.username,
      email: row.email,
      status: row.status,
      password: '',
    });
  } else {
    isEdit.value = false;
    editId.value = undefined;
    Object.assign(form, { username: '', email: '', password: '', status: 1 });
  }
}

async function handleSubmit() {
  await formRef.value?.validate();
  submitting.value = true;
  try {
    if (isEdit.value) {
      const { password, ...data } = form;
      await userApi.updateUser(editId.value!, data);
    } else {
      await userApi.createUser(form);
    }
    VMessage.success(isEdit.value ? '编辑成功' : '新增成功');
    visible.value = false;
    emit('success');
  } finally {
    submitting.value = false;
  }
}

defineExpose({ open });
</script>
```

## 前端：页面 Store

```typescript
// src/views/user/stores/user.ts
export const useUserStore = defineStore('user', () => {
  const list = ref<any[]>([]);
  const loading = ref(false);
  const pagination = reactive({ page: 1, size: 10, total: 0 });

  async function fetchList(params?: Record<string, any>) {
    loading.value = true;
    try {
      const res = await userApi.getUserList({
        ...params,
        page: pagination.page,
        size: pagination.size,
      });
      list.value = res.data.list;
      pagination.total = res.data.total;
    } finally {
      loading.value = false;
    }
  }

  return { list, loading, pagination, fetchList };
});
```

## 前端：API 接口

```typescript
// src/api/modules/user.ts
import request from '@/api/request';
import type { ApiResponse } from '@/api/types';

export function getUserList(params: Record<string, any>) {
  return request.get<ApiResponse<{ list: any[]; total: number }>>('/api/user', {
    params,
  });
}

export function createUser(data: any) {
  return request.post<ApiResponse<null>>('/api/user', data);
}

export function updateUser(id: number, data: any) {
  return request.put<ApiResponse<null>>(`/api/user/${id}`, data);
}

export function deleteUser(id: number) {
  return request.delete<ApiResponse<null>>(`/api/user/${id}`);
}
```

## 后端：Nest CRUD

### Entity

```typescript
// src/user/entities/user.entity.ts
@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  username: string;

  @Column()
  email: string;

  @Column({ select: false })
  password: string;

  @Column({ default: 1 })
  status: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
```

### DTO

```typescript
// src/user/dto/query-user.dto.ts
export class QueryUserDto {
  username?: string;
  status?: number;
  page: number = 1;
  size: number = 10;
}

// src/user/dto/create-user.dto.ts
export class CreateUserDto {
  username: string;
  email: string;
  password: string;
  status?: number;
}

// src/user/dto/update-user.dto.ts（使用 PartialType）
export class UpdateUserDto extends PartialType(
  OmitType(CreateUserDto, ['password'])
) {}
```

### Controller

```typescript
// src/user/user.controller.ts
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  findAll(@Query() query: QueryUserDto) {
    return this.userService.findAll(query);
  }

  @Post()
  @Roles('admin')
  create(@Body() dto: CreateUserDto) {
    return this.userService.create(dto);
  }

  @Put(':id')
  @Roles('admin')
  update(@Param('id') id: number, @Body() dto: UpdateUserDto) {
    return this.userService.update(id, dto);
  }

  @Delete(':id')
  @Roles('admin')
  remove(@Param('id') id: number) {
    return this.userService.remove(id);
  }
}
```

### Service

```typescript
// src/user/user.service.ts
@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private userRepo: Repository<User>) {}

  async findAll(query: QueryUserDto) {
    const qb = this.userRepo.createQueryBuilder('user');
    if (query.username)
      qb.andWhere('user.username LIKE :username', {
        username: `%${query.username}%`,
      });
    if (query.status !== undefined)
      qb.andWhere('user.status = :status', { status: query.status });
    const [list, total] = await qb
      .orderBy('user.createdAt', 'DESC')
      .skip((query.page - 1) * query.size)
      .take(query.size)
      .getManyAndCount();
    return { list, total };
  }

  async create(dto: CreateUserDto) {
    dto.password = await bcrypt.hash(dto.password, 10);
    return this.userRepo.save(this.userRepo.create(dto));
  }

  async update(id: number, dto: UpdateUserDto) {
    await this.userRepo.update(id, dto);
  }

  async remove(id: number) {
    await this.userRepo.delete(id);
  }
}
```

## 分页接口约定

前后端统一分页参数：

| 参数    | 方向 | 说明                |
| ------- | ---- | ------------------- |
| `page`  | 请求 | 当前页（从 1 开始） |
| `size`  | 请求 | 每页条数            |
| `list`  | 响应 | 数据数组            |
| `total` | 响应 | 总条数              |

## 注意事项

- 表格操作列使用 `fixed="right"` 固定在右侧
- 删除操作必须用 `VPopconfirm` 二次确认
- 表单弹窗设置 `destroy-on-close` 避免缓存旧数据
- 编辑时不应暴露密码字段（Entity 设置 `select: false`，DTO 使用 `OmitType`
  排除）
- 搜索重置时需将 `page` 回到 1
- 按钮权限通过 `v-permission` 指令控制（参考 `patterns/permission-rbac`）
