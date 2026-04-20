<template>
  <div class="admin-characters">
    <div class="page-header">
      <h1>角色管理</h1>
      <button @click="showDialog = true" class="btn-primary">添加角色</button>
    </div>
    
    <div class="table-container">
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>名称</th>
            <th>头衔</th>
            <th>属性</th>
            <th>创建时间</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in list" :key="item.id">
            <td>{{ item.id }}</td>
            <td>{{ item.name }}</td>
            <td>{{ item.title }}</td>
            <td>{{ item.attribute || '-' }}</td>
            <td>{{ formatDate(item.create_time) }}</td>
            <td>
              <button @click="handleEdit(item)" class="btn-edit">编辑</button>
              <button @click="handleDelete(item.id)" class="btn-delete">删除</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    
    <!-- 添加/编辑对话框 -->
    <div v-if="showDialog" class="dialog-overlay" @click="showDialog = false">
      <div class="dialog" @click.stop>
        <h2>{{ editingItem ? '编辑角色' : '添加角色' }}</h2>
        <form @submit.prevent="handleSubmit">
          <div class="form-group">
            <label>名称 *</label>
            <input v-model="form.name" required />
          </div>
          <div class="form-group">
            <label>头衔 *</label>
            <input v-model="form.title" required />
          </div>
          <div class="form-group">
            <label>简介</label>
            <textarea v-model="form.intro" rows="3"></textarea>
          </div>
          <div class="form-group">
            <label>头像URL *</label>
            <input v-model="form.avatar_url" required />
          </div>
          <div class="form-group">
            <label>封面URL</label>
            <input v-model="form.cover_url" />
          </div>
          <div class="form-group">
            <label>属性</label>
            <input v-model="form.attribute" />
          </div>
          <div class="dialog-actions">
            <button type="button" @click="showDialog = false" class="btn-cancel">取消</button>
            <button type="submit" class="btn-primary">保存</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { characterApi } from '@/api'

const list = ref([])
const showDialog = ref(false)
const editingItem = ref(null)
const form = ref({
  name: '',
  title: '',
  intro: '',
  avatar_url: '',
  cover_url: '',
  attribute: ''
})

const loadList = async () => {
  try {
    const res = await characterApi.getList({ page: 1, pageSize: 100 })
    list.value = res.data.list
  } catch (error) {
    console.error('加载列表失败:', error)
  }
}

const handleEdit = (item) => {
  editingItem.value = item
  form.value = { ...item }
  showDialog.value = true
}

const handleDelete = async (id) => {
  if (!confirm('确定要删除吗？')) return
  try {
    await characterApi.delete(id)
    loadList()
  } catch (error) {
    alert('删除失败')
  }
}

const handleSubmit = async () => {
  try {
    if (editingItem.value) {
      await characterApi.update(editingItem.value.id, form.value)
    } else {
      await characterApi.create(form.value)
    }
    showDialog.value = false
    editingItem.value = null
    form.value = {
      name: '',
      title: '',
      intro: '',
      avatar_url: '',
      cover_url: '',
      attribute: ''
    }
    loadList()
  } catch (error) {
    alert('保存失败')
  }
}

const formatDate = (dateString) => {
  if (!dateString) return '-'
  return new Date(dateString).toLocaleString('zh-CN')
}

onMounted(() => {
  loadList()
})
</script>

<style scoped>
.admin-characters {
  color: #fff;
}

.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
}

.btn-primary {
  padding: 0.75rem 1.5rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: #fff;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: bold;
}

.btn-primary:hover {
  opacity: 0.9;
}

.table-container {
  background: #1a1a1a;
  border-radius: 12px;
  overflow: hidden;
}

table {
  width: 100%;
  border-collapse: collapse;
}

thead {
  background: #2a2a2a;
}

th, td {
  padding: 1rem;
  text-align: left;
  border-bottom: 1px solid #333;
}

th {
  color: #aaa;
  font-weight: 600;
}

tbody tr:hover {
  background: #2a2a2a;
}

.btn-edit, .btn-delete {
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-right: 0.5rem;
}

.btn-edit {
  background: #667eea;
  color: #fff;
}

.btn-delete {
  background: #ff6b6b;
  color: #fff;
}

.dialog-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.dialog {
  background: #1a1a1a;
  padding: 2rem;
  border-radius: 12px;
  width: 90%;
  max-width: 500px;
  max-height: 90vh;
  overflow-y: auto;
}

.dialog h2 {
  margin-bottom: 1.5rem;
  color: #fff;
}

.form-group {
  margin-bottom: 1rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  color: #aaa;
}

.form-group input,
.form-group textarea {
  width: 100%;
  padding: 0.75rem;
  background: #2a2a2a;
  border: 1px solid #333;
  border-radius: 8px;
  color: #fff;
  font-size: 1rem;
}

.form-group input:focus,
.form-group textarea:focus {
  outline: none;
  border-color: #667eea;
}

.dialog-actions {
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
  margin-top: 1.5rem;
}

.btn-cancel {
  padding: 0.75rem 1.5rem;
  background: #333;
  color: #fff;
  border: none;
  border-radius: 8px;
  cursor: pointer;
}
</style>

