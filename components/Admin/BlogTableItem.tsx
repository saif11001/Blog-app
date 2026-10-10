import { assets } from "@/Assets/assets";
import Image from "next/image";

interface BlogTableItemProps {
    authorImg : string,
    title : string,
    mongoId: string;
    author: string,
    date: string,
    deleteBlog: (mongoId: string) => Promise<void>
}

export default function BlogTableItem ({ authorImg, title, mongoId, author, date, deleteBlog }: BlogTableItemProps ) {
    const formattedDate = new Date(date).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });

    return (
        <tr className="bg-(--bg-primary) hover:bg-(--bg-secondary) transition-colors">
            <th scope="row" className="hidden sm:table-cell px-6 py-4 font-medium text-(--text-primary) whitespace-nowrap">
                <div className="flex items-center gap-3">
                    <Image className="rounded-full object-cover w-9 h-9 shrink-0" src={authorImg ? authorImg : assets.profile_icon} alt="" width={36} height={36} />
                    <p>{author ? author : "No author" }</p>
                </div>
            </th>
            <td className="px-6 py-4 text-(--text-primary)">
                {title ? title : "Untitled"}
            </td>
            <td className="px-6 py-4 text-(--text-secondary)">
                {formattedDate}
            </td>
            <td className="px-6 py-4">
                <button
                    onClick={() => deleteBlog(mongoId)}
                    className="text-red-500 hover:underline cursor-pointer text-sm font-medium"
                >
                    Delete
                </button>
            </td>
        </tr>
    )
}
