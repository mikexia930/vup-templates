<script setup lang="ts">
import { computed } from 'vue';
import type { InputProps, InputEmit } from './types';

defineOptions({
  name: 'VInput',
});

const props = withDefaults(defineProps<InputProps>(), {
  type: 'text',
  size: 'medium',
  disabled: false,
  readonly: false,
  clearable: false,
  showPassword: undefined,
});

const emit = defineEmits<InputEmit>();

const inputClasses = computed(() => {
  const classes = ['input'];

  // 尺寸样式
  classes.push(`input--${props.size}`);

  // 状态样式
  if (props.disabled) classes.push('input--disabled');
  if (props.readonly) classes.push('input--readonly');

  return classes;
});

const handleInput = (event: Event) => {
  const target = event.target as HTMLInputElement;
  emit('update:value', target.value);
};

const handleChange = (event: Event) => {
  const target = event.target as HTMLInputElement;
  emit('change', target.value);
};

const handleFocus = (event: FocusEvent) => {
  emit('focus', event);
};

const handleBlur = (event: FocusEvent) => {
  emit('blur', event);
};

const handleClear = () => {
  emit('update:value', '');
};

const togglePassword = () => {
  emit('update:showPassword', !props.showPassword);
};
</script>

<template>
  <div class="input-wrapper">
    <input
      :class="inputClasses"
      :type="showPassword ? 'text' : type"
      :disabled="disabled"
      :readonly="readonly"
      :placeholder="placeholder"
      :value="value"
      :maxlength="maxlength"
      :minlength="minlength"
      @input="handleInput"
      @change="handleChange"
      @focus="handleFocus"
      @blur="handleBlur"
    />
    <button v-if="clearable && value" class="input-clear" @click="handleClear">✕</button>
    <button
      v-if="type === 'password' && showPassword !== undefined"
      class="input-password-toggle"
      @click="togglePassword"
    >
      {{ showPassword ? '👁️' : '👁️‍🗨️' }}
    </button>
  </div>
</template>

<style scoped>
.input-wrapper {
  position: relative;
  display: inline-block;
}

.input {
  padding: 8px 12px;
  border: 1px solid #dcdfe6;
  border-radius: 4px;
  font-size: 14px;
  line-height: 1.5;
  outline: none;
  transition: border-color 0.2s ease;
}

.input:focus {
  border-color: #409eff;
}

.input--small {
  padding: 6px 10px;
  font-size: 12px;
}

.input--medium {
  padding: 8px 12px;
  font-size: 14px;
}

.input--large {
  padding: 12px 16px;
  font-size: 16px;
}

.input--disabled {
  background-color: #f5f7fa;
  border-color: #e4e7ed;
  color: #c0c4cc;
  cursor: not-allowed;
}

.input--readonly {
  background-color: #f5f7fa;
  color: #606266;
}

.input-clear,
.input-password-toggle {
  position: absolute;
  right: 8px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  cursor: pointer;
  padding: 4px;
  font-size: 12px;
}

.input-clear:hover,
.input-password-toggle:hover {
  color: #409eff;
}
</style>
