import { Dispatch, SetStateAction } from "react";

interface InputKeywords {
  setSearchKeywords: Dispatch<SetStateAction<string>>;
}

export default function InputKeywords({ setSearchKeywords }: InputKeywords) {
  return (
    <div className="input-words">
      <input
        type="text"
        placeholder="Search with any keywords!"
        style={{ width: "430px" }}
        onChange={(e) => setSearchKeywords(e.target.value)}
      />
    </div>
  );
}
