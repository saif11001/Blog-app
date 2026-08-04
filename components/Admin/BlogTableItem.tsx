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
    return (
        <tr className="bg-white border-b">
            <th scope="row" className="items-center gap-3 hidden sm:flex px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                <Image className="rounded-full" src={authorImg ? authorImg : assets.profile_icon} alt="" width={40} height={40} />
                <p>{author ? author : "No author" }</p>
            </th>
            <td className="px-6 py-4">
                {title ? title : "no titlez"}
            </td>
            <td className="px-6 py-4">
                {date}
            </td>
            <td className="px-6 py-4 cursor-pointer">
                <button
                    onClick={() => deleteBlog(mongoId)}
                    className="text-red-600 hover:underline cursor-pointer"
                >
                    x
                </button>
            </td>
        </tr>
    )
}