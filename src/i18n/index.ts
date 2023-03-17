import { createI18n } from 'vue-i18n';

// 定义语言国际化内容

/**
 * 说明：
 * 须在 pages 下新建文件夹（建议 `要国际化界面目录` 与 `i18n 目录` 相同，方便查找），
 * 注意国际化定义的字段，不要与原有的定义字段相同。
 * 1、/src/i18n/lang 下的 ts 为框架的国际化内容
 * 2、/src/i18n/pages 下的 ts 为各界面的国际化内容
 */

// element plus 自带国际化
import enLocale from 'element-plus/lib/locale/lang/en';
import zhcnLocale from 'element-plus/lib/locale/lang/zh-cn';

// 定义变量内容
const messages = {};
const element = { en: enLocale, 'zh-cn': zhcnLocale };
const itemize = { en: [], 'zh-cn': [] };
const modules: Record<string, any> = import.meta.glob('./**/*.ts', { eager: true });


// 对自动引入的 modules 进行分类 en、zh
// https://vitejs.cn/vite3-cn/guide/features.html#glob-import
for (const path in modules) {
	const key = path.match(/(\S+)\/(\S+).ts/);
	if (itemize[key![2]]) itemize[key![2]].push(modules[path].default);
	else itemize[key![2]] = modules[path];
}

// 合并数组对象（非标准数组对象，数组中对象的每项 key、value 都不同）
function mergeArrObj<T>(list: T, key: string) {
	let obj = {};
	list[key].forEach((i: EmptyObjectType) => {
		obj = Object.assign({}, obj, i);
	});
	return obj;
}

// 处理最终格式
for (const key in itemize) {
	messages[key] = {
		name: key,
		el: element[key].el,
		message: mergeArrObj(itemize, key),
	};
}

// 导出语言国际化
// https://vue-i18n.intlify.dev/guide/essentials/fallback.html#explicit-fallback-with-one-locale
const i18n = createI18n({
	legacy: false, // 让 setup 函数可以通过 t 访问
	silentTranslationWarn: true, // 是否取消本地化失败时输出的警告。
	missingWarn: false,
	silentFallbackWarn: true,  // 是否在回退到 fallbackLocale 或 root 时取消警告。
	fallbackWarn: false,
  globalInjection: true,  // 可以使用$t方式
	// locale: themeConfig.value.globalI18n,
  locale:'zh-cn',
	fallbackLocale: zhcnLocale.name, //切换 zh-cn en-us 控制展示文字
	messages,
});

export default i18n