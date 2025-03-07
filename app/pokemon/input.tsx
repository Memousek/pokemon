interface InputProps {
    label: string;
    placeholder: string;
    name?: string;
}

export default function Input({ label, placeholder, name }: InputProps) {
    return (
        <div>
            <div className="grid gap-6 mb-6 md:grid-cols-2">
                <div>
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor={name}>{label}</label>
                    <input type="text" id={name} name={name}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder={placeholder} required />
                </div>
            </div>
        </div>
    );
}