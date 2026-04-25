<template>
  <section class="from-primary-0 to-neutral-1 bg-linear-to-b py-[76px]">
    <div
      class="mx-auto grid w-[min(1120px,calc(100%_-_48px))] grid-cols-[minmax(0,1fr)_minmax(340px,0.82fr)] items-center gap-[42px] max-[960px]:grid-cols-1 max-[680px]:w-[calc(100%_-_32px)]"
    >
      <div>
        <div
          class="border-neutral-3 text-neutral-6 inline-flex items-center gap-[8px] rounded-full border bg-white px-[14px] py-[5px] text-sm font-semibold"
        >
          <span class="bg-success-4 size-[7px] rounded-full"></span>
          Browser Extension Ready
        </div>
        <h1 class="leading-xs text-neutral-9 my-[18px] text-[clamp(42px,7vw,64px)] font-extrabold">
          WXT<br />
          <span class="text-primary-6">Extension Template</span>
        </h1>
        <p class="leading-lg text-neutral-6 max-w-[640px] text-[18px]">
          基于 WXT + Vue 3 的浏览器扩展模板。保留 popup、options、newtab、background 和 content
          script 的最小入口。
        </p>
      </div>

      <div class="border-neutral-3 rounded-xl border bg-white p-[22px] shadow-sm">
        <h2 class="text-neutral-9 text-[18px] font-extrabold">Newtab entrypoint</h2>
        <p class="leading-lg text-neutral-6 mt-[10px] text-sm">
          newtab 是一个完整 Vue 页面，可以按模块组织展示页，但只把跨 entrypoint 复用的能力放到
          src/common。
        </p>
        <code
          class="bg-neutral-8 text-primary-0 mt-[18px] block rounded-md px-[12px] py-[10px] text-xs"
        >
          src/entrypoints/newtab/modules/demo
        </code>
      </div>
    </div>
  </section>
</template>
