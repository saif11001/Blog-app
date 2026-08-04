interface Item {
    mongoId : string,
    email: string,
    date: string,
    deleteEmail: (mongoId: string) => Promise<void>
}

export default function SubsTableItem ({ mongoId, deleteEmail, email, date }: Item) {
    return (
        <tr className="bg-white border-b text-left">
            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                {email ? email : "No Email"}
            </th>
            <td className="px-6 py-4 hidden sm:block">
                {date}
            </td>
            <td className="px-6 py-4 cursor-pointer">
                <button
                    onClick={() => deleteEmail(mongoId)}
                    className="text-red-600 hover:underline cursor-pointer"
                >
                    X
                </button>
            </td>
        </tr>
    )
}