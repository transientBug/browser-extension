import tw from "tailwind.macro";

const Form = tw.form`
  mb-6
`;

const Fieldset = tw.fieldset`
  flex flex-col mb-2
`;

const Legend = tw.legend`
  block text-gray-700 text-l font-bold mb-2
`;

const Label = tw.label`
  mb-2 uppercase font-bold text-lg text-grey-darkest
`;

const Input = tw.input`
  appearance-none block w-full bg-white text-gray-700 border border-gray-400 rounded py-2 px-2 leading-tight focus:outline-none focus:border-blue-600 focus:border-1
`;

const Textarea = tw.textarea`
  appearance-none block w-full h-full bg-white text-gray-700 border border-gray-400 rounded py-2 px-2 mb-2 leading-tight focus:outline-none focus:border-blue-600 focus:border-1
`;

export default Form;
export { Fieldset, Legend, Label, Input, Textarea };
