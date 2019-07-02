import React, { useState } from "react";

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

const BookmarkEditForm: React.FC<BookmarkProps> = ({
  onSave,
  autocompleteTags,
  bookmark
}) => {
  const [formData, setFormData] = useState<Bookmark>(bookmark);

  const updateField = (fieldName: string, value: any) => setFormData({ ...formData, [fieldName]: value });

  const updateFieldHandler = (fieldName: string) => (
    event: React.ChangeEvent<HTMLInputElement>
  ) => updateField(fieldName, event.target.value)

  return (
    <Form
      onSubmit={(e: React.FormEvent) => {
        e.preventDefault();
        onSave(formData);
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
          options={uniq(
            autocompleteTags
              .concat(bookmark.tags || [])
              .map(item => ({ label: item, value: item }))
          )}
          onChange={value => {
            if (!value) return

            let newTags: string[] = []

            if (Array.isArray(value))
              newTags = newTags.concat(value.map(v => v.value))
            else {
              if(!value) return
              newTags.push(value.value)
            }

            updateField('tags', formData.tags.concat(value.map(v => v.value)))
          }
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
          onChange={updateFieldHandler('description')}
        />
      </Fieldset>
    </Form>
  );
};

export default BookmarkEditForm;
