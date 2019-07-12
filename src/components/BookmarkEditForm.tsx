import React from "react";

import { uniq } from "lodash";

import tw from "tailwind.macro";

import { Bookmark } from "../bookmarks";
import CreatableSelect from "react-select/creatable";
import { ValueType } from "react-select/src/types";

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

interface BookmarkEditFormProps {
  bookmark: Partial<Bookmark>;
  autocompleteTags: string[];
  onUpdate: onSave;
}

const BookmarkEditForm: React.FC<BookmarkEditFormProps> = ({
  onUpdate,
  autocompleteTags,
  bookmark: formData
}) => {
  const setFormData = (newState: Partial<Bookmark>) => onUpdate(newState);

  const updateField = (fieldName: string, value: any) =>
    setFormData({ ...formData, [fieldName]: value });

  const updateFieldHandler = (fieldName: string) => (
    event: React.ChangeEvent<HTMLInputElement>
  ) => updateField(fieldName, event.target.value);

  const options = uniq(
    autocompleteTags
      .concat(formData.tags || [])
      .map(item => ({ label: item, value: item }))
  );

  const tagValues = (formData.tags || []).map(value => ({
    label: value,
    value
  }));

  const tagsOnChange = (value: ValueType<{ label: string; value: string }>) => {
    if (!value) return;
    if (!Array.isArray(value)) return;

    const newTags: string[] = value.map(v => v.value);

    updateField("tags", newTags);
  };

  return (
    <Form
      onSubmit={(e: React.FormEvent) => {
        e.preventDefault();
        onUpdate(formData);
      }}
    >
      <Fieldset>
        <Input
          type="text"
          value={formData.title}
          name="title"
          placeholder="Title"
          onChange={updateFieldHandler("title")}
        />
      </Fieldset>

      <Fieldset>
        <CreatableSelect
          isClearable
          isMulti
          name="tags"
          placeholder="Tags"
          options={options}
          value={tagValues}
          onChange={tagsOnChange}
          styles={{
            placeholder: base => ({ ...base, color: "#a8adb6" })
          }}
        />
      </Fieldset>

      <Fieldset>
        <Textarea
          placeholder="Description"
          rows={10}
          value={formData.description}
          onChange={updateFieldHandler("description")}
        />
      </Fieldset>
    </Form>
  );
};

export default BookmarkEditForm;
