interface FormProps {
  handleFormSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  children: React.ReactNode;
}

export default function Form({ handleFormSubmit, children }: FormProps) {

  return (
    <form
      className="flex justify-center items-center w-full border-t border-slate-300 px-2 py-4 gap-2"
      onSubmit={handleFormSubmit}
    >
      {children}
    </form>
  )
}