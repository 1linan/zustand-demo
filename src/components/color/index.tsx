import create from "zustand";
import shallow from "zustand/shallow";

/**
 * zustand 做到的第一点创新就是：默认不需要 Provider。
 * 直接声明一个 hooks 式的 useStore 后就可以在不同组件中进行调用。
 * 它们的状态会直接共享，简单而美好。
 *
 * 由于没有 Provider 的存在，所以声明的 useStore 默认都是单实例
 */

//定义接口类型
interface IColor {
  color: string;
  desc: string;
  updateColorAction: (args: string) => void;
  updateDescAction: (args: string) => void;
}

//zustand通过create导出的是一个 react hook--->useColorStore
const useColorStore = create<IColor>((set) => ({
  color: "pink",
  desc: "粉色",

  //set 函数有第二个参数，默认为 false。 它将取代state模型，而不是合并。
  //注意它会抹去你依赖的部分，比如actions。
  updateColorAction: (args: string) =>
    set((state: { color: string }) => ({ color: args }), false), //可不能取代state,取代state了,store里面就只剩下color了

  updateDescAction: (args: string) =>
    set((state: { desc: string }) => ({ desc: args }), false),

  removeAllBears: () => set({ color: "", desc: "" }),
}));
/**
 * 通过这个hook(useColorStore) 我们可以直接拿到store里面的state和action，非常类似于redux的useSelector。
 * 不同的是不需要dispatch来推送action, 也没有任何模板代码，数据类型天生区分了state和action, 只需要最简单的调用即可。
 */

export function Colors() {
  //通过create导出的hook--useColorStore,拿到store里面的state
  /**
   * 从store中拿状态有两种方式:
   * 1.使用解构的方式导入对应的数据
   * const {color,desc}=useColorStore();
   * 这样是可行的，但是上面代码将会订阅整个状态，这意味着当我们的组件在某个状态更新后，
   * 所有含name,age的组件都会全部渲染,即使name,age没有改变
   * 2.通过导出自定义钩子来避免全局订阅的情况
   */
  //1. 单个 state 更新渲染
  //默认情况下，它以严格相等（旧 === 新）检测更改，这对于原子状态选择非常有效。
  //   const desc = useColorStore((state) => state.desc);
  //   const color = useColorStore((state) => state.color);

  //如果非要通过解构的方式来拿到store中的数据，
  //可以告诉 zustand 你希望通过传递shallow相等函数来对对象进行浅差异。

  //对象选择,"当state.color"或“state.desc”改变时重新渲染组件
  //   const { color, desc } = useColorStore((state) => {
  //     return {
  //       color: state.color,
  //       desc: state.desc,
  //     };
  //   }, shallow);

  //数组选择,"当state.color"或“state.desc”改变时重新渲染组件
  const [color, desc] = useColorStore((state) => {
    return [state.color, state.desc];
  }, shallow);

  // 映射选择，当 `state.treats` 按 `count` 或 `keys` 顺序改变时重新渲染组件
  //const treats = useColorStore((state) => Object.keys(state.treats), shallow);

  return (
    <>
      <div
        style={{
          background: color,
          width: "100px",
          height: "100px",
          borderRadius: "50%",
        }}
      ></div>
      <p>{desc}</p>
    </>
  );
}

export function Person() {
  //通过create导出的hook--useColorStore,拿到store里面的action
  const updateColorAction = useColorStore((state) => state.updateColorAction);
  const updateDescAction = useColorStore((state) => state.updateDescAction);

  const { color, desc } = useColorStore((state) => {
    return {
      color: state.color,
      desc: state.desc,
    };
  }, shallow);

  return (
    <>
      <button onClick={() => updateColorAction("purple")}>
        change pink to purple
      </button>
      <br />
      <button onClick={() => updateDescAction("紫色")}>
        change "粉色" to "紫色"
      </button>
      <p>
        {color}-{desc}
      </p>
    </>
  );
}
