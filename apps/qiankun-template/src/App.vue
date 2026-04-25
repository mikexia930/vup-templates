<script setup lang="ts">
import { autoMicroApp, manualMicroApp, sandboxSummary } from './micro/config';
import { useQiankunHostState } from './micro/state';

const { broadcastHostState, hostState, lifecycleLogs } = useQiankunHostState();

const navItems = [
  { label: '自动加载', to: '/auto/' },
  { label: '手动加载', to: '/manual/' },
];

const microApps = [
  {
    activeRule: autoMicroApp.activeRule,
    container: autoMicroApp.container,
    entry: autoMicroApp.entry,
    mode: 'Auto',
    name: autoMicroApp.name,
  },
  {
    activeRule: 'loadMicroApp()',
    container: manualMicroApp.container,
    entry: manualMicroApp.entry,
    mode: 'Manual',
    name: manualMicroApp.name,
  },
];
</script>

<template>
  <main id="top" class="bg-neutral-1 text-neutral-9 min-h-screen">
    <nav class="border-neutral-3 bg-neutral-1/90 sticky top-0 z-20 border-b backdrop-blur-md">
      <div
        class="mx-auto flex min-h-[64px] w-[min(1120px,calc(100%_-_48px))] items-center justify-between gap-[24px] max-[720px]:w-[calc(100%_-_32px)] max-[720px]:flex-col max-[720px]:items-start max-[720px]:py-[14px]"
      >
        <a
          class="text-neutral-9 flex items-center gap-[10px] font-bold no-underline"
          href="#top"
          aria-label="Qiankun Template"
        >
          <span class="bg-primary-5 grid size-[32px] place-items-center rounded-md text-white"
            >Q</span
          >
          <span>Qiankun Template</span>
        </a>

        <div class="flex items-center gap-[6px]">
          <RouterLink
            v-for="item in navItems"
            :key="item.to"
            v-slot="{ isActive, href, navigate }"
            :to="item.to"
            custom
          >
            <a
              class="rounded-md px-[12px] py-[8px] text-sm font-semibold no-underline transition"
              :class="[
                isActive
                  ? 'bg-primary-0 text-primary-6'
                  : 'text-neutral-6 hover:bg-primary-0 hover:text-primary-6',
              ]"
              :href="href"
              @click="navigate"
            >
              {{ item.label }}
            </a>
          </RouterLink>
        </div>

        <span class="bg-primary-0 text-primary-6 rounded-full px-[10px] py-[4px] text-xs font-bold"
          >v2.0.0</span
        >
      </div>
    </nav>

    <section class="from-primary-0 to-neutral-1 bg-linear-to-b py-[72px]">
      <div
        class="mx-auto grid w-[min(1120px,calc(100%_-_48px))] grid-cols-[minmax(0,1fr)_minmax(340px,0.82fr)] gap-[42px] max-[960px]:grid-cols-1 max-[720px]:w-[calc(100%_-_32px)]"
      >
        <div>
          <div
            class="border-neutral-3 text-neutral-6 inline-flex items-center gap-[8px] rounded-full border bg-white px-[14px] py-[5px] text-sm font-semibold"
          >
            <span class="bg-success-4 size-[7px] rounded-full"></span>
            Micro Frontend Host
          </div>
          <h1
            class="leading-xs text-neutral-9 my-[18px] text-[clamp(42px,7vw,64px)] font-extrabold"
          >
            Qiankun<br />
            <span class="text-primary-6">Host Template</span>
          </h1>
          <p class="leading-lg text-neutral-6 max-w-[640px] text-[18px]">
            基座是一个完整 Vue 应用，负责布局、路由、状态和子应用调度。子应用不是 iframe，而是由
            qiankun 拉取资源后挂载到页面容器。
          </p>
          <div class="mt-[30px] flex flex-wrap gap-[12px]">
            <RouterLink
              class="bg-primary-5 hover:bg-primary-6 inline-flex min-h-[42px] items-center justify-center rounded-md px-[18px] text-sm font-bold text-white no-underline transition"
              to="/auto/"
            >
              查看自动加载
            </RouterLink>
            <RouterLink
              class="border-neutral-3 text-neutral-9 hover:border-primary-2 hover:text-primary-6 inline-flex min-h-[42px] items-center justify-center rounded-md border bg-white px-[18px] text-sm font-bold no-underline transition"
              to="/manual/"
            >
              查看手动加载
            </RouterLink>
          </div>
        </div>

        <aside class="border-neutral-3 rounded-xl border bg-white p-[22px] shadow-sm">
          <h2 class="text-neutral-9 text-[18px] font-extrabold">基座运行态</h2>
          <dl class="mt-[18px] grid gap-[12px] text-sm">
            <div class="flex items-center justify-between gap-[16px]">
              <dt class="text-neutral-6">当前用户</dt>
              <dd class="text-neutral-9 font-bold">{{ hostState.userName }}</dd>
            </div>
            <div class="flex items-center justify-between gap-[16px]">
              <dt class="text-neutral-6">广播次数</dt>
              <dd class="text-primary-6 font-bold">#{{ hostState.signal }}</dd>
            </div>
            <div class="flex items-center justify-between gap-[16px]">
              <dt class="text-neutral-6">更新时间</dt>
              <dd class="text-neutral-9 font-bold">{{ hostState.updatedAt }}</dd>
            </div>
            <div class="flex items-center justify-between gap-[16px]">
              <dt class="text-neutral-6">样式隔离</dt>
              <dd class="text-neutral-9 font-bold">{{ sandboxSummary }}</dd>
            </div>
          </dl>
          <div class="bg-neutral-1 mt-[18px] rounded-md p-[14px]">
            <p class="text-neutral-5 text-xs font-bold uppercase">最近子应用上报</p>
            <template v-if="hostState.childReport">
              <p class="text-neutral-9 mt-[8px] text-sm font-bold">
                {{ hostState.childReport.message }}
              </p>
              <p class="leading-lg text-neutral-6 mt-[4px] text-xs">
                {{ hostState.childReport.source }} / {{ hostState.childReport.page }} /
                {{ hostState.childReport.time }}
              </p>
            </template>
            <p v-else class="text-neutral-6 mt-[8px] text-sm">等待子应用上报。</p>
          </div>
          <button
            class="bg-primary-5 hover:bg-primary-6 mt-[20px] inline-flex min-h-[38px] w-full cursor-pointer items-center justify-center rounded-md border-0 px-[16px] text-sm font-bold text-white transition"
            type="button"
            @click="broadcastHostState('header action')"
          >
            广播主应用状态
          </button>
        </aside>
      </div>
    </section>

    <section class="py-[64px]">
      <div
        class="mx-auto grid w-[min(1120px,calc(100%_-_48px))] grid-cols-[minmax(0,1fr)_320px] gap-[24px] max-[980px]:grid-cols-1 max-[720px]:w-[calc(100%_-_32px)]"
      >
        <RouterView />

        <aside class="grid content-start gap-[18px]">
          <section class="border-neutral-3 rounded-md border bg-white p-[18px]">
            <h2 class="text-neutral-9 text-[18px] font-extrabold">子应用注册</h2>
            <div class="mt-[14px] grid gap-[12px]">
              <article
                v-for="microApp in microApps"
                :key="microApp.mode"
                class="bg-neutral-1 rounded-md p-[14px]"
              >
                <div class="flex items-center justify-between gap-[10px]">
                  <h3 class="text-neutral-9 text-sm font-bold">{{ microApp.name }}</h3>
                  <span
                    class="bg-primary-0 text-primary-6 rounded-full px-[8px] py-[3px] text-xs font-bold"
                    >{{ microApp.mode }}</span
                  >
                </div>
                <dl class="text-neutral-6 mt-[10px] grid gap-[7px] text-xs">
                  <div>
                    <dt class="text-neutral-8 font-bold">entry</dt>
                    <dd class="[overflow-wrap:anywhere]">{{ microApp.entry }}</dd>
                  </div>
                  <div>
                    <dt class="text-neutral-8 font-bold">container</dt>
                    <dd>{{ microApp.container }}</dd>
                  </div>
                  <div>
                    <dt class="text-neutral-8 font-bold">activeRule</dt>
                    <dd>{{ microApp.activeRule }}</dd>
                  </div>
                </dl>
              </article>
            </div>
          </section>

          <section class="border-neutral-3 rounded-md border bg-white p-[18px]">
            <h2 class="text-neutral-9 text-[18px] font-extrabold">生命周期日志</h2>
            <ol class="mt-[14px] grid gap-[10px]">
              <li
                v-for="log in lifecycleLogs"
                :key="log.id"
                class="border-neutral-3 bg-neutral-1 rounded-md border p-[12px] text-sm"
              >
                <div class="flex items-center justify-between gap-[10px]">
                  <strong class="text-primary-6">{{ log.stage }}</strong>
                  <span class="text-neutral-5 text-xs">{{ log.time }}</span>
                </div>
                <p class="text-neutral-8 mt-[4px]">{{ log.appName }}</p>
                <p class="leading-lg text-neutral-6 mt-[2px] text-xs">{{ log.detail }}</p>
              </li>
              <li
                v-if="lifecycleLogs.length === 0"
                class="border-neutral-3 text-neutral-6 rounded-md border border-dashed p-[14px] text-sm"
              >
                等待子应用加载。
              </li>
            </ol>
          </section>
        </aside>
      </div>
    </section>
  </main>
</template>
