// https://www.npmjs.com/package/mitt
// 兄弟之间组件传值
import mitt, { Emitter } from 'mitt';

// 类型
const emitter: Emitter<MittType> = mitt<MittType>();

// 导出
export default emitter;
