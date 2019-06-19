import React from "react";

import { uniq } from "lodash";

import tw from "tailwind.macro";

import { Bookmark } from "../../bookmarks";
import { Creatable as CreatableSelect } from "react-select";

const Form = tw.form`
  mb-6 p-4
`;

const Fieldset = tw.fieldset`
  flex flex-col mb-2
`;

// const Legend = tw.legend``;

// const Label = tw.label`
//   mb-2 uppercase font-bold text-lg text-grey-darkest
// `;

const Input = tw.input`
  appearance-none block w-full bg-white text-gray-700 border border-gray-400 rounded py-2 px-2 leading-tight focus:outline-none focus:border-blue-600 focus:border-1
`;

const Textarea = tw.textarea`
  appearance-none block w-full h-full bg-white text-gray-700 border border-gray-400 rounded py-2 px-2 mb-2 leading-tight focus:outline-none focus:border-blue-600 focus:border-1
`;

type onSave = (bookmark: Partial<Bookmark>) => void;

interface BookmarkProps {
  bookmark: Bookmark;
  autocompleteTags: string[];
  onSave: onSave;
}

const BookmarkEditView: React.FC<BookmarkProps> = ({
  onSave,
  autocompleteTags,
  bookmark
}) => (
  <Form
    onSubmit={(e: React.FormEvent) => {
      e.preventDefault();
      console.log(e);
      debugger;
      onSave({});
    }}
  >
    <Fieldset>
      <Input
        type="text"
        value={bookmark.title}
        name="title"
        placeholder="Title"
        onChage={console.log}
      />
    </Fieldset>

    <Fieldset>
      <CreatableSelect
        isClearable
        isMulti
        name="tags"
        placeholder="Tags"
        options={uniq(
          autocompleteTags
            .concat(bookmark.tags || [])
            .map(item => ({ label: item, value: item }))
        )}
        onChange={console.log}
        styles={{
          placeholder: base => ({ ...base, color: "#a8adb6" })
        }}
      />
    </Fieldset>

    <Fieldset>
      <Textarea
        placeholder="Description"
        rows={10}
        value={bookmark.description}
      />
    </Fieldset>
  </Form>
);

export default BookmarkEditView;
