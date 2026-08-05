interface Item {
    mongoId : string,
    email: string,
    date: string,
    deleteEmail: (mongoId: string) => Promise<void>
}

export default function SubsTableItem ({ mongoId, deleteEmail, email, date }: Item) {
    const formattedDate = new Date(date).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });

    return (
        <tr className="bg-(--bg-primary) hover:bg-(--bg-secondary) transition-colors">
            <th scope="row" className="px-6 py-4 font-medium text-(--text-primary) whitespace-nowrap">
                {email ? email : "No Email"}
            </th>
            <td className="px-6 py-4 hidden sm:table-cell text-(--text-secondary)">
                {formattedDate}
            </td>
            <td className="px-6 py-4">
                <button
                    onClick={() => deleteEmail(mongoId)}
                    className="text-red-500 hover:underline cursor-pointer text-sm font-medium"
                >
                    Delete
                </button>
            </td>
        </tr>
    )
}