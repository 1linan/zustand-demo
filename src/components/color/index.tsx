import create from "zustand";

//定义接口类型
interface IColor {
  color: string;
  desc: string;
  updateColor: (args: string) => void;
  updateDesc: (args: string) => void;
}

//zustand通过create导出的是一个 react hook--->useColorStore
const useColorStore = create<IColor>((set) => ({
  color: "pink",
  desc: "粉色",
  updateColor: (args: string) =>
    set((state: { color: string }) => ({ color: args })),

  updateDesc: (args: string) =>
    set((state: { desc: string }) => ({ desc: args })),

  removeAllBears: () => set({ color: "", desc: "" }),
}));
/**
 * 通过这个hook(useColorStore) 我们可以直接拿到store里面的state和action，非常类似于redux的useSelector。
 * 不同的是不需要dispatch来推送action, 也没有任何模板代码，数据类型天生区分了state和action, 只需要最简单的调用即可。
 */

export function Colors() {
  //通过create导出的hook--useColorStore,拿到store里面的state

  const { color, desc } = useColorStore((state: any) => state);

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
  const { updateColor, updateDesc } = useColorStore((state: any) => state);

  return (
    <>
      <button onClick={() => updateColor("purple")}>
        change pink to purple
      </button>
      <br />
      <button onClick={() => updateDesc("紫色")}>
        change "粉色" to "紫色"
      </button>
    </>
  );
}
