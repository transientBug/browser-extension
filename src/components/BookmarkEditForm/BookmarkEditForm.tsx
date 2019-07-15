import React from "react";

import { uniq } from "lodash";

import { Bookmark } from "../../api/types";

import CreatableSelect from "react-select/creatable";
import { ValueType } from "react-select/src/types";

import Form, { Fieldset, Textarea, Input } from "../Forms";

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
