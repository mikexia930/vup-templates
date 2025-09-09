<template>
  <div class="scss-demo">
    <div class="container-responsive">
      <h2 class="text-gradient text-center mb-8">SCSS 在 VitePress 中的使用示例</h2>
      
      <!-- 卡片网格 -->
      <div class="cards-grid">
        <div class="card" v-for="(card, index) in cards" :key="index">
          <div class="card-icon" :class="`icon-${index + 1}`">
            <span class="icon">{{ card.icon }}</span>
          </div>
          <h3 class="card-title">{{ card.title }}</h3>
          <p class="card-description">{{ card.description }}</p>
        </div>
      </div>
      
      <!-- 按钮示例 -->
      <div class="buttons-section">
        <h3 class="section-title">按钮样式</h3>
        <div class="buttons-grid">
          <button class="btn-primary">主要按钮</button>
          <button class="btn-secondary">次要按钮</button>
          <button class="btn-custom">自定义按钮</button>
        </div>
      </div>
      
      <!-- 响应式示例 -->
      <div class="responsive-section">
        <h3 class="section-title">响应式设计</h3>
        <div class="responsive-grid">
          <div class="responsive-item" v-for="n in 6" :key="n">
            <div class="item-content">
              <span class="item-number">{{ n }}</span>
              <span class="item-text">项目 {{ n }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const cards = ref([
  {
    icon: '🎨',
    title: 'SCSS 变量',
    description: '使用 SCSS 变量统一管理颜色、字体、间距等设计元素'
  },
  {
    icon: '🔧',
    title: '混入 (Mixins)',
    description: '通过混入复用样式代码，提高开发效率和代码维护性'
  },
  {
    icon: '📱',
    title: '响应式设计',
    description: '使用 SCSS 混入轻松创建响应式布局和媒体查询'
  }
])
</script>

<style lang="scss" scoped>
// 组件特定的 SCSS 变量
$card-bg: #ffffff;
$card-hover-bg: #f8f9fa;
$border-color: #e2e8f0;
$text-muted: #6b7280;

// 组件样式
.scss-demo {
  padding: 2rem 0;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  min-height: 100vh;
}

.cards-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-bottom: 3rem;
}

.card {
  background: $card-bg;
  border: 1px solid $border-color;
  border-radius: 12px;
  padding: 2rem;
  text-align: center;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(90deg, #646cff, #747bff);
    transform: scaleX(0);
    transition: transform 0.3s ease;
  }
  
  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
    
    &::before {
      transform: scaleX(1);
    }
  }
}

.card-icon {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1.5rem;
  font-size: 2rem;
  
  &.icon-1 {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  }
  
  &.icon-2 {
    background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
  }
  
  &.icon-3 {
    background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
  }
}

.card-title {
  font-size: 1.5rem;
  font-weight: 600;
  color: #1f2937;
  margin-bottom: 1rem;
}

.card-description {
  color: $text-muted;
  line-height: 1.6;
}

.buttons-section {
  margin-bottom: 3rem;
}

.section-title {
  font-size: 2rem;
  font-weight: 700;
  text-align: center;
  margin-bottom: 2rem;
  color: #1f2937;
}

.buttons-grid {
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
}

.btn-custom {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: 600;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 20px rgba(102, 126, 234, 0.3);
  }
}

.responsive-section {
  margin-bottom: 2rem;
}

.responsive-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
}

.responsive-item {
  background: white;
  border: 1px solid $border-color;
  border-radius: 8px;
  padding: 1.5rem;
  text-align: center;
  transition: all 0.3s ease;
  
  &:hover {
    transform: scale(1.05);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
  }
}

.item-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
}

.item-number {
  width: 40px;
  height: 40px;
  background: linear-gradient(135deg, #646cff, #747bff);
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 1.2rem;
}

.item-text {
  color: $text-muted;
  font-weight: 500;
}

// 响应式设计
@media (max-width: 768px) {
  .cards-grid {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
  
  .buttons-grid {
    flex-direction: column;
    align-items: center;
  }
  
  .responsive-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 480px) {
  .responsive-grid {
    grid-template-columns: 1fr;
  }
  
  .card {
    padding: 1.5rem;
  }
}
</style>
