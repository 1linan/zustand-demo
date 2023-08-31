import { useBookStore } from "../../store/slice/books";

export function Books() {
  const books = useBookStore((state) => state.books);
  const increaseBookAction = useBookStore((state) => state.increaseBook);

  console.log(books, "@_@");
  return (
    <div>
      {Array.isArray(books) &&
        books.map((book, index) => {
          return <p key={index}>{book.name}</p>;
        })}
      <button
        onClick={() =>
          increaseBookAction({ id: books.length + 1, name: "秘密" })
        }
      >
        把“秘密”加入书架
      </button>
    </div>
  );
}
