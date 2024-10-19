import Form from "../ui/form";
import Button from "../ui/button";
import { CircleX } from "lucide-react";

interface ImageToTextFormProps {
  handleFormSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  handleDrop: (e: React.DragEvent<HTMLDivElement>) => void;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  deletePreview: () => void;
  preview: string;
  loading: boolean;
}

export default function ImageToTextForm({ handleFormSubmit, handleDrop, handleChange, deletePreview, preview, loading }: ImageToTextFormProps) {
  return (
    <Form handleFormSubmit={handleFormSubmit}>
      <div
        className="flex items-center justify-center w-[500px] h-64 rounded-lg m-4 border-2 border-dashed border-gray-300 cursor-pointer"
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDrop}
      >
        {!preview ? (
          <div className="text-center text-gray-500">
            <p>Drag your files here</p>
            <p>or</p>
            <input
              type="file"
              accept="image/*"
              onChange={handleChange}
              className="hidden"
              id="fileInput"
            />
            <label
              htmlFor="fileInput"
              className="underline text-blue-500 cursor-pointer"
            >
              click to select
            </label>
          </div>
        ) : (
          <div className="relative">
            <span
              className="absolute -top-3 -right-3 bg-red-500 px-1 py-1 rounded-full cursor-pointer"
              onClick={() => deletePreview()}
            >
              <CircleX
                className="w-5 h-5 text-white"
              />
            </span>
            <img src={preview} alt="Preview" className="h-full w-full object-cover rounded-lg" />
          </div>
        )}
      </div>
      <Button
        loading={loading}
        disabled={!preview || loading}
      />
    </Form>
  )
}