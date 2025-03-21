import React from "react";
import { Button } from "./Button";

interface FormField {
  name: string;
  label: string;
  type: "text" | "number" | "select" | "checkbox" | "checkboxGroup";
  required?: boolean;
  placeholder?: string;
  value: any;
  options?: { id: string; name: string; color?: string }[];
  onChange: (value: any) => void;
}

interface CreateEditFormProps {
  title: string;
  onSubmit: (e: React.FormEvent) => void;
  onCancel: () => void;
  fields: FormField[];
}

const CreateEditForm: React.FC<CreateEditFormProps> = ({
  title,
  onSubmit,
  onCancel,
  fields,
}) => {
  const renderField = (field: FormField) => {
    switch (field.type) {
      case "text":
        return (
          <input
            type="text"
            value={field.value}
            onChange={(e) => field.onChange(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            placeholder={field.placeholder}
            required={field.required}
          />
        );
      case "number":
        return (
          <input
            type="number"
            value={field.value}
            onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            min="0"
            required={field.required}
          />
        );
      case "select":
        return (
          <select
            value={field.value}
            onChange={(e) => field.onChange(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            required={field.required}
          >
            <option value="">{field.placeholder || "Select an option"}</option>
            {field.options?.map((option) => (
              <option key={option.id} value={option.id}>
                {option.name}
              </option>
            ))}
          </select>
        );
      case "checkboxGroup":
        return (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mt-1">
            {field.options?.map((option) => (
              <div key={option.id} className="flex items-center">
                <input
                  type="checkbox"
                  id={`${field.name}-${option.id}`}
                  checked={(field.value as string[]).includes(option.id)}
                  onChange={() => {
                    const values = field.value as string[];
                    const newValues = values.includes(option.id)
                      ? values.filter((id) => id !== option.id)
                      : [...values, option.id];
                    field.onChange(newValues);
                  }}
                  className="mr-2"
                />
                <label
                  htmlFor={`${field.name}-${option.id}`}
                  className="text-sm flex items-center text-gray-800 dark:text-gray-200"
                >
                  {option.color && (
                    <span
                      className="inline-block w-3 h-3 rounded-full mr-1"
                      style={{ backgroundColor: option.color }}
                    />
                  )}
                  {option.name}
                </label>
              </div>
            ))}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 mb-8">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-bold text-gray-800 dark:text-white">
          {title}
        </h3>
        <Button variant="secondary" onClick={onCancel}>
          Cancel
        </Button>
      </div>

      <form onSubmit={onSubmit} className="space-y-4">
        {fields.map((field) => (
          <div key={field.name}>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              {field.label}{" "}
              {field.required && <span className="text-red-500">*</span>}
            </label>
            {renderField(field)}
          </div>
        ))}

        <div className="flex gap-2">
          <Button type="submit">Submit</Button>
          <Button variant="secondary" type="button" onClick={onCancel}>
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CreateEditForm;
